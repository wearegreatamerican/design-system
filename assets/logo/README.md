# Logo

**SVG is canonical.** Raster and print derive from it. If a logo needs to change,
it changes in the SVG and everything else is regenerated — never the other way
round.

## Sources are tight-cropped

**Source SVGs are tight-cropped to the mark: no padding in the viewBox.** All
padding comes from the generator, declared per output as `pad` in `tokens.json`.

Padding baked into a source compounds with generated padding *invisibly*. The
source looks correct opened on its own, every generated PNG comes out with a
margin roughly twice what was asked for, and nothing anywhere reports a problem.

`npm run build` prints each source's viewBox and aspect ratio for this reason. It
does not fail on them — no threshold can tell a padded source from a genuinely
wide lockup — but a ratio that does not match the mark is the signal.

## Clear space is not padding

These are two different numbers and are deliberately kept in separate fields.

**Clear space** is a brand rule: the minimum distance between the logo and
anything else, in any medium, expressed relative to the mark itself. It governs
*placement* — where the logo may sit on a page, a wall, a vehicle. It lives in
`assets.logo.clearSpace` as a `unit` (the reference measure, e.g. the cap-height
of the wordmark) and a `multiple` of it. **Both are null until measured against
real artwork.**

**Padding** is transparent pixels baked into a generated PNG, declared per output
as `pad`. A raster file cannot enforce a placement rule, so padding approximates
clear space for the case where someone drops the file into a layout without
reading any of this.

Do not collapse them into one value. A favicon wants zero padding and still has
clear space; a billboard has clear space and no padding at all, because there is
no file to bake it into.

## Subdirectories

| Directory | Holds |
|---|---|
| `primary/` | The full lockup: mark plus wordmark. The default logo. |
| `wordmark/` | The name set as type, no mark. |
| `mark/` | The symbol alone — avatars, favicons, stamps. |
| `print/` | EPS and PDF masters in CMYK or spot. |

Each empty directory carries a `.gitkeep` naming the files expected in it.

**Generated PNGs are not here.** They live in `../raster/logo/`, outside this
tree, so nothing generated sits beside a source where it could be mistaken for one
and edited. `npm run build` fails if it finds a `.png` anywhere under this
directory.

## The five treatments

| Suffix | Colours | Use |
|---|---|---|
| *(none)* | navy + cherry | Full colour. The default. |
| `-navy` | navy | Single colour on light grounds |
| `-sand` | sand | Reversed. Light on dark, in full-colour contexts |
| `-white` | paper `#FFFFFF` | Reversed, for black-and-white documents only |
| `-black` | `#000000` | Single colour: fax, engraving, embroidery digitising |

### Sand versus white

This is the distinction that gets confused, so it is worth stating flatly:

- **`-sand` is the reversed treatment in a full-colour context** — the logo on a
  navy or ink ground, in a brochure, on the site, in a deck. It is warm, it
  belongs to the neutral ramp, and it sits correctly beside the rest of the
  palette.
- **`-white` is only for documents that are meant to be black and white.** Pure
  `#FFFFFF` on a colour ground reads as a cold hole punched in the layout.

They are **not interchangeable**, and **`-sand` is the more common of the two.**
If you are reaching for `-white` on a coloured ground, you want `-sand`.

## Validation

`npm run build` reads every SVG under `assets/` and checks its colours against
its treatment's allowed set — **not** against the palette as a whole. The
treatment is resolved from the filename suffix, falling back to the default
treatment when there is no suffix.

That per-treatment scoping is the point. Cherry is a perfectly valid brand
colour, so a flat palette check would happily pass a `ga-logo-sand.svg` that
still had cherry in it. This one fails it, and names the treatment:

```
assets/logo/primary/ga-logo-sand.svg is treatment "sand" but uses #A84630,
which that treatment does not allow
```

Allowed colours per treatment live in `tokens.json` under `assets.treatments`,
resolved from colour tokens rather than retyped hexes.

Only SVG is validated. PNG and EPS cannot be, which is a further reason to treat
the SVG as canonical and regenerate the rest.

## Print

EPS and PDF masters come from the artwork producer. They are CMYK or spot, not
the RGB hexes the SVG check reads, so they are outside validation entirely.

Brand CMYK builds — with their FOGRA39L profile and round-trip delta E — are in
`tokens.json` under `brand`. Use those. Do not re-separate RGB artwork to CMYK by
eye.

## Versioning

**Logo revisions version separately from tokens.** The logo carries its own
`assets.logo.revision`, currently `1.1.0`, independent of the package version. A
new logo is a new logo revision; it does not imply a token change, and a token
release does not imply new artwork.

### Revision 1.1.0 — the navy change, complete

Logo navy moved from `#1F4E79` to `#1F3A5F`. The recoloured primary lockup is in
`primary/`, in all five treatments.

`#1F4E79` is a retired value — `tokens.json` lists it as replaced by `navy`,
because `persimmon-lt` fails contrast on it — so the SVG check rejects it
outright. Artwork cannot regress to the old navy without failing the build.

### Still outstanding

`wordmark/` and `mark/` hold no artwork yet, and `print/` masters come from the
artwork producer. None of that blocks the primary lockup, and none of it is a
revision on its own until the files exist.
