import { Chip } from "@/components/ui/chip";

export function ChipVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-sp-4">
      <Chip variant="red">Label</Chip>
      <Chip variant="purple">Label</Chip>
      <Chip variant="green">Label</Chip>
      <Chip variant="blue">Label</Chip>
      <Chip variant="orange">Label</Chip>
      <Chip variant="grey">Label</Chip>
      <Chip variant="outline">Label</Chip>
    </div>
  );
}

export function ChipStatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-sp-4">
      <Chip variant="purple" state="enabled">Enabled</Chip>
      <Chip variant="purple" state="hover">Hover</Chip>
      <Chip variant="purple" state="pressed">Pressed</Chip>
      <Chip variant="purple" state="focus">Focus</Chip>
    </div>
  );
}
