// ============================================
// DESIGN TOKENS - Single Source of Truth
// Mirrors the tokens defined in globals.css
// Used for the Tokens visualization page
// ============================================

export interface ColorToken {
  name: string;
  value: string;
  cssVar: string;
}

export interface ColorGroup {
  name: string;
  colors: ColorToken[];
}

export interface SpacingToken {
  name: string;
  value: string;
  cssVar: string;
  px: number;
}

export interface RadiusToken {
  name: string;
  value: string;
  cssVar: string;
  px: number | string;
}

export interface TypographyToken {
  /** Human-readable label, e.g. "Heading LG" (size role only, no weight word) */
  name: string;
  /** New v2 size class (ds-text-*) — sets font-family, font-size, line-height, letter-spacing */
  sizeClass: string;
  /** Weight utility to pair with sizeClass */
  weightClass: string;
  /** Composed class string: `${sizeClass} ${weightClass}` */
  className: string;
  /** Legacy v1 class (typo-desktop-*) — deprecated */
  legacyClass: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing: string;
}

/** Category grouping for the tokens page */
export interface TypographyGroup {
  name: string;
  tokens: TypographyToken[];
}

/** A size role with all its weight variants grouped together */
export interface TypographySizeRole {
  /** Role label, e.g. "Heading LG" */
  label: string;
  /** The shared size class */
  sizeClass: string;
  /** Shared font-size / line-height */
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  /** All weight variants for this size role */
  variants: TypographyToken[];
}

// --- Colors ---

