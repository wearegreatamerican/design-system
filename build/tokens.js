// GENERATED FROM tokens.json — DO NOT EDIT BY HAND.
// Run `npm run build`.

export const color = {
  "navy": "#1F3A5F",
  "navy-lt": "#2B4A73",
  "navy-pale": "#A9B3C0",
  "ink": "#14202E",
  "slate": "#3A4654",
  "paper": "#FFFFFF",
  "shell": "#FFFDF9",
  "sand": "#F7F4EE",
  "mortar": "#E6E0D6",
  "tabby": "#D6D0C2",
  "aggregate": "#8B8378",
  "persimmon-lt": "#E89A7C",
  "persimmon": "#C4573F",
  "cherry": "#A84630",
  "cherry-dk": "#933C29",
  "aqua": "#4A9B9B",
  "aqua-lt": "#6BB5B5",
  "aqua-mid": "#9BCECC",
  "aqua-pale": "#CFE4E2"
};

export const brand = {
  "navy": {
    "token": "navy",
    "lab_d50": {
      "l": 23.9,
      "a": 0,
      "b": -26
    },
    "cmyk": {
      "profile": "FOGRA39L_coated",
      "c": 93,
      "m": 63,
      "y": 7,
      "k": 56,
      "totalInk": 219,
      "roundTripDeltaE": 1.5
    },
    "pantone": null,
    "note": "Logo update to this value in progress. Any spec established against #1F4E79 is void."
  },
  "cherry": {
    "token": "cherry",
    "lab_d50": {
      "l": 43.1,
      "a": 40,
      "b": 34
    },
    "cmyk": {
      "profile": "FOGRA39L_coated",
      "c": 9,
      "m": 81,
      "y": 84,
      "k": 32,
      "totalInk": 206,
      "roundTripDeltaE": 1
    },
    "pantone": null,
    "note": "Confirmed from the color chart. Inside coated CMYK gamut, no spot ink required."
  }
};

export const font = {
  "stack": {
    "display": "\"Archivo Variable\", \"Archivo\", ui-sans-serif, system-ui, sans-serif",
    "sans": "\"Nunito Sans Variable\", \"Nunito Sans\", ui-sans-serif, system-ui, sans-serif",
    "utility": "\"Oswald Variable\", \"Oswald\", ui-sans-serif, system-ui, sans-serif",
    "script": "\"Satisfy\", ui-serif, cursive"
  },
  "docx": {
    "_note": "One family per weight. Word resolves a family name literally and cannot address a variable weight axis, so every weight and slant is its own family here. Never set bold or italic flags on these in a document build — see assets.fonts.note. \"body\" and \"utility\" are the pre-1.2.0 names for body400 and utility400, kept so consumers pinned to 1.1.x do not break; prefer the weighted keys.",
    "display400": "Archivo",
    "display600": "Archivo SemiBold",
    "display800": "Archivo ExtraBold",
    "body400": "Nunito Sans",
    "body700": "Nunito Sans Bold",
    "body400italic": "Nunito Sans Italic",
    "utility400": "Oswald",
    "utility500": "Oswald Medium",
    "utility700": "Oswald Bold",
    "script400": "Satisfy",
    "body": "Nunito Sans",
    "utility": "Oswald"
  },
  "note": "Variable family names come first so self-hosted @fontsource-variable resolves; the static name is the fallback for consumers loading from Google. Whichever is loaded wins, the other is inert. docx keeps the static names only — Word resolves the family literally. Never set bold:true on an Archivo run in docx; weight lives in the family name."
};

