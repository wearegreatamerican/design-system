# Icon

The made-in-USA icon. **SVG is canonical**, same as the logo.

## Sources are tight-cropped

**Source SVGs are tight-cropped to the mark: no padding in the viewBox.** All
padding comes from the generator, declared per output as `pad` in `tokens.json`.

Padding baked into a source compounds with generated padding invisibly — the file
looks right on its own and every render made from it is wrong, with nothing
reporting a problem. `npm run build` prints each source's viewBox and aspect ratio
so a padded source is visible in the log.

This matters more for the icon than for the logo, because the icon renders at
**16px**. A source carrying even a little slack loses a disproportionate share of
the mark at favicon sizes.

## Clear space is not padding

**Clear space** is a brand rule governing placement — the minimum distance between
the icon and anything else, in any medium, relative to the mark. It lives in
`assets.icon.clearSpace` as a `unit` and a `multiple`, **both null until measured
against real artwork.**

**Padding** is transparent pixels baked into a generated PNG, declared per output
as `pad`, approximating clear space for files dropped into a layout by someone who
has not read this.

The icon's raster outputs use **`pad: 0` deliberately.** Favicons and touch icons
are meant to read edge-to-edge, and at 16px even 12% padding costs roughly a fifth
of the mark. Zero padding in the file does not mean zero clear space in use — the
placement rule still applies wherever the icon is set beside type or a claim.

## The four treatments

| Suffix | Colours | Use |
|---|---|---|
| *(none)* | navy | Full colour. The default. |
| `-sand` | sand | Reversed. Light on dark, in full-colour contexts |
| `-white` | paper `#FFFFFF` | Reversed, for black-and-white documents only |
| `-black` | `#000000` | Single colour |

**Navy is the full-colour treatment.** That is not a placeholder or a fallback —
the icon is monochrome by design, so there is no separate two-colour version and
nothing is missing. This is the one way the icon differs from the logo, which has
five treatments because its default combines navy and cherry.

There is deliberately no `-navy` file. An unsuffixed name already resolves to the
navy treatment, and two filenames for one treatment is one too many.

### Sand versus white

As with the logo: **`-sand` is the reversed treatment for full-colour contexts**
(on navy or ink), and **`-white` is only for black-and-white documents**. They are
not interchangeable, and sand is the more common of the two.

## Stylized, not literal

The mark is a **stylized flag in brand colours, not a literal US flag**, and that
is a deliberate choice rather than a simplification.

A literal flag would have to carry Old Glory Red `#B31942` and Old Glory Blue
`#0A3161`. Neither is in the palette, both are close enough to `cherry` and `navy`
to read as mistakes rather than intent, and using them would require a documented
colour exemption — a permanent hole in the palette rules maintained for one
asset.

The stylized mark needs no exemption. It is drawn in navy and validates against
the ordinary treatment rules like everything else.

## It forms part of a claim

The icon usually sits beside a made-in-USA statement, which means **it is read as
part of that claim, not as decoration.** Where it appears alongside a product,
the claim it implies has to be true for that product.

Treat placement as a copy decision, not a layout one. If you would not write the
words, do not place the icon.

## Validation

`npm run build` checks every SVG here against its treatment's allowed colours,
resolved from the filename suffix, defaulting to navy when there is no suffix.
Allowed colours come from `tokens.json` under `assets.treatments`.

Minimum sizes in `assets.icon.minSize` are `null` until measured against real
artwork. Leave them null rather than filling in a conventional number — a
plausible guess is harder to correct later than an obvious gap.
