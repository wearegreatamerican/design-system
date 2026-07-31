#!/usr/bin/env node
// Generates examples/specimen.html from tokens.json.
//
// Generated rather than hand-made on purpose: a hand-kept examples folder rots quietly,
// and a specimen that has drifted from the tokens is worse than none, because it looks
// authoritative. Everything here is derived — every swatch, every ratio, every type row.
// Run `npm run specimen`, commit the output.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ratio } from "../lib/contrast.mjs";
import { waterline, scales } from "../lib/waterline.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const T = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const plain = (o) => Object.entries(o ?? {}).filter(([k]) => !k.startsWith("_"));

// ---------- 1. colour tokens ----------
const GROUPS = { structure: "Structure", neutral: "Neutral ramp, all warm", accent: "Accent ramp", water: "Water accent" };
const swatches = Object.entries(GROUPS).map(([g, label]) => {
  const rows = Object.entries(T.color).filter(([, t]) => t.group === g).map(([n, t]) => `
      <div class="sw">
        <div class="chip" style="background:${t.value}"></div>
        <div class="meta">
          <b>${esc(n)}</b>
          <code>${t.value}</code>
          <span class="l">L* ${t.l}</span>
          <p>${esc(t.use)}</p>
        </div>
      </div>`).join("");
  return `<h3>${esc(label)}</h3><div class="swatches">${rows}</div>`;
}).join("");

// ---------- 2. contrast pairs, measured here, not copied ----------
const contrastRows = T.rules.minContrast.map((r) => {
  const fg = T.color[r.fg].value, bg = T.color[r.bg].value;
  const got = ratio(fg, bg);
  const pass = got >= r.min;
  // spread last would clobber r.fg/r.bg (token names) with the hexes above
  return { ...r, fgHex: fg, bgHex: bg, got, pass, row: `
      <tr class="${pass ? "pass" : "fail"}">
        <td><span class="dot" style="background:${bg};color:${fg}">Aa</span> ${esc(r.fg)} on ${esc(r.bg)}</td>
        <td class="num">${got.toFixed(2)}</td>
        <td class="num">${r.min}</td>
        <td>${pass ? "PASS" : "FAIL"}</td>
        <td>${esc(r.why)}</td>
      </tr>` };
});
const failures = contrastRows.filter((r) => !r.pass).length;

// ---------- 3. type map, at real size in the real family ----------
const FAMILY = { Archivo: T.font.stack.display, "Nunito Sans": T.font.stack.sans, Oswald: T.font.stack.utility, Satisfy: T.font.stack.script };
const typeRows = T.typeMap.map((r) => {
  const px = r.unit === "pt" ? r.size * 96 / 72 : r.size;
  const style = [
    `font-family:${FAMILY[r.font] ?? "sans-serif"}`,
    `font-weight:${r.weight}`,
    `font-size:${px}px`,
    r.lineHeight ? `line-height:${r.lineHeight}px` : "",
    r.tracking ? `letter-spacing:${typeof r.tracking === "number" ? r.tracking + "px" : r.tracking}` : "",
    r.casing === "uppercase" ? "text-transform:uppercase" : "",
    r.italic ? "font-style:italic" : "",
    r.figures === "tabular" ? "font-variant-numeric:tabular-nums" : "",
  ].filter(Boolean).join(";");
  return `
      <div class="typerow">
        <div class="tlabel">${esc(r.element)}<span>${esc(r.font)} ${r.weight} · ${r.size}${r.unit}${r.casing && r.casing !== "none" ? " · " + esc(r.casing) : ""}</span></div>
        <div class="tsample" style="${esc(style)}">Great American 1954</div>
      </div>${r.flag ? `<p class="flag">⚠ ${esc(r.flag)}</p>` : ""}`;
}).join("");

// ---------- 4. the motif, through the shipped function ----------
const motifRows = scales.map((s) => `
      <div class="motif">
        <div class="tlabel">${esc(s)}<span>${T.motif.tile[s]}px</span></div>
        <div>${waterline({ scale: s })}</div>
      </div>`).join("");

