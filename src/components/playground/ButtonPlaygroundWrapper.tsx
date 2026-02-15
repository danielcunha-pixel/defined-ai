'use client';

import { Button } from '@/components/ui/button';
import { ComponentPlayground } from './ComponentPlayground';
import { buttonPlaygroundConfig } from '@/components/ui/button.playground';

export function ButtonPlaygroundWrapper() {
  return (
    <ComponentPlayground
      Component={Button}
      playground={buttonPlaygroundConfig}
      componentName="Button"
    />
  );
}
