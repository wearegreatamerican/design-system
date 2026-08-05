# Changelog

All notable changes to this package.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this
project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Consumers pin to a tag, so a version bump is the only way a change reaches
production. **Breaking changes are marked `⚠ BREAKING`** and say what to do about
them. Read those before upgrading; the rest can be skimmed.

Published tags are immutable. A tag is never moved once pushed.

## [1.9.0] — 2026-08-05

### Added

- **Document provenance in the running footer.** Every generated document now
  answers three questions from any page: what is this, when does it take force,
  and what produced it. Covers answered them once, and covers do not survive a
  document being split, forwarded, or reprinted from page 12.

  | Field | When | Format |
  |---|---|---|
  | **Document version** | every generated document | ISO — `2026-08-05` |
  | **Effective date** | documents that take force on a date | human — `August 15, 2026` |
  | **Catalog tag** | pricing documents only | ISO — `2026-08-05` |
  | **Engine version** | pricing documents only | `v1.0.0` |

  Footer order, effective date first because it is the only field a partner needs
  while quoting:

  ```
  Effective August 15, 2026 · v2026-08-05 · Catalog 2026-08-05 · Engine v1.0.0
  ```

  **The document version is the release date** — there is no separate revision
  number. **Effective date and document version are different facts** and
  routinely differ; a list released on the 5th can take force on the 15th.
  Same-day reissues append a lowercase letter: `v2026-08-05b`.

  Set in the existing Running header, footer role. No new type role.

- **`footer` on every registry entry**, in printed order, so a generator joins
  the array rather than deciding sequence for itself. The build fails on a
  missing footer, an unknown field name, a missing `documentVersion`, or a
  footer in the wrong order.

- **`locked` on the exempt entries.** The Limited Warranty (`Rev 06.2026`), both
  return policies and the RMA form keep `Rev MM.YYYY` until their **next
  substantive revision**. Do not restyle them. Their declared footer is the
  target state, not what they carry today.

### Fixed

- **The warranty, return policy and agreement took force on a date and declared
  no `effective-date` furniture.** That is the defect this standard names,
  already sitting in the registry. Their furniture now declares it, and the build
  checks `furniture` and `footer` against each other in both directions — a
  document declaring one and not the other fails.

## [1.8.0] — 2026-08-04

### Changed

- ⚠ **BREAKING — price lists are collateral, not transactional.** They are left
  behind at dealers, so the artifact is looked at rather than only filed.
  `price-sheet` moves from `class: transactional`, `ground: paper`,
  `motifs: none` to `class: collateral`, `ground: sand`, `motifs: full`, and
  declares `printVariant: true`.

  **A generator that reads the registry will now produce a price sheet on `sand`
  with the full motif set.** If you want the old output, that is the `-print`
  variant: `paper`, no motifs — the treatment a price sheet had as a
  transactional type. Nothing was lost; it moved to the variant.

  Scope is price lists only for now. Warranty, return policy, RMA, quote, spec
  sheet and agreement stay transactional and move individually if they become
  leave-behinds.

- ⚠ **BREAKING — the sign-off sub-line is Satisfy at 20px, in every document
  type.** `Built to be trusted` was Nunito Sans italic at 12px in documents and
  Satisfy on web lockups. The split existed only because Satisfy is display-size
  only and had no small form, so the fix is to size the sign-off up rather than
  bend the rule. Documents and web no longer diverge.

  20px is `--text-lg`. At that size the script's set width matches the 13pt
  lockup above it, so the two read as one block; at 24px it overruns the lockup.

- **The sign-off reserve is 71px, was 63px — and a page carrying it fits 39 data
  rows, not 40.** Measured with the real faces loaded: the block grew from 34.3px
  to 42.1px, which costs five rows at 17.5px instead of four. **If you have built
  against the 40-row ceiling, re-check it.** The derivation was validated against
  the published figures first — 63px and 44 rows reproduce the published 40
  exactly.

  The sub-line stays `cherry` rather than `persimmon`: 20px is under the 24px
  large-text threshold, so it is still small text, and it now sits on `sand`
  where `cherry` measures 5.34 against `persimmon` at 4.00.

- The unresolved `Sign-off qualifier` flag is retired. It recorded that the type
  map said 12px while the prose said 10pt; both were Nunito Sans figures and no
  longer apply.

