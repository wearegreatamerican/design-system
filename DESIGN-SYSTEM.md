# Great American Design System

Canonical source. Lives at the root of the design system repo and is published
as `@greatamerican/design-system/spec`.

Every other surface derives from this repo: the Tailwind `@theme` block, Claude
Design, Figma, InDesign, and the docx build scripts. When something changes, it
changes here first.

**Values live in `tokens.json`, not in this file.** This document carries prose
rules and references tokens by name. Where a hex appears here it is
illustrative; `tokens.json` governs, and the build fails if the two disagree.

**Scope: every surface, print included.** Web, collateral, and transactional
documents are all governed here. There is no separate Print & Documents system
to defer to — §6 names the four surfaces and §7 carries page geometry, the type
map, the fit rules, and the row budget. Anything that tells you this system is
web-only, or points documents at another repo, is stale and does not govern.

---

## Where this comes from

> **`DRAFT` — pending Aaron's voice pass.**

Three sources, and the company sits where they meet.

**The postwar American backyard.** In the 1950s the backyard became where the
American dream was actually lived. Not the front porch, not the parlour. The
back. A pool, a patio, the family outside on a Saturday. Great American builds
the things that go in that space, which makes the backyard the emotional centre
of the brand rather than a setting for it.

It was also a period that believed a family's position could change inside a
single generation, through work and through making things well. That belief is
the reason the era still resonates, and it is the part worth carrying forward.

**The Sarasota School of Architecture.** Postwar Florida modernism — Rudolph,
Twitchell, Lundy. Built for the climate it stood in rather than imported from
somewhere colder. Deep overhangs for shade, cross ventilation, flat planes,
horizontal emphasis, structure doing the work instead of ornament, indoor and
outdoor treated as one space. The honest local vernacular for a Florida
manufacturer, not a borrowed style. Great American was founded in Florida and is
still headquartered here.

**Roadside Florida.** Motels, marquees, the drive down. Optimism rendered in
signage, by people who believed the future was arriving.

**Why the two halves need each other.** Americana supplies warmth, confidence
and optimism. Sarasota School supplies restraint, discipline and structure.
Alone, Americana becomes kitsch and Sarasota becomes cold. The blend is why this
system runs a warm neutral ramp and hard directional light rather than soft
nostalgia or clinical modernism.

**Forward, not backward.** This is not a period costume and not a re-enactment.
What is borrowed is the optimism and the standard of making, applied to work
happening now. The Sarasota half carries most of that weight, because it was
forward-looking modernism rather than traditionalism — those architects were
building what came next, not preserving what came before.

Practically, that is the line between a brand and a theme restaurant. Reach for
the era's confidence and its craft; never its props. The moment a decision is
made because it looks fifties rather than because it is right, the system has
failed.

**How it shows up.** The reasoning is visible in the decisions:

- The neutral ramp is named for coastal Florida construction materials — paper,
  shell, sand, mortar, tabby, aggregate — rather than abstract greys, because
  the materials are the reference.
- Photography runs hard directional light and deep shadow because that is Florida
  sun, not studio softness.
- Horizontal emphasis recurs — the overhang, the horizon, the waterline —
  because it is the Sarasota School's defining move.
- Quiet mode on product and spec pages is structure over ornament, applied to
  documents.
- Archivo carries display rather than a script or a slab: confident without
  costume.
- Satisfy is rationed to display size in a small number of places. It is the one
  nostalgic gesture in the system, and it works because it is rare.

**How it connects to the values.** The four values are not separate from the
visual system. They are the same beliefs, stated as operating principles:

- *Simple Solutions to Big Ideas* is the Sarasota School's structural clarity.
- *Innovation with Discipline, Spirit with Purpose* is the two halves exactly:
  modernist discipline, Americana spirit.
- *Craftsmanship Without Compromise* is the postwar standard of making.
- *Empowering, Human-Centered Growth* is the backyard, and the belief that
  people's position changes through work.

---

## 1. Brand colors

Two colors. Both come from the logo. Everything in section 3 either derives
from these or serves a structural job. Nothing else is a brand color.

| Brand color | Hex | Lab (D50) | CMYK, FOGRA39 coated | Pantone |
|---|---|---|---|---|
| Brand navy | `#1F3A5F` | L* 23.9  a* 0  b* -26 | C93 M63 Y7 K56 | pending |
| Cherry cola | `#A84630` | L* 43.1  a* 40  b* 34 | C9 M81 Y84 K32 | pending |

Both colors sit inside the coated CMYK gamut. Round-trip error is 1.5 ΔE for
navy and 1.0 for cherry cola, so neither requires a spot ink to reproduce
accurately on a coated sheet.

Both brand colors equal their system tokens exactly. `navy` is brand navy and
`cherry` is cherry cola. There is no divergence between the identity layer and
the working palette, and there should not be one.

**Confirmed in the artwork.** The delivered logo and flag mark are authored in
`#1F3A5F` and `#A84630` exactly, verified from the files' pixel histograms
rather than by eye. The identity and the palette are in step.

Each mark ships in three grounds and no others:

| Ground | Logo | Flag mark |
|---|---|---|
| Light | navy `#1F3A5F` | navy `#1F3A5F` |
| Dark, on web and collateral | shell `#FFFDF9` | shell `#FFFDF9` |
| Dark, inside a `paper` document | white `#FFFFFF` | white `#FFFFFF` |

Shell is the warm reversal and belongs on the sand-grounded surfaces. Against
true white paper it reads cream, so transactional documents take the white
variant instead.

Never recolor a mark; pick the variant for the ground. The stars in the flag are
knockouts and are never filled. An earlier `coquina` variant was authored in
`#F7F4EE`, the value now named `sand`, and is retired.

### Why brand navy is #1F3A5F

The logo previously carried `#1F4E79`. It is being updated to `#1F3A5F` to
match the system value rather than the reverse, because the two navies are not
equally capable as grounds.

| Small text on navy | on `#1F4E79` | on `#1F3A5F` |
|---|---|---|
| `aqua-lt` | 3.67 fails | 4.87 passes |
| `persimmon-lt` | 3.85 fails | 5.11 passes |