// ---------- 5. document registry at true page aspect ----------
const PAGE_W = 150;
const aspect = T.page.px.height / T.page.px.width;
const docs = plain(T.documents).map(([name, d]) => {
  const ground = T.color[d.ground].value;
  const motifs = d.motifs !== "none";
  const margin = (T.page.px.margin / T.page.px.width) * PAGE_W;
  return `
      <figure class="doc">
        <div class="page" style="width:${PAGE_W}px;height:${PAGE_W * aspect}px;background:${ground}">
          <div class="content" style="inset:${margin}px"></div>
          ${motifs ? `<div class="band">${waterline({ scale: "cardCap", ground: d.ground })}</div>` : ""}
        </div>
        <figcaption>
          <b>${esc(name)}</b>
          <span>${esc(d.class)} · ${esc(d.ground)} · motifs ${esc(d.motifs)}</span>
        </figcaption>
      </figure>`;
}).join("");

// ---------- 6. brand colours, Lab and CMYK ----------
const brand = Object.entries(T.brand).map(([n, b]) => {
  const hex = T.color[b.token].value;
  const c = b.cmyk;
  return `
      <div class="brand">
        <div class="chip lg" style="background:${hex}"></div>
        <div class="meta">
          <b>${esc(n)}</b> <code>${hex}</code>
          <p>Lab (D50) L* ${b.lab_d50.l} · a ${b.lab_d50.a} · b ${b.lab_d50.b}</p>
          <p>CMYK ${c.profile} — C${c.c} M${c.m} Y${c.y} K${c.k} · total ink ${c.totalInk}% · ΔE ${c.roundTripDeltaE}</p>
          <p>Pantone ${b.pantone ?? "not established"}</p>
          <p class="note">${esc(b.note)}</p>
        </div>
      </div>`;
}).join("");

