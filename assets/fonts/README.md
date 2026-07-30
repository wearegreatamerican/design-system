# Fonts

Two delivery paths, and they do not overlap.

**Web faces are npm dependencies.** All four families load through `@fontsource`
and are not committed here:

```
@fontsource-variable/archivo
@fontsource-variable/nunito-sans
@fontsource-variable/oswald
@fontsource/satisfy
```

The variable package names matter. `font.stack` in `tokens.json` names
`"Archivo Variable"` first and `"Archivo"` second, because `@fontsource-variable`
registers the former. Naming only the static family is how 1.0.0 shipped, and
every affected face silently fell back to `ui-sans-serif` — no error, no warning,
just slightly wrong type. `npm run check` now fails if that regresses.

**Static faces are committed**, in `static/`. They have to be: Google ships
Archivo, Oswald and Nunito Sans as variable fonts only, so there is nothing to
fetch. Satisfy is already static and is copied across unmodified.

## Every weight is its own family

Word resolves a family name literally and cannot address a variable weight axis.
So weight and slant live in the **family name**, never in a flag.

> **Never set `bold: true` or `italics: true` in a document build.**
> Setting a flag on top of an already-weighted family makes Word synthesize a
> fake face — a smeared double-bold, or a mechanically sheared pseudo-italic.
> Ask for `"Archivo ExtraBold"`, not `"Archivo"` + bold.

The ten families, and what `font.docx` calls each one:

| File | Family name | `font.docx` key | Source | Weight |
|---|---|---|---|---|
| `Archivo.ttf` | Archivo | `display400` | variable | 400 |
| `ArchivoSemiBold.ttf` | Archivo SemiBold | `display600` | variable | 600 |
| `ArchivoExtraBold.ttf` | Archivo ExtraBold | `display800` | variable | 800 |
| `Oswald.ttf` | Oswald | `utility400` | variable | 400 |
| `OswaldMedium.ttf` | Oswald Medium | `utility500` | variable | 500 |
| `OswaldBold.ttf` | Oswald Bold | `utility700` | variable | 700 |
| `NunitoSans.ttf` | Nunito Sans | `body400` | variable | 400 |
| `NunitoSansBold.ttf` | Nunito Sans Bold | `body700` | variable | 700 |
| `NunitoSansItalic.ttf` | Nunito Sans Italic | `body400italic` | variable italic | 400 |
| `Satisfy-Regular.ttf` | Satisfy | `script400` | already static | 400 |

`font.docx` also keeps `body` and `utility` as the pre-1.2.0 names for `body400`
and `utility400`, so consumers pinned to 1.1.x do not break. Prefer the weighted
keys.

## Two silent-failure traps

Both of these install cleanly and render wrong, with nothing logged anywhere:

1. **Archivo's variable default instance is SemiBold**, not Regular — its `wght`
   axis defaults to 600 and its `name(1)` is literally `Archivo SemiBold`. An
   unpinned instance gives you SemiBold everywhere you asked for body weight.
2. **Nunito Sans defaults to `wght` 200 (ExtraLight)** — its default `name(1)` is
   `Nunito Sans 12pt ExtraLight`. An unpinned instance gives you hairline text.

So **pin every axis, not just weight**, and read the defaults off the font rather
than hardcoding them. Nunito Sans has four axes (`wght`, `wdth`, `opsz`, `YTLC`),
Archivo has two (`wght`, `wdth`), Oswald has one (`wght`).

There is a third trap in the same family, one table over. See "Typographic family
records" below.

## Regenerating the statics

```bash
pip install fonttools
cd /tmp
curl -sL "https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/Archivo%5Bwdth%2Cwght%5D.ttf" -o Archivo-VF.ttf
curl -sL "https://raw.githubusercontent.com/google/fonts/main/ofl/oswald/Oswald%5Bwght%5D.ttf" -o Oswald-VF.ttf
curl -sL "https://raw.githubusercontent.com/google/fonts/main/ofl/nunitosans/NunitoSans%5BYTLC%2Copsz%2Cwdth%2Cwght%5D.ttf" -o NunitoSans-VF.ttf
curl -sL "https://raw.githubusercontent.com/google/fonts/main/ofl/nunitosans/NunitoSans-Italic%5BYTLC%2Copsz%2Cwdth%2Cwght%5D.ttf" -o NunitoSans-Italic-VF.ttf
curl -sL "https://raw.githubusercontent.com/google/fonts/main/apache/satisfy/Satisfy-Regular.ttf" -o Satisfy-Regular.ttf
```

Run from the repo root:

