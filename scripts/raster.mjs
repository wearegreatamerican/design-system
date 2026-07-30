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

const written = [];
const skipped = [];
const failed = [];

for (const out of R.outputs ?? []) {
  const src = join(root, out.source);
  // Artwork lands later than infrastructure, so a missing source is a normal state,
  // not an error. Report it and keep going.
  if (!existsSync(src)) { skipped.push(out); continue; }

  const svg = readFileSync(src);
  const sizes = [
    ...(out.widths ?? []).map((n) => ({ n, square: false })),
    ...(out.squares ?? []).map((n) => ({ n, square: true })),
  ];
  if (!sizes.length) {
    failed.push({ out, size: null, err: new Error("declares neither widths nor squares") });
    continue;
  }

  for (const { n, square } of sizes) {
    const file = `${out.name}-${n}.png`;
    try {
      // density scales the SVG rasterisation up front so the vector is rendered at the
      // target size rather than rendered small and scaled up. Without it, large outputs
      // come out soft.
      const meta = await sharp(svg).metadata();
      const base = square ? Math.max(meta.width ?? n, meta.height ?? n) : (meta.width ?? n);
      const density = Math.min(2400, Math.max(72, Math.ceil((72 * n) / base) * 2));

      let img = sharp(svg, { density });
      img = square
        // exact square dimensions, the source centred inside them, nothing cropped
        ? img.resize(n, n, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        // width-driven, aspect ratio preserved
        : img.resize({ width: n });

      await img
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        // transparent always. Never composite onto a colour: a -white logo flattened
        // onto white is invisible, and a -sand one onto white is a subtly wrong colour.
        .toFile(join(outDir, file));

      const info = await sharp(join(outDir, file)).metadata();
      written.push({ file, w: info.width, h: info.height, bytes: statSync(join(outDir, file)).size });
    } catch (err) {
      failed.push({ out, size: n, err });
    }
  }
}

// ---------- report ----------
if (written.length) {
  const w = (k) => Math.max(...written.map((r) => String(r[k]).length));
  const [fw, bw] = [w("file"), w("bytes")];
  console.log(`\nwrote ${written.length} file${written.length === 1 ? "" : "s"} to ${R.outputDir}/\n`);
  for (const r of written)
    console.log(`  ${r.file.padEnd(fw)}  ${String(r.w).padStart(4)} x ${String(r.h).padEnd(4)}  ${String(r.bytes).padStart(bw)} bytes`);
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
