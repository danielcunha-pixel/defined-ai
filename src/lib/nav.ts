// ============================================
// NAVIGATION CONFIG
// Single source of truth for sidebar navigation
// Auto-generates from this config + MDX frontmatter
// ============================================

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationConfig: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/",
        description: "Overview of the Defined.ai Design System",
      },
    ],
  },
  {
    title: "Foundations",
    items: [
      {
        title: "Typography",
        href: "/foundations/typography",
        description: "Type scale, font families, and text styles",
      },
      {
        title: "Colors",
        href: "/foundations/colors",
        description: "Brand palette, semantic colors, and usage guidelines",
      },
      {
        title: "Icons",
        href: "/foundations/icons",
        description: "Stroke-based icon library with consistent size scaling",
      },
    ],
  },
  {
    title: "Tokens",
    items: [
      {
        title: "Design Tokens",
        href: "/tokens",
        description: "Visual reference for all design tokens",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/components/button",
        description: "Primary action component with multiple variants",
      },
      {
        title: "Text input",
        href: "/components/input",
        description: "Text input field for forms",
      },
      {
        title: "Tooltip",
        href: "/components/tooltip",
        description: "Contextual text label on hover or focus",
      },
      {
        title: "Dropdown",
        href: "/components/dropdown",
        description: "Select input with default and inline styles, plus open and searchable states",
      },
      {
        title: "Checkbox",
        href: "/components/checkbox",
        description: "Toggle control with checked, unchecked, and indeterminate states",
      },
      {
        title: "Chip",
        href: "/components/chip",
        description: "Pill-shaped clickable label for tags, filters, and compact selections",
      },
      {
        title: "Tag",
        href: "/components/tag",
        description: "Compact metadata label with color and truncation support",
      },
    ],
  },
];

export const navigation: NavSection[] = navigationConfig.map((section) => ({
  ...section,
  items: [...section.items].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  ),
}));

// Flat list for search indexing
export function getAllNavItems(): NavItem[] {
  return navigation.flatMap((section) => section.items);
}

// Find current section from pathname
export function getCurrentSection(pathname: string): string | undefined {
  for (const section of navigation) {
    if (section.items.some((item) => item.href === pathname)) {
      return section.title;
    }
  }
  return undefined;
}