`#1F3A5F` sits eight lightness points deeper, and that headroom is what makes
colored small text on a navy ground possible. Adopting the lighter value would
have cost the footer column headings, the topbar, and every colored label on a
dark ground.

The two values sit 9.5 ΔE apart, which is a visible change. Material already
produced in `#1F4E79` will read as a different color beside new material:
signage, product badging, powder coat, vehicle wraps, trade show graphics, and
printed collateral.

### Reproduction values

Hex is a screen instruction. Great American manufactures physical product and
prints partner-facing collateral, so both brand colors need Pantone, CMYK, and
where applicable a coating or powder specification.

The CMYK values above are computed through an ICC transform against the FOGRA39
coated profile, which is the European ISO Coated v2 condition. They are correct
starting values for that condition and nothing else:

- US commercial work typically runs GRACoL 2013 or SWOP. Those values differ and
  have not been computed
- Uncoated stock differs substantially more. Uncoated paper absorbs ink, so both
  colors read lighter and duller and need their own build
- Powder coat, anodizing, and vinyl are separate systems with no relationship to
  CMYK

Pantone is deliberately left pending. Pantone's Lab data is licensed, and a
nearest-match estimate presented as a specification is the exact failure this
section exists to prevent. Hand the Lab values above to the printer and match
against a physical fan deck under D50 lighting.

Lab is the device-independent reference and the value to quote when specifying
either color to any vendor. Note that print uses the D50 illuminant while screen
color math uses D65, so Lab figures quoted elsewhere for these colors may differ
slightly without either being wrong.

Any Pantone or CMYK spec established against the old navy `#1F4E79` is void.

### What is not a brand color

Everything else in the palette is a system decision and may change without
touching brand identity:

- `persimmon` and `persimmon-lt` are cherry cola lightened
- `cherry-dk` is a button hover state
- The full neutral ramp is ground and structure
- All four aqua tones are a product accent, not identity
- `navy-lt`, `navy-pale`, `ink`, and `slate` are structural

A change to a system token is a design decision. A change to a brand color is a
brand decision and carries trademark, tooling, and reproduction consequences.

---

## 2. Principles

One palette across every surface. There is no web palette and no print
palette. The only surface difference is which member of the neutral ramp
serves as the page ground.

Material names are canonical. Functional aliases exist for structural CSS but
never define a value.

When a token exists only because it always has, remove it. Three separate
divergences in this system turned out to be residue rather than intent.

---

## 3. Color

24 tokens. Material names are canonical. Role names live in the alias layer.

### Structure

| Token | Hex | L* | Use |
|---|---|---|---|
| `navy` | `#1F3A5F` | 24.1 | Primary structure: headings, nav, topbar |
| `navy-lt` | `#2B4A73` | 31.0 | Secondary structure |
| `navy-pale` | `#A9B3C0` | 72.5 | Quiet text on dark grounds |
| `ink` | `#14202E` | 11.8 | **Dark ground.** Footer, scrims, caption bars |
| `slate` | `#3A4654` | 28.9 | Body copy |

`ink` is a ground, not a text color. It has zero text usages and three ground
usages. Body text is `slate`, headings are `navy`.

`navy-pale` is navy desaturated and lifted. It is the only cool neutral in the
system, and it is cool on purpose, because it is a tint of the ground it sits
on rather than a member of the warm material ramp.

### Neutral ramp

Material names, one per lightness step. All warm.

| Token | Hex | L* | Use |
|---|---|---|---|
| `paper` | `#FFFFFF` | 100.0 | Document page ground |
| `shell` | `#FFFDF9` | 99.4 | Raised surfaces, cards |
| `sand` | `#F7F4EE` | 96.3 | Web page ground |
| `mortar` | `#E6E0D6` | 89.4 | Hairlines, borders, panels, text on navy |
| `tabby` | `#D6D0C2` | 83.6 | Primary text on dark grounds |
| `aggregate` | `#8B8378` | 55.2 | Coquina stone, texture work |

`mortar` is the line between blocks. `tabby` is the coastal lime-and-oyster-shell
concrete. Both are structural materials, which is why they name structural roles.

### Accent ramp

| Token | Hex | L* | Hue | Use |
|---|---|---|---|---|
| `persimmon-lt` | `#E89A7C` | 70.7 | 17° | Small text on navy |
| `persimmon` | `#C4573F` | 50.6 | 11° | Mid accent, large text |
| `cherry` | `#A84630` | 42.6 | 11° | Eyebrows, rules, button grounds, logo |
| `cherry-dk` | `#933C29` | 37.1 | 11° | Button hover only |

`cherry` is cherry cola red, the logo color, confirmed from the color chart.
Persimmon and persimmon-lt are cherry cola lightened. The accent system was
always built up from the logo color rather than replacing it.

Steps are functional, not a systematic scale. Uneven spacing is expected.

### Water accent

Four tones, because the glyph renders three and the ramp shifts one step
lighter on dark grounds so the deepest tone still reads. Two overlapping
three-tone ramps sharing an endpoint require four values.

| Token | Hex | L* | Use |
|---|---|---|---|
| `aqua` | `#4A9B9B` | 59.2 | Light-ground ramp step 1, chip fills |
| `aqua-lt` | `#6BB5B5` | 69.1 | Light step 2, dark step 1, the only aqua carrying text |
| `aqua-mid` | `#9BCECC` | 78.9 | Dark ramp step 2, decorative only |
| `aqua-pale` | `#CFE4E2` | 89.2 | Both ramps step 3, decorative only |

Light ground: `aqua` → `aqua-lt` → `aqua-pale`
Dark ground: `aqua-lt` → `aqua-mid` → `aqua-pale`

All four hold hue at 180°.

### Semantic

`success` · `warning` · `danger` · `info` are Starwind semantic tokens. Values
are managed in `starwind.css` and are not part of the brand palette. Do not use
them for brand expression.

### Retired

Remove on sight. Do not reintroduce.

