import { TopNavigation } from "@/components/ui/top-navigation";
import { FrameSizeReporter } from "@/components/qa/FrameSizeReporter";

const qaItems = [
  { label: "Browse Marketplace", href: "#" },
  { label: "Solutions", href: "#", parent: true, submenu: "solutions" as const },
  { label: "Resources", href: "#", parent: true, submenu: "resources" as const },
  { label: "About", href: "#", parent: true, submenu: "about" as const },
];

export default function TopNavigationVisualQaFramePage() {
  return (
    <main className="m-0 bg-white p-0">
      <FrameSizeReporter />
      <TopNavigation
        items={qaItems}
        logoHref="#"
        primaryCtaLabel="Get in touch"
        secondaryCtaLabel="Become a partner"
      />
    </main>
  );
}
