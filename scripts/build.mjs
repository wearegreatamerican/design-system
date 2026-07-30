#!/usr/bin/env node
// Great American Design System build.
// Reads tokens.json, writes build/tokens.css and build/tokens.js, and validates.
// No dependencies. Run `node scripts/build.mjs` or `--check` to validate only.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const T = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

// ---------- color math ----------
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

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
dupes("color",  Object.entries(T.color).map(([n, t]) => [n, t.value]));
dupes("radius", plain(T.radius).map(([n, r]) => [n, r.value]));
dupes("shadow", plain(T.shadow));
dupes("text",   plain(T.scale?.text));
dupes("leading", plain(T.scale?.leading));
dupes("tracking", plain(T.scale?.tracking));

// gradient ramps must name real tokens
for (const [n, g] of plain(T.motif?.gradient ?? {}))
  for (const step of g.ramp ?? [])
    if (!T.color[step]) errors.push(`motif.gradient.${n} references unknown token "${step}"`);

if (errors.length) {
  console.error("\nFAILED\n" + errors.map((e) => "  ✗ " + e).join("\n") + "\n");
  process.exit(1);
}
if (warnings.length) console.warn("\n" + warnings.map((w) => "  ! " + w).join("\n") + "\n");
const docCount = Object.keys(T.documents ?? {}).filter((k) => !k.startsWith("_")).length;
console.log(`ok — ${Object.keys(T.color).length} tokens, ${T.rules.minContrast.length} contrast rules hold, ${docCount} document types`);
if (checkOnly) process.exit(0);

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
  + `/** px at 96ppi -> docx half-points */\nexport const pxToHalfPt = (px) => Math.round((px * 72 / 96) * 2);\n\n`
  + `/** px at 96ppi -> twips */\nexport const pxToTwips = (px) => Math.round(px * 15);\n\n`
  + `export default { color, brand, font, typeMap, page, motif, retired, documents, scale, radius, shadow, pxToHalfPt, pxToTwips };\n`;

mkdirSync(join(root, "build"), { recursive: true });
writeFileSync(join(root, "build", "tokens.css"), css);
writeFileSync(join(root, "build", "tokens.bundled.css"),
  `@import "tailwindcss";\n\n/* Convenience entry. Prefer "@greatamerican/design-system/css"\n   and import tailwindcss yourself. */\n\n` + css);
writeFileSync(join(root, "build", "tokens.js"), js);
console.log("wrote build/tokens.css, build/tokens.bundled.css and build/tokens.js");
