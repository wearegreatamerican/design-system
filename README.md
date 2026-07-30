# Great American Design System

Brand tokens, the written spec, and generated outputs for every surface: the
marketing site, the document pipeline, Claude Design, Figma, and InDesign.

**`tokens.json` is the only place a value is typed.** Everything in `build/` is
generated. `DESIGN-SYSTEM.md` carries prose rules and references tokens by name,
never by value. If a hex appears in two places, one of them is wrong.

---

## Install

```bash
npm i github:wearegreatamerican/design-system#v1.1.1
```

Pin to a tag. Tracking `main` means a token change lands in production without a
version bump, which is the drift this repo exists to prevent.

## Use

**Tailwind v4.** This file does **not** import the framework. You import
`tailwindcss` first, then this, then anything that overrides against it:

```css
@import "tailwindcss";
@import "@greatamerican/design-system/css";
@import "./starwind.css";
```

Order matters. The design system defines the tokens; a UI-kit stylesheet
overrides against them. Reversed, the kit's defaults win silently.

If you want a single entry that pulls the framework too, use
`@greatamerican/design-system/css/bundled`. Do not use both.

Do not redeclare tokens locally.

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

**Never edit `build/`.** It is regenerated and your change will vanish.

## Layout

```
tokens.json          the only place a value is typed
DESIGN-SYSTEM.md     the written spec, prose rules
scripts/build.mjs    generator and validator, no dependencies
build/tokens.css     generated: Tailwind @theme + aliases
build/tokens.js      generated: for document builds
```
