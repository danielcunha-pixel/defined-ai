import { ViewportIframe } from "@/components/qa/ViewportIframe";

type BreakpointSpec = {
  name: string;
  viewportWidth: number;
  initialHeight: number;
};

const breakpointSpecs: BreakpointSpec[] = [
  {
    name: "Desktop",
    viewportWidth: 1440,
    initialHeight: 860,
  },
  {
    name: "Tablet",
    viewportWidth: 768,
    initialHeight: 980,
  },
  {
    name: "Mobile",
    viewportWidth: 375,
    initialHeight: 1180,
  },
];

export default function FooterVisualQaPage() {
  return (
    <div className="flex flex-col gap-sp-32">
      <header className="flex flex-col gap-sp-8">
        <h1 className="ds-text-heading-lg font-semibold text-grey-100">Footer QA</h1>
        <p className="ds-text-body-lg font-regular text-grey-70">
          Breakpoint validation for footer layout and responsive behavior.
        </p>
      </header>
      {breakpointSpecs.map((spec) => (
        <section key={spec.name} className="flex flex-col gap-sp-12">
          <h2 className="ds-text-heading-sm font-semibold text-grey-100">
            {spec.name} Preview ({spec.viewportWidth}px)
          </h2>
          <ViewportIframe
            frameId={`footer-${spec.name.toLowerCase()}`}
            src="/visual-qa/footer/frame"
            title={`Footer ${spec.name} ${spec.viewportWidth}px`}
            viewportWidth={spec.viewportWidth}
            initialHeight={spec.initialHeight}
          />
        </section>
      ))}
    </div>
  );
}
