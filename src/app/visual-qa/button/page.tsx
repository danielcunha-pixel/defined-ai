import { Button } from "@/components/ui/button";
import { IconCheck } from "@/components/icons";

type BreakpointSpec = {
  name: string;
  viewportWidth: number;
  responsive: boolean;
};

const breakpointSpecs: BreakpointSpec[] = [
  {
    name: "Desktop",
    viewportWidth: 1024,
    responsive: false,
  },
  {
    name: "Tablet",
    viewportWidth: 768,
    responsive: true,
  },
  {
    name: "Mobile",
    viewportWidth: 360,
    responsive: true,
  },
];

export default function ButtonVisualQaPage() {
  return (
    <div className="flex flex-col gap-sp-32">
      <header className="flex flex-col gap-sp-8">
        <h1 className="ds-text-heading-lg font-semibold text-grey-100">Button QA</h1>
        <p className="ds-text-body-lg font-regular text-grey-70">
          Breakpoint validation for button behavior and sizing.
        </p>
      </header>
      {breakpointSpecs.map((spec) => (
        <section key={spec.name} className="flex flex-col gap-sp-12">
          <h2 className="ds-text-heading-sm font-semibold text-grey-100">
            {spec.name} Preview ({spec.viewportWidth}px)
          </h2>
          <div className="overflow-x-auto rounded-[12px] border border-grey-20 bg-white p-sp-16">
            <div
              className="flex min-w-max flex-col gap-sp-12"
              style={{ width: spec.viewportWidth }}
              data-qa-breakpoint={spec.name.toLowerCase()}
            >
              <div className="flex flex-wrap items-center gap-sp-8">
                <Button variant="primary" size="sm" responsive={spec.responsive}>Primary</Button>
                <Button variant="secondary" size="md" responsive={spec.responsive}>Secondary</Button>
                <Button variant="tertiary" size="lg" responsive={spec.responsive}>Tertiary</Button>
                <Button variant="ghost" size="md" responsive={spec.responsive}>Ghost</Button>
              </div>
              <div className="flex flex-wrap items-center gap-sp-8">
                <Button variant="primary" size="sm" trailingIcon={<IconCheck size="md" />} responsive={spec.responsive}>
                  Right icon
                </Button>
                <Button variant="secondary" size="md" leadingIcon={<IconCheck size="md" />} responsive={spec.responsive}>
                  Left icon
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  iconOnly
                  aria-label={`${spec.name} icon only`}
                  responsive={spec.responsive}
                >
                  <IconCheck size="md" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
