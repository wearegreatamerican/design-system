// The waterline tile, as a framework-agnostic SVG string.
//
// This is here rather than in a consumer because the motif carries a RULE, not just
// values: §5 of DESIGN-SYSTEM.md says the tile appears at exactly three scales and no
// others, and runs dark to light and never reversed. A rule enforced in one consumer
// is a rule the next consumer does not have. Framework components stay downstream —
// an Astro component cannot serve Next.js or Liquid, but a string can.

import { motif, color } from "../build/tokens.js";

/** The three legal scales, read from the token file rather than restated here. */
const SCALES = Object.keys(motif.tile).filter((k) => k !== "unit");

/**
 * Build the waterline tile as an SVG string.
 *
 * @param {object}  opts
 * @param {string}  opts.scale   one of: eyebrow | cardCap | divider
 * @param {string}  opts.ground  colour token showing between tiles, default "sand"
 * @returns {string} a self-contained, decorative SVG element
 */
export function waterline({ scale, ground = "sand" } = {}) {
  if (!SCALES.includes(scale)) {
    throw new Error(
      `waterline: unknown scale ${JSON.stringify(scale)}. `
      + `Legal scales are ${SCALES.join(", ")} — the tile appears at exactly three `
      + `scales and no others (DESIGN-SYSTEM.md §5). No fallback is applied, because a `
      + `silently resized motif is worse than a build that stops.`,
    );
  }
  if (!color[ground]) {
    throw new Error(
      `waterline: unknown ground token ${JSON.stringify(ground)}. `
      + `Grounds are colour tokens — try one of: ${Object.keys(color).join(", ")}.`,
    );
  }

  const size = motif.tile[scale];
  // The separator width is the band gradient's declared gap, so the SVG and the CSS
  // band agree on the rhythm rather than each carrying its own number.
  const gap = parseFloat(motif.gradient.band.gap);
  const ramp = motif.tileRamp;          // aqua -> aqua-lt -> aqua-pale, dark to light
  const w = ramp.length * size + (ramp.length - 1) * gap;

  // Ground is painted first and shows through the gaps; tiles sit on top. This is one
  // tile unit, not a repeating band — the repeating form is --waterline-band in CSS.
  const tiles = ramp
    .map((token, i) =>
      `<rect x="${i * (size + gap)}" y="0" width="${size}" height="${size}" fill="${color[token]}"/>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${size}" `
    + `viewBox="0 0 ${w} ${size}" aria-hidden="true" focusable="false">`
    + `<rect width="${w}" height="${size}" fill="${color[ground]}"/>${tiles}</svg>`;
}

/** The legal scales, for a consumer that wants to enumerate rather than guess. */
export const scales = [...SCALES];
