import { DualResourceSelectorProps } from '@/types/DualResourceSelectorProps';
import { DualResourceSelectorImpl } from '@/implementation/dualResourceSelector';
import React from 'react';

export const DualResourceSelector = React.forwardRef<
  HTMLDivElement,
  DualResourceSelectorProps
>((props, ref) => {
  return <DualResourceSelectorImpl ref={ref} {...props} />;
});

DualResourceSelector.displayName = 'DualResourceSelector';