| Retired | Replaced by | Reason |
|---|---|---|
| `cream` `#EDE7D6` | `mortar` or `paper` | Off the neutral curve. b* 8.98 against 5.60 for the darker step |
| `#B0322C` | `cherry` `#A84630` | Orphan red. 11.6 ΔE from the logo at the same lightness |
| `topbar-text` `#EAE4D6` | `mortar` | Duplicate. 2.4 ΔE from mortar, below the visible threshold |
| `#143350` | `ink` | Old navy-800, superseded when the footer ground moved to ink |
| `#1F4E79` | `navy` | Old navy-600. persimmon-lt measures 3.85 on it and fails |
| `coral-dk` / `persimmon-dk` | `cherry` | Rename only. Value unchanged and always was the logo color |
| `card` `#FFFDF9` | `shell` | Functional name in a material system |
| `line` `#E6E0D6` | `mortar` | Functional name in a material system |
| `on-navy` | `tabby` | Role name in a material system |
| `on-navy-quiet` | `navy-pale` | Role name in a material system |
| Sheer-in-section glyph | nothing | Removed from the system. Do not reintroduce it, in any section, without an explicit decision to add it back |
| `shell` `#F0EBE0` | `shell` `#FFFDF9` | Old value, 4.1 ΔE from sand |
| `paper` `#FBF8F2` | `paper` `#FFFFFF` | Old value, 2.0 ΔE from shell |
| `#EDE7DC` | `tabby` `#D6D0C2` | Document hairline. 2.5 ΔE from `mortar`, but `mortar` is the panel fill, so the hairline steps down a rung |
| `#EFE9DE` | `mortar` `#E6E0D6` | Document panel and column fill. 3.2 ΔE |
| `#CFC7B9` | `aggregate` `#8B8378` | Document group divider. 3.2 ΔE from `tabby`, but `tabby` is the hairline, and a divider that must read needs the darker rung |
| `#5A6674` | `slate` `#3A4654` | Old ink-body |

### Colour is never the sole carrier of information

**Where colour conveys meaning, pair it with a label, an icon or a position.**
Not to satisfy a rule — because the information has to survive being
photocopied, faxed, printed on a mono laser, or read by someone who does not
separate those hues.

`navy` and `cherry` separate in greyscale at L\* 24 and 43. **`aqua` and
`persimmon` do not**, at L\* 59 and 51 — eight points apart, and they collapse
into each other.

This is what makes the `-print` variant possible at all. A variant can replace a
colour; it cannot recover a distinction that was only ever carried by one. If a
chart, a status or a key depends on aqua-versus-persimmon and nothing else, no
variant rescues it — that has to be fixed in the source. See §7.

### Contrast reference

Computed, WCAG 2.x relative luminance. Every figure in this table is measured.

| Pair | Ratio | |
|---|---|---|
| white on cherry-dk | 7.19 | passes |
| tabby on ink | 10.71 | passes |
| tabby on ink/85 over mortar | 8.58 | passes |
| navy-pale on ink | 7.76 | passes |
| mortar on navy | 8.75 | passes |
| aqua-lt on ink | 6.98 | passes |
| cherry on paper | 5.86 | passes |
| white on cherry | 5.86 | passes |
| cherry on shell | 5.77 | passes |
| cherry on sand | 5.34 | passes |
| persimmon-lt on navy | 5.11 | passes |
| aqua-lt on navy | 4.87 | passes |
| cherry on mortar | 4.46 | large text only |
| persimmon on sand | 4.00 | large text only |
| aqua on sand | 2.96 | fill only, never text |
| aggregate on sand | 3.41 | large text only |
| persimmon on navy | 2.62 | **fails, never use** |
| cherry on navy | 1.96 | **fails, never use** |

Nothing in the accent ramp may sit directly on navy except `persimmon-lt`.

`cherry` on `mortar` measures 4.46 and misses the small-text threshold. Cherry
eyebrows on a mortar panel need to move to `paper` or `shell`, or size up.

`aqua` on `sand` measures 2.96, under the 3.0 floor for large text, so it is a
fill colour and never a text colour. Changing the ground does not rescue it:
`aqua` on `paper` measures 3.25, but every paper-grounded document type carries
no motifs, so that pairing does not arise. `aqua-lt` is the only aqua that
carries text and it does so on dark grounds, where it measures 4.87 on `navy` and
6.98 on `ink`.

`aqua-mid` and `aqua-pale` are decorative only and carry no text anywhere. Both
are `aria-hidden`.

`aggregate` is the ramp value most likely to be reached for as a muted body
color by mistake. At 3.41 on sand it is large or decorative text only. For muted
running copy use `slate`, which measures 8.76 on the same ground.

### The floor applies to text

A ratio is a legibility measure. WCAG sets none for decoration, and the 3:1
non-text floor covers meaningful graphics and interface components, not a line
whose only job is to divide. **A rule, divider, bar, or keyline is not held to a
contrast ratio.**

That carve-out is what lets the navy question resolve cleanly:

| On a navy ground | Value | | |
|---|---|---|---|
| Accent rule, 2px keyline under a table header | `persimmon-lt` | 5.11 | the only accent the ramp permits on navy |
| Quiet hairline, grouping inside a dark panel | `navy-lt` | 1.27 | deliberately near-invisible; grouping, not separation |
| Divider that must read | `navy-pale` | 5.41 | |
| Heavy rule | `mortar` | 8.75 | reads as a near-white line; use sparingly |

`persimmon` and `cherry` stay barred on navy for **shapes as well as text**. That
ban comes from the ramp, not from the contrast floor, so the carve-out does not
reopen it. And since `persimmon-lt` clears 5.11 on navy anyway, the accent rule
never has to lean on the carve-out to justify itself.

### Line weights

Three rungs. Which one is a hairline depends on what it sits on, because a filled
column moves the whole ladder down a step.

| Rung | Token | On `paper` | On a `mortar` panel |
|---|---|---|---|
| Panel and column fill | `mortar` | 1.31 | — |
| Hairline, intra-group row rules | `tabby` | 1.54 | 1.17 |
| Group divider, section break, table outer edge | `aggregate` | 3.74 | 2.85 |

**`tabby` carries structure as well as text.** It is the primary text colour on
dark grounds, and on light grounds it is the hairline rung between `mortar` and
`aggregate`. An earlier draft of this section called it text-only and sent
hairlines to `mortar`; the document layer disproved that, because `mortar` is the
panel fill and a hairline cannot be the same value as the surface under it.

