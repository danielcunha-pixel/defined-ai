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
    initialHeight: 112,
  },
  {
    name: "Tablet",
    viewportWidth: 768,
    initialHeight: 112,
  },
  {
    name: "Mobile",
    viewportWidth: 360,
    initialHeight: 112,
  },
];

export default function TopNavigationVisualQaPage() {
  return (
    <div className="flex flex-col gap-sp-32">
      <header className="flex flex-col gap-sp-8">
        <h1 className="ds-text-heading-lg font-semibold text-grey-100">Top navigation QA</h1>
        <p className="ds-text-body-lg font-regular text-grey-70">
          Breakpoint validation for top-navigation layout and behavior.
        </p>
      </header>
      {breakpointSpecs.map((spec) => (
        <section key={spec.name} className="flex flex-col gap-sp-12">
          <h2 className="ds-text-heading-sm font-semibold text-grey-100">
            {spec.name} Preview ({spec.viewportWidth}px)
          </h2>
          <ViewportIframe
            frameId={`top-navigation-${spec.name.toLowerCase()}`}
            src="/visual-qa/top-navigation/frame"
            title={`Top navigation ${spec.name} ${spec.viewportWidth}px`}
            viewportWidth={spec.viewportWidth}
            initialHeight={spec.initialHeight}
          />
        </section>
      ))}
    </div>
  );
}