export const typeMap = [
  {
    "element": "Cover masthead",
    "font": "Archivo",
    "weight": 800,
    "size": 35.9,
    "unit": "px",
    "lineHeight": 38,
    "tracking": 1.14,
    "casing": "uppercase"
  },
  {
    "element": "Section heading",
    "font": "Archivo",
    "weight": 600,
    "size": 22,
    "unit": "px",
    "casing": "uppercase"
  },
  {
    "element": "Continuation masthead",
    "font": "Archivo",
    "weight": 600,
    "size": 20,
    "unit": "px",
    "casing": "uppercase"
  },
  {
    "element": "Segment diagram",
    "font": "Oswald",
    "weight": 700,
    "size": 34,
    "unit": "px",
    "casing": "none"
  },
  {
    "element": "Worked-example part number",
    "font": "Oswald",
    "weight": 700,
    "size": 16,
    "unit": "px",
    "casing": "none"
  },
  {
    "element": "Body-size group label",
    "font": "Oswald",
    "weight": 700,
    "size": 14,
    "unit": "px",
    "casing": "none"
  },
  {
    "element": "Subsection label",
    "font": "Oswald",
    "weight": 500,
    "size": 13,
    "unit": "px",
    "casing": "uppercase"
  },
  {
    "element": "Segment-key label",
    "font": "Oswald",
    "weight": 700,
    "size": 12,
    "unit": "px",
    "casing": "uppercase"
  },
  {
    "element": "Part number, table body",
    "font": "Oswald",
    "weight": 700,
    "size": 10.5,
    "unit": "px",
    "casing": "as-written"
  },
  {
    "element": "Table column head",
    "font": "Oswald",
    "weight": 500,
    "size": 10,
    "unit": "px",
    "casing": "uppercase",
    "tracking": "wide"
  },
  {
    "element": "Running header, footer",
    "font": "Oswald",
    "weight": 500,
    "size": 9,
    "unit": "px",
    "casing": "uppercase"
  },
  {
    "element": "Secondary copy, key options",
    "font": "Nunito Sans",
    "weight": 400,
    "size": 12,
    "unit": "px",
    "casing": "sentence"
  },
  {
    "element": "Price",
    "font": "Nunito Sans",
    "weight": 700,
    "size": 11,
    "unit": "px",
    "casing": "none",
    "figures": "tabular"
  },
  {
    "element": "Body, table cell",
    "font": "Nunito Sans",
    "weight": 400,
    "size": 11,
    "unit": "px",
    "casing": "sentence"
  },
  {
    "element": "Footnote",
    "font": "Nunito Sans",
    "weight": 400,
    "size": 9.5,
    "unit": "px",
    "casing": "sentence"
  },
  {
    "element": "Sign-off lockup",
    "font": "Archivo",
    "weight": 600,
    "size": 13,
    "unit": "pt",
    "casing": "uppercase"
  },
  {
    "element": "Sign-off qualifier",
    "font": "Satisfy",
    "weight": 400,
    "size": 20,
    "unit": "px",
    "casing": "sentence",
    "_note": "\"Built to be trusted\", set in Satisfy in every document type as of 2026-08-04. Documents and web lockups no longer diverge. 20px is the type scale's text-lg and is display size, which is what Satisfy requires; at 20px the script's set width matches the 13pt lockup above it, so the two read as one block, and at 24px it overruns the lockup. The size change grew the sign-off block from 34.3px to 42.1px measured with the real faces, which moved the §7 reserve from 63px to 71px and the row budget from 40 rows to 39. This replaces the earlier unresolved 12px-versus-10pt flag on this row: it was a Nunito Sans figure and no longer applies."
  }
];

export const page = {
  "px": {
    "width": 816,
    "height": 1056,
    "margin": 48,
    "contentWidth": 720,
    "contentHeight": 960,
    "ppi": 96
  },
  "twips": {
    "width": 12240,
    "height": 15840,
    "margin": 720
  },
  "signOffReservePx": 63,
  "note": "US Letter, half inch margins. The margin is half an inch because a 36-row reference table does not fit at one inch."
};

export const motif = {
  "tile": {
    "eyebrow": 14,
    "cardCap": 5,
    "divider": 26,
    "unit": "px"
  },
  "tileRamp": [
    "aqua",
    "aqua-lt",
    "aqua-pale"
  ],
  "note": "Tiles run dark to light, left to right, never reversed, at all three scales. The 14px glyph never stands alone.",
  "gradient": {
    "_note": "Built from colour tokens so no consumer retypes an aqua value. The band separator uses var(--ground) so it follows the surface: sand on web, paper on a document page root. Band geometry verified against the site 2026-07-30: it is a repeating tile at the fixed tile.divider scale, period 3 tiles + 3 gaps, with a trailing separator after the last tile. The cap is different on purpose — it stretches to the card width, so it stays on percentage thirds.",
    "cap": {
      "ramp": [
        "aqua",
        "aqua-lt",
        "aqua-pale"
      ]
    },
    "band": {
      "ramp": [
        "aqua",
        "aqua-lt",
        "aqua-pale"
      ],
      "gap": "1px",
      "gapToken": "ground"
    }
  }
};

