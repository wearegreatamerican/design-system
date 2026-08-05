# Decisions

Decisions that shaped the system, with the reasoning that produced them.

Rules live in `DESIGN-SYSTEM.md`. This file records **why** a rule has the shape
it does, so a future reader can tell a deliberate constraint from an accident,
and so a decision that gets revisited is revisited on its merits rather than
re-argued from scratch.

Newest first.

---

## 2026-08-05 — Document provenance in the running footer

**Decision:** four fields — document version (release date, ISO, required),
effective date (human, where applicable), catalog tag and engine version (pricing
documents only). Footer on every page, effective date first. The document version
**is** the release date; there is no separate revision number. Same-day reissues
append a lowercase letter.

**Why:** covers do not survive a document being split or reprinted from page 12.
Effective date and release date are different facts and routinely differ.

**Constraint:** every footer field comes from one source in the pipeline. Cover
and footer disagreeing on effective date is a dispute, not a cosmetic bug.

**Exemption:** locked documents keep `Rev MM.YYYY` until their next substantive
revision.

**Found on the way:** the warranty, return policy and agreement took force on a
date and declared no `effective-date` furniture at all. That is the defect this
standard names, sitting in the registry already. Their furniture now declares it,
which also lets the build check `furniture` and `footer` against each other
rather than trusting either alone.

**Files:** `tokens.json` document registry, `DESIGN-SYSTEM.md`,
`CD-document-types.md`

---

## 2026-08-04 — Price lists are collateral, and the sign-off is Satisfy

**Decision:** price lists move from transactional to collateral, and ship a
`-print` variant for download. `Built to be trusted` is set in Satisfy at 20px in
every document type.

**Why, price lists:** they are left behind at dealers, so the artifact is looked
at rather than only filed. The `-print` download lands back on `paper` with no
motifs, which is exactly the treatment a price sheet had as a transactional type
— nothing is lost, it moves to the variant.

**Why, Satisfy:** documents and web lockups previously diverged only because
Satisfy is display-size only and had no small form, so documents fell back to
Nunito Sans italic. Sizing the sign-off up to 20px removes the reason for the
split rather than bending the display-size rule. 20px is `--text-lg`, and at that
size the script's set width matches the 13pt lockup above it so the two read as
one block; at 24px it overruns.

**Measured consequence:** the sign-off block grew from 34.3px to 42.1px with the
real faces loaded. The §7 reserve moved 63px → **71px**, and a page carrying the
sign-off now fits **39** data rows rather than 40 — five rows at 17.5px instead
of four. The derivation was checked against the published figures first: 63px and
44 rows reproduce the published 40 exactly.

**Still small text:** 20px is under the 24px large-text threshold, so the
sub-line stays `cherry` rather than `persimmon`, which matters more now that it
sits on `sand` (5.34 versus 4.00).

**Scope:** price lists only, for now. Warranty, return policy, RMA, quote, spec
sheet and agreement stay transactional and are moved individually if and when
they become leave-behinds.

**Files:** `tokens.json` document registry and type map, `DESIGN-SYSTEM.md` §4 §6
§7 §12, `CD-system.md`, `CD-document-types.md`

---

## 2026-08-03 — The -print document variant

**Decision:** generated documents may have a `-print` variant, office printer
optimized. White ground, no motifs, `aqua` and `persimmon` replaced with values
that survive greyscale. Both versions come from one source with the treatment
applied at export.

**Why:** partners print long documents in greyscale to save toner. `aqua` L\* 59
and `persimmon` L\* 51 are eight points apart and collapse; `navy` L\* 24 and
`cherry` L\* 43 do not.

**Scope:** generated documents only. Web print styles are unchanged.

**Files:** `tokens.json` document registry, `DESIGN-SYSTEM.md`,
`CD-document-types.md`