⚠️ **A hairline inside a filled column is faint at every value we have.** `tabby`
on `mortar` measures 1.17 and will not survive a laser printer, and no token sits
between them. Where an intra-group rule has to read inside a filled column,
either step it to `aggregate` or separate it by weight instead of colour — 1px
against 2px. Do not solve it by removing the fill.

---

## 4. Typography

Three roles plus a script. Every text element belongs to exactly one.

| Role | Face | Weights | Casing | Use |
|---|---|---|---|---|
| Display | Archivo | 600, 800 | Set by the composition | Headings, cover titles, hero |
| Body | Nunito Sans | 400, 600, 700 | Sentence case | All running copy, table cells |
| Utility | Oswald | 400, 500, 600 | UPPERCASE, wide tracking | Eyebrows, labels, table heads, running headers and footers |
| Script | Satisfy | 400 | Sentence case, never uppercase | Display size only, approved locations |

**Casing is a property of the role, and the utility row is normative.** Every
member of the utility role is uppercase with wide tracking, without exception:
eyebrows, buttons, table column heads, segment-key labels, page numbers, callout
labels, running headers and footers. This holds in documents exactly as it does
on the web — **document tables included**, which is where it was previously left
to guesswork. Display casing is the one that varies: uppercase for the hero and
cover titles, title or sentence case elsewhere.

**Weight is chosen by context, not by heading level.**

| Context | Weight |
|---|---|
| Heading sitting directly on a page or section ground | 800 |
| Heading inside a card, panel, or other container | 600 |

On the web that puts the hero `h1`, section headings, the CTA band headline and
the footer wordmark at 800, and card titles, product names, FAQ questions and
menu headings at 600. Documents are the exception and follow the §7 type map,
where 800 is the cover masthead only and every other heading is 600, because at
document sizes 800 reads shouty.

Eyebrows are **Oswald 500** at 14px / `0.2em`. Smaller, the tracking closes up
and the label stops reading as a label.

The three Oswald weights are assigned, so a label never has to be guessed at:

| Weight | Use |
|---|---|
| 400 | Running headers and footers, which should recede |
| 500 | Eyebrows, buttons, column heads, table labels |
| 600 | Part numbers, where the label must outweigh the copy around it |

Oswald is never used for a heading. It moved from the heading role to the
utility role during the website work and did not move back.

Eyebrows are always Oswald, without exception.

Satisfy stays flat and trailing. Never angled. Never leading a composition.

**The document sign-off is a sanctioned Satisfy location.** `Built to be trusted`
is Satisfy in every document type, at 20px — see §7. It is display size, so it
does not bend the rule above; the sign-off was sized up to meet it rather than
Satisfy being shrunk to fit a document.

No fourth typeface.

**Archivo Black is a different family from Archivo, and it is not in the system.**
Where a comp specifies it, the sanctioned substitute is **Archivo 800**, which is
the display role's existing heavy weight. Adopting Archivo Black would add a
fifth family for one weight the system already carries, and it would not survive
the docx build, where the family name has to resolve exactly.

### Document font instances

Google Fonts publishes Archivo only as a variable font whose default instance
self-identifies as `Archivo SemiBold`. Embedding it directly gives 600
everywhere with no route to 400 or 800.

Static instances are required for docx, generated with `wdth` pinned to 100:

| Family string | usWeightClass |
|---|---|
| `Archivo` | 400 |
| `Archivo SemiBold` | 600 |
| `Archivo ExtraBold` | 800 |

**Never set `bold: true` on an Archivo run.** The weight lives in the family
name. Setting the bold flag on top of SemiBold makes Word synthesize fake bold.

Fontsource ships woff and woff2 only and cannot be used for docx embedding. It
remains correct for the website.

---

## 5. Motif

The waterline tile appears at exactly three scales and no others:

| Scale | Context |
|---|---|
| 14px | Eyebrow glyph |
| 5px | Product card cap |
| 26px | Section divider |

Tiles run **`aqua` → `aqua-lt` → `aqua-pale`, left to right**: dark to light,
never reversed. This holds at all three scales.

**The 14px glyph never stands alone.** It is a word-level highlight, so it sits
beside a word or sentence — on the eyebrow's own line, not stacked above it.
When the motif needs to stand by itself, use the 5px cap or the 26px band.

Sunburst appears once per page maximum, in the hero only.

Coquina speckle is a web background texture. Never in a document.

**Quiet surfaces** — product, spec and transactional — carry no decorative
motifs of any kind and take the `paper` ground. Quiet is a property of the
surface rather than a mode laid over it; see the §6 table.

**Transactional documents carry no decorative motifs.** Price sheets, warranties,
return policies, RMA forms, quotes, spec sheets and agreements are designed on
`paper` with no speckle, no sunburst, no star field, no waterline band, and no
page-edge tint. A tinted ground and a star band are toner spent on a page someone
wanted the text from.

This is a property of those documents, not a rule about printing. Collateral —
flyers, line sheets, brochures, catalog covers — keeps the full motif set and may
take a tinted ground, and keeps it when printed. See §6.

---

## 6. Surfaces

The only difference between surfaces is the page ground.

| Surface | Ground | Panels | Decoration |
|---|---|---|---|
| Web, marketing | `sand` | `shell` cards, `mortar` hairlines | full |
| Web, product and spec | `paper` | `mortar` panels, rules over cards | quiet |
| Transactional documents | `paper` | `mortar` shading | quiet |
| Collateral | `sand` | `shell`, `mortar` | full |

Quiet is a property of the surface, not a separate mode: product, spec and
transactional surfaces are quiet by definition.

**Printing is not a transformation.** A page prints as it displays. Ground and
decoration are decided when the artifact is designed, never applied or stripped
on the way to a printer. A price sheet has a `paper` ground because it was
designed on `paper`; a flyer keeps its motifs when printed because a flyer is a
decorated artifact. Any print-specific CSS should be mechanical only — page
break control, hiding nav chrome — and must not alter ground, palette, or
decoration.

**Transactional** covers warranty, return policies, RMA, agreements, quotes, spec
sheets. White ground always. No tint, no texture, no full bleed. These are
printed on distributor office equipment, scanned, and filed.

**Collateral** covers brochures, line sheets, trade one-pagers, catalog covers,
and **price lists**. Commercially printed, so a tinted ground is fine.

