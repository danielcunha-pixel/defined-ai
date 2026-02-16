import { TopNavigation } from "@/components/ui/top-navigation";

const defaultItems = [
  { label: "Browse Marketplace", href: "#browse" },
  { label: "Solutions", href: "#solutions", parent: true, submenu: "solutions" as const },
  { label: "Resources", href: "#resources", parent: true, submenu: "resources" as const },
  { label: "About", href: "#about", parent: true, submenu: "about" as const },
];

export function TopNavigationDemo() {
  return (
    <div className="w-full max-w-[1440px] min-h-[560px]">
      <TopNavigation
        items={defaultItems}
        logoHref="#"
        secondaryCtaLabel="Become a partner"
        primaryCtaLabel="Get in touch"
      />
    </div>
  );
}