export const retired = [
  {
    "value": "#EDE7D6",
    "replacedBy": "mortar",
    "reason": "cream. Off the neutral curve"
  },
  {
    "value": "#B0322C",
    "replacedBy": "cherry",
    "reason": "orphan red, 11.6 dE from the logo"
  },
  {
    "value": "#EAE4D6",
    "replacedBy": "mortar",
    "reason": "topbar-text, 2.4 dE duplicate"
  },
  {
    "value": "#143350",
    "replacedBy": "ink",
    "reason": "old navy-800"
  },
  {
    "value": "#1F4E79",
    "replacedBy": "navy",
    "reason": "old navy-600, persimmon-lt fails on it"
  },
  {
    "value": "#F0EBE0",
    "replacedBy": "shell",
    "reason": "old shell value"
  },
  {
    "value": "#FBF8F2",
    "replacedBy": "paper",
    "reason": "old paper value"
  },
  {
    "value": "#A84630",
    "replacedBy": null,
    "reason": "NOT retired. This is cherry. Listed only to prevent reintroduction as persimmon-dk",
    "keep": true
  },
  {
    "value": "#E0805F",
    "replacedBy": "persimmon-lt",
    "reason": "old persimmon-lt, fails AA at sizes in use"
  },
  {
    "value": "#EDE7DC",
    "replacedBy": "tabby",
    "reason": "document hairline"
  },
  {
    "value": "#EFE9DE",
    "replacedBy": "mortar",
    "reason": "document panel fill"
  },
  {
    "value": "#CFC7B9",
    "replacedBy": "aggregate",
    "reason": "document group divider"
  },
  {
    "value": "#5A6674",
    "replacedBy": "slate",
    "reason": "old ink-body"
  }
];

