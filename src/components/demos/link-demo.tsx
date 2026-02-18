import { IconPlaceholder } from "@/components/icons";
import { Link } from "@/components/ui/link";

export function LinkVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-x-sp-24 gap-y-sp-16">
      <Link style="white" href="#">Link</Link>
      <Link style="purple" href="#">Link</Link>
      <Link style="grey" href="#">Link</Link>
      <Link style="medium-grey" href="#">Link</Link>
      <Link style="pink" href="#">Link</Link>
      <Link style="dark-grey" href="#">Link</Link>
    </div>
  );
}

export function LinkStatesDemo() {
  return (
    <div className="flex flex-col items-start gap-sp-12">
      <div className="flex flex-wrap items-center gap-sp-16">
        <Link style="purple" state="enabled" href="#">Enabled</Link>
        <Link style="purple" state="hover" href="#">Hover</Link>
        <Link style="purple" state="pressed" href="#">Pressed</Link>
        <Link style="purple" state="focus" href="#">Focus</Link>
        <Link style="purple" state="disabled" href="#">Disabled</Link>
      </div>
      <div className="flex flex-wrap items-center gap-sp-16">
        <Link style="grey" state="enabled" href="#">Enabled</Link>
        <Link style="grey" state="hover" href="#">Hover</Link>
        <Link style="grey" state="pressed" href="#">Pressed</Link>
        <Link style="grey" state="focus" href="#">Focus</Link>
        <Link style="grey" state="disabled" href="#">Disabled</Link>
      </div>
    </div>
  );
}

export function LinkSizesDemo() {
  return (
    <div className="flex flex-wrap items-end gap-sp-16">
      <Link size="small" style="purple" href="#">Link</Link>
      <Link size="medium" style="purple" href="#">Link</Link>
      <Link size="large" style="purple" href="#">Link</Link>
    </div>
  );
}

export function LinkWithIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-sp-16">
      <Link style="purple" leftIcon={<IconPlaceholder size="sm" />} href="#">
        Link
      </Link>
      <Link style="purple" rightIcon={<IconPlaceholder size="sm" />} href="#">
        Link
      </Link>
      <Link
        style="purple"
        leftIcon={<IconPlaceholder size="sm" />}
        rightIcon={<IconPlaceholder size="sm" />}
        href="#"
      >
        Link
      </Link>
    </div>
  );
}
