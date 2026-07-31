# Photography

**This directory holds REFERENCE FRAMES ONLY. It is not the photo library.**

A handful of small images that show what the direction looks like, so a
photographer, an agency or a designer can see it rather than read it. Nothing
here is production artwork and nothing here should be placed in a layout.

## Direction

Set by [§9 of DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md#9-design-direction), which
governs. In short:

- **Hard directional light.** Not soft, not diffuse, not wrapped.
- **Deep shadow.** Shadow is structure, not a problem to fill.
- **Strong horizons.** Horizontal emphasis, flat planes — the Sarasota School
  reading of the built environment.
- **The discipline of a mid-century catalog plate.** The product is described,
  squarely and legibly, by someone who expects you to buy it from the picture.

**Never soft dusk-lit lifestyle imagery.** Golden-hour couples on a terrace is
the single most common way this brand gets rendered wrong. It is warm, it is
pleasant, and it is another company.

## Why the photo library is not in git

**It belongs in a DAM or object storage, and this is the note that says so, so
nobody adds a shoot here later.**

Three reasons, and all three hold independently:

1. **Size.** Production frames run tens of megabytes each. A single shoot would
   outweigh everything else in this repo combined.
2. **Git stores binaries badly.** Every version of every image is kept forever,
   in full. A photo replaced ten times is eleven copies in every clone, for
   everyone, permanently — and clone time is paid by people who never touch
   photography.
3. **It versions on the wrong axis.** Photography versions **by product** — a new
   spillway gets new frames — while this repo versions **by system**. Tying them
   together means either shipping a design system release because a product was
   photographed, or holding photography back for a token change. Both are wrong.

The design system governs *how* photography looks. It does not host it.

## Cap

- **Under 500KB per reference frame**
- **No more than a dozen frames**
- **`npm run build` warns if this directory exceeds 5MB total**

The warning is a warning rather than a failure on purpose: the cap is a judgement
about what this repo is for, not a correctness rule, and a hard stop would be the
wrong instrument. If it fires, the answer is almost always that production
artwork has been added here by mistake.
