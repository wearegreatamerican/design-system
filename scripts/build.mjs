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

// duplicate values
const seen = new Map();
for (const [n, t] of Object.entries(T.color)) {
  const k = t.value.toUpperCase();
  if (seen.has(k)) errors.push(`"${n}" and "${seen.get(k)}" share the value ${t.value}`);
  seen.set(k, n);
}

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

let css = `@import "tailwindcss";\n\n`;
css += `/* GENERATED FROM tokens.json — DO NOT EDIT BY HAND.\n   Run \`npm run build\`. Prose rules live in ${T.meta.spec}. */\n\n@theme static {\n`;
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
for (const [n, v] of Object.entries(T.motif.tile)) {
  if (n === "unit") continue;
  const key = { eyebrow: "tile-eyebrow", cardCap: "tile-card-cap", divider: "tile-divider" }[n];
  css += `  ${pad(`--${key}:`, 22)}${v}px;\n`;
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
  + `/** px at 96ppi -> docx half-points */\nexport const pxToHalfPt = (px) => Math.round((px * 72 / 96) * 2);\n\n`
  + `/** px at 96ppi -> twips */\nexport const pxToTwips = (px) => Math.round(px * 15);\n\n`
  + `export default { color, brand, font, typeMap, page, motif, retired, documents, pxToHalfPt, pxToTwips };\n`;

mkdirSync(join(root, "build"), { recursive: true });
writeFileSync(join(root, "build", "tokens.css"), css);
writeFileSync(join(root, "build", "tokens.js"), js);
console.log("wrote build/tokens.css and build/tokens.js");