## [1.7.0] — 2026-08-04

### Added

- **The `-print` document variant** — office printer optimized: white ground, no
  motifs, colours chosen to survive greyscale. Registered as a **variant flag,
  not a document class**, under `documents._printVariant`.

  | | Substitution |
  |---|---|
  | Ground | `sand` → `paper` |
  | `navy`, `cherry` | unchanged — L\* 24 and 43 separate cleanly in greyscale |
  | `aqua`, `persimmon` | replaced — L\* 59 and 51, eight points apart, they muddy |
  | Panel fills | `mortar` fill → `mortar` hairline |
  | Motifs | omitted |

  The aqua/persimmon substitution is **per document, not global**: where those
  two carry meaning the replacement is a design decision, and anything needing
  three distinct values uses pattern or position rather than a third colour.

  **Both versions come from one source**, with the treatment applied at export.
  Two source documents drift the way two copies of a token drift, and you find
  out when a price is right in one and stale in the other.

  **A `-print` variant carries "Office printer optimized" in its running
  footer** — the filename suffix is lost the first time a file is renamed or
  forwarded.

  Which documents get one is answered per document as they are built, and is
  deliberately not recorded.

- **Validation for the variant.** The tokens it names are checked like any other
  token reference, so a renamed or retired colour fails the build instead of
  surfacing as a document exported in the wrong colour. The build also asserts
  the kept pair is further apart in L\* than the replaced pair — the premise the
  whole variant rests on — and that a running footer is declared.

- **§3: colour is never the sole carrier of information.** Pair it with a label,
  an icon or a position. This is what makes the variant possible: a variant can
  replace a colour but cannot recover a distinction only ever carried by one.

- **`DECISIONS.md`**, recording why a rule has the shape it does. Shipped with
  the package.

### Not included

**No web print styles changed.** No `@media print` block, no `printGround`
token, and no change to how a browser prints a page. This is a variant of a
generated document and nothing else.

## [1.6.0] — 2026-08-03

### Changed

- **The channel terminology rule is replaced.** §12 previously said to say "trade
  partners" or "verified trade network" and **never "dealers"**. That was wrong.
  "Dealer" is a specific tier in the channel, not a word to avoid — and the rule
  was unfollowable, since the pricing engine emits a Dealer price, the discount
  ladder measures from dealer list, and `GA-RETURNS-DEALER-01` is a locked
  document.

  §12 Terminology now carries the four-term model:

  | Term | Means |
  |---|---|
  | **Trade partner**, **verified trade network** | The whole network |
  | **Dealer** | The direct-sell tier: pool builders, designers, landscape architects |
  | **Distributor**, **buying group** | The reselling tiers |
  | **National account** | A direct-terms designation, not a tier |

  **Terms follow the entity that places the order and pays Great American.** A
  dealer buying through a distributor is still a verified trade partner but is
  not the customer on that order; a national account buying through a distributor
  gets that channel's terms only. *Trade partner* and *the account we invoice*
  are different sets, and the old rule collapsed them.

  The two prohibitions that remain: never use "dealer" to mean the whole network,
  and never imply a distributor or buying group is a dealer. The original rule
  was reacting to that catch-all error; the fix is precision, not avoidance.

- `CD-system.md` carries the same model, condensed.

### If you applied the old rule

**Check any copy where you replaced "dealer" with "trade partner".** Where the
text meant the direct-sell tier specifically — a homeowner's point of contact, a
signup flow for builders and designers, a "find one near you" link — "trade
partner" is now imprecise in the other direction, because it names the whole
network including distributors the reader cannot buy from.

## [1.5.1] — 2026-08-03

### Changed

- **The flag mark is documented as a brand mark, not an origin claim.** Nothing
  about the artwork changes — this is a wording fix with consequences.

  `assets.icon.note` previously ended *"Usually sits beside a made-in-USA claim,
  so it forms part of that claim,"* and `assets/icon/README.md` carried a section
  headed *"It forms part of a claim."* Read as policy, that made the mark look
  like it carried a sourcing precondition, and a compliance pass on the marketing
  site pulled it from the topbar and footer on exactly that basis.

  The brand owner's ruling (2026-08-03): it is a stylized brand mark, free to
  use, with no sourcing precondition. **Origin claims live in wording** — "Made
  in the U.S.A.", "American-made" — which is what the FTC's Made in USA Labeling
  Rule governs and what a compliance review should suspend. The mark stays.

