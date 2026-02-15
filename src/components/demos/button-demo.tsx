"use client";

import { Button } from "@/components/ui/button";
import { IconChevronRight, IconCheck, IconDownloadCloud } from "@/components/icons";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
}

export function ButtonWithIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" size="lg">
        Continue
        <IconChevronRight size="md" />
      </Button>
      <Button variant="secondary" size="md">
        <IconCheck size="md" />
        Add item
      </Button>
      <Button variant="tertiary" size="md">
        <IconDownloadCloud size="md" />
        Download
      </Button>
      <Button variant="tertiary" size="icon-md" aria-label="Add item">
        <IconCheck size="md" />
      </Button>
    </div>
  );
}

export function ButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="tertiary" disabled>
        Disabled
      </Button>
    </div>
  );
}

export function ButtonDarkDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[12px] bg-grey-100 p-6">
      <Button variant="primary-inverted">Inverted</Button>
      <Button variant="primary-footer">Footer CTA</Button>
      <Button variant="ghost-secondary">Ghost</Button>
      <Button variant="glass">Glass</Button>
    </div>
  );
}