export const colorGroups: ColorGroup[] = [
  {
    name: "Grey",
    colors: [
      { name: "grey-5", value: "#F9F9FB", cssVar: "--color-grey-5" },
      { name: "grey-10", value: "#F3F3F7", cssVar: "--color-grey-10" },
      { name: "grey-20", value: "#E6E5EB", cssVar: "--color-grey-20" },
      { name: "grey-30", value: "#CCC9D6", cssVar: "--color-grey-30" },
      { name: "grey-40", value: "#B2AEC1", cssVar: "--color-grey-40" },
      { name: "grey-50", value: "#9C97B0", cssVar: "--color-grey-50" },
      { name: "grey-60", value: "#78708F", cssVar: "--color-grey-60" },
      { name: "grey-70", value: "#645C7A", cssVar: "--color-grey-70" },
      { name: "grey-80", value: "#57506C", cssVar: "--color-grey-80" },
      { name: "grey-90", value: "#403956", cssVar: "--color-grey-90" },
      { name: "grey-100", value: "#120F19", cssVar: "--color-grey-100" },
    ],
  },
  {
    name: "Purple",
    colors: [
      { name: "purple-10", value: "#E7E1FA", cssVar: "--color-purple-10" },
      { name: "purple-20", value: "#D6CBF6", cssVar: "--color-purple-20" },
      { name: "purple-30", value: "#BBA9EF", cssVar: "--color-purple-30" },
      { name: "purple-40", value: "#987DE8", cssVar: "--color-purple-40" },
      { name: "purple-50", value: "#7652E0", cssVar: "--color-purple-50" },
      { name: "purple-60", value: "#5427D8", cssVar: "--color-purple-60" },
      { name: "purple-70", value: "#4D24C7", cssVar: "--color-purple-70" },
      { name: "purple-80", value: "#431FAD", cssVar: "--color-purple-80" },
      { name: "purple-90", value: "#321782", cssVar: "--color-purple-90" },
      { name: "purple-100", value: "#11082B", cssVar: "--color-purple-100" },
    ],
  },
  {
    name: "Blue",
    colors: [
      { name: "blue-10", value: "#DEEEF8", cssVar: "--color-blue-10" },
      { name: "blue-20", value: "#C1DFF1", cssVar: "--color-blue-20" },
      { name: "blue-30", value: "#A3D0EB", cssVar: "--color-blue-30" },
      { name: "blue-40", value: "#57A8DB", cssVar: "--color-blue-40" },
      { name: "blue-50", value: "#2A93D5", cssVar: "--color-blue-50" },
      { name: "blue-60", value: "#1D87C9", cssVar: "--color-blue-60" },
      { name: "blue-70", value: "#126AA1", cssVar: "--color-blue-70" },
      { name: "blue-80", value: "#0A4C76", cssVar: "--color-blue-80" },
      { name: "blue-90", value: "#042E49", cssVar: "--color-blue-90" },
      { name: "blue-100", value: "#001F33", cssVar: "--color-blue-100" },
    ],
  },
  {
    name: "Green",
    colors: [
      { name: "green-10", value: "#E0F2CF", cssVar: "--color-green-10" },
      { name: "green-20", value: "#CCE9AF", cssVar: "--color-green-20" },
      { name: "green-30", value: "#B2E085", cssVar: "--color-green-30" },
      { name: "green-40", value: "#99DB57", cssVar: "--color-green-40" },
      { name: "green-50", value: "#7FD52A", cssVar: "--color-green-50" },
      { name: "green-60", value: "#73C91D", cssVar: "--color-green-60" },
      { name: "green-70", value: "#59A112", cssVar: "--color-green-70" },
      { name: "green-80", value: "#40760A", cssVar: "--color-green-80" },
      { name: "green-90", value: "#264904", cssVar: "--color-green-90" },
      { name: "green-100", value: "#1A3300", cssVar: "--color-green-100" },
    ],
  },
  {
    name: "Orange",
    colors: [
      { name: "orange-10", value: "#FFECDC", cssVar: "--color-orange-10" },
      { name: "orange-20", value: "#FEDEC2", cssVar: "--color-orange-20" },
      { name: "orange-30", value: "#FEC99A", cssVar: "--color-orange-30" },
      { name: "orange-40", value: "#FEAD67", cssVar: "--color-orange-40" },
      { name: "orange-50", value: "#FD9235", cssVar: "--color-orange-50" },
      { name: "orange-60", value: "#FD7702", cssVar: "--color-orange-60" },
      { name: "orange-70", value: "#E56D00", cssVar: "--color-orange-70" },
      { name: "orange-80", value: "#984701", cssVar: "--color-orange-80" },
      { name: "orange-90", value: "#653001", cssVar: "--color-orange-90" },
      { name: "orange-100", value: "#482201", cssVar: "--color-orange-100" },
    ],
  },
  {
    name: "Red",
    colors: [
      { name: "red-10", value: "#FFE1DC", cssVar: "--color-red-10" },
      { name: "red-20", value: "#FECBC2", cssVar: "--color-red-20" },
      { name: "red-30", value: "#FEA99A", cssVar: "--color-red-30" },
      { name: "red-40", value: "#FE7E67", cssVar: "--color-red-40" },
      { name: "red-50", value: "#F5593D", cssVar: "--color-red-50" },
      { name: "red-60", value: "#FF2600", cssVar: "--color-red-60" },
      { name: "red-70", value: "#CC1F00", cssVar: "--color-red-70" },
      { name: "red-80", value: "#991700", cssVar: "--color-red-80" },
      { name: "red-90", value: "#660F00", cssVar: "--color-red-90" },
      { name: "red-100", value: "#330800", cssVar: "--color-red-100" },
    ],
  },
  {
    name: "Pink",
    colors: [
      { name: "pink-10", value: "#FFDCEE", cssVar: "--color-pink-10" },
      { name: "pink-20", value: "#FEC2E3", cssVar: "--color-pink-20" },
      { name: "pink-30", value: "#FE9AD0", cssVar: "--color-pink-30" },
      { name: "pink-40", value: "#FE67B8", cssVar: "--color-pink-40" },
      { name: "pink-50", value: "#FD35A0", cssVar: "--color-pink-50" },
      { name: "pink-60", value: "#FD0288", cssVar: "--color-pink-60" },
      { name: "pink-70", value: "#CA026D", cssVar: "--color-pink-70" },
      { name: "pink-80", value: "#980152", cssVar: "--color-pink-80" },
      { name: "pink-90", value: "#650137", cssVar: "--color-pink-90" },
      { name: "pink-100", value: "#480127", cssVar: "--color-pink-100" },
    ],
  },
  {
    name: "Transparency Grey",
    colors: [
      { name: "t-grey-2", value: "#120F1905", cssVar: "--color-t-grey-2" },
      { name: "t-grey-5", value: "#120F190D", cssVar: "--color-t-grey-5" },
      { name: "t-grey-10", value: "#120F191A", cssVar: "--color-t-grey-10" },
      { name: "t-grey-15", value: "#120F1926", cssVar: "--color-t-grey-15" },
      { name: "t-grey-20", value: "#120F1933", cssVar: "--color-t-grey-20" },
      { name: "t-grey-30", value: "#120F194D", cssVar: "--color-t-grey-30" },
      { name: "t-grey-40", value: "#120F1966", cssVar: "--color-t-grey-40" },
      { name: "t-grey-50", value: "#120F1980", cssVar: "--color-t-grey-50" },
      { name: "t-grey-60", value: "#120F1999", cssVar: "--color-t-grey-60" },
      { name: "t-grey-70", value: "#120F19B2", cssVar: "--color-t-grey-70" },
      { name: "t-grey-80", value: "#120F19CC", cssVar: "--color-t-grey-80" },
      { name: "t-grey-90", value: "#120F19E5", cssVar: "--color-t-grey-90" },
    ],
  },
  {
    name: "Transparency White",
    colors: [
      { name: "t-white-2", value: "#FFFFFF05", cssVar: "--color-t-white-2" },
      { name: "t-white-5", value: "#FFFFFF0D", cssVar: "--color-t-white-5" },
      { name: "t-white-10", value: "#FFFFFF1A", cssVar: "--color-t-white-10" },
      { name: "t-white-15", value: "#FFFFFF26", cssVar: "--color-t-white-15" },
      { name: "t-white-20", value: "#FFFFFF33", cssVar: "--color-t-white-20" },
      { name: "t-white-30", value: "#FFFFFF4D", cssVar: "--color-t-white-30" },
      { name: "t-white-40", value: "#FFFFFF66", cssVar: "--color-t-white-40" },
      { name: "t-white-50", value: "#FFFFFF80", cssVar: "--color-t-white-50" },
      { name: "t-white-60", value: "#FFFFFF99", cssVar: "--color-t-white-60" },
      { name: "t-white-70", value: "#FFFFFFB2", cssVar: "--color-t-white-70" },
      { name: "t-white-80", value: "#FFFFFFCC", cssVar: "--color-t-white-80" },
      { name: "t-white-90", value: "#FFFFFFE5", cssVar: "--color-t-white-90" },
    ],
  },
];

