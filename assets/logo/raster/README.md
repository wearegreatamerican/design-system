# Raster

**Every PNG in this directory is generated. Do not hand-edit anything here.**

```bash
npm run raster
```

That reads `assets.raster` in `tokens.json`, renders each declared PNG from its
SVG source, and writes the result here. Edits made by hand are silently
overwritten the next time it runs — there is no warning and no merge, the file is
simply replaced.

The output is committed so that someone who needs a logo PNG can take one from
the repo without cloning, installing and building.

## Changing what gets generated

Sizes and sources are declared in `tokens.json` under `assets.raster.outputs`,
never in the script and never by adding a file here. Filenames are
`{name}-{size}.png` — `ga-logo-800.png`, `ga-icon-32.png`.

`npm run build` fails if it finds a PNG here that is not declared:

```
assets/logo/raster/stray.png is not declared in assets.raster.outputs.
It was placed by hand, so `npm run raster` does not maintain it and it will
drift. Declare it there or delete it
```

That check is deliberately about **existence and declaration, not content.**
sharp renders through librsvg, and different librsvg versions produce different
bytes for identical input, so byte-comparing a committed PNG against a fresh
render would fail spuriously from one machine to the next. An undeclared file is
caught; a stale one is not, which is why regenerating is cheap and manual edits
are banned rather than merely discouraged.

## The `-white` files look empty

They are not broken. Every PNG here is rendered on a **transparent** background,
never composited onto a colour, so `ga-logo-white-800.png` is white artwork on
nothing. In Finder, a file browser or any preview pane with a white or light
backdrop it will look like a blank image.

Open it over a dark ground before concluding the render failed. Compositing them
onto white to make the thumbnails legible would defeat the point of the file.

Same applies to `ga-icon-white-*.png`.

## Sizes

| Set | Sizes | For |
|---|---|---|
| Logo widths | 400, 800, 1600 | 400 an email signature, 800 general screen use, 1600 print-adjacent placement |
| Icon squares | 16, 32, 48, 64, 180, 192, 512 | 16/32/48 favicon, 64 general, 180 apple-touch-icon, 192 Android, 512 PWA install |
| `-white` icon squares | 32, 192, 512 | the reversed subset that actually gets used |

Widths preserve aspect ratio. Squares are rendered to exact dimensions with the
artwork contained inside them, so nothing is cropped.

## No `.ico`

sharp cannot write ICO, so none is generated. Modern browsers accept PNG
favicons, which is what the 16/32/48 squares are for.

If a legacy `.ico` is ever genuinely needed, it comes from a separate tool and is
committed here **by hand as a documented exception** — add it to this README when
you do, because the build's undeclared-PNG check only looks at `.png` and will
not catch or protect it.

## Print

Print masters are **not** here and are not generated. EPS and PDF need real CMYK
separations and come from the artwork producer. See `../print/.gitkeep` and
`../README.md`.