**Price lists moved from transactional to collateral** (2026-08-04). They are
left behind at dealers, which makes the artifact something looked at rather than
only filed. The download is the `-print` variant — `paper`, no motifs — which is
the treatment a price sheet had as a transactional type, so nothing was lost. It
moved to the variant. See §7.

`sand` against white measures 1.1:1 and will not survive a laser printer. For
document panels that must read, use `mortar` at 1.31:1.

**Switching surface is one decision, not a restyle.** Transactional pages carry
`quiet` on the page root: the ground is `paper`, there is no speckle texture, and
decoration is absent. Everything else — type, spacing, structure, hairlines,
cards — is unchanged.

---

## 7. Documents

### Page geometry

US Letter with **half inch margins**. 816 × 1056 px at 96 ppi, 48 px margins,
giving a **720 × 960 content box**. Page 12240 × 15840 twips in the docx build,
margins 720 twips.

The margin is half an inch because a reference table does not fit at one inch. At
one inch the content box is 624 × 864 and a 36-row price sheet with a masthead, a
column header and three footnotes overruns it. Reference tables, price lists and
spec matrices are the documents that make this bind, and they are why the
geometry is what it is.

**There is no 11pt floor.** An earlier draft of this section set one and it was
wrong: it contradicted the approved comps and the shipped sheets, and it was the
reason those sheets kept being rebuilt at the wrong size. Document body copy is
**11px**, and the type map below is the authority.

The page is quiet by definition (§6). A document surface carries no speckle, no
sunburst, no star field, no waterline band, and no page-edge tint. If an
implementation requires a separate `quiet` flag alongside its document class,
that is an implementation detail; the surface is quiet either way, and printing
enforces it regardless.

### The fit guard

**The most common document failure is content spilling into the bottom margin
while every automated check reports clean.** The trap: on a `border-box` element
`clientHeight` already includes the padding, so `scrollHeight === clientHeight`
stays true while content sits inside the margin it was supposed to stay out of.
The page looks fine to code and wrong on paper.

Measure the deepest descendant's bottom against the content edge instead:

```js
const cs = getComputedStyle(page);
const limit = page.clientHeight - parseFloat(cs.paddingBottom);
const deepest = Math.max(
  ...[...page.querySelectorAll('*')].map((el) => el.offsetTop + el.offsetHeight),
);
const overflows = deepest > limit;
```

### Rows per page

So an author can tell whether a table fits **before** building it.

Content box 960px tall. A **data row is 17.5px**, rule included, and a column
header row is 22px.

| Reserve | Height |
|---|---|
| Masthead block — eyebrow, title, waterline | 135 |
| Column header row | 22 |
| Three footnotes at 9.5px | 70 |
| Page footer with its rule | 24 |
| Sign-off block, where present | 71 |

| Page | Max data rows |
|---|---|
| Table only, no sign-off | **44** |
| Table with the sign-off block | **39** |

Those two are measured, not derived — rows were cloned into a built sheet until
the fit guard broke. Treat them as ceilings for a page carrying the full masthead
and three footnotes; a lighter masthead buys more.

**The row must measure 17.5px including its rule.** Cells are border-box, so the
1px rule comes out of that budget: a 16.5px line box plus a 1px border. Setting
the line box itself to 17.5 makes the row 18.5 and it renders 19.

⚠️ **Under `border-collapse: collapse` a 2px keyline below the header row is
shared with the first data row**, which absorbs half of it and measures 18px while
every other row measures 17.5. Draw that keyline as an inset shadow on the header
cells instead. Shadows do not participate in border collapsing and cost no layout.

### Type map

Sizes are in px at 96 ppi, which is what the page geometry is expressed in and
what the comps are drawn in. Do not round them to a type scale or snap them to a
4/8px grid — the odd values are measured, not approximations.

| Element | Font | Weight | Size | Casing |
|---|---|---|---|---|
| Cover masthead | Archivo | 800 | 35.9px, line 38, tracking 1.14 | UPPERCASE |
| Section heading | Archivo | 600 | 22px | UPPERCASE |
| Continuation masthead | Archivo | 600 | 20px | UPPERCASE |
| Segment diagram | Oswald | 700 | 34px | — |
| Worked-example part number | Oswald | 700 | 16px | — |
| Body-size group label | Oswald | 700 | 14px | — |
| Subsection label | Oswald | 500 | 13px | UPPERCASE |
| Segment-key label | Oswald | 700 / 500 | 12px | UPPERCASE |
| Part number, table body | Oswald | 700 | 10.5px | as written |
| Table column head | Oswald | 500 | 10px | UPPERCASE, wide tracking |
| Running header, footer, page number | Oswald | 500 | 9px | UPPERCASE |
| Secondary copy, key options | Nunito Sans | 400 | 12px | sentence |
| Price | Nunito Sans | 700 | 11px, tabular figures | — |
| Body, table cell, running copy | Nunito Sans | 400 | 11px | sentence |
| Footnote | Nunito Sans | 400 | 9.5px | sentence |
| Sign-off `Great American.` | Archivo | 600 | 13pt | UPPERCASE |
| Sign-off qualifier `Built to be trusted` | Satisfy | 400 | 20px | sentence |

**800 is the cover masthead only.** Continuation mastheads and section headings
are 600; at these sizes 800 reads shouty.

**Load the 800 weight explicitly.** Google serves Archivo as a variable font whose
default instance is SemiBold, so an unweighted load renders the masthead at 600
with no error and no visible fallback — it just looks slightly wrong. Read the
computed `fontWeight` back rather than trusting the stylesheet.

**The sign-off sub-line is `Built to be trusted`, set in Satisfy, in every
document type.** Documents and web lockups no longer diverge — the earlier split,
where documents took Nunito Sans italic because Satisfy had no small form, is
gone. Satisfy is display-size only, so the document sign-off is set at **20px**
rather than shrunk to fit.

Flat and trailing, tucked under the wordmark so the two read as one lockup.

**Why 20px.** It is the type scale's `--text-lg`, and at that size the script's
set width matches the 13pt lockup above it, so the block reads as one unit. At
24px the script overruns the lockup and stops being a sub-line.