// ---------- assemble ----------
const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Great American Design System — specimen ${T.meta.version}</title>
<style>
  :root{--ink:#14202E;--slate:#3A4654;--sand:#F7F4EE;--rule:#D6D0C2;}
  *{box-sizing:border-box}
  body{margin:0;padding:48px 32px 96px;background:var(--sand);color:var(--slate);
       font:16px/1.5 ui-sans-serif,system-ui,sans-serif;max-width:1100px;margin-inline:auto}
  h1{font-size:38px;line-height:1.1;color:var(--ink);margin:0 0 4px}
  h2{font-size:24px;color:var(--ink);margin:56px 0 4px;padding-bottom:8px;border-bottom:2px solid var(--ink)}
  h3{font-size:14px;letter-spacing:.13em;text-transform:uppercase;color:var(--slate);margin:32px 0 12px}
  .sub{color:var(--slate);margin:0 0 8px}
  .gen{font-size:12px;color:#8B8378;margin:0 0 32px}
  .swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
  .sw{display:flex;gap:12px;background:#FFFDF9;border:1px solid var(--rule);border-radius:10px;padding:10px}
  .chip{width:56px;height:56px;border-radius:8px;flex:0 0 auto;border:1px solid rgba(0,0,0,.12)}
  .chip.lg{width:88px;height:88px}
  .meta b{color:var(--ink)} .meta code{font:12px ui-monospace,monospace;margin-left:6px}
  .meta .l{display:block;font-size:12px;color:#8B8378}
  .meta p{margin:4px 0 0;font-size:12px;line-height:1.35}
  table{width:100%;border-collapse:collapse;font-size:14px;background:#FFFDF9;
        border:1px solid var(--rule);border-radius:10px;overflow:hidden}
  th,td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--rule)}
  th{font-size:12px;letter-spacing:.08em;text-transform:uppercase;background:#F7F4EE}
  tr:last-child td{border-bottom:0}
  .num{font-variant-numeric:tabular-nums;text-align:right}
  .pass td:nth-child(4){color:#3F7A46;font-weight:700}
  .fail{background:#FBEAE6} .fail td:nth-child(4){color:#A84630;font-weight:700}
  .dot{display:inline-flex;align-items:center;justify-content:center;width:30px;height:22px;
       border-radius:5px;font-size:12px;font-weight:700;margin-right:8px;vertical-align:middle}
  .typerow{display:grid;grid-template-columns:230px 1fr;gap:20px;align-items:baseline;
           padding:12px 0;border-bottom:1px solid var(--rule)}
  .tlabel{font-size:12px;color:var(--ink);font-weight:700}
  .tlabel span{display:block;font-weight:400;color:#8B8378}
  .tsample{color:var(--ink);overflow:hidden}
  .flag{font-size:12px;color:#A84630;margin:4px 0 0}
  .motif{display:grid;grid-template-columns:230px 1fr;gap:20px;align-items:center;padding:12px 0;
         border-bottom:1px solid var(--rule)}
  .docs{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:20px}
  .doc{margin:0} .doc .page{position:relative;border:1px solid var(--rule);box-shadow:0 2px 4px rgba(92,74,54,.07)}
  .doc .content{position:absolute;border:1px dashed rgba(0,0,0,.16)}
  .doc .band{position:absolute;left:0;right:0;bottom:0;line-height:0}
  .doc figcaption{margin-top:6px;font-size:12px}
  .doc figcaption b{display:block;color:var(--ink)}
  .doc figcaption span{color:#8B8378}
  .brand{display:flex;gap:16px;background:#FFFDF9;border:1px solid var(--rule);border-radius:10px;
         padding:14px;margin-bottom:12px}
  .brand p{margin:3px 0;font-size:12px} .brand .note{color:#8B8378;font-style:italic}
  .banner{background:#FBEAE6;border:1px solid #A84630;border-radius:8px;padding:10px 14px;margin:16px 0;font-size:14px}
  .fontnote{font-size:12px;color:#8B8378;margin:0 0 12px}
</style>
</head><body>

<h1>Great American Design System</h1>
<p class="sub">Specimen for version <b>${T.meta.version}</b> — every value on this page is
generated from <code>tokens.json</code>. Nothing here is typed by hand.</p>
<p class="gen">Regenerate with <code>npm run specimen</code>. If this page and the spec
disagree, this page is right and something upstream drifted.</p>
${failures ? `<div class="banner"><b>${failures} contrast rule${failures === 1 ? "" : "s"} failing.</b>
The build would refuse this token file.</div>` : ""}

<h2>Colour</h2>
${swatches}

<h2>Contrast</h2>
<p class="sub">Every declared minimum in <code>rules.minContrast</code>, measured at generation
time with the same function the validator uses.</p>
<table>
  <thead><tr><th>Pair</th><th class="num">Measured</th><th class="num">Min</th><th>Result</th><th>Why it is declared</th></tr></thead>
  <tbody>${contrastRows.map((r) => r.row).join("")}</tbody>
</table>

<h2>Type</h2>
<p class="fontnote">Rendered at true size in the real families. Faces resolve only where the
brand fonts are installed; elsewhere the metrics are right and the shapes are the fallback.</p>
${typeRows}

<h2>Motif</h2>
<p class="sub">The waterline at all three legal scales, drawn by
<code>lib/waterline.mjs</code> — the same function a consumer calls. Any other scale throws.</p>
${motifRows}

<h2>Documents</h2>
<p class="sub">Every type in the registry at true page aspect
(${T.page.px.width}&times;${T.page.px.height}px, ${T.page.px.margin}px margin), showing its
ground and whether motifs are permitted.</p>
<div class="docs">${docs}</div>

<h2>Brand colour</h2>
<p class="sub">Identity values. Changing either carries trademark, tooling and reproduction
consequences — see §1 of the spec.</p>
${brand}

</body></html>
`;

mkdirSync(join(root, "examples"), { recursive: true });
writeFileSync(join(root, "examples", "specimen.html"), html);

// The console table is the point of running this by hand: it is the drift check.
const w = Math.max(...contrastRows.map((r) => `${r.fg} on ${r.bg}`.length));
console.log(`\nwrote examples/specimen.html — v${T.meta.version}, ${Object.keys(T.color).length} tokens, `
  + `${T.typeMap.length} type rows, ${plain(T.documents).length} document types\n`);
console.log(`  ${"pair".padEnd(w)}  measured   min  result`);
for (const r of contrastRows)
  console.log(`  ${`${r.fg} on ${r.bg}`.padEnd(w)}  ${r.got.toFixed(2).padStart(8)}  ${String(r.min).padStart(4)}  ${r.pass ? "PASS" : "FAIL"}`);
console.log(failures ? `\n  ${failures} FAILING\n` : `\n  all ${contrastRows.length} hold\n`);
