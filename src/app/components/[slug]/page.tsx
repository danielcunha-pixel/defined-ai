import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocs } from "@/lib/mdx";
import { MdxRenderer } from "@/components/docs/MdxRenderer";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoDont } from "@/components/docs/DoDont";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { highlightCode } from "@/lib/highlight";

// Demo components
import {
  ButtonDemo,
  ButtonSizesDemo,
  ButtonWithIconsDemo,
  ButtonDisabledDemo,
  ButtonDestructiveDemo,
  ButtonDarkDemo,
} from "@/components/demos/button-demo";
import {
  InputDemo,
  InputStatesDemo,
  InputWithLabelDemo,
} from "@/components/demos/input-demo";
import {
  CardDemo,
  CardWithFormDemo,
  CardVariantsDemo,
} from "@/components/demos/card-demo";
import {
  TooltipDemo,
  TooltipSidesDemo,
  TooltipWithTextDemo,
  TooltipToolbarDemo,
} from "@/components/demos/tooltip-demo";

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
        title: "Destructive",
        demo: <ButtonDestructiveDemo />,
        code: `<Button variant="destructive">
  <Trash2 className="size-4" />
  Delete
</Button>`,
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
          { name: "variant", type: '"primary" | "secondary" | "tertiary" | "ghost" | "ghost-secondary" | "primary-inverted" | "primary-footer" | "glass" | "link" | "destructive"', default: '"primary"', description: "Visual style of the button" },
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
  input: {
    previews: [
      {
        title: "Default",
        demo: <InputDemo />,
        code: `<Input placeholder="Enter your email" type="email" />`,
      },
      {
        title: "States",
        demo: <InputStatesDemo />,
        code: `<Input placeholder="Default" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Invalid" aria-invalid="true" />`,
      },
      {
        title: "With Label & Helper Text",
        demo: <InputWithLabelDemo />,
        code: `<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="ds-text-body-md font-medium">
    Email
  </label>
  <Input id="email" placeholder="you@example.com" type="email" />
  <p className="ds-text-body-sm font-regular text-grey-50">
    We'll never share your email.
  </p>
</div>`,
      },
    ],
    propsTables: [
      {
        props: [
          { name: "type", type: "string", default: '"text"', description: "HTML input type (text, email, password, etc.)" },
          { name: "placeholder", type: "string", description: "Placeholder text shown when empty" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled" },
          { name: "aria-invalid", type: "boolean", description: "Marks the input as invalid with error styling" },
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
        { type: "do", text: "Use the appropriate input type (email, password, tel) for better mobile keyboard support and validation." },
        { type: "dont", text: "Use type=\"text\" for everything. Missing type hints degrades mobile UX and accessibility." },
      ],
    ],
    accessibility: [
      "Always associate inputs with a <label> using htmlFor/id",
      "Use aria-invalid for error states",
      "Use aria-describedby to connect helper/error text",
      "Focus states use a visible ring for keyboard users",
      "Disabled inputs are excluded from tab order automatically",
    ],
  },
  card: {
    previews: [
      {
        title: "Default",
        demo: <CardDemo />,
        code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Project Overview</CardTitle>
    <CardDescription>
      A summary of your project status.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your project has 12 active tasks.</p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="primary" size="sm">View Details</Button>
    <Button variant="ghost" size="sm">Dismiss</Button>
  </CardFooter>
</Card>`,
      },
      {
        title: "With Form",
        demo: <CardWithFormDemo />,
        code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Create Project</CardTitle>
    <CardDescription>Set up a new project.</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-3">
    <div className="flex flex-col gap-1.5">
      <label className="ds-text-body-md font-medium">Name</label>
      <Input placeholder="My Project" />
    </div>
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="primary" size="sm">Create</Button>
    <Button variant="tertiary" size="sm">Cancel</Button>
  </CardFooter>
</Card>`,
      },
      {
        title: "Custom Styling",
        demo: <CardVariantsDemo />,
        code: `<Card>
  <CardHeader>
    <CardTitle>Default Card</CardTitle>
  </CardHeader>
</Card>

<Card className="border-purple-20 bg-purple-10/30">
  <CardHeader>
    <CardTitle>Highlighted Card</CardTitle>
  </CardHeader>
</Card>`,
      },
    ],
    propsTables: [
      {
        title: "Card",
        props: [
          { name: "className", type: "string", description: "Additional CSS classes for the card container" },
          { name: "children", type: "ReactNode", required: true, description: "Card content (Header, Content, Footer)" },
        ],
      },
      {
        title: "CardHeader / CardContent / CardFooter",
        props: [
          { name: "className", type: "string", description: "Additional CSS classes" },
          { name: "children", type: "ReactNode", required: true, description: "Section content" },
        ],
      },
    ],
    dodonts: [
      [
        { type: "do", text: "Use cards to group logically related content. Keep content focused and scannable within each card." },
        { type: "dont", text: "Nest cards deeply or use them for every piece of content. Avoid cards with only a single line of text." },
      ],
    ],
    accessibility: [
      "Card uses semantic <div> elements with appropriate data-slot attributes",
      "Actions within cards should be focusable and keyboard accessible",
      "Use proper heading hierarchy within cards (CardTitle)",
      "Ensure sufficient color contrast for all card content",
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
        code: `<Tooltip>
  <TooltipTrigger asChild>
    <span className="inline-flex items-center gap-1 ds-text-body-md font-medium text-grey-70 cursor-default">
      Hover me
      <Info className="size-3.5 text-grey-40" />
    </span>
  </TooltipTrigger>
  <TooltipContent>
    This is additional context that appears on hover.
  </TooltipContent>
</Tooltip>`,
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
    <article>
      {/* Page header */}
      <div className="mb-8 border-b border-grey-10 pb-6">
        <div className="mb-2 inline-block rounded-full bg-purple-10 px-2.5 py-0.5 ds-text-body-sm font-medium text-purple-70">
          Component
        </div>
        <h1 className="ds-text-heading-xl font-semibold text-grey-100 mb-2">
          {doc.meta.title}
        </h1>
        <p className="ds-text-body-lg font-regular text-grey-60">
          {doc.meta.description}
        </p>
      </div>

      {/* MDX prose content (overview, when to use, etc.) */}
      <MdxRenderer source={doc.content} />

      {def && (
        <>
          {/* Previews */}
          {highlightedPreviews.map((preview, i) => (
            <div key={i}>
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

          {/* Props */}
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

          {/* Do / Don't */}
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

          {/* Accessibility */}
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
        </>
      )}
    </article>
  );
}
