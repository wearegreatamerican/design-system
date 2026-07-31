#!/usr/bin/env node
// Great American Design System build.
// Reads tokens.json, writes build/tokens.css and build/tokens.js, and validates.
// No dependencies. Run `node scripts/build.mjs` or `--check` to validate only.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

// --tag v1.1.1 — release guard, run in CI on a tag push. A tag and the version it
// publishes must agree. v1.0.0 and v1.1.0 both pointed at c9a86d9, so a consumer
// pinned to #v1.0.0 installed 1.1.0, and npm caches by spec, so two machines on the
// same pin held different code. This is a standalone check: it asserts and exits.
// The flag's presence is found separately from its value, so a bare `--tag` with
// nothing after it fails loudly instead of falling through to an ordinary build.
const tagAt = process.argv.findIndex((a) => a === "--tag" || a.startsWith("--tag="));
if (tagAt !== -1) {
  const tagArg = process.argv[tagAt].startsWith("--tag=")
    ? process.argv[tagAt].slice(6)
    : process.argv[tagAt + 1];
  if (!tagArg || tagArg.startsWith("-")) {
    console.error("\nFAILED\n  ✗ --tag needs a tag name, e.g. --tag v1.1.1\n");
    process.exit(1);
  }
  const want = tagArg.replace(/^v/, "");
  const got = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
  if (got !== want) {
    console.error(`\nFAILED\n  ✗ tag ${tagArg} publishes package.json version ${got}, not ${want}.`
      + `\n    Bump the version to ${want} and retag, or cut the tag as v${got}.`
      + `\n    Never move a published tag: consumers pinned to it have already cached the old code.\n`);
    process.exit(1);
  }
  console.log(`ok — tag ${tagArg} matches package.json version ${got}`);
  process.exit(0);
}

const T = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

// ---------- color math ----------
// Shared with scripts/specimen.mjs, so a ratio the specimen prints is the ratio this
// validator enforced. Still no external dependencies.
import { ratio } from "../lib/contrast.mjs";

// ---------- validation ----------
const errors = [];
const warnings = [];
const hex = (name) => {
  const t = T.color[name];
  if (!t) errors.push(`unknown token "${name}"`);
  return t?.value;
};

// aliases must point at real tokens
for (const [role, token] of Object.entries(T.alias))
  if (!T.color[token]) errors.push(`alias "${role}" points at unknown token "${token}"`);

// brand entries must point at real tokens, and must not carry their own hex
for (const [name, b] of Object.entries(T.brand)) {
  if (!T.color[b.token]) errors.push(`brand "${name}" points at unknown token "${b.token}"`);
  if ("value" in b || "hex" in b)
    errors.push(`brand "${name}" defines its own value. Brand entries reference a token, never duplicate it`);
}

// retired values must not be live
const live = new Map(Object.entries(T.color).map(([n, t]) => [t.value.toUpperCase(), n]));
for (const r of T.retired) {
  if (r.keep) continue;
  const hit = live.get(r.value.toUpperCase());
  if (hit) errors.push(`retired value ${r.value} is live as token "${hit}" (${r.reason})`);
}

// declared contrast minimums must hold
for (const r of T.rules.minContrast) {
  const fg = hex(r.fg), bg = hex(r.bg);
  if (!fg || !bg) continue;
  const got = ratio(fg, bg);
  if (got < r.min)
    errors.push(`contrast: ${r.fg} on ${r.bg} is ${got.toFixed(2)}, needs ${r.min} (${r.why})`);
}

// barred pairs should genuinely fail, otherwise the ban is stale
for (const [bg, list] of Object.entries(T.rules.barredOn))
  for (const fg of list) {
    const got = ratio(hex(fg), hex(bg));
    if (got >= 4.5)
      warnings.push(`${fg} on ${bg} now measures ${got.toFixed(2)} and would pass. The ban is a ramp decision, not a contrast one, but confirm it is still intended`);
  }

// document registry: grounds must be real tokens, typeRoles must exist in the type map
const elements = new Set(T.typeMap.map((r) => r.element));
for (const [name, d] of Object.entries(T.documents ?? {})) {
  if (name.startsWith("_")) continue;
  if (!T.color[d.ground]) errors.push(`document "${name}" ground "${d.ground}" is not a token`);
  for (const r of d.typeRoles ?? [])
    if (!elements.has(r)) errors.push(`document "${name}" references type role "${r}", which is not in typeMap`);
  if (d.class === "transactional" && d.motifs !== "none")
    errors.push(`document "${name}" is transactional but declares motifs "${d.motifs}". Transactional documents carry none`);
  if (d.class === "transactional" && d.ground !== "paper")
    errors.push(`document "${name}" is transactional but sits on "${d.ground}". Transactional documents are designed on paper`);
}