**It is still small text for contrast purposes.** 20px is under the 24px large-
text threshold, so the sub-line runs in `cherry`, not `persimmon`, which fails at
that size. On collateral grounds this matters: `cherry` on `sand` measures 5.34
and `persimmon` on `sand` measures 4.00.

**Colour follows the ground, not the surface.** On light grounds the sub-line is
`cherry`. On dark grounds it is `persimmon-lt`: `cherry` measures 2.81 on `ink`
and 1.96 on `navy`, and §3 bans it on navy outright. `persimmon-lt` measures 7.32
on `ink` and 5.11 on `navy`.

**Placement.** The sign-off closes the document, so it appears **on the last page
only** — never repeated as running furniture. It sits at the foot of the content
box, **above** the footer rule and any running footer, left-aligned to the content
edge.

**Reserve 71px** for the block: 13pt lockup, the 20px Satisfy qualifier beneath
it, and the space between. This was 63px when the qualifier was 10pt Nunito Sans
italic; the block measures 42.1px against the old 34.3px with the real faces
loaded, and the reserve moved with it. That is also why a page carrying the
sign-off now fits **39** data rows rather than 40 — the block costs five rows at
17.5px instead of four. That reserve is not optional bookkeeping — it is the
difference between fitting and overrunning on any page already near its row
ceiling, which is why it appears in the row budget above. Do not let it collide
with the last data row; if the table reaches the ceiling, the sign-off moves to
the following page rather than tightening the rows to make room.

### Named styles

The same style names carry across all four surfaces so mapping is mechanical
rather than interpretive:

`Cover Title` · `Heading 1` · `Heading 2` · `Body` · `Table Head` ·
`Running Header` · `Sign-off`

Use these names in the Claude Design system, the exported HTML, Figma text
styles, InDesign paragraph styles, and the docx build.

### Export handoff

Documents are concepted in Claude Design, then exported to Figma or InDesign
for completion. The Claude Design output is a handoff, not an artifact.

- Live text only. No outlined text, no text baked into images, no icon fonts.
- Flat markup. Deep wrapper nesting imports as junk frame trees.
- Fixed page geometry per above, never arbitrary web widths.

Archivo, Nunito Sans, Oswald, and Satisfy are all Google Fonts and resolve
natively in Figma with no substitution.

### Provenance in the running footer

Every generated document has to answer three questions **from any page**: what is
this, when does it take force, and what produced it.

Covers answer them once. **Covers do not survive a document being split,
forwarded, or reprinted from page 12**, which is how these documents actually
travel — so the answers live in the running footer, on every page.

#### The four fields

| Field | When | Format |
|---|---|---|
| **Document version** | **Every generated document** | ISO — `2026-08-05` |
| **Effective date** | Documents that take force on a date | Human — `August 15, 2026` |
| **Catalog tag** | Pricing documents only | ISO — `2026-08-05` |
| **Engine version** | Pricing documents only | `v1.0.0` |

**The document version IS the release date.** There is no separate revision
number to keep in step with it.

**Effective date and document version are different facts and routinely
differ.** A list released on the 5th can take force on the 15th. Never collapse
them, and never derive one from the other.

**Two registers, on purpose.** The effective date reads to the person using the
document, so it is written out. The other three are identifiers for provenance,
so they are ISO and terse. That difference is the signal: prose is for the
reader, ISO is for the audit.

#### Order

Running footer, every page, in this order:

```
Effective August 15, 2026 · v2026-08-05 · Catalog 2026-08-05 · Engine v1.0.0
```

**Effective date leads** — it is the only field a partner needs while quoting.
The rest matter when something is disputed.

Non-pricing documents carry two:

```
Effective June 1, 2026 · v2026-05-28
```

Documents with no effective date carry one:

```
v2026-08-05
```

Set in the existing **Running header, footer** role. No new type role.

The registry declares the fields per document type in `footer`, in printed order,
so a generator joins the array rather than deciding sequence for itself. The
build fails if the order is wrong, if a field is unknown, or if `documentVersion`
is missing.

#### One source per field

**Every field in the footer comes from one source in the generation pipeline.**

The effective date already appears on covers. If the cover and the footer are
typed separately they will disagree after a late change, and a document that
states two effective dates is a dispute rather than a cosmetic bug. The registry
cross-checks the two records it can see: a document declaring `effective-date`
furniture must declare `effectiveDate` in its footer, and the reverse.

#### Same-day reissue

The document version is a date, so two releases on one day collide. This will
happen — a footnote typo, a layout fix, no price change.

**On a same-day reissue, append a lowercase letter:** `v2026-08-05b`, then `c`.
The first release of a day carries no suffix, which keeps the common case clean
and adds machinery only where it is needed.

#### Locked documents

The Limited Warranty (`Rev 06.2026`), both return policies — dealer and
distributor — and the RMA form use a `Rev MM.YYYY` scheme and are **locked**.

**Do not restyle them to match this standard.** It applies to new documents, and
to a locked document at its **next substantive revision**. `Rev MM.YYYY` remains
valid until then. The registry records the exemption on those entries under
`locked`, so the footer they declare is the target state rather than what they
carry today.

### The `-print` variant

**`-print` — office printer optimized. White ground, no motifs, colours chosen to
survive greyscale.** That one line is the whole explanation. Anyone seeing
`Aqua-Line-Sheet-print.pdf` beside `Aqua-Line-Sheet.pdf` picks correctly.

It is a **variant flag, not a document class**, and it describes a generated
document. Nothing here changes how a browser prints a page.

Substitutions from the full-colour version:

| | Substitution |
|---|---|
| Ground | `sand` → `paper` |
| `navy`, `cherry` | **unchanged.** L\* 24 and 43 separate cleanly in greyscale |
| `aqua`, `persimmon` | **replaced.** L\* 59 and 51 are eight points apart and muddy |
| Panel fills | `mortar` fill → `mortar` hairline |
| Motifs | omitted |

**The aqua and persimmon substitution is per document, not global.** Where those
two carry meaning, the replacement is a design decision: `navy` and `cherry`
absorb some of it, and anything needing three distinct values uses pattern or
position rather than reaching for a third colour.

**Both versions come from one source**, with the colour treatment applied at
export. Two source documents drift the way two copies of a token drift, and you
find out when a price is right in one and stale in the other.

