import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDocBySlug, getAllDocs } from "@/lib/mdx";
import { MdxRenderer } from "@/components/docs/MdxRenderer";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoDont } from "@/components/docs/DoDont";
import { highlightCode } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { ButtonPlaygroundWrapper } from "@/components/playground/ButtonPlaygroundWrapper";
import { DropdownPlaygroundWrapper } from "@/components/playground/DropdownPlaygroundWrapper";
import { InputPlaygroundWrapper } from "@/components/playground/InputPlaygroundWrapper";
import { Tag } from "@/components/ui/tag";

// Demo components
import {
  ButtonDemo,
  ButtonSizesDemo,
  ButtonWithIconsDemo,
  ButtonDisabledDemo,
  ButtonDarkDemo,
} from "@/components/demos/button-demo";
import {
  DropdownDemo,
  DropdownStatesDemo,
  DropdownSizesDemo,
  DropdownInlineDemo,
} from "@/components/demos/dropdown-demo";
import {
  InputDemo,
  InputSizesDemo,
  InputStatesDemo,
} from "@/components/demos/input-demo";
import {
  TooltipDemo,
  TooltipSidesDemo,
  TooltipWithTextDemo,
  TooltipToolbarDemo,
} from "@/components/demos/tooltip-demo";
import {
  CheckboxDemo,
  CheckboxStatesDemo,
  CheckboxWithLabelDemo,
  CheckboxGroupDemo,
} from "@/components/demos/checkbox-demo";
import {
  ChipVariantsDemo,
  ChipStatesDemo,
} from "@/components/demos/chip-demo";
import {
  TagVariantsDemo,
  TagDarkerDemo,
  TagInvertedDemo,
  TagTruncationDemo,
} from "@/components/demos/tag-demo";
import {
  TopNavigationDemo,
} from "@/components/demos/top-navigation-demo";

// ============================================
// Component page definitions
// Each component has its sections defined here
// ============================================

interface PreviewSection {
  title?: string;
  demo: React.ReactNode;
  code: string;
}

interface PropsSection {
  title?: string;
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
    required?: boolean;
  }>;
}

interface DoDontItem {
  type: "do" | "dont";
  text: string;
}

interface ComponentDef {
  previews: PreviewSection[];
  propsTables: PropsSection[];
  dodonts: DoDontItem[][];
  accessibility: string[];
}