// every SVG under assets/ must match its treatment's allowed colours. Not a flat palette
// check: the treatment comes from the filename suffix, so a -sand logo carrying cherry
// fails here even though cherry is a perfectly valid brand colour somewhere else.
const A = T.assets ?? {};
const TR = A.treatments ?? {};
// A kind may override a shared treatment: the icon's full colour is navy + sand, the
// logo's is navy + cherry, so "icon:full" wins over "full" for anything under /icon/.
// Scoped keys carry a colon, which a filename suffix cannot, so they are never resolved
// from a filename — see the suffix match below.
const allowed = (name, kind) => {
  const t = TR[`${kind}:${name}`] ?? TR[name];
  if (!t) return null;
  return new Set([
    ...(t.tokens ?? []).map((k) => T.color[k]?.value.toUpperCase()).filter(Boolean),
    ...(t.literals ?? []).map((h) => h.toUpperCase()),
  ]);
};
const walk = (d) => !existsSync(d) ? [] : readdirSync(d).flatMap((f) => {
  const full = join(d, f);
  return statSync(full).isDirectory() ? walk(full) : [full];
});
// Read colour values out of colour properties and attributes only. Scanning the raw file
// for hex would both miss and over-match: #fff is a colour the 6-digit form never sees,
// while url(#gradient) references and element ids look exactly like 3-digit hex.
const NOT_A_COLOUR = new Set(["none", "transparent", "currentcolor", "inherit", "initial", "unset"]);
const NAMED = { white: "#FFFFFF", black: "#000000" };
const COLOUR_AT = /(?:fill|stroke|stop-color|flood-color|lighting-color)\s*[:=]\s*["']?\s*([^;"'\s>)]+)/gi;
const coloursIn = (svg) => {
  const found = new Set(), unreadable = new Set();
  for (const [, raw] of svg.matchAll(COLOUR_AT)) {
    const v = raw.trim().toLowerCase();
    if (NOT_A_COLOUR.has(v) || v.startsWith("url(")) continue;
    if (/^#[0-9a-f]{3}$/.test(v)) found.add(`#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`.toUpperCase());
    else if (/^#[0-9a-f]{6}$/.test(v)) found.add(v.toUpperCase());
    else if (NAMED[v]) found.add(NAMED[v]);
    else unreadable.add(raw.trim());
  }
  return { found, unreadable };
};
// Declared treatments must resolve. Without this a typo in defaultTreatment sits
// undetected until artwork exists to fail against it, and the artwork is what arrives
// last — so the error would surface at the least convenient possible moment.
for (const kind of ["logo", "icon"]) {
  if (!A[kind]) continue;
  const declared = [
    ["defaultTreatment", [A[kind].defaultTreatment]],
    ["treatments", A[kind].treatments ?? []],
  ];
  for (const [field, names] of declared)
    for (const n of names.filter(Boolean))
      if (!allowed(n, kind))
        errors.push(`assets.${kind}.${field} names treatment "${n}", which assets.treatments does not define`);
}

// assets/photography/ holds reference frames, not the photo library. A shoot dropped in
// here would be tens of megabytes of binaries versioned by product rather than by the
// system — it belongs in a DAM. Warned rather than failed: the cap is a judgement about
// what this repo is for, and a hard stop would be the wrong tool for that.
const PHOTO_CAP_MB = 5;
const photoDir = join(root, "assets/photography");
if (existsSync(photoDir)) {
  const bytes = walk(photoDir).reduce((n, f) => n + statSync(f).size, 0);
  const mb = bytes / 1e6;
  if (mb > PHOTO_CAP_MB)
    warnings.push(`assets/photography/ is ${mb.toFixed(1)}MB, over the ${PHOTO_CAP_MB}MB cap. `
      + `It holds reference frames only — under 500KB each, no more than a dozen. `
      + `A photo library belongs in a DAM or object storage, not in git`);
}

// Source SVGs are tight-cropped to the mark. Padding baked into a viewBox compounds
// with the generator's padding invisibly, so the geometry is surfaced rather than
// checked: a number in the log is enough for a human to spot a padded source, and
// there is no threshold that could tell padding from a genuinely wide lockup.
const geometry = [];
for (const file of walk(join(root, "assets")).filter((f) => f.endsWith(".svg"))) {
  const rel = file.replace(root + "/", "");
  const base = rel.split("/").pop().replace(/\.svg$/, "");
  const vb = readFileSync(file, "utf8").match(/viewBox\s*=\s*["']\s*([-\d.eE]+)[,\s]+([-\d.eE]+)[,\s]+([-\d.eE]+)[,\s]+([-\d.eE]+)/);
  geometry.push(vb
    ? { rel, w: +vb[3], h: +vb[4], minX: +vb[1], minY: +vb[2] }
    : { rel, missing: true });
  const kind = rel.includes("/icon/") ? "icon" : "logo";
  const suffix = Object.keys(TR).filter((t) => !t.includes(":")).find((t) => base.endsWith(`-${t}`));
  const treatment = suffix ?? A[kind]?.defaultTreatment;
  const ok = allowed(treatment, kind);
  if (!ok) { errors.push(`${rel}: unknown treatment "${treatment}"`); continue; }
  const { found, unreadable } = coloursIn(readFileSync(file, "utf8"));
  for (const h of found)
    if (!ok.has(h))
      errors.push(`${rel} is treatment "${treatment}" but uses ${h}, which that treatment does not allow`);
  for (const v of unreadable)
    errors.push(`${rel} sets a colour to "${v}", which this check cannot resolve. `
      + `Use a 3- or 6-digit hex so the treatment can be validated`);
}

// every PNG in the raster output directory must be one this repo declares. An undeclared
// PNG was hand-placed, and `npm run raster` will not maintain it — it survives until
// someone notices it is stale, or vanishes if the directory is ever cleaned.
// Existence and declaration only, never content: sharp renders through librsvg, and
// different librsvg versions emit different bytes for identical input, so byte-comparing
// a committed PNG against a fresh render fails spuriously from one machine to the next.
if (A.raster) {
  // Declared paths are {dir}/{name}-{size}.png, matched against a recursive walk of the
  // output tree, so a PNG in the right directory but the wrong subdirectory is caught too.
  const declared = new Set((A.raster.outputs ?? []).flatMap((o) =>
    [...(o.widths ?? []), ...(o.squares ?? [])].map((n) => `${o.dir}/${o.name}-${n}.png`)));
  const outRoot = join(root, A.raster.outputDir);
  for (const f of walk(outRoot).filter((f) => f.toLowerCase().endsWith(".png"))) {
    const rel = f.slice(outRoot.length + 1);
    if (!declared.has(rel))
      errors.push(`${A.raster.outputDir}/${rel} is not declared in assets.raster.outputs. `
        + `It was placed by hand, so \`npm run raster\` does not maintain it and it will drift. `
        + `Declare it there or delete it`);
  }
  // Source directories hold artwork, never output. A generated file sitting beside a
  // source is one someone eventually hand-edits believing it is the source.
  for (const srcDir of ["assets/logo", "assets/icon"])
    for (const f of walk(join(root, srcDir)).filter((f) => f.toLowerCase().endsWith(".png")))
      errors.push(`${f.replace(root + "/", "")} is a generated file in a source directory. `
        + `PNGs belong under ${A.raster.outputDir}/, which is generated and committed; `
        + `${srcDir}/ holds SVG sources only`);
}

// duplicate values, per namespace
const dupes = (label, entries) => {
  const seen = new Map();
  for (const [n, v] of entries) {
    const k = String(v).toUpperCase();
    if (seen.has(k)) errors.push(`${label}: "${n}" and "${seen.get(k)}" share the value ${v}`);
    seen.set(k, n);
  }
};
const plain = (o) => Object.entries(o ?? {}).filter(([k]) => !k.startsWith("_"));
// "Archivo Variable", "Archivo", ui-sans-serif -> ["Archivo Variable", "Archivo", "ui-sans-serif"]
const families = (stack) => String(stack).split(",").map((f) => f.trim().replace(/^["']|["']$/g, ""));
dupes("color",  Object.entries(T.color).map(([n, t]) => [n, t.value]));
dupes("radius", plain(T.radius).map(([n, r]) => [n, r.value]));
dupes("shadow", plain(T.shadow));
dupes("text",   plain(T.scale?.text));
dupes("leading", plain(T.scale?.leading));
dupes("tracking", plain(T.scale?.tracking));
// tile.unit is metadata, not a scale. §5 says there are exactly three scales, so two
// of them sharing a number means the motif has grown two names for one thing.
dupes("motif.tile", plain(T.motif?.tile).filter(([k]) => k !== "unit"));
// compared on the primary family, not the whole stack: two roles that lead with the
// same face are one face wearing two names, whatever their fallbacks are
dupes("font.stack", plain(T.font?.stack).map(([n, v]) => [n, families(v)[0]]));
dupes("motion", plain(T.motion));

// Variable families must lead. Consumers self-hosting through @fontsource-variable
// register "Archivo Variable", not "Archivo", so a stack naming only the static family
// falls through to ui-sans-serif with no error and no warning — just slightly wrong
// type. 1.0.0 shipped exactly that. Naming both is the fix; this stops it regressing.
const NO_VARIABLE_BUILD = new Set(["script"]);  // Satisfy has no variable build
for (const [role, stack] of plain(T.font?.stack)) {
  if (NO_VARIABLE_BUILD.has(role)) continue;
  const [first, second] = families(stack);
  const base = first?.replace(/ Variable$/, "");
  if (!first?.endsWith(" Variable"))
    errors.push(`font.stack.${role} leads with "${first}". The variable family must come first, `
      + `or @fontsource-variable consumers silently fall back to ui-sans-serif`);
  else if (second !== base)
    errors.push(`font.stack.${role} leads with "${first}" but follows it with "${second}". `
      + `The second family must be "${base}", the static build of the same face`);
}

// gradient ramps must name real tokens
for (const [n, g] of plain(T.motif?.gradient ?? {}))
  for (const step of g.ramp ?? [])
    if (!T.color[step]) errors.push(`motif.gradient.${n} references unknown token "${step}"`);

const report = () => {
  if (!errors.length) return;
  console.error("\nFAILED\n" + errors.map((e) => "  ✗ " + e).join("\n") + "\n");
  process.exit(1);
};
// Reported, never enforced. A padded source shows up here as an aspect ratio that does
// not match the mark it is meant to be cropped to. Printed before the error report, not
// after the ok line: geometry is independent of whether anything failed, and a diagnostic
// that only appears once everything already passes is no use for diagnosing.
if (geometry.length) {
  const wRel = Math.max(...geometry.map((g) => g.rel.length));
  console.log(`\nsvg sources — viewBox and aspect ratio (sources are tight-cropped; padding comes from the generator):`);
  for (const g of geometry) {
    if (g.missing) { console.log(`  ${g.rel.padEnd(wRel)}  no viewBox — cannot report geometry`); continue; }
    const ratio = g.h ? g.w / g.h : NaN;
    const shape = !isFinite(ratio) ? "" : ratio > 1.05 ? "landscape" : ratio < 0.95 ? "portrait" : "square";
    const origin = (g.minX || g.minY) ? `  origin ${g.minX},${g.minY}` : "";
    console.log(`  ${g.rel.padEnd(wRel)}  ${`${g.w} x ${g.h}`.padEnd(18)} ratio ${ratio.toFixed(3).padEnd(7)} ${shape}${origin}`);
  }
}

// Token errors are fatal here rather than after generation: asserting on CSS built
// from a token file we already know is broken would only report noise.
report();

// ---------- generate CSS ----------
const groups = { structure: "Structure", neutral: "Neutral ramp, all warm", accent: "Accent ramp", water: "Water accent" };
const brandOf = Object.fromEntries(Object.entries(T.brand).map(([, b]) => [b.token, true]));
const pad = (s, n) => s.padEnd(n);

let css = `/* GENERATED FROM tokens.json — DO NOT EDIT BY HAND.\n`
  + `   Run \`npm run build\`. Prose rules live in ${T.meta.spec}.\n\n`
  + `   CONTRACT: the consumer imports tailwindcss FIRST, then this file.\n`
  + `   This file does not import the framework. Use "/css/bundled" if you\n`
  + `   want one that does. */\n\n@theme static {\n`;
for (const [g, label] of Object.entries(groups)) {
  css += `\n  /* ---------- ${label} ---------- */\n`;
  for (const [n, t] of Object.entries(T.color)) {
    if (t.group !== g) continue;
    const tag = brandOf[n] ? "BRAND COLOR. " : "";
    css += `  ${pad(`--color-${n}:`, 22)}${t.value};  /* ${tag}${t.use} */\n`;
  }
}
css += `\n  /* ---------- Type ---------- */\n`;
for (const [n, v] of Object.entries(T.font.stack))
  css += `  ${pad(`--font-${n === "sans" ? "sans" : n}:`, 22)}${v};\n`;
css += `\n  /* ---------- Waterline tile motif ---------- */\n`;
const tileKey = { eyebrow: "tile-eyebrow", cardCap: "tile-card-cap", divider: "tile-divider" };
for (const [n, v] of Object.entries(T.motif.tile)) {
  if (n === "unit") continue;
  css += `  ${pad(`--${tileKey[n]}:`, 22)}${v}px;\n`;
}
// scale, radius, shadow, motion — every prefix is a real Tailwind v4 namespace
const NS = [
  ["Type scale",  T.scale?.text,     "--text-"],
  ["Leading",     T.scale?.leading,  "--leading-"],
  ["Tracking",    T.scale?.tracking, "--tracking-"],
  ["Radius",      T.radius,          "--radius-"],
  ["Shadow",      T.shadow,          "--shadow-"],
  ["Motion",      T.motion,          "--"],
];
for (const [label, obj, prefix] of NS) {
  const rows = plain(obj);
  if (!rows.length) continue;
  css += `\n  /* ---------- ${label} ---------- */\n`;
  for (const [k, v] of rows) {
    const val = typeof v === "object" ? v.value : v;
    const use = typeof v === "object" && v.use ? `  /* ${v.use} */` : "";
    css += `  ${pad(`${prefix}${k}:`, 22)}${val};${use}\n`;
  }
}

// waterline gradients, built from colour tokens
const g = T.motif?.gradient;
if (g) {
  css += `\n  /* ---------- Waterline gradients ---------- */\n`;
  // cap is a 5px product-card cap that stretches to the card's width, so thirds are correct
  const cap = g.cap.ramp.map((s, i) =>
    `    var(--color-${s}) ${(i * 100 / 3).toFixed(2)}% ${((i + 1) * 100 / 3).toFixed(2)}%`).join(",\n");
  css += `  --waterline-cap: linear-gradient(90deg,\n${cap});\n`;

  // band is a repeating tile at a fixed scale, so stops step by tile width, never by percentage.
  // Every offset is n tile widths plus m gaps, kept symbolic so the period follows --tile-divider
  // and the tile scale stays defined in exactly one place.
  const D = `var(--${tileKey.divider})`;
  const [, gapNum, gapUnit] = /^([\d.]+)(\D+)$/.exec(g.band.gap);
  const at = (n, m) => {
    const tiles = n === 0 ? "" : n === 1 ? D : `${D} * ${n}`;
    const gaps = m === 0 ? "" : `${+(gapNum * m).toFixed(4)}${gapUnit}`;
    if (!tiles) return gaps || "0";
    if (!gaps) return tiles;
    return `calc(${tiles} + ${gaps})`;
  };
  // tile i spans i*(D+G) -> i*(D+G)+D, then the separator after it runs to (i+1)*(D+G).
  // The trailing separator after the last tile is required: without it the last tile butts
  // against the first tile of the next repetition and the band reads as a 2-tile rhythm.
  const stops = [];
  g.band.ramp.forEach((s, i) => {
    stops.push([`var(--color-${s})`, at(i, i), at(i + 1, i)]);
    stops.push([`var(--${g.band.gapToken})`, at(i + 1, i), at(i + 1, i + 1)]);
  });
  const wCol = Math.max(...stops.map((r) => r[0].length)) + 1;
  const wFrom = Math.max(...stops.map((r) => r[1].length)) + 2;
  const band = stops.map(([c, from, to]) => `    ${pad(c, wCol)}${pad(from, wFrom)}${to}`).join(",\n");
  css += `  --waterline-band: repeating-linear-gradient(90deg,\n${band});\n`;
}

css += `}\n\n/* Role aliases. Never define a value here, only point at a token. */\n:root {\n`;
for (const [role, token] of Object.entries(T.alias))
  css += `  ${pad(`--${role}:`, 18)}var(--color-${token});\n`;
css += `}\n\n/* Retired, do not reintroduce:\n`;
for (const r of T.retired) if (!r.keep) css += `   ${r.value} -> ${r.replacedBy}  (${r.reason})\n`;
css += `*/\n`;

// ---------- assert the generated gradient contract ----------
// The band and the cap are opposites on purpose, and this is the assertion that keeps
// one from being "fixed" into the other. 1.1.0 shipped the band as a percentage
// linear-gradient: instead of a repeating 26px tile it stretched three tiles across the
// whole element, drawing three bars where ~59 belong on a 1600px divider. Nothing in the
// token file was wrong, so only reading the generated CSS can catch it. A screenshot did.
const declOf = (name) => css.match(new RegExp(`--${name}:\\s*([^;]*);`))?.[1];
const GRADIENT_CONTRACT = [
  { name: "waterline-band", starts: "repeating-linear-gradient", banned: "%",
    why: "the band tiles at a fixed --tile-divider scale, so every stop is a length, never a percentage" },
  { name: "waterline-cap", starts: "linear-gradient", banned: "px",
    why: "the cap stretches to its card's width, so its stops are percentage thirds, never a fixed length" },
];
for (const c of GRADIENT_CONTRACT) {
  const value = declOf(c.name);
  if (value === undefined) { errors.push(`--${c.name} is missing from the generated CSS`); continue; }
  if (!value.startsWith(c.starts))
    errors.push(`--${c.name} must be a ${c.starts}, got "${value.split("(")[0]}". ${c.why}`);
  if (value.includes(c.banned))
    errors.push(`--${c.name} contains "${c.banned}" in its stops. ${c.why}`);
}
report();

if (warnings.length) console.warn("\n" + warnings.map((w) => "  ! " + w).join("\n") + "\n");
const docCount = Object.keys(T.documents ?? {}).filter((k) => !k.startsWith("_")).length;
console.log(`ok — ${Object.keys(T.color).length} tokens, ${T.rules.minContrast.length} contrast rules hold, `
  + `${docCount} document types, gradient contract holds`);

if (checkOnly) process.exit(0);

// ---------- generate JS ----------
const js = `// GENERATED FROM tokens.json — DO NOT EDIT BY HAND.\n// Run \`npm run build\`.\n\n`
  + `export const color = ${JSON.stringify(Object.fromEntries(Object.entries(T.color).map(([n, t]) => [n, t.value])), null, 2)};\n\n`
  + `export const brand = ${JSON.stringify(T.brand, null, 2)};\n\n`
  + `export const font = ${JSON.stringify(T.font, null, 2)};\n\n`
  + `export const typeMap = ${JSON.stringify(T.typeMap, null, 2)};\n\n`
  + `export const page = ${JSON.stringify(T.page, null, 2)};\n\n`
  + `export const motif = ${JSON.stringify(T.motif, null, 2)};\n\n`
  + `export const retired = ${JSON.stringify(T.retired, null, 2)};\n\n`
  + `export const documents = ${JSON.stringify(T.documents ?? {}, null, 2)};\n\n`
  + `export const scale = ${JSON.stringify(T.scale ?? {}, null, 2)};\n\n`
  + `export const radius = ${JSON.stringify(T.radius ?? {}, null, 2)};\n\n`
  + `export const shadow = ${JSON.stringify(T.shadow ?? {}, null, 2)};\n\n`
  + `export const assets = ${JSON.stringify(T.assets ?? {}, null, 2)};\n\n`
  + `/** px at 96ppi -> docx half-points */\nexport const pxToHalfPt = (px) => Math.round((px * 72 / 96) * 2);\n\n`
  + `/** px at 96ppi -> twips */\nexport const pxToTwips = (px) => Math.round(px * 15);\n\n`
  + `export default { color, brand, font, typeMap, page, motif, retired, documents, scale, radius, shadow, assets, pxToHalfPt, pxToTwips };\n`;

mkdirSync(join(root, "build"), { recursive: true });
writeFileSync(join(root, "build", "tokens.css"), css);
writeFileSync(join(root, "build", "tokens.bundled.css"),
  `@import "tailwindcss";\n\n/* Convenience entry. Prefer "@greatamerican/design-system/css"\n   and import tailwindcss yourself. */\n\n` + css);
writeFileSync(join(root, "build", "tokens.js"), js);
console.log("wrote build/tokens.css, build/tokens.bundled.css and build/tokens.js");
