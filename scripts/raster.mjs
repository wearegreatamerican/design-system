#!/usr/bin/env node
// Great American Design System raster generation.
// Renders the PNGs declared in tokens.json under assets.raster from their SVG sources.
// Run `npm run raster`. Output is committed; never hand-edit it.
//
// This is the ONE script in the repo with a dependency. build.mjs stays dependency-free
// and is what runs on install, so a consumer pulling the package never needs sharp.
// Deliberately not chained into `build` or `prepare` for the same reason.

import { readFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const T = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));
const R = T.assets?.raster;

if (!R) {
  console.error("\nFAILED\n  ✗ tokens.json has no assets.raster block. Nothing is declared to render.\n");
  process.exit(1);
}

const outDir = join(root, R.outputDir);
mkdirSync(outDir, { recursive: true });

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const written = [];
const skipped = [];
const failed = [];

for (const out of R.outputs ?? []) {
  const src = join(root, out.source);
  // Artwork lands later than infrastructure, so a missing source is a normal state,
  // not an error. Report it and keep going.
  // The declaration is checked BEFORE the source is looked for. Artwork arrives last,
  // so validating only what has a source would leave a malformed output undiscovered
  // until the day the SVG lands — which is the worst moment to find out.
  const sizes = [
    ...(out.widths ?? []).map((n) => ({ n, square: false })),
    ...(out.squares ?? []).map((n) => ({ n, square: true })),
  ];
  if (!sizes.length) {
    failed.push({ out, size: null, err: new Error("declares neither widths nor squares") });
    continue;
  }

  // pad is a fraction of the longest rendered edge, added on all four sides. The
  // declared size is the FINAL dimension including it, so the artwork renders into an
  // inner box and the padding is extended around it — not added on top, which would
  // silently make every output bigger than declared.
  const pad = out.pad ?? 0;
  if (typeof pad !== "number" || !(pad >= 0) || pad >= 0.5) {
    failed.push({ out, size: null, err: new Error(`pad must be a number in [0, 0.5), got ${JSON.stringify(out.pad)}`) });
    continue;
  }

  // `dir` is required rather than defaulted: guessing a subdirectory would scatter
  // output across assets/raster/ with nothing to say which tree it belongs to.
  if (!out.dir || typeof out.dir !== "string") {
    failed.push({ out, size: null, err: new Error(
      `declares no "dir". Every output names the subdirectory of ${R.outputDir}/ it writes to`) });
    continue;
  }

  // Only now does a missing source matter, and it is a normal state, not an error.
  if (!existsSync(src)) { skipped.push(out); continue; }

  const svg = readFileSync(src);
  const destDir = join(outDir, out.dir);
  mkdirSync(destDir, { recursive: true });

  for (const { n, square } of sizes) {
    const file = `${out.dir}/${out.name}-${n}.png`;
    const dest = join(destDir, `${out.name}-${n}.png`);
    const inner = Math.round(n * (1 - 2 * pad));
    if (inner < 1) {
      failed.push({ out, size: n, err: new Error(
        `pad ${pad} leaves an inner box of ${inner}px at size ${n}. Lower the pad or drop this size`) });
      continue;
    }
    try {
      // density scales the SVG rasterisation up front so the vector is rendered at the
      // target size rather than rendered small and scaled up. Without it, large outputs
      // come out soft. Keyed to the inner box, which is what actually gets rendered.
      const meta = await sharp(svg).metadata();
      const base = square ? Math.max(meta.width ?? inner, meta.height ?? inner) : (meta.width ?? inner);
      const density = Math.min(2400, Math.max(72, Math.ceil((72 * inner) / base) * 2));

      let img = sharp(svg, { density });
      img = square
        // exact inner square, the source centred inside it, nothing cropped
        ? img.resize(inner, inner, { fit: "contain", background: TRANSPARENT })
        // width-driven, aspect ratio preserved
        : img.resize({ width: inner });

      // Split the padding so the final width lands on exactly the declared size even
      // when the total is odd. Height takes the same absolute pixels, which keeps the
      // margin visually even on all four sides for the width-driven outputs too.
      const total = n - inner;
      const lead = Math.floor(total / 2);
      const trail = total - lead;
      if (total > 0) img = img.extend({ top: lead, bottom: trail, left: lead, right: trail, background: TRANSPARENT });

      await img
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        // transparent always. Never composite onto a colour: a -white logo flattened
        // onto white is invisible, and a -sand one onto white is a subtly wrong colour.
        .toFile(dest);

      const info = await sharp(dest).metadata();
      written.push({
        file, w: info.width, h: info.height, bytes: statSync(dest).size,
        pad, inner, innerH: info.height - total,
      });
    } catch (err) {
      failed.push({ out, size: n, err });
    }
  }
}

// ---------- report ----------
if (written.length) {
  const w = (k) => Math.max(...written.map((r) => String(r[k]).length));
  const [fw, bw] = [w("file"), w("bytes")];
  const dim = (a, b) => `${a} x ${b}`;
  const outW = Math.max(...written.map((r) => dim(r.w, r.h).length));
  const innW = Math.max(...written.map((r) => dim(r.inner, r.innerH).length));
  console.log(`\nwrote ${written.length} file${written.length === 1 ? "" : "s"} to ${R.outputDir}/\n`);
  // inner box is shown next to the final size so a padding mistake is visible here
  // rather than in a file browser three weeks later
  console.log(`  ${"file".padEnd(fw)}  ${"output".padEnd(outW)}  ${"inner box".padEnd(innW)}  pad   ${"bytes".padStart(bw)}`);
  for (const r of written)
    console.log(`  ${r.file.padEnd(fw)}  ${dim(r.w, r.h).padEnd(outW)}  ${dim(r.inner, r.innerH).padEnd(innW)}  `
      + `${String(r.pad).padEnd(4)}  ${String(r.bytes).padStart(bw)}`);
} else {
  console.log(`\nwrote 0 files to ${R.outputDir}/`);
}

if (skipped.length) {
  console.log(`\nskipped ${skipped.length} source${skipped.length === 1 ? "" : "s"} that do not exist yet:`);
  for (const s of skipped) {
    const count = (s.widths ?? s.squares ?? []).length;
    console.log(`  ${s.source}  (${count} PNG${count === 1 ? "" : "s"} pending)`);
  }
  console.log(`\n  Missing artwork is not a failure — infrastructure lands before the files do.`);
}

if (failed.length) {
  console.error(`\nFAILED\n` + failed.map((f) =>
    `  ✗ ${f.out.source}${f.size ? ` at ${f.size}px` : ""}: ${f.err.message}`).join("\n") + "\n");
  process.exit(1);
}

// Live text renders through librsvg with whatever fonts the machine has, which will not
// be the brand faces. The render succeeds and the wordmark is silently wrong, so this
// warns rather than trusting the exit code.
const withText = (R.outputs ?? [])
  .filter((o) => existsSync(join(root, o.source)))
  .filter((o) => /<text[\s>]/.test(readFileSync(join(root, o.source), "utf8")));
if (withText.length) {
  console.warn(`\n  ! ${withText.length} source${withText.length === 1 ? " contains" : "s contain"} a <text> element:`);
  for (const o of withText) console.warn(`      ${o.source}`);
  console.warn(`    librsvg does not have the brand fonts, so live text renders in a fallback`
    + `\n    face and the result is silently wrong. Convert text to outlines in the artwork.`);
}

console.log();