export const documents = {
  "_note": "Document type registry. Each entry says what an artifact IS, so a request like 'make me a price sheet' resolves to structure and type roles rather than a generic table. Ground and motifs are properties of the artifact, decided at design time. Printing never transforms them.",
  "_printVariant": {
    "suffix": "-print",
    "use": "Office printer optimized. White ground, no motifs, colours chosen to survive greyscale.",
    "runningFooter": "Office printer optimized",
    "ground": {
      "from": "sand",
      "to": "paper"
    },
    "keep": [
      "navy",
      "cherry"
    ],
    "replace": [
      "aqua",
      "persimmon"
    ],
    "panelFill": {
      "token": "mortar",
      "from": "fill",
      "to": "hairline"
    },
    "motifs": "omitted",
    "_note": "A variant flag, not a document class, and not a web print style — this describes a generated document, and nothing here affects how a browser prints a page. Which documents get one is answered per document as they are built, and is deliberately not recorded here. `keep` survives greyscale (navy L* 24, cherry L* 43); `replace` does not (aqua L* 59, persimmon L* 51, eight points apart and muddy). The replacement is a design decision per document rather than a global mapping: navy and cherry absorb some of it, and anything needing three distinct values uses pattern or position instead of a third colour. Both versions come from ONE source with the treatment applied at export — two source documents drift the way two copies of a token drift, and you find out when a price is right in one and stale in the other. The running footer is required because a filename suffix is lost the first time a file is renamed or forwarded."
  },
  "price-sheet": {
    "class": "collateral",
    "ground": "sand",
    "motifs": "full",
    "printVariant": true,
    "_note": "Reclassified from transactional to collateral 2026-08-04: dealer price lists are left behind at dealers, so the artifact is looked at rather than only filed. The download is the -print variant, which lands back on paper with no motifs — that is the treatment this document had as a transactional type, so nothing is lost, it moves to the variant. The row budget in DESIGN-SYSTEM.md §7 was measured on the paper treatment and still governs the -print variant; the collateral version carries motifs and therefore fits fewer rows.",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "table",
    "rowBudget": true,
    "furniture": [
      "running-header",
      "page-number",
      "effective-date",
      "revision"
    ],
    "signOff": "last-page",
    "structure": "Cover masthead, effective date, column header row, grouped part rows with group labels, footnotes. Continuation pages use the continuation masthead.",
    "typeRoles": [
      "Cover masthead",
      "Continuation masthead",
      "Body-size group label",
      "Table column head",
      "Part number, table body",
      "Price",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "effectiveDate",
      "documentVersion",
      "catalogTag",
      "engineVersion"
    ]
  },
  "warranty": {
    "class": "transactional",
    "ground": "paper",
    "motifs": "none",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "prose",
    "rowBudget": false,
    "furniture": [
      "running-header",
      "page-number",
      "effective-date",
      "revision"
    ],
    "signOff": "last-page",
    "structure": "Cover masthead, numbered sections with subsection labels, prose body, exclusions list, claims procedure. Revision number is required and appears in the footer.",
    "typeRoles": [
      "Cover masthead",
      "Section heading",
      "Subsection label",
      "Body, table cell",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "effectiveDate",
      "documentVersion"
    ],
    "locked": {
      "scheme": "Rev MM.YYYY",
      "current": "Rev 06.2026"
    }
  },
  "return-policy": {
    "class": "transactional",
    "ground": "paper",
    "motifs": "none",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "prose",
    "rowBudget": false,
    "furniture": [
      "running-header",
      "page-number",
      "effective-date",
      "revision"
    ],
    "signOff": "last-page",
    "structure": "Cover masthead, numbered sections, prose body, fee table if applicable. Dealer and distributor variants are separate documents, never combined.",
    "typeRoles": [
      "Cover masthead",
      "Section heading",
      "Subsection label",
      "Body, table cell",
      "Table column head",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "effectiveDate",
      "documentVersion"
    ],
    "locked": {
      "scheme": "Rev MM.YYYY"
    }
  },
  "rma-form": {
    "class": "transactional",
    "ground": "paper",
    "motifs": "none",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "form",
    "rowBudget": false,
    "furniture": [
      "running-header",
      "page-number",
      "revision"
    ],
    "signOff": "none",
    "structure": "Cover masthead, instruction block, labelled fill fields with rules beneath, authorization block. Fields must remain writable in print; never place a field over a filled panel.",
    "typeRoles": [
      "Cover masthead",
      "Subsection label",
      "Body, table cell",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "documentVersion"
    ],
    "locked": {
      "scheme": "Rev MM.YYYY"
    }
  },
  "quote": {
    "class": "transactional",
    "ground": "paper",
    "motifs": "none",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "table",
    "rowBudget": true,
    "furniture": [
      "running-header",
      "page-number",
      "quote-number",
      "valid-through"
    ],
    "signOff": "last-page",
    "structure": "Cover masthead, customer block, quote number and validity date, line-item table, totals block, terms footnote.",
    "typeRoles": [
      "Cover masthead",
      "Table column head",
      "Part number, table body",
      "Price",
      "Body, table cell",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "documentVersion",
      "catalogTag",
      "engineVersion"
    ]
  },
  "spec-sheet": {
    "class": "transactional",
    "ground": "paper",
    "motifs": "none",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "table",
    "rowBudget": true,
    "furniture": [
      "running-header",
      "page-number",
      "revision"
    ],
    "signOff": "last-page",
    "structure": "Cover masthead, product identity block, segment diagram if the product has a part-number structure, dimension and specification tables, key options, footnotes.",
    "typeRoles": [
      "Cover masthead",
      "Section heading",
      "Segment diagram",
      "Worked-example part number",
      "Segment-key label",
      "Table column head",
      "Body, table cell",
      "Secondary copy, key options",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "documentVersion"
    ]
  },
  "agreement": {
    "class": "transactional",
    "ground": "paper",
    "motifs": "none",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "prose",
    "rowBudget": false,
    "furniture": [
      "running-header",
      "page-number",
      "effective-date",
      "revision"
    ],
    "signOff": "last-page",
    "structure": "Cover masthead, recitals, numbered clauses with subsection labels, signature block on the final page. Signature lines are rules on paper ground, never on a panel.",
    "typeRoles": [
      "Cover masthead",
      "Section heading",
      "Subsection label",
      "Body, table cell",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "effectiveDate",
      "documentVersion"
    ]
  },
  "flyer": {
    "class": "collateral",
    "ground": "sand",
    "motifs": "full",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "display",
    "rowBudget": false,
    "furniture": [
      "contact-block"
    ],
    "signOff": "last-page",
    "structure": "Hero image or product shot, display headline, short benefit copy, one call to action, contact block. Sunburst permitted once, in the hero only.",
    "typeRoles": [
      "Cover masthead",
      "Section heading",
      "Secondary copy, key options",
      "Body, table cell",
      "Sign-off lockup"
    ],
    "footer": [
      "documentVersion"
    ]
  },
  "line-sheet": {
    "class": "collateral",
    "ground": "sand",
    "motifs": "full",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "grid",
    "rowBudget": true,
    "furniture": [
      "running-header",
      "page-number",
      "effective-date"
    ],
    "signOff": "last-page",
    "structure": "Cover masthead, product grid with image, name, part number and short spec per cell. Waterline card cap permitted on cells. If prices appear, treat the row budget as binding.",
    "typeRoles": [
      "Cover masthead",
      "Continuation masthead",
      "Body-size group label",
      "Part number, table body",
      "Price",
      "Secondary copy, key options",
      "Footnote",
      "Running header, footer"
    ],
    "footer": [
      "effectiveDate",
      "documentVersion",
      "catalogTag",
      "engineVersion"
    ],
    "_note": "Carries all four footer fields because it declares effective-date furniture and Price among its type roles: in practice this is the priced variety. Prices are nonetheless optional here — the structure reads \"if prices appear, the row budget is binding\" — so an unpriced line sheet will print a catalog tag and engine version it does not need. That is deliberate: a priced line sheet with no provenance is a dispute with nothing to trace, while an unpriced one carrying a catalog tag is only redundant. The registry cannot express \"only when priced\"; if that conditional starts to matter, it needs a field rather than a convention."
  },
  "brochure": {
    "class": "collateral",
    "ground": "sand",
    "motifs": "full",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "display",
    "rowBudget": false,
    "furniture": [
      "page-number",
      "contact-block"
    ],
    "signOff": "last-page",
    "structure": "Cover, narrative spreads alternating image and copy, product summary pages, contact block. Section dividers may use the 26px waterline band.",
    "typeRoles": [
      "Cover masthead",
      "Section heading",
      "Continuation masthead",
      "Body, table cell",
      "Secondary copy, key options",
      "Sign-off lockup"
    ],
    "footer": [
      "documentVersion"
    ]
  },
  "catalog-cover": {
    "class": "collateral",
    "ground": "sand",
    "motifs": "full",
    "orientation": "portrait",
    "masthead": "cover",
    "density": "display",
    "rowBudget": false,
    "furniture": [],
    "signOff": "none",
    "structure": "Full-bleed image or flat colour field, wordmark, catalog title, edition or year. Sunburst permitted once. No body copy.",
    "typeRoles": [
      "Cover masthead"
    ],
    "footer": [
      "documentVersion"
    ]
  }
};