const componentDefs: Record<string, ComponentDef> = {
  button: {
    previews: [
      {
        title: "Variants",
        demo: <ButtonDemo />,
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>`,
      },
      {
        title: "Sizes",
        demo: <ButtonSizesDemo />,
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`,
      },
      {
        title: "With Icons",
        demo: <ButtonWithIconsDemo />,
        code: `<Button variant="primary" size="lg">
  Continue
  <ChevronRight className="size-4" />
</Button>
<Button variant="secondary" size="md">
  <Plus className="size-4" />
  Add item
</Button>
<Button variant="tertiary" size="icon-md">
  <Plus className="size-5" />
</Button>`,
      },
      {
        title: "Disabled State",
        demo: <ButtonDisabledDemo />,
        code: `<Button variant="primary" disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="tertiary" disabled>Disabled</Button>`,
      },
      {
        title: "Dark Background",
        demo: <ButtonDarkDemo />,
        code: `<Button variant="primary-inverted">Inverted</Button>
<Button variant="primary-footer">Footer CTA</Button>
<Button variant="ghost-secondary">Ghost</Button>
<Button variant="glass">Glass</Button>`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "variant", type: '"primary" | "secondary" | "tertiary" | "ghost" | "ghost-secondary" | "primary-inverted" | "primary-footer" | "glass" | "link"', default: '"primary"', description: "Visual style of the button" },
          { name: "size", type: '"sm" | "md" | "lg" | "xl" | "icon-sm" | "icon-md" | "icon-lg"', default: '"md"', description: "Size of the button" },
          { name: "asChild", type: "boolean", default: "false", description: "Render as child element using Radix Slot" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the button is disabled" },
          { name: "className", type: "string", description: "Additional CSS classes" },
          { name: "children", type: "ReactNode", required: true, description: "Button content (text, icons, etc.)" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Use clear, action-oriented labels like \"Save changes\" or \"Delete item\". Keep labels concise (1-3 words when possible)." },
        { type: "dont", text: "Use vague labels like \"Click here\" or \"Submit\". Avoid long sentences as button labels." },
      ],
      [
        { type: "do", text: "Use primary buttons for the main action and secondary/tertiary for supporting actions. Limit to one primary button per section." },
        { type: "dont", text: "Use multiple primary buttons in the same section, which confuses hierarchy." },
      ],
    ],
    accessibility: [
      "Buttons use native <button> elements for built-in keyboard support",
      "Focus states use a visible ring (ring-2 ring-purple-70/50)",
      "Disabled buttons set disabled attribute and reduce opacity",
      "Icon-only buttons should include an aria-label for screen readers",
      "All variants maintain WCAG 2.1 AA contrast ratios",
      "Keyboard: Enter and Space trigger button actions",
    ],
  },
  dropdown: {
    previews: [
      {
        title: "Default",
        demo: <DropdownDemo />,
        code: `<Dropdown
  size="medium"
  style="default"
  label="Label"
  helperText="Helper text"
  placeholder="Choose an option"
/>`,
      },
      {
        title: "States",
        demo: <DropdownStatesDemo />,
        code: `<Dropdown previewState="enabled" label="Enabled" helperText="Helper text" placeholder="Choose an option" />
<Dropdown previewState="hover" label="Hover" helperText="Helper text" placeholder="Choose an option" />
<Dropdown previewState="pressed" label="Pressed" helperText="Helper text" placeholder="Choose an option" />
<Dropdown previewState="focus" label="Focus" helperText="Helper text" placeholder="Choose an option" />
<Dropdown previewState="active" open label="Active" helperText="Helper text" placeholder="Choose an option" />
<Dropdown previewState="disabled" label="Disabled" helperText="Helper text" placeholder="Choose an option" />`,
      },
      {
        title: "Sizes",
        demo: <DropdownSizesDemo />,
        code: `<Dropdown size="small" label="Small" helperText="Helper text" placeholder="Choose an option" />
<Dropdown size="medium" label="Medium" helperText="Helper text" placeholder="Choose an option" />`,
      },
      {
        title: "Inline",
        demo: <DropdownInlineDemo />,
        code: `<Dropdown style="inline" size="small" label="Label" placeholder="Choose an option" />
<Dropdown style="inline" size="medium" value="option-1" />
<Dropdown style="inline" size="medium" previewState="focus" open value="option-1" />`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "size", type: '"small" | "medium"', default: '"medium"', description: "Size variant from Figma" },
          { name: "style", type: '"default" | "inline"', default: '"default"', description: "Layout style variant from Figma" },
          { name: "previewState", type: '"enabled" | "hover" | "pressed" | "focus" | "active" | "disabled"', description: "Docs-only static visual state override for QA previews" },
          { name: "open", type: "boolean", description: "Controlled open state for the menu" },
          { name: "menuAlignment", type: '"left" | "right"', default: '"left"', description: "Menu alignment relative to trigger" },
          { name: "label", type: "string", default: '"Label"', description: "Visible field label" },
          { name: "helperText", type: "string", default: '"Helper text"', description: "Helper text under default style" },
          { name: "placeholder", type: "string", default: '"Choose an option"', description: "Placeholder text when no option is selected" },
          { name: "showSearch", type: "boolean", default: "true", description: "Shows the menu search input row" },
          { name: "searchPlaceholder", type: "string", default: '"Search..."', description: "Placeholder text for the search input" },
          { name: "options", type: "Array<{ label: string; value: string }>", description: "Menu options" },
          { name: "value", type: "string", description: "Controlled selected option value" },
          { name: "defaultValue", type: "string", description: "Initial selected option value (uncontrolled)" },
          { name: "onValueChange", type: "(value: string) => void", description: "Called when an option is selected" },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the menu opens or closes" },
          { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and applies disabled visuals" },
          { name: "className", type: "string", description: "Additional trigger classes" },
          { name: "containerClassName", type: "string", description: "Additional root container classes" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Use Dropdown when users must pick one option from a fixed list." },
        { type: "dont", text: "Use Dropdown for free-form text entry. Use Text input instead." },
      ],
      [
        { type: "do", text: "Use the default style in form layouts and the inline style in compact toolbars." },
        { type: "dont", text: "Mix helper text-heavy layouts with inline style where horizontal space is constrained." },
      ],
    ],
    accessibility: [
      "Trigger uses a combobox-style button with aria-expanded and aria-controls",
      "Menu uses role=listbox and options expose aria-selected",
      "Keyboard interaction supports Arrow keys, Enter, Home/End, and Escape",
      "Search row is a real text input and filters options live",
      "Focus state uses the purple 2px border token from Figma",
      "Disabled state blocks interaction and uses muted token colors",
      "Supports controlled and uncontrolled selection and open state",
    ],
  },
  input: {
    previews: [
      {
        title: "Default",
        demo: <InputDemo />,
        code: `<Input
  label="Label"
  placeholder="Placeholder text"
  helperText="Helper text"
  size="small"
/>`,
      },
      {
        title: "States",
        demo: <InputStatesDemo />,
        code: `<Input label="Enabled" placeholder="Placeholder text" helperText="Helper text" state="enabled" />
<Input label="Hover" placeholder="Placeholder text" helperText="Helper text" state="hover" />
<Input label="Pressed" placeholder="Placeholder text" helperText="Helper text" state="pressed" />
<Input label="Disabled" placeholder="Placeholder text" helperText="Helper text" state="disabled" />
<Input label="Read-only" defaultValue="Placeholder filled" helperText="Helper text" state="read-only" />
<Input label="Error" placeholder="Placeholder text" state="error" errorMessage="Error message" />`,
      },
      {
        title: "Sizes",
        demo: <InputSizesDemo />,
        code: `<Input label="Small" placeholder="Placeholder text" helperText="Helper text" size="small" />
<Input label="Medium" placeholder="Placeholder text" helperText="Helper text" size="medium" />
<Input label="Large" placeholder="Placeholder text" helperText="Helper text" size="large" />`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "type", type: "string", default: '"text"', description: "HTML input type (text, email, password, etc.)" },
          { name: "size", type: '"small" | "medium" | "large"', default: '"small"', description: "Input height variant from Figma" },
          { name: "state", type: '"enabled" | "hover" | "pressed" | "disabled" | "error" | "read-only"', description: "Static visual state override for previews" },
          { name: "label", type: "string", description: "Label text above the input area" },
          { name: "helperText", type: "string", description: "Helper text shown below when not in error state" },
          { name: "errorMessage", type: "string", default: '"Error message"', description: "Message shown when state is error" },
          { name: "placeholder", type: "string", description: "Placeholder text shown when empty" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled" },
          { name: "readOnly", type: "boolean", default: "false", description: "Makes the field read-only" },
          { name: "aria-invalid", type: "boolean", description: "Marks the input as invalid and maps to error visuals" },
          { name: "className", type: "string", description: "Additional CSS classes" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Always pair inputs with visible labels. Use placeholder text as a hint, not a replacement for labels." },
        { type: "dont", text: "Use placeholder text as the only label. Users lose context once they start typing." },
      ],
      [
        { type: "do", text: "Use error state for validation failures and keep helper text concise and supportive." },
        { type: "dont", text: "Show both helper and error messages at once; error text should take precedence." },
      ],
    ],
    accessibility: [
      "Input remains a native <input> element for keyboard and screen-reader compatibility",
      "Label text is rendered above the field and should describe expected input clearly",
      "Use aria-invalid or state=\"error\" for validation error presentation",
      "Disabled and read-only states are both supported and visually distinct",
      "Focus state uses a 2px focus border token to match Figma",
    ],
  },
  tooltip: {
    previews: [
      {
        title: "Default",
        demo: <TooltipDemo />,
        code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="primary" size="icon-md" aria-label="Add item">
      <Plus className="size-5" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Add item</TooltipContent>
</Tooltip>`,
      },
      {
        title: "Placement",
        demo: <TooltipSidesDemo />,
        code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="tertiary" size="sm">Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">Tooltip on top</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="tertiary" size="sm">Right</Button>
  </TooltipTrigger>
  <TooltipContent side="right">Tooltip on right</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="tertiary" size="sm">Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="tertiary" size="sm">Left</Button>
  </TooltipTrigger>
  <TooltipContent side="left">Tooltip on left</TooltipContent>
</Tooltip>`,
      },
      {
        title: "With Inline Text",
        demo: <TooltipWithTextDemo />,
        code: `<span className="inline-flex items-center gap-1 ds-text-body-md font-medium text-grey-70">
  Hover me
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        className="inline-flex items-center justify-center text-grey-40 transition-colors hover:text-grey-60"
        aria-label="More information"
      >
        <Info className="size-3.5" />
      </button>
    </TooltipTrigger>
    <TooltipContent>
      This is additional context that appears on hover.
    </TooltipContent>
  </Tooltip>
</span>`,
      },
      {
        title: "Toolbar Example",
        demo: <TooltipToolbarDemo />,
        code: `<div className="inline-flex items-center gap-0.5 rounded-[8px] border border-grey-20 bg-white p-1">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon-sm" aria-label="Bold">
        <Bold className="size-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Bold</TooltipContent>
  </Tooltip>
  {/* ...more toolbar buttons */}
</div>`,
      },
    ],
    propsTables: [
      {
        title: "TooltipContent",
        props: [
          { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side the tooltip appears on" },
          { name: "sideOffset", type: "number", default: "8", description: "Distance in pixels from the trigger element" },
          { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment along the trigger edge" },
          { name: "alignOffset", type: "number", default: "0", description: "Offset in pixels from the alignment edge" },
          { name: "className", type: "string", description: "Additional CSS classes" },
          { name: "children", type: "ReactNode", required: true, description: "Tooltip content (text)" },
        ],
      },
      {
        title: "TooltipProvider",
        props: [
          { name: "delayDuration", type: "number", default: "0", description: "Delay in ms before the tooltip opens on hover" },
          { name: "skipDelayDuration", type: "number", default: "300", description: "Time in ms before skipping delay when moving between tooltips" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Use tooltips to label icon-only buttons with a concise description (1-3 words). Keep tooltip text brief and scannable." },
        { type: "dont", text: "Put essential information in tooltips. Users on touch devices cannot hover, so critical content will be inaccessible." },
      ],
      [
        { type: "do", text: "Use tooltips for supplementary context like keyboard shortcuts or full text of truncated labels." },
        { type: "dont", text: "Use tooltips for interactive content (links, buttons). Use a Popover instead when the user needs to interact with the content." },
      ],
    ],
    accessibility: [
      "Tooltip uses role=\"tooltip\" with aria-describedby linking the trigger to the content",
      "Tooltip opens on hover and on focus, ensuring keyboard users can access it",
      "Pressing Escape closes the tooltip",
      "Tooltip content is announced by screen readers when the trigger receives focus",
      "Always add aria-label to icon-only triggers so the button is accessible even without the tooltip",
      "Tooltip does not trap focus — it is purely informational",
    ],
  },
  chip: {
    previews: [
      {
        title: "Variants",
        demo: <ChipVariantsDemo />,
        code: `<Chip variant="red">Label</Chip>
<Chip variant="purple">Label</Chip>
<Chip variant="green">Label</Chip>
<Chip variant="blue">Label</Chip>
<Chip variant="orange">Label</Chip>
<Chip variant="grey">Label</Chip>
<Chip variant="outline">Label</Chip>`,
      },
      {
        title: "States",
        demo: <ChipStatesDemo />,
        code: `<Chip variant="purple" state="enabled">Enabled</Chip>
<Chip variant="purple" state="hover">Hover</Chip>
<Chip variant="purple" state="pressed">Pressed</Chip>
<Chip variant="purple" state="focus">Focus</Chip>`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "variant", type: '"red" | "purple" | "green" | "blue" | "orange" | "grey" | "outline"', default: '"grey"', description: "Color variant" },
          { name: "state", type: '"enabled" | "hover" | "pressed" | "focus"', default: '"enabled"', description: "Visual state from Figma component set" },
          { name: "onClick", type: "() => void", description: "Click handler for interactive chip behavior" },
          { name: "disabled", type: "boolean", default: "false", description: "Disables click interaction and mutes appearance" },
          { name: "className", type: "string", description: "Additional CSS classes" },
          { name: "children", type: "ReactNode", required: true, description: "Chip label text" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Use chips for tags, filters, or compact labels. Keep label text short (1–3 words)." },
        { type: "dont", text: "Use chips for primary actions; use Button instead. Avoid long sentences in chips." },
      ],
      [
        { type: "do", text: "Use state variants intentionally (enabled, hover, pressed, focus) in documentation and visual QA." },
        { type: "dont", text: "Rely on hover tooltips for chip meaning; tooltip is not part of the Chip component." },
      ],
    ],
    accessibility: [
      "Chip renders as a semantic <button> for keyboard and pointer interaction",
      "Focus appearance is represented by the dedicated focus visual state (purple border)",
      "Tooltip on hover is intentionally not implemented as part of Chip",
    ],
  },
  tag: {
    previews: [
      {
        title: "Colors",
        demo: <TagVariantsDemo />,
        code: `<Tag color="red">Label</Tag>
<Tag color="purple">Label</Tag>
<Tag color="green">Label</Tag>
<Tag color="blue">Label</Tag>
<Tag color="orange">Label</Tag>
<Tag color="grey">Label</Tag>`,
      },
      {
        title: "Darker",
        demo: <TagDarkerDemo />,
        code: `<Tag color="red" darker>Label</Tag>
<Tag color="purple" darker>Label</Tag>
<Tag color="green" darker>Label</Tag>
<Tag color="blue" darker>Label</Tag>
<Tag color="orange" darker>Label</Tag>
<Tag color="grey" darker>Label</Tag>`,
      },
      {
        title: "Inverted",
        demo: <TagInvertedDemo />,
        code: `<div className="bg-grey-100 p-sp-12 rounded-[8px]">
  <Tag color="grey" inverted>Label</Tag>
</div>`,
      },
      {
        title: "Truncation",
        demo: <TagTruncationDemo />,
        code: `<Tag color="purple" truncable>
  This is a very long tag label that should truncate
</Tag>
<Tag color="purple" truncable={false}>
  This is a very long tag label that should not truncate
</Tag>`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "color", type: '"red" | "purple" | "green" | "blue" | "orange" | "grey"', default: '"red"', description: "Color variant from Figma" },
          { name: "darker", type: "boolean", default: "false", description: "Uses the darker surface tone for the selected color" },
          { name: "inverted", type: "boolean", default: "false", description: "Inverted style (supported for grey variant)" },
          { name: "truncable", type: "boolean", default: "false", description: "When true, applies single-line truncation behavior in constrained layouts" },
          { name: "className", type: "string", description: "Additional CSS classes" },
          { name: "children", type: "ReactNode", description: "Tag label content" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Use Tag for short metadata labels and keep text concise." },
        { type: "dont", text: "Use Tag as a primary action. Use Button for interactive actions." },
      ],
      [
        { type: "do", text: "Use truncable tags in constrained layouts where label length can vary." },
        { type: "dont", text: "Rely on unlimited label width in dense UI areas." },
      ],
    ],
    accessibility: [
      "Tag is a non-interactive semantic label rendered as span content",
      "Text color and background are token-based to preserve contrast consistency",
      "Truncation keeps layout stable in constrained containers",
    ],
  },
  "top-navigation": {
    previews: [
      {
        title: "Default",
        demo: <TopNavigationDemo />,
        code: `<TopNavigation
  items={[
    { label: "Browse Marketplace", href: "#browse" },
    { label: "Solutions", href: "#solutions", parent: true, submenu: "solutions" },
    { label: "Resources", href: "#resources", parent: true, submenu: "resources" },
    { label: "About", href: "#about", parent: true, submenu: "about" },
  ]}
  logoHref="#"
  secondaryCtaLabel="Become a partner"
  primaryCtaLabel="Get in touch"
/>`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "items", type: "Array<{ label: string; href: string; parent?: boolean; submenu?: \"solutions\" | \"resources\" | \"about\"; tagText?: string }>", description: "Top-level navigation links. Parent links can open desktop sub-navigation panels." },
          { name: "activeHref", type: "string", description: "Current active navigation href. Applies active style and aria-current." },
          { name: "linkState", type: '"enabled" | "hover" | "pressed" | "focus"', default: '"enabled"', description: "Visual state override for navigation links (badge excluded)." },
          { name: "logoSrc", type: "string", default: '"/logo.svg"', description: "Logo image source from public folder" },
          { name: "logoAlt", type: "string", default: '"Defined.ai"', description: "Accessible alt text for the logo" },
          { name: "logoHref", type: "string", default: '"/"', description: "Destination when clicking the logo" },
          { name: "secondaryCtaLabel", type: "string", default: '"Become a partner"', description: "Label for the tertiary right-side action" },
          { name: "primaryCtaLabel", type: "string", default: '"Get in touch"', description: "Label for the primary right-side action" },
          { name: "mobileMenuLabel", type: "string", default: '"Open navigation menu"', description: "Accessible label for the mobile menu button" },
          { name: "mobileMenuButtonState", type: '"enabled" | "pressed"', description: "Visual state override for the mobile menu button (opened state is controlled by mobileMenuOpen)." },
          { name: "mobileMenuOpen", type: "boolean", description: "Controlled open state for the mobile menu panel" },
          { name: "defaultMobileMenuOpen", type: "boolean", default: "false", description: "Initial open state for uncontrolled mobile menu" },
          { name: "onMobileMenuOpenChange", type: "(open: boolean) => void", description: "Called when mobile menu open state changes" },
          { name: "className", type: "string", description: "Additional root classes" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Keep top-level items concise and limit them to the most important destinations." },
        { type: "dont", text: "Overload top navigation with too many links or long labels." },
      ],
      [
        { type: "do", text: "Use a clear active state so users understand where they are." },
        { type: "dont", text: "Hide all actions on mobile without providing a menu trigger." },
      ],
    ],
    accessibility: [
      "Uses semantic header and nav landmarks for screen readers",
      "Active page is exposed with aria-current on links",
      "Mobile includes an explicit menu trigger button with aria-label",
      "Primary actions remain keyboard focusable",
    ],
  },
  checkbox: {
    previews: [
      {
        title: "Default",
        demo: <CheckboxDemo />,
        code: `<label className="flex items-start gap-sp-12 cursor-pointer">
  <Checkbox id="terms" />
  <span className="ds-text-body-lg font-medium text-grey-100 pt-sp-4">
    Accept terms and conditions
  </span>
</label>`,
      },
      {
        title: "States",
        demo: <CheckboxStatesDemo />,
        code: `{/* Unchecked */}
<Checkbox />

{/* Checked */}
<Checkbox defaultChecked />

{/* Indeterminate */}
<Checkbox checked="indeterminate" />

{/* Disabled unchecked */}
<Checkbox disabled />

{/* Disabled checked */}
<Checkbox disabled defaultChecked />

{/* Disabled indeterminate */}
<Checkbox disabled checked="indeterminate" />`,
      },
      {
        title: "With Labels",
        demo: <CheckboxWithLabelDemo />,
        code: `<label className="flex items-start gap-sp-12 cursor-pointer">
  <Checkbox id="marketing" />
  <span className="ds-text-body-lg font-medium text-grey-100 pt-sp-4">
    Receive marketing emails
  </span>
</label>

<label className="flex items-start gap-sp-12 cursor-pointer">
  <Checkbox id="analytics" defaultChecked />
  <span className="ds-text-body-lg font-medium text-grey-100 pt-sp-4">
    Allow analytics tracking
  </span>
</label>`,
      },
      {
        title: "Group with Indeterminate",
        demo: <CheckboxGroupDemo />,
        code: `const [selected, setSelected] = useState<string[]>(["read"]);

const allChecked = items.every(item => selected.includes(item.id));
const someChecked = items.some(item => selected.includes(item.id));

<Checkbox
  checked={allChecked ? true : someChecked ? "indeterminate" : false}
  onCheckedChange={toggleAll}
/>

{items.map(item => (
  <Checkbox
    checked={selected.includes(item.id)}
    onCheckedChange={() => toggle(item.id)}
  />
))}`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled checked state" },
          { name: "defaultChecked", type: "boolean", default: "false", description: "Initial checked state (uncontrolled)" },
          { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void', description: "Callback when checked state changes" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the checkbox is disabled" },
          { name: "required", type: "boolean", default: "false", description: "Whether the checkbox is required in a form" },
          { name: "name", type: "string", description: "Name attribute for form submission" },
          { name: "value", type: "string", default: '"on"', description: "Value attribute for form submission" },
          { name: "className", type: "string", description: "Additional CSS classes" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Always pair checkboxes with a visible label. Use a <label> element wrapping both the checkbox and text for a larger click target." },
        { type: "dont", text: "Use a checkbox without a label. Standalone checkboxes are ambiguous and inaccessible." },
      ],
      [
        { type: "do", text: "Use the indeterminate state for parent checkboxes that represent a partially-selected group of children." },
        { type: "dont", text: "Use the indeterminate state to represent an unknown or loading value. Use a spinner or skeleton instead." },
      ],
    ],
    accessibility: [
      "Checkbox uses role=\"checkbox\" with aria-checked for screen readers",
      "Supports three aria-checked values: true, false, and mixed (indeterminate)",
      "Keyboard: Space toggles the checkbox state",
      "Always associate with a label using <label> wrapper or htmlFor/id",
      "Focus states use a visible ring (ring-2 ring-purple-70/50)",
      "Disabled checkboxes set aria-disabled and are excluded from tab order",
    ],
  },
};

export async function generateStaticParams() {
  const docs = getAllDocs("components");
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug("components", slug);
  if (!doc) return {};
  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug("components", slug);

  if (!doc) {
    notFound();
  }

  const def = componentDefs[slug];
  const isTopNavigation = slug === "top-navigation";
  const narrowSectionClass = isTopNavigation ? "mx-auto max-w-3xl" : "";

  // Pre-highlight all code snippets
  const highlightedPreviews = def
    ? await Promise.all(
        def.previews.map(async (preview) => ({
          ...preview,
          highlightedHtml: await highlightCode(preview.code),
        }))
      )
    : [];

  return (
    <article className={cn("mx-auto", isTopNavigation ? "w-full max-w-[1440px]" : "max-w-3xl")}>
      <div className={narrowSectionClass}>
        {/* Page header */}
        <div className="mb-8 border-b border-grey-10 pb-6">
          <Tag className="mb-2 inline-flex" color="purple">Component</Tag>
          <h1 className="ds-text-heading-xl font-semibold text-grey-100 mb-2">
            {doc.meta.title}
          </h1>
          <p className="ds-text-body-lg font-regular text-grey-60">
            {doc.meta.description}
          </p>
        </div>

        {/* MDX prose content (overview, when to use, etc.) */}
        <MdxRenderer source={doc.content} />
      </div>

      {def && (
        <>
          {/* Previews */}
          {highlightedPreviews.map((preview, i) => (
            <div key={i} className={cn(!(isTopNavigation && i === 0) && narrowSectionClass)}>
              {preview.title && (
                <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-3 mt-8 border-b border-grey-10 pb-2">
                  {preview.title}
                </h2>
              )}
              <ComponentPreview
                code={preview.code}
                highlightedHtml={preview.highlightedHtml}
              >
                {preview.demo}
              </ComponentPreview>
            </div>
          ))}

          {/* Interactive Playground */}
          {(slug === "button" || slug === "dropdown" || slug === "input") && (
            <div className={cn("mt-8", narrowSectionClass)}>
              <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-3 border-b border-grey-10 pb-2">
                Playground
              </h2>
              <div className="mt-6">
                <Suspense fallback={null}>
                  {slug === "button" ? (
                    <ButtonPlaygroundWrapper />
                  ) : slug === "dropdown" ? (
                    <DropdownPlaygroundWrapper />
                  ) : (
                    <InputPlaygroundWrapper />
                  )}
                </Suspense>
              </div>
            </div>
          )}

          {/* Props */}
          <div className={narrowSectionClass}>
            <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-3 mt-8 border-b border-grey-10 pb-2">
              Props
            </h2>
            {def.propsTables.map((table, i) => (
              <div key={i}>
                {table.title && (
                  <h3 className="ds-text-heading-sm font-semibold text-grey-100 mb-2 mt-4">
                    {table.title}
                  </h3>
                )}
                <PropsTable props={table.props} />
              </div>
            ))}
          </div>

          {/* Do / Don't */}
          <div className={narrowSectionClass}>
            <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-3 mt-8 border-b border-grey-10 pb-2">
              Do / Don&apos;t
            </h2>
            {def.dodonts.map((pair, i) => (
              <div key={i} className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {pair.map((item, j) => (
                  <DoDont key={j} type={item.type}>
                    {item.text}
                  </DoDont>
                ))}
              </div>
            ))}
          </div>

          {/* Accessibility */}
          <div className={narrowSectionClass}>
            <h2 className="ds-text-heading-md font-semibold text-grey-100 mb-3 mt-8 border-b border-grey-10 pb-2">
              Accessibility
            </h2>
            <ul className="mb-4 ml-6 list-disc space-y-1 ds-text-body-md font-regular text-grey-70">
              {def.accessibility.map((note, i) => (
                <li key={i} className="leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </div>

        </>
      )}
    </article>
  );
}
