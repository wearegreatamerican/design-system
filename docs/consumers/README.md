# Consumer setups

Worked examples of **§11 of [DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md#11-consuming-this-system)**,
which is where the rules actually live.

| File | Project |
|---|---|
| [astro.md](astro.md) | Astro + Tailwind v4, with a UI kit. The marketing site. |

## Read §11 first

Everything here is one framework's answer to a question §11 asks in general.
Nothing in these files is a new rule — if something reads like one, it belongs in
§11 and this is the wrong place for it.

**Where an example and §11 disagree, §11 is right and the example is stale.**
These files name specific versions, config files and package layouts, all of
which move. §11 does not.

## Adding a framework

Add a file, add a row to the table above, and keep it to procedure: commands,
paths, config, and the failures specific to that stack. If you find yourself
explaining *why* pinning matters or *why* copies are dangerous, stop — §11 has
already said it, and a second telling is the thing that goes out of date.

The useful shape is: install → stylesheet wiring → importing artwork → the small
set of files that need copying → build wiring. That order is roughly what someone
starting a new project hits in sequence.