// --- Spacing ---

export const spacingTokens: SpacingToken[] = [
  { name: "none", value: "0px", cssVar: "--spacing-none", px: 0 },
  { name: "sp-1", value: "1px", cssVar: "--spacing-sp-1", px: 1 },
  { name: "sp-2", value: "2px", cssVar: "--spacing-sp-2", px: 2 },
  { name: "sp-4", value: "4px", cssVar: "--spacing-sp-4", px: 4 },
  { name: "sp-6", value: "6px", cssVar: "--spacing-sp-6", px: 6 },
  { name: "sp-8", value: "8px", cssVar: "--spacing-sp-8", px: 8 },
  { name: "sp-10", value: "10px", cssVar: "--spacing-sp-10", px: 10 },
  { name: "sp-12", value: "12px", cssVar: "--spacing-sp-12", px: 12 },
  { name: "sp-14", value: "14px", cssVar: "--spacing-sp-14", px: 14 },
  { name: "sp-16", value: "16px", cssVar: "--spacing-sp-16", px: 16 },
  { name: "sp-18", value: "18px", cssVar: "--spacing-sp-18", px: 18 },
  { name: "sp-20", value: "20px", cssVar: "--spacing-sp-20", px: 20 },
  { name: "sp-22", value: "22px", cssVar: "--spacing-sp-22", px: 22 },
  { name: "sp-24", value: "24px", cssVar: "--spacing-sp-24", px: 24 },
  { name: "sp-28", value: "28px", cssVar: "--spacing-sp-28", px: 28 },
  { name: "sp-32", value: "32px", cssVar: "--spacing-sp-32", px: 32 },
  { name: "sp-36", value: "36px", cssVar: "--spacing-sp-36", px: 36 },
  { name: "sp-40", value: "40px", cssVar: "--spacing-sp-40", px: 40 },
  { name: "sp-44", value: "44px", cssVar: "--spacing-sp-44", px: 44 },
  { name: "sp-48", value: "48px", cssVar: "--spacing-sp-48", px: 48 },
  { name: "sp-56", value: "56px", cssVar: "--spacing-sp-56", px: 56 },
  { name: "sp-60", value: "60px", cssVar: "--spacing-sp-60", px: 60 },
  { name: "sp-64", value: "64px", cssVar: "--spacing-sp-64", px: 64 },
  { name: "sp-72", value: "72px", cssVar: "--spacing-sp-72", px: 72 },
  { name: "sp-80", value: "80px", cssVar: "--spacing-sp-80", px: 80 },
  { name: "sp-96", value: "96px", cssVar: "--spacing-sp-96", px: 96 },
  { name: "sp-104", value: "104px", cssVar: "--spacing-sp-104", px: 104 },
  { name: "sp-112", value: "112px", cssVar: "--spacing-sp-112", px: 112 },
  { name: "sp-128", value: "128px", cssVar: "--spacing-sp-128", px: 128 },
];