```python
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = "assets/fonts/static/"

def make(src, wght, family, filename, italic=False):
    f = TTFont(src)
    axes = {a.axisTag: a.defaultValue for a in f["fvar"].axes}  # pin all to default
    axes["wght"] = wght                                          # then override weight
    instancer.instantiateVariableFont(f, axes, inplace=True)
    n = f["name"]
    sub = "Italic" if italic else "Regular"
    n.setName(family, 1, 3, 1, 0x409)
    n.setName(sub,    2, 3, 1, 0x409)
    n.setName(family, 4, 3, 1, 0x409)   # full name IS the family; family carries the slant
    n.setName(family.replace(" ", ""), 6, 3, 1, 0x409)
    for nameID in (16, 17, 21, 22):     # see "Typographic family records"
        n.removeNames(nameID)
    f["OS/2"].usWeightClass = wght
    f.save(OUT + filename)

make("/tmp/Archivo-VF.ttf",           400, "Archivo",           "Archivo.ttf")
make("/tmp/Archivo-VF.ttf",           600, "Archivo SemiBold",  "ArchivoSemiBold.ttf")
make("/tmp/Archivo-VF.ttf",           800, "Archivo ExtraBold", "ArchivoExtraBold.ttf")
make("/tmp/Oswald-VF.ttf",            400, "Oswald",            "Oswald.ttf")
make("/tmp/Oswald-VF.ttf",            500, "Oswald Medium",     "OswaldMedium.ttf")
make("/tmp/Oswald-VF.ttf",            700, "Oswald Bold",       "OswaldBold.ttf")
make("/tmp/NunitoSans-VF.ttf",        400, "Nunito Sans",       "NunitoSans.ttf")
make("/tmp/NunitoSans-VF.ttf",        700, "Nunito Sans Bold",  "NunitoSansBold.ttf")
make("/tmp/NunitoSans-Italic-VF.ttf", 400, "Nunito Sans Italic","NunitoSansItalic.ttf", italic=True)
```

Then copy `Satisfy-Regular.ttf` across unmodified — it is already static.

### Typographic family records

The `removeNames` loop is not optional, and it is the trap that is easiest to
miss because the font looks correct if you only check `name(1)`.

`instantiateVariableFont` leaves nameID 16 and 17 — Typographic Family and
Typographic Subfamily — at the **variable font's default instance**. So straight
out of the instancer, all three Archivo statics claim family `Archivo` subfamily
`SemiBold`, and all three Nunito Sans statics claim `Nunito Sans` /
`12pt ExtraLight`, whatever weight you actually pinned:

```
Archivo.ttf           id1='Archivo'            id16='Archivo'  id17='SemiBold'
ArchivoSemiBold.ttf   id1='Archivo SemiBold'   id16='Archivo'  id17='SemiBold'
ArchivoExtraBold.ttf  id1='Archivo ExtraBold'  id16='Archivo'  id17='SemiBold'
```

16 and 17 outrank 1 and 2 in Word and in every modern font manager, so three
files would present one identity and the application would pick between them
arbitrarily. With them removed, applications fall back to nameID 1 and 2, which
is the literal resolution the docx pipeline needs.

## Verifying

Never commit a regenerated set without running this:

```python
from fontTools.ttLib import TTFont
import glob
for p in sorted(glob.glob("assets/fonts/static/*.ttf")):
    f = TTFont(p); n = f["name"]
    print(f"{p:44} {n.getDebugName(1)!r:22} {f['OS/2'].usWeightClass:>4} "
          f"typo={n.getDebugName(16)} var={'fvar' in f}")
```

Every row must match the table above, `typo` must be `None`, and `var` must be
`False`. A quick outline check is worth it too — stem widths should climb with
weight, and if two files in a family have identical `glyf` tables the pinning
silently did nothing.

## Licences

Licences differ by family and must travel with the fonts. They are in
`licenses/`:

| File | Family | Licence |
|---|---|---|
| `OFL-Archivo.txt` | Archivo | SIL OFL 1.1 |
| `OFL-Oswald.txt` | Oswald | SIL OFL 1.1 |
| `OFL-NunitoSans.txt` | Nunito Sans | SIL OFL 1.1 |
| `APACHE-Satisfy.txt` | Satisfy | **Apache 2.0**, not OFL |

Satisfy being Apache 2.0 is the one people get wrong.

None of the three OFL families declares a Reserved Font Name — the phrase appears
in their licence text only as part of the OFL's own definitions section, never
after a copyright statement. That is what permits these instanced derivatives to
keep the family names. If a future family *does* declare one, its instances must
be renamed.