export const scale = {
  "text": {
    "xs": "12px",
    "sm": "14px",
    "base": "16px",
    "md": "18px",
    "lg": "20px",
    "xl": "24px",
    "2xl": "30px",
    "3xl": "38px",
    "4xl": "48px",
    "5xl": "62px",
    "6xl": "80px"
  },
  "leading": {
    "tight": "1.1",
    "snug": "1.25",
    "normal": "1.5",
    "relaxed": "1.65"
  },
  "tracking": {
    "display": "-0.015em",
    "wide": "0.04em",
    "wider": "0.08em",
    "label": "0.13em",
    "eyebrow": "0.2em"
  }
};

export const radius = {
  "_note": "2xl was dropped in v1.1.0. It duplicated xl at 20px. Consumers must convert rounded-2xl to rounded-xl; leaving it undefined lets Tailwind's 16px default apply silently.",
  "xs": {
    "value": "3px",
    "use": "Chips"
  },
  "sm": {
    "value": "8px",
    "use": "Buttons, inputs"
  },
  "md": {
    "value": "10px",
    "use": "Inline panels"
  },
  "lg": {
    "value": "14px",
    "use": "Cards, photos"
  },
  "xl": {
    "value": "20px",
    "use": "Large panels, drawers"
  }
};

export const shadow = {
  "_note": "Warm, hard, directional. Light from the upper left. rgba(92,74,54,*) is the warm shadow base and is deliberate — never a neutral grey. card, photo and menu were back-compat aliases duplicating sm, lg and lg; they do not enter the package.",
  "xs": "0 1px 2px rgba(92, 74, 54, 0.06)",
  "sm": "0 1px 2px rgba(92, 74, 54, 0.06), 0 4px 14px rgba(92, 74, 54, 0.07)",
  "md": "0 2px 4px rgba(92, 74, 54, 0.07), 0 14px 32px rgba(92, 74, 54, 0.11)",
  "lg": "0 3px 6px rgba(92, 74, 54, 0.08), 0 22px 48px rgba(92, 74, 54, 0.13)",
  "overhang": "0 4px 0 rgba(92, 74, 54, 0.05), 0 18px 40px rgba(92, 74, 54, 0.12)",
  "drawer": "-12px 0 40px rgba(92, 74, 54, 0.22)"
};

