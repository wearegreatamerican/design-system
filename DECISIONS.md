# Decisions

Decisions that shaped the system, with the reasoning that produced them.

Rules live in `DESIGN-SYSTEM.md`. This file records **why** a rule has the shape
it does, so a future reader can tell a deliberate constraint from an accident,
and so a decision that gets revisited is revisited on its merits rather than
re-argued from scratch.

Newest first.

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
