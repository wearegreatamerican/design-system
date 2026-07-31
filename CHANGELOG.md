# Changelog

All notable changes to this package.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this
project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Consumers pin to a tag, so a version bump is the only way a change reaches
production. **Breaking changes are marked `⚠ BREAKING`** and say what to do about
them. Read those before upgrading; the rest can be skimmed.

Published tags are immutable. A tag is never moved once pushed.

## [1.3.0] — 2026-07-31

### Added

- **`CHANGELOG.md`.** This file.
- **§12 Voice and messaging.** Product naming, line structure, the binding
  terminology list and the closing line. Boilerplate, the one-line descriptor and
  the per-line sentences are marked `TO AUTHOR` and are not yet written.
- **§13 Iconography.** A 24px grid, stroke, corner radius, cap and join rules for
  UI icons, plus matching values in `tokens.json` under a new top-level `icon`
  key. **Stroke and corner radius are `PROVISIONAL`** — they have not been
  measured against real artwork.
- **`lib/waterline.mjs`.** The waterline tile as a framework-agnostic SVG string,
  exported at `@greatamerican/design-system/lib/waterline.mjs`. Throws on any
  scale outside the three legal ones rather than falling back. Consumers wrap it
  in their own framework.
- **`lib/contrast.mjs`.** WCAG luminance and ratio, now shared by the validator
  and the specimen so both report the same number.
- **`npm run specimen`.** Generates `examples/specimen.html` from `tokens.json` —
  swatches, measured contrast, the type map at true size, the motif at all three
  scales, the document registry at true page aspect, and brand Lab/CMYK. Output
  is committed.
- **`assets/photography/`.** Reference frames only, with the reasoning for why a
  photo library does not belong in git. The build warns above 5MB.
- **"Not in this repo"** in `README.md`, recording the boundary.

### Changed

- `package.json` gains `./lib/*` to exports, and ships `lib/`, `examples/` and
  `CHANGELOG.md`.
- Water behaviour (Sheer, Rain, Wave), the `trade partners` terminology rule and
  the standard closing line **moved** from §8 into §12. §8 keeps copy mechanics
  only. Nothing was copied — each has one home.

## [1.2.0] — 2026-07-30

### Added

- **Brand asset trees.** `assets/logo/` and `assets/icon/` hold SVG sources;
  `assets/raster/` holds generated PNGs. SVG is canonical.
- **Ten static font instances** in `assets/fonts/static/`, generated from the
  variable sources with every axis pinned. Every weight is its own family,
  because Word resolves a family name literally and cannot address a weight axis.
  Licences travel with them — OFL for Archivo, Oswald and Nunito Sans, **Apache
  2.0 for Satisfy**.
- **Per-treatment SVG colour validation.** Each SVG is checked against only the
  colours its treatment allows, resolved from the filename suffix, so a `-sand`
  logo carrying cherry fails even though cherry is a valid brand colour.
- **`npm run raster`.** PNG generation from SVG with per-output padding. `sharp`
  is a devDependency and is not part of `prepare`; consumers never build images.
- **Logo revision 1.1.0 artwork.** Navy moved from `#1F4E79` to `#1F3A5F`. Logo
  artwork versions separately from the package, under `assets.logo.revision`.
- Clear space and minimum size fields, deliberately left `null` until measured.
- Release guard: CI fails a tag push whose name does not match `package.json`.

### Fixed

- Font stacks now name the Variable family first and the static one second.
  Shipping only the static name meant `@fontsource-variable` consumers fell back
  to `ui-sans-serif` silently. The validator now fails if that regresses.
- `--waterline-band` repeats at the 26px tile scale instead of stretching three
  tiles across the element. On a 1600px divider it drew three bars where ~59
  tiles belong. `--waterline-cap` is unchanged and still stretches — the two are
  opposites on purpose.

## [1.1.0] — 2026-07-30

### Added

- **Type scale, radius, shadow and motion namespaces** — `--text-*`,
  `--leading-*`, `--tracking-*`, `--radius-*`, `--shadow-*`, `--ease-*`. Every
  prefix is a real Tailwind v4 namespace.
- **Variable font family names** in `font.stack`: `"Archivo Variable"` first,
  `"Archivo"` second.
- **`@greatamerican/design-system/css/bundled`** — a single entry that imports
  the framework, for consumers who want one. Do not use it and `/css` together.

### Changed

- ⚠ **BREAKING — `tokens.css` no longer imports Tailwind.** Import `tailwindcss`
  yourself, then this file, or switch to the bundled entry. A consumer relying on
  the old behaviour gets an unstyled build.
- ⚠ **BREAKING — `--radius-2xl` dropped.** It duplicated `--radius-xl` at 20px.
  **Convert `rounded-2xl` to `rounded-xl`.** Left alone, Tailwind's own 16px
  default applies silently — nothing errors, the corners are just wrong.
- Back-compat shadow aliases `card`, `photo` and `menu` were not carried into the
  package; they duplicated `sm`, `lg` and `lg`.

## [1.0.0] — 2026-07-30

### Added

- **19 colour tokens** across structure, neutral, accent and water ramps, each
  with a `use` string, and role aliases that point at tokens rather than values.
- **Brand colour layer** — `navy` and `cherry` with Lab (D50) and FOGRA39L coated
  CMYK, including round-trip ΔE. Brand entries reference a token and never carry
  their own hex.
- **Type map** — every element with its family, weight, size, casing and figures.
- **Page geometry** — US Letter at 96ppi, in px and twips, with the half-inch
  margin and the reasoning for it.
- **Document registry** — eleven document types, each declaring class, ground,
  motifs, density, furniture and type roles.
- **Validator** covering the failure modes this system has actually had: retired
  values reappearing, aliases pointing at nothing, brand entries carrying their
  own hex, duplicate values within a namespace, declared contrast minimums no
  longer holding, and transactional documents declaring motifs or a non-`paper`
  ground.

[1.3.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.3.0
[1.2.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.2.0
[1.1.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.1.0
[1.0.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.0.0