## [1.5.0] — 2026-07-31

### Added

- **`CD-system.md`** — the Claude Design system block, covering the reasoning,
  typography, all 19 colour tokens with their roles, the motif, surfaces,
  operational design direction and copy rules. Pasted into the Remix chat first,
  with `CD-document-types.md` after it. Named for one system rather than one
  surface: a web/print split in the filename is a fossil, since the spec governs
  every surface.
- **Hex validation for the `CD-*.md` files.** Every 6-digit hex in them must be a
  live token; a retired value fails naming its replacement. The prose stays
  hand-written and the values in it get checked, which is the same guard as the
  SVG treatment scan pointed at prose. All 21 distinct values across both files
  resolve.
- A `README.md` section recording what the CD files are, the order they are
  pasted in, and that they are the recovery record for a system that otherwise
  exists only inside a UI.

### Removed

- **`CD-web-system.md`**, added in 1.4.0. Its WHY block is absorbed into
  `CD-system.md`. If you are upgrading from 1.4.0 and pasted that file into
  Claude Design, replace it with `CD-system.md` — it supersedes it entirely.
- **The surface check guard is gone as a concept.** The original web system block
  instructed Claude Design to refuse document work and defer to a "Print &
  Documents system". The spec header states the opposite — every surface is
  governed here and no separate print system exists — so restoring that file
  as-is would have broken document generation. `CD-system.md` carries no such
  guard and none should be reintroduced.

## [1.4.0] — 2026-07-31

### Added

- **"Where this comes from"** — an unnumbered preface to `DESIGN-SYSTEM.md`,
  before §1. Three sources (the postwar American backyard, the Sarasota School of
  Architecture, roadside Florida), why the two halves need each other, the line
  between borrowing an era's standards and wearing its props, how the reasoning
  shows up in specific decisions already in the system, and how it connects to
  the four values. **Marked `DRAFT` pending Aaron's voice pass.**
- **`CD-web-system.md`.** The short form of the reasoning, to prepend to the
  Claude Design system block. It carries reasoning only and deliberately restates
  no rules. The same block was added to `CD-document-types.md`.
- A line under the README intro pointing at the preface as the place to start.

### Changed

- **§9 Design direction cut to operational rules.** It opened by naming the two
  sources and asserting Sarasota School is modernist rather than traditional;
  both are now the preface's job and were removed rather than duplicated. §9
  keeps horizontal emphasis, flat planes, deep overhangs, restraint, structure
  over ornament, warm directional light, the pastiche and SaaS constraints, and
  the photography direction, and opens with a pointer to the preface.
- §12 now records that the boilerplate and descriptor are written **against** the
  preface rather than independently of it.

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
- **§11 "Load the system last".** Load order decides which values survive, and
  getting it backwards fails silently — a radius two pixels off reads as a
  decision rather than a bug. The README example is framework-neutral; the
  Tailwind and Starwind specifics stay in `docs/consumers/astro.md`.
- **"Not in this repo"** in `README.md`, recording the boundary.

### Fixed

- **`aqua on sand` in §3 was stated as 3.53; it measures 2.96.** No current or
  retired token produces 3.53. It was listed as "large text only", which the real
  figure does not support — 2.96 is under the 3.0 floor — so the verdict is now
  **fill only, never text**. `aqua` is a chip fill; `aqua-lt` is the only aqua
  that carries text, and it does so on dark grounds. Replacing the pairing with
  `aqua on paper` (3.25) was rejected: every paper-grounded document type carries
  no motifs, so that pairing does not arise.
- **The build now checks every ratio the spec states against the tokens.**
  `rules.minContrast` enforces 11 pairs while §3's reference table asserts 16, so
  five figures were unenforced and one had drifted. The table says every figure
  in it is measured; this is what makes that true.

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

[1.9.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.9.0
[1.8.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.8.0
[1.7.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.7.0
[1.6.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.6.0
[1.5.1]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.5.1
[1.5.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.5.0
[1.4.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.4.0
[1.3.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.3.0
[1.2.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.2.0
[1.1.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.1.0
[1.0.0]: https://github.com/wearegreatamerican/design-system/releases/tag/v1.0.0