**A `-print` variant carries "Office printer optimized" in its running footer.**
The filename suffix is lost the first time the file is renamed or forwarded. The
footer survives that.

Which documents get a `-print` variant is answered per document as they are
built, and is deliberately not listed here.

### Migration

What a document built against the earlier text needs changed.

| Was | Now | Why |
|---|---|---|
| 1in margins, 624 × 864 box | **0.5in margins, 720 × 960** | A reference table does not fit at one inch |
| `#1F4E79` | **`navy` `#1F3A5F`** | 9.5 ΔE. Old navy-600 |
| `#EDE7DC` hairline | **`tabby` `#D6D0C2`** | `mortar` is the panel fill, so the hairline steps down a rung |
| `#EFE9DE` panel or column fill | **`mortar` `#E6E0D6`** | 3.2 ΔE, and the value §6 already names for document panels |
| `#CFC7B9` group divider | **`aggregate` `#8B8378`** | A divider that must read needs the darker rung |
| `#5A6674` muted copy | **`slate` `#3A4654`** | Old ink-body |
| Table column heads in mixed case | **UPPERCASE, wide tracking** | Utility casing is normative and names document tables |
| `persimmon` or `cherry` rule on navy | **`persimmon-lt`** | Both stay barred on navy for shapes as well as text |
| Archivo Black | **Archivo 800**, loaded explicitly | A separate family, and an unweighted load silently renders 600 |
| Fit checked with `scrollHeight === clientHeight` | **Deepest-descendant check** | `clientHeight` includes the padding on `border-box`, so the old check passes while content sits in the margin |
| 2px header keyline as a collapsed border | **Inset shadow on the header cells** | A collapsed border is shared with the first data row, which then measures 18px instead of 17.5 |
| Sign-off placed ad hoc | **Last page, above the footer rule, 63px reserved** | |

**Type sizes did not change and must not be "migrated".** 11px body, 17.5px rows
and an uppercase masthead are correct and match the approved comps. An earlier
draft of this section asserted an 11pt floor, which would have forced every
shipped sheet to be rebuilt at the wrong size; that floor is withdrawn. The only
changes a built sheet needs are colour.

---

## 8. Copy rules

No em dashes.

Avoid "not X, but Y" and "X, not Y" unless the contrast is load-bearing.

Plainspoken trade-professional tone. No guru-speak, no corporate abstraction.

This section covers copy *mechanics*. What the company says about itself is §12:
boilerplate, terminology, product naming, and the closing line.

---

## 9. Design direction

