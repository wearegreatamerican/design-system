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
    "display": "\"Archivo\", ui-sans-serif, system-ui, sans-serif",
    "sans": "\"Nunito Sans\", ui-sans-serif, system-ui, sans-serif",
    "utility": "\"Oswald\", ui-sans-serif, system-ui, sans-serif",
    "script": "\"Satisfy\", ui-serif, cursive"
  },
  "docx": {
    "display400": "Archivo",
    "display600": "Archivo SemiBold",
    "display800": "Archivo ExtraBold",
    "body": "Nunito Sans",
    "utility": "Oswald"
  },
  "note": "Never set bold:true on an Archivo run in docx. Weight lives in the family name. Google serves Archivo as a variable font whose default instance is SemiBold, so an unweighted load silently renders 600."
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
    "font": "Nunito Sans",
    "weight": 400,
    "size": 12,
    "unit": "px",
    "casing": "sentence",
    "italic": true,
    "flag": "Spec table says 12px; prose below it says 10pt (13.3px). Unresolved."
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
  "note": "Tiles run dark to light, left to right, never reversed, at all three scales. The 14px glyph never stands alone."
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
  "price-sheet": {
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
};

/** px at 96ppi -> docx half-points */
export const pxToHalfPt = (px) => Math.round((px * 72 / 96) * 2);

/** px at 96ppi -> twips */
export const pxToTwips = (px) => Math.round(px * 15);

export default { color, brand, font, typeMap, page, motif, retired, documents, pxToHalfPt, pxToTwips };