// --- Border Radius ---

export const radiusTokens: RadiusToken[] = [
  { name: "none", value: "0px", cssVar: "--radius-none", px: 0 },
  { name: "2", value: "2px", cssVar: "--radius-2", px: 2 },
  { name: "4", value: "4px", cssVar: "--radius-4", px: 4 },
  { name: "6", value: "6px", cssVar: "--radius-6", px: 6 },
  { name: "8", value: "8px", cssVar: "--radius-8", px: 8 },
  { name: "12", value: "12px", cssVar: "--radius-12", px: 12 },
  { name: "16", value: "16px", cssVar: "--radius-16", px: 16 },
  { name: "24", value: "24px", cssVar: "--radius-24", px: 24 },
  { name: "32", value: "32px", cssVar: "--radius-32", px: 32 },
  { name: "full", value: "9999px", cssVar: "--radius-full", px: "9999" },
];

// --- Typography (v2 — grouped) ---

function t(name: string, sizeClass: string, weightClass: string, legacyClass: string, fontSize: string, lineHeight: string, fontWeight: number, letterSpacing: string): TypographyToken {
  return { name, sizeClass, weightClass, className: `${sizeClass} ${weightClass}`, legacyClass, fontSize, lineHeight, fontWeight, letterSpacing };
}

export const typographyGroups: TypographyGroup[] = [
  {
    name: "Display",
    tokens: [
      t("Display XL",  "ds-text-display-xl",  "font-semibold", "typo-desktop-h1", "56px", "64px", 600, "0"),
      t("Display LG",  "ds-text-display-lg",  "font-semibold", "typo-desktop-h2", "48px", "58px", 600, "0"),
    ],
  },
  {
    name: "Headings",
    tokens: [
      t("Heading XL",  "ds-text-heading-xl", "font-semibold", "typo-desktop-h3",             "32px", "40px", 600, "0"),
      t("Heading LG",  "ds-text-heading-lg", "font-semibold", "typo-desktop-h4-semi-bold",   "28px", "34px", 600, "0"),
      t("Heading LG",  "ds-text-heading-lg", "font-regular",  "typo-desktop-h4-regular",     "28px", "34px", 400, "0"),
      t("Heading MD",  "ds-text-heading-md", "font-semibold", "typo-desktop-h5-semi-bold",   "22px", "26px", 600, "0"),
      t("Heading MD",  "ds-text-heading-md", "font-regular",  "typo-desktop-h5-regular",     "22px", "26px", 400, "0"),
      t("Heading SM",  "ds-text-heading-sm", "font-bold",     "typo-desktop-h6-bold",        "18px", "26px", 700, "0"),
      t("Heading SM",  "ds-text-heading-sm", "font-semibold", "typo-desktop-h6-semi-bold",   "18px", "26px", 600, "0"),
      t("Heading SM",  "ds-text-heading-sm", "font-regular",  "typo-desktop-h6-regular",     "18px", "26px", 400, "0"),
      t("Heading XS",  "ds-text-heading-xs", "font-semibold", "typo-desktop-h7",             "16px", "20px", 600, "0"),
    ],
  },
  {
    name: "Body & UI Text",
    tokens: [
      t("Body LG",  "ds-text-body-lg", "font-semibold", "typo-desktop-paragraph-semi-bold", "15px", "22px", 600, "0"),
      t("Body LG",  "ds-text-body-lg", "font-regular",  "typo-desktop-paragraph-regular",   "15px", "22px", 400, "0"),
      t("Body MD",  "ds-text-body-md", "font-regular",  "typo-desktop-small-text",          "14px", "20px", 400, "0.04em"),
      t("Body SM",  "ds-text-body-sm", "font-regular",  "typo-desktop-xsmall-text",         "12px", "20px", 400, "0.04em"),
    ],
  },
  {
    name: "Interactive",
    tokens: [
      t("Button LG",  "ds-text-ui-button-lg", "font-semibold", "typo-desktop-button-large",     "18px", "26px", 600, "0"),
      t("Button MD",  "ds-text-ui-button-md", "font-semibold", "typo-desktop-button-medium",    "15px", "22px", 600, "0"),
      t("Tag",        "ds-text-ui-tag",        "font-medium",   "typo-desktop-tag",              "13px", "13px", 500, "0.04em"),
      t("Link LG",   "ds-text-ui-link-lg",    "font-medium",   "typo-desktop-link-h5",          "18px", "26px", 500, "0"),
      t("Link MD",   "ds-text-ui-link-md",    "font-medium",   "typo-desktop-link-paragraph",   "15px", "15px", 500, "0.02em"),
      t("Link SM",   "ds-text-ui-link-sm",    "font-medium",   "typo-desktop-link-small-text",  "13px", "13px", 500, "0.04em"),
    ],
  },
];

/** Flat list of all typography tokens (for backward compat with existing code) */
export const typographyTokens: TypographyToken[] = typographyGroups.flatMap((g) => g.tokens);

/** Helper: weight number → human-readable word */
export function weightLabel(weight: number): string {
  if (weight >= 700) return "Bold";
  if (weight >= 600) return "Semibold";
  if (weight >= 500) return "Medium";
  return "Regular";
}

/** Group tokens by size role (shared sizeClass) within each category */
export function groupBySizeRole(group: TypographyGroup): TypographySizeRole[] {
  const map = new Map<string, TypographySizeRole>();
  for (const token of group.tokens) {
    const existing = map.get(token.sizeClass);
    if (existing) {
      existing.variants.push(token);
    } else {
      map.set(token.sizeClass, {
        label: token.name,
        sizeClass: token.sizeClass,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        letterSpacing: token.letterSpacing,
        variants: [token],
      });
    }
  }
  return Array.from(map.values());
}
