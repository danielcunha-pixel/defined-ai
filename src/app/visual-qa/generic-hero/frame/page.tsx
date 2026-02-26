import { GenericHero } from "@/components/building-blocks/generic-hero";
import { FrameSizeReporter } from "@/components/qa/FrameSizeReporter";

export default function GenericHeroVisualQaFramePage() {
  return (
    <main className="m-0 bg-white p-0">
      <FrameSizeReporter />
      <GenericHero />
    </main>
  );
}
