import { Tag } from "@/components/ui/tag";

export function TagVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-sp-4">
      <Tag color="red">Label</Tag>
      <Tag color="purple">Label</Tag>
      <Tag color="green">Label</Tag>
      <Tag color="blue">Label</Tag>
      <Tag color="orange">Label</Tag>
      <Tag color="grey">Label</Tag>
    </div>
  );
}

export function TagDarkerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-sp-4">
      <Tag color="red" darker>Label</Tag>
      <Tag color="purple" darker>Label</Tag>
      <Tag color="green" darker>Label</Tag>
      <Tag color="blue" darker>Label</Tag>
      <Tag color="orange" darker>Label</Tag>
      <Tag color="grey" darker>Label</Tag>
    </div>
  );
}

export function TagInvertedDemo() {
  return (
    <div className="inline-flex rounded-[8px] bg-grey-100 p-sp-12">
      <Tag color="grey" inverted>Label</Tag>
    </div>
  );
}

export function TagTruncationDemo() {
  return (
    <div className="flex flex-col items-start gap-sp-8">
      <Tag color="purple" truncable>
        This is a very long tag label that should truncate
      </Tag>
      <Tag color="purple" truncable={false}>
        This is a very long tag label that should not truncate
      </Tag>
    </div>
  );
}
