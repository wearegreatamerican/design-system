# Logo

**SVG is canonical.** Raster and print derive from it. If a logo needs to change,
it changes in the SVG and everything else is regenerated — never the other way
round.

## Subdirectories

| Directory | Holds |
|---|---|
| `primary/` | The full lockup: mark plus wordmark. The default logo. |
| `wordmark/` | The name set as type, no mark. |
| `mark/` | The symbol alone — avatars, favicons, stamps. |
| `raster/` | PNG exports derived from the SVGs. Regenerated, never hand-edited. |
| `print/` | EPS and PDF masters in CMYK or spot. |

Each empty directory carries a `.gitkeep` naming the files expected in it.

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
`assets.logo.revision`, currently `1.0.0`, independent of the package version. A
new logo is a new logo revision; it does not imply a token change, and a token
release does not imply new artwork.

### Pending: the navy change

Logo navy is moving from `#1F4E79` to `#1F3A5F`. The current files are the
baseline and the recoloured set lands as **revision 1.1.0**.

Until then this directory holds no artwork, deliberately. `#1F4E79` is a retired
value — `tokens.json` lists it as replaced by `navy`, because `persimmon-lt`
fails contrast on it — so the SVG check would reject the current artwork. That
rejection would be correct, and working around it would defeat the check.
