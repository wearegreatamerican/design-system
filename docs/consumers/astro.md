# Astro + Tailwind v4

The marketing site's setup. Procedure only — the rules behind it are
[§11](../../DESIGN-SYSTEM.md#11-consuming-this-system), and where this file and
§11 disagree, §11 is right.

## Install

```bash
npm i github:wearegreatamerican/design-system#v1.2.0
```

Pin the tag. To move versions, change the tag and reinstall:

```bash
npm i github:wearegreatamerican/design-system#v1.3.0
```

**npm caches git dependencies by spec.** If the tag string has not changed, npm
may serve the cached copy and you will be running old code with a new-looking
lockfile. When a reinstall appears to do nothing:

```bash
rm -rf node_modules/@greatamerican package-lock.json
npm cache clean --force
npm install
```

Confirm what you actually got:

```bash
node -p "require('@greatamerican/design-system/tokens.json').meta.version"
```

Web fonts are separate packages and are not shipped by the design system:

```bash
npm i @fontsource-variable/archivo @fontsource-variable/nunito-sans \
      @fontsource-variable/oswald @fontsource/satisfy
```

The variable packages register `"Archivo Variable"`, which is the first family
named in the design system's `font.stack`. The exact package list is declared in
`tokens.json` under `assets.fonts.web`.

## Stylesheet order

One CSS entry point, `src/styles/global.css`. All `@import` rules must lead the
file.

```css
@import '@fontsource-variable/archivo/wght.css';
@import '@fontsource-variable/nunito-sans/wght.css';
@import '@fontsource-variable/oswald/wght.css';
@import '@fontsource/satisfy/400.css';
@import './starwind.css';
@import '@greatamerican/design-system/css';
```

**The design system is imported last, and that is load-bearing.** This is §11's
*"Load the system last"* in its Tailwind-and-Starwind form; the general rule is
there, and what follows is what it costs specifically here.

Tailwind v4 `@theme` values collide by source order — the last declaration of a
variable wins. Starwind redefines the entire `--radius-*` scale as `calc()`
offsets of its own `--radius`, so importing the design system *before* it hands
every radius to the kit: buttons 8px → 10px, chips 3px → 8px, panels 20px → 18px.
No error, no warning; the numbers are just quietly someone else's.

Importing the design system last restores 3 / 8 / 10 / 14 / 20.

This is what §11's *"Never redeclare a token"* looks like when the redeclaration
comes from a dependency rather than from your own stylesheet: the kit is
redeclaring `--radius-*`, and import order is the only lever you have over it.

Two things that look like counter-arguments and are not:

- *"The kit should override the design system."* It should not. The kit supplies
  component behaviour; the brand supplies values.
- *"The design system must come first so the kit's `:root` remap resolves against
  defined tokens."* Custom properties resolve where they are **used**, not where
  they are declared, so `--primary: var(--color-navy)` works in either order.

Starwind pulls in Tailwind itself here, which is why there is no separate
`@import "tailwindcss"`. If your kit does not, import the framework first.

Verify after any change to this block:

```bash
npm run build && grep -o '\--radius-sm:[^;]*' dist/_astro/*.css
# expect 8px
```

## Site-only values stay in the site

`--container-site`, the Starwind semantic remap and layout containers live in
`global.css`, not in the package — they are layout decisions for one site, not
brand values. Point local names at tokens, never at values:

```css
--primary: var(--color-navy);   /* yes */
--primary: #1F3A5F;             /* no — see §11, "Never redeclare a token" */
```

## Rendering artwork

Import it, so Vite hashes and cache-busts it.

```astro
---
import logo from '@greatamerican/design-system/assets/logo/primary/ga-logo.svg';
---
<img src={logo.src} alt="Great American" />
```

For inline SVG — when you need to style the mark with CSS or animate it — use
`?raw`:

```astro
---
import logoMarkup from '@greatamerican/design-system/assets/logo/primary/ga-logo.svg?raw';
---
<span class="logo" set:html={logoMarkup} />
```

`?raw` inlines the file into the HTML. It costs bytes on every page that uses it
and it is not cached separately, so prefer the `src` form unless you actually
need to reach inside the SVG.

Tokens in TypeScript come from the package too:

```ts
import { color, font } from '@greatamerican/design-system';
```

## The files that need copying

Only what something outside the app fetches at a literal path — favicons, touch
icons, social cards. Everything else is imported.

Generate them at build time from the package's own declarations rather than
listing paths by hand, so the copies follow the package when outputs are added or
resized.

`scripts/sync-assets.mjs`:

```js
// Copies the few package assets that need a fixed URL into public/.
// Generated: gitignored, never committed, never hand-edited.
import { mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkgRoot = dirname(require.resolve('@greatamerican/design-system/tokens.json'));
const tokens = require('@greatamerican/design-system/tokens.json');

// Read the declarations rather than hardcoding paths — see §11.
const outputs = tokens.assets.raster.outputs;
const rasterDir = tokens.assets.raster.outputDir;

// Only the sizes something external asks for by URL.
const WANTED = [
  { name: 'ga-icon', size: 32,  as: 'favicon-32.png' },
  { name: 'ga-icon', size: 180, as: 'apple-touch-icon.png' },
  { name: 'ga-icon', size: 512, as: 'icon-512.png' },
  { name: 'ga-logo', size: 1600, as: 'og-logo.png' },
];

rmSync('public/brand', { recursive: true, force: true });
mkdirSync('public/brand', { recursive: true });

for (const want of WANTED) {
  const out = outputs.find((o) => o.name === want.name);
  if (!out) throw new Error(`${want.name} is no longer declared in assets.raster.outputs`);
  const sizes = [...(out.widths ?? []), ...(out.squares ?? [])];
  if (!sizes.includes(want.size)) {
    throw new Error(`${want.name} no longer ships ${want.size}px — declared: ${sizes.join(', ')}`);
  }
  copyFileSync(
    join(pkgRoot, rasterDir, out.dir, `${want.name}-${want.size}.png`),
    join('public/brand', want.as),
  );
}
console.log(`synced ${WANTED.length} brand assets to public/brand/`);
```

The throws matter more than the copies. If the package stops shipping a size, a
hardcoded path leaves a stale file behind and the build stays green; this fails
and names what changed.

Wire it so it cannot be forgotten:

```json
{
  "scripts": {
    "predev": "node scripts/sync-assets.mjs",
    "prebuild": "node scripts/sync-assets.mjs",
    "dev": "astro dev",
    "build": "astro check && astro build"
  }
}
```

Ignore the output:

```gitignore
# generated from @greatamerican/design-system by scripts/sync-assets.mjs
public/brand/
```

Reference the copies by their fixed paths:

```astro
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg" />
<link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
```

## Upgrading

1. Change the tag, reinstall, clear the cache if the version does not move
2. `npm run build` — `prebuild` re-syncs the copies
3. Check the radius grep above if anything in the stylesheet block changed
4. Read the design system's release notes for artwork changes; a new logo
   revision means new copies, which step 2 has already produced

Artwork never changes without a version bump, so there is no upgrade where the
site changes and the tag does not.
