import { Footer } from "@/components/ui/footer";
import { FrameSizeReporter } from "@/components/qa/FrameSizeReporter";

export default function FooterVisualQaFramePage() {
  return (
    <main className="m-0 bg-white p-0">
      <FrameSizeReporter />
      <Footer />
    </main>
  );
}
