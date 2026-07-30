# Raster

**Everything in this directory is generated. Do not hand-edit any of it.**

```bash
npm run raster
```

That reads `assets.raster` in `tokens.json`, renders each declared PNG from its
SVG source, and writes it to `logo/` or `icon/` according to the output's `dir`.
Edits made by hand are overwritten on the next run — silently, with no warning
and no merge. The file is simply replaced.

This directory sits outside `assets/logo/` and `assets/icon/` on purpose.
Generated output beside artwork is output somebody eventually edits believing it
is the source. `npm run build` fails if it finds a `.png` anywhere under either
source directory.

```
assets/
├── logo/     source SVG only
├── icon/     source SVG only
└── raster/   generated only
    ├── logo/
    └── icon/
```

## Why these are committed

Because **someone should be able to take a PNG straight from a GitHub URL** —
open the file on github.com, hit download, done. No clone, no `npm install`, no
Node, no build step.

That is the whole point. Most people who need the logo as a PNG are not
developers and are not going to install a toolchain to get one. Committing the
output is what makes the repo usable by them.

## Regenerate in the same commit as the source

**If you change an SVG, run `npm run raster` and commit the PNGs in the same
commit.** Not the next one, not later that day.

A source and its raster drifting apart is the exact failure this pipeline exists
to prevent. The build catches a PNG that was never declared; it cannot catch one
that is declared, present, and stale — that check is deliberately about existence
and declaration rather than content, because sharp renders through librsvg and
different librsvg versions emit different bytes for identical input, so comparing
against a fresh render would fail spuriously from machine to machine.

Nothing will tell you the PNGs are out of date. Regenerating is cheap; keep them
in step by habit.

## The `-white` files look empty

They are not broken. Every PNG here renders on a **transparent** background, never
composited onto a colour, so `ga-logo-white-800.png` is white artwork on nothing.
In Finder, on github.com, or in any preview pane with a light backdrop, it will
look like a blank image.

Open it over a dark ground before concluding the render failed. Compositing these
onto white to make the thumbnails legible would defeat the purpose of the file.

The same applies to `icon/ga-icon-white-*.png`.

## Sizes and padding

Declared in `tokens.json` under `assets.raster.outputs` — never in the script,
never by adding a file here. Filenames are `{dir}/{name}-{size}.png`.

| Set | Sizes | Padding |
|---|---|---|
| Logo widths | 400, 800, 1600 | `pad: 0.06` |
| Icon squares | 16, 32, 48, 64, 180, 192, 512 | `pad: 0` |
| `-white` icon squares | 32, 192, 512 | `pad: 0` |

`pad` is a fraction of the longest rendered edge, added on all four sides as
transparent pixels. **Declared sizes are final dimensions including padding** —
the artwork renders into an inner box and the padding is extended around it, so an
output is never larger than declared.

Icons use `pad: 0` deliberately: favicons and touch icons read edge-to-edge, and
at 16px even 12% padding costs roughly a fifth of the mark.

Padding is **not** clear space. Clear space is a placement rule that applies in
any medium and lives in `assets.logo.clearSpace`; this is pixels baked into a file
that cannot enforce a rule. See `../logo/README.md`.

## No `.ico`

sharp cannot write ICO, so none is generated. Modern browsers accept PNG favicons,
which is what the 16, 32 and 48 squares are for.

If a legacy `.ico` is ever genuinely needed it comes from a separate tool and is
committed **by hand as a documented exception** — add it to this README when you
do, because the undeclared-PNG check only inspects `.png` and will neither catch
nor protect it.

## Print

Print masters are not here and are not generated. EPS and PDF need real CMYK
separations and come from the artwork producer. See `../logo/print/.gitkeep`.