export const assets = {
  "_note": "Brand artefacts. SVG is canonical; raster and print derive from it. Every SVG under assets/ is validated against its treatment's allowed colours, resolved from the filename suffix. clearSpace and minSize stay null until measured against real artwork — conventional numbers are not a substitute for measuring. Source SVGs are tight-cropped to the mark: no padding in the viewBox. All padding comes from the generator, because padding baked into a source compounds with generated padding invisibly — the file looks correct in isolation and wrong everywhere it is used. `npm run build` reports each source's viewBox and aspect ratio so a padded source shows up in the log.",
  "treatments": {
    "full": {
      "tokens": [
        "navy",
        "cherry"
      ],
      "literals": [],
      "use": "Default full colour"
    },
    "navy": {
      "tokens": [
        "navy"
      ],
      "literals": [],
      "use": "Single colour on light grounds"
    },
    "sand": {
      "tokens": [
        "sand"
      ],
      "literals": [],
      "use": "Reversed, light on dark, full-colour contexts"
    },
    "white": {
      "tokens": [
        "paper"
      ],
      "literals": [],
      "use": "Reversed, black-and-white documents only"
    },
    "black": {
      "tokens": [],
      "literals": [
        "#000000"
      ],
      "use": "Single colour: fax, engraving, embroidery"
    },
    "icon:full": {
      "tokens": [
        "navy",
        "sand"
      ],
      "literals": [],
      "use": "Icon full colour: navy stripes, sand stars. Kind-scoped — overrides the shared `full` for assets.icon only, because the icon's full colour is not the logo's. Scoped keys carry a colon, which no filename suffix can contain, so they are never resolved from a filename."
    }
  },
  "logo": {
    "revision": "1.1.0",
    "versionsSeparately": true,
    "defaultTreatment": "full",
    "treatments": [
      "full",
      "navy",
      "sand",
      "white",
      "black"
    ],
    "clearSpace": {
      "unit": null,
      "multiple": null,
      "_note": "Measured against real artwork. `unit` names the reference measure (e.g. 'cap-height of the wordmark', 'width of the mark'); `multiple` is how many of that unit must stay clear on all sides. Conventional values are not a substitute for measuring."
    },
    "minSize": {
      "digitalPx": null,
      "printMm": null
    },
    "pending": "Wordmark, mark and print masters. The primary lockup landed in revision 1.1.0 with the navy recolour from #1F4E79 to #1F3A5F complete — #1F4E79 is retired and the SVG check rejects it, so nothing can regress to it silently. assets/logo/wordmark/ and assets/logo/mark/ are still empty, and print EPS/PDF come from the artwork producer as CMYK or spot, outside this repo's validation."
  },
  "icon": {
    "style": "stylized",
    "defaultTreatment": "full",
    "treatments": [
      "full",
      "sand",
      "white",
      "black"
    ],
    "note": "Stylized flag in brand colours, not a literal US flag. Two-tone: navy stripes with sand stars, because the stars have to stand against the flag rather than disappear into it. Its full colour is therefore navy + sand, not the logo's navy + cherry, which is why assets.treatments carries a kind-scoped \"icon:full\". The sand, white and black treatments are single colour and drop the stars entirely rather than render them in the flag's own colour, where they would not read — 25 paths in the full-colour file, 6 in each of the others. Still four treatments. A literal flag would carry Old Glory Red #B31942 and Old Glory Blue #0A3161, neither in the palette, and would need a documented exemption; this needs none, since navy and sand are both palette colours. This is a brand mark, not an origin claim, ruled by the brand owner 2026-08-03 after an earlier wording here was read as the opposite and the mark was pulled from the site. It carries no sourcing precondition. Origin claims live in WORDING — \"Made in the U.S.A.\" and the like, governed by the FTC Made in USA Labeling Rule — and a compliance review suspends those words, not this mark.",
    "clearSpace": {
      "unit": null,
      "multiple": null,
      "_note": "Measured against real artwork. `unit` names the reference measure (e.g. 'cap-height of the wordmark', 'width of the mark'); `multiple` is how many of that unit must stay clear on all sides. Conventional values are not a substitute for measuring."
    },
    "minSize": {
      "digitalPx": null,
      "printMm": null
    }
  },
  "fonts": {
    "web": "npm: @fontsource-variable/{archivo,nunito-sans,oswald}, @fontsource/satisfy",
    "staticPath": "assets/fonts/static/",
    "staticFamilies": [
      "Archivo",
      "Archivo SemiBold",
      "Archivo ExtraBold",
      "Oswald",
      "Oswald Medium",
      "Oswald Bold",
      "Nunito Sans",
      "Nunito Sans Bold",
      "Nunito Sans Italic",
      "Satisfy"
    ],
    "licenses": {
      "Archivo": "OFL-1.1",
      "Oswald": "OFL-1.1",
      "Nunito Sans": "OFL-1.1",
      "Satisfy": "Apache-2.0"
    },
    "reservedFontName": false,
    "note": "Statics are committed because nothing can fetch them: Google ships Archivo, Oswald and Nunito Sans as variable fonts. Satisfy is already static. Archivo's variable default instance is SemiBold and Nunito Sans's default weight is 200; unpinned instances render wrong with no error. Every weight is its own family — never set bold or italic flags in docx."
  },
  "raster": {
    "_note": "Generated by `npm run raster` from the SVG sources. Never hand-edit; edits are silently overwritten on the next run. Output lives under assets/raster/, separate from the source directories, so nothing generated sits beside artwork where it could be mistaken for a source and edited. It is committed to the repo deliberately: it means anyone can take a PNG straight from a GitHub URL without cloning, installing or building anything, which is the path for everyone here who is not a developer. Regenerate and commit the PNGs in the SAME commit as the SVG change — a source and its raster drifting apart is the failure this exists to prevent. `pad` is a fraction of the longest rendered edge, added on all four sides as transparent pixels; declared sizes are FINAL dimensions including it. Padding is not clear space — clear space is a placement rule in any medium, this is pixels baked into a file that cannot enforce one, and the two are separate numbers on purpose. Favicons use 0 deliberately: they are meant to read edge-to-edge, and at 16px even 12% padding costs roughly a fifth of the mark. The 0.06 on logos is a starting value, not a measured one — once assets.logo.clearSpace is filled in from real artwork, revisit whether generated padding should match it.",
    "outputDir": "assets/raster",
    "outputs": [
      {
        "source": "assets/logo/primary/ga-logo.svg",
        "dir": "logo",
        "name": "ga-logo",
        "widths": [
          400,
          800,
          1600
        ],
        "pad": 0.06
      },
      {
        "source": "assets/logo/primary/ga-logo-sand.svg",
        "dir": "logo",
        "name": "ga-logo-sand",
        "widths": [
          400,
          800,
          1600
        ],
        "pad": 0.06
      },
      {
        "source": "assets/logo/primary/ga-logo-white.svg",
        "dir": "logo",
        "name": "ga-logo-white",
        "widths": [
          400,
          800,
          1600
        ],
        "pad": 0.06
      },
      {
        "source": "assets/logo/primary/ga-logo-black.svg",
        "dir": "logo",
        "name": "ga-logo-black",
        "widths": [
          400,
          800,
          1600
        ],
        "pad": 0.06
      },
      {
        "source": "assets/icon/ga-icon.svg",
        "dir": "icon",
        "name": "ga-icon",
        "squares": [
          16,
          32,
          48,
          64,
          180,
          192,
          512
        ],
        "pad": 0
      },
      {
        "source": "assets/icon/ga-icon-white.svg",
        "dir": "icon",
        "name": "ga-icon-white",
        "squares": [
          32,
          192,
          512
        ],
        "pad": 0
      }
    ]
  }
};

/** px at 96ppi -> docx half-points */
export const pxToHalfPt = (px) => Math.round((px * 72 / 96) * 2);

/** px at 96ppi -> twips */
export const pxToTwips = (px) => Math.round(px * 15);

export default { color, brand, font, typeMap, page, motif, retired, documents, scale, radius, shadow, assets, pxToHalfPt, pxToTwips };