The reasoning is in [Where this comes from](#where-this-comes-from). Read that
first. What follows is the operational form of it, and applying these rules
without the reasoning is exactly how the pastiche the last line forbids gets
built.

Horizontal emphasis, flat planes, deep overhangs, restraint, structure over
ornament.

Warm directional light and hard shadow, not soft diffuse lighting.

Not retro pastiche. Not generic modern SaaS.

**Photography:** hard directional light, deep shadow, strong horizons, product
shot with the discipline of a mid-century catalog plate. Never soft dusk-lit
lifestyle imagery.

---

## 10. Open items

- ~~Confirm `navy-lt` `#2B4A73` is still referenced~~ **Resolved.** It is in
  use as secondary structure and as a hover state. Keep it
- Seal the palette with `--color-*: initial` once components are built. Tailwind's
  default numeric palette is still resolvable
- Classify the Aqua line sheet as collateral or transactional
- Establish Pantone for both brand colors against a fan deck under D50
- Compute CMYK for GRACoL 2013 or SWOP if US commercial print is planned
- Establish an uncoated CMYK build for both colors
- Confirm the FOGRA39 values against a printed proof before production use
- Decide whether the logo navy change phases in or runs as a mixed period
- ~~Confirm with counsel whether any design mark in prosecution was filed in
  color~~ **Cleared for now.** No mark currently constrains the palette. The
  brand will notify when marks lock, at which point the brand colors become
  fixed and a change carries filing consequences

---

## 11. Consuming this system

Rules for any project that depends on this package. They hold regardless of
framework. Worked examples live in `docs/consumers/`; where an example and this
section disagree, this section is right and the example is stale.

### Install pinned

Consumers install a **tag**, never a branch. Tracking the default branch means a
token change reaches production without a version bump — a hex moves in this
repo and a live surface changes with nothing recording that it did.

A pin is also the only thing that makes a change reviewable. Moving from one tag
to the next is a diff someone can read.

### Import, do not copy

Anything a component renders is **imported from the package**, so the consumer's
own asset pipeline handles hashing, cache-busting and cleanup. That is what keeps
one copy of the artwork in the world.

A copied file is a second source of truth. It can be hand-edited, it does not
change when the package changes, and nothing reports the divergence.

### Copy only what needs a fixed URL

Some files cannot be hashed, because something outside the application asks for
them at a literal path: favicons, touch icons, social cards, anything a crawler,
a mail client or a third-party embed fetches by URL.

Those get copied. The rules for a copy:

- **Generate it at build time** from the package, never by hand
- **Ignore it in version control** — a committed copy is a fork
- **Never edit it** — the copy is output, and the package is the source

### Never redeclare a token

Consumers import the theme. A locally defined `--color-navy` is drift with extra
steps: it will be right on the day it is written and wrong the first time the
token moves, with nothing to catch it.

Mapping a token onto a local semantic name is fine, and is not the same thing —
point the local name at the token, never at the value.

### Load the system last

The package's values have to be the ones that survive. Declarations resolve in
load order and the last one wins, so **anything else that declares the same names
loads before the design system, not after** — a UI kit, a component library, a
theme preset, a CSS reset with opinions.

Getting this backwards does not error. It produces a build where some values are
the brand's and some are a dependency's, with nothing indicating which is which,
and the wrong ones are usually plausible enough to survive review. A radius two
pixels off does not look like a bug; it looks like a decision.

The one thing that comes after the system is **your own** site-specific values.
Those are meant to win. A dependency's defaults are not.

This is why the package deliberately does not import a framework: a package that
imports its own dependencies decides its own position in the order, and that
decision belongs to the consumer.

### Never edit generated output

`build/` and `assets/raster/` are regenerated from source. An edit to either
disappears the next time anything runs, silently and with no conflict.

### Read the file list from `tokens.json`

A consumer that hardcodes asset paths drifts the moment an output is added,
renamed or resized. The declarations are machine-readable for this reason — read
`assets.raster.outputs` and derive the paths.

Hardcoding also fails quietly in the one direction that matters: a file the
package stopped producing leaves a stale copy behind rather than an error.

### Artwork changes only on a version bump

There is no path where a consumer's copy of the logo changes without a version
bump, because artwork ships in the package and the package is pinned. That is
intended, not a limitation — it means nobody's site changes on a morning when
they did not deploy anything.

---

## 12. Voice and messaging

What the company says about itself. §8 governs how copy is written; this governs
what it says. Every consumer needs this, and each one will otherwise invent its
own version.

**The boilerplate and the descriptor are written against
[Where this comes from](#where-this-comes-from), not independently of it.** They
are that preface said in the company's own voice and at the company's own length.
Written without it they will describe a manufacturer of water features, which is
accurate and is not the point.

Sections marked **`TO AUTHOR`** are not yet written. They are deliberately empty
rather than filled with a plausible draft — approximate brand copy gets copied
into a live surface and then has to be un-shipped.

### Boilerplate

**`TO AUTHOR`** — one short paragraph and one long paragraph.

The short form is for a footer, a partner one-pager, or the end of a release. The
long form is for an about page or a press kit. Both are fixed text once written:
they are quoted, not paraphrased, and a consumer that rewrites them locally has
forked the company description.

### One-line descriptor

**`TO AUTHOR`** — one sentence.

Used in meta descriptions, directory listings and partner materials. It has to
survive being read alone, out of context, next to a competitor's.

### Product naming

**Line then product.** "Aqua Sheer", never "Sheer Descent by Great American".

The line name comes first because the line is what a trade partner is buying
into; the product is which one within it. Reversing it reads as a consumer brand
and breaks alphabetical grouping in every catalogue and price sheet that sorts by
name.

**Part numbers are uppercase with no spaces.** They are identifiers, not prose,
and they are matched literally by ordering systems.

### Line structure

Three lines, by water behaviour:

| Line | Covers | What it is for |
|---|---|---|
| **Aqua** | Waterfalls | **`TO AUTHOR`** — one sentence |
| **Versa** | Spillways and spouts | **`TO AUTHOR`** — one sentence |
| **Vista** | Edges | **`TO AUTHOR`** — one sentence |

The lines divide by what the water does, not by price or size. That is the
distinction to preserve if the range grows.

### Terminology

Binding. These are not preferences.

**The channel has four terms and they are not interchangeable.**

| Term | Means |
|---|---|
| **Trade partner**, **verified trade network** | The whole network. Anyone verified, however they buy. |
| **Dealer** | The direct-sell tier: pool builders, designers, landscape architects. |
| **Distributor**, **buying group** | The reselling tiers. A buying group is structurally a distributor: it buys, it pays, it redistributes to its members. |
| **National account** | A negotiated direct-terms designation, not a tier. |

**Terms follow the entity that places the order and pays Great American.** That
is the whole rule, and it resolves the cases that look ambiguous:

- A **dealer buying through a distributor** is still a verified trade partner,
  but is not the customer on that order — the distributor is.
- A **national account** buying through a distributor or a buying group receives
  that channel's terms and nothing else. The negotiated terms apply on direct
  purchase only.

So *trade partner* and *the account we invoice* are different sets. Copy that
uses one for the other is wrong even when it sounds friendlier.

**Never use "dealer" to mean the whole network.** It flattens three tiers and
implies distributors are dealers.

**Never imply a distributor or a buying group is a dealer.**

> **"Dealer" is not a word to avoid.** An earlier version of this section said to
> never use it, which was reacting to the catch-all error above. It was also
> unfollowable: the pricing engine emits a Dealer price, the discount ladder
> measures from dealer list, and `GA-RETURNS-DEALER-01` is a locked document. The
> fix is precision, not avoidance. Name the tier you mean.

**Product water behaviour is precise language, not description.** These sentences
describe mechanically different products and are not interchangeable:

- **Sheer** projects a smooth curtain out and down
- **Rain** drops in clean vertical streams
- **Wave's** lip angles upward into a cresting arc

Using one product's verb for another misdescribes the hardware. If copy needs a
generic verb, name no product.

### Closing line

**Built to be trusted.**

The standard closing line. Set as written — no variation, no substitution, no
extending it into a longer sentence.

**It is set in Satisfy**, in every document type as well as on web and deck
lockups, at the sizes in §7. That is a typeface decision, not a licence to
restate the line differently.

---

## 13. Iconography

Beyond the flag, icons need a system or they drift as soon as there is more than
a handful. Values live in `tokens.json` under the top-level `icon` key.

> **`PROVISIONAL`.** Stroke and corner radius below are a starting point, not a
> measurement. They must be confirmed against the flag icon once real UI icon
> artwork exists, and may move. Do not treat them as measured, and do not cite
> them as settled to anyone drawing a set.

| Property | Value | Notes |
|---|---|---|
| Grid | **24px** | Drawn on a 24 box |
| Safe margin | **2px** | Artwork stays inside 20×20; nothing touches the edge |
| Stroke | **1.75px** at 24 | `PROVISIONAL`. Scales proportionally with the grid |
| Caps and joins | **round** | Both |
| Corner radius | **2px** at 24 | `PROVISIONAL` |

**Never mix stroke weights within a set.** One weight per set is what makes a set
read as a set; a single heavier icon reads as an error before it reads as
emphasis.

**Icons are monochrome — a single colour token each.** They take a token, not a
value, and they inherit from context wherever possible.

**The flag is the only multi-token mark, and it is not a UI icon.** It is an
identity asset with its own treatments and its own validation, and it is
two-tone by necessity — see `assets/icon/README.md`. Nothing in this section
applies to it, and it is not the reference for drawing a UI set.

**Optical sizing: below 20px, drop interior detail rather than thinning the
stroke.** A thinned stroke disappears at small sizes and breaks the set's weight;
a simplified icon still reads. This is the same reasoning that removes the stars
from the flag mark in its single-colour treatments.
