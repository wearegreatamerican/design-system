# Great American Design System

Brand tokens, the written spec, and generated outputs for every surface: the
marketing site, the document pipeline, Claude Design, Figma, and InDesign.

**`tokens.json` is the only place a value is typed.** Everything in `build/` is
generated. `DESIGN-SYSTEM.md` carries prose rules and references tokens by name,
never by value. If a hex appears in two places, one of them is wrong.

---

## Starting a new consumer

```bash
npm i github:wearegreatamerican/design-system#v1.2.0   # pin a tag, never a branch
```

```css
@import "tailwindcss";        /* the framework */
@import "./starwind.css";     /* any UI kit that redefines the same names */
@import "@greatamerican/design-system/css";   /* LAST, so brand tokens win */
```

Import what components render; copy only what needs a fixed URL (favicons,
social cards) and generate those at build time. Rules: **§11 of
[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md#11-consuming-this-system)**. Worked setups:
**[docs/consumers/](docs/consumers/)**.

## Use

**Tailwind v4.** This file does not import the framework. Use
`@greatamerican/design-system/css/bundled` for a single entry that does — not
both.

**Document builds and anything JS.**

```js
import { color, typeMap, page, font, scale, radius, shadow, pxToHalfPt }
  from "@greatamerican/design-system";

const size = pxToHalfPt(11);        // body copy, docx half-points
const navy = color.navy;            // "#1F3A5F"
const family = font.docx.display600; // "Archivo SemiBold"
```

**Claude Design.** Sync from this repo with `/design-sync` in Claude Code, or
upload `tokens.json` and `DESIGN-SYSTEM.md` during setup.

**Figma.** Import `tokens.json` as variables.

## Build

```bash
npm run build     # regenerate build/ from tokens.json
npm run check     # validate only, no writes
```

`build/` is committed. CI fails if it is stale, so run `npm run build` and
commit the result whenever `tokens.json` changes.

## What the build checks

The validator encodes the failure modes this system has actually had:

- A retired value reappearing as a live token
- An alias pointing at a token that does not exist
- A brand entry defining its own hex instead of referencing a token
- Two tokens sharing one value
- Any declared contrast minimum no longer holding
- Two tokens sharing a value inside any namespace, not just colour
- A gradient ramp naming a token that does not exist
- A transactional document declaring motifs or a non-`paper` ground

That last one is the important one. Change a hex and the build tells you which
piece of the interface just stopped being legible, with the ratio.

## Rules for changing things

**Adding a token** is a design decision. Add it to `tokens.json`, give it a real
`use` string, and add a contrast rule if it carries text.

**Changing a brand color** is not a design decision. `navy` and `cherry` are
identity, they come from the logo, and changing either carries trademark,
tooling, and reproduction consequences. See §1 of the spec.

**Retiring a token** means moving it to the `retired` array with a replacement
and a reason. Deleting it outright loses the record of why it went, which is how
values creep back in.

**Never edit `build/` or `assets/raster/`.** Both are regenerated and your change
will vanish.

## Layout

```
tokens.json           the only place a value is typed
DESIGN-SYSTEM.md      the written spec, prose rules; §11 is the consumer contract
scripts/build.mjs     generator and validator, no dependencies
scripts/raster.mjs    PNG generation from SVG (the one script with a dependency)
build/tokens.css      generated: Tailwind @theme + aliases
build/tokens.js       generated: for document builds
assets/fonts/         static font families for document builds — see its README
assets/logo/          logo SVG sources — see its README
assets/icon/          icon SVG sources — see its README
assets/raster/        generated PNGs — see its README
docs/consumers/       worked setups for consuming projects
```
