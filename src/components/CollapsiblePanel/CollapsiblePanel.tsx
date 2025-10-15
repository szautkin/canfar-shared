import { CollapsiblePanelProps } from '@/types/CollapsiblePanelProps';
import { CollapsiblePanelImpl } from '@/implementation/collapsiblePanel';
import React from 'react';

export const CollapsiblePanel = React.forwardRef<
  HTMLDivElement,
  CollapsiblePanelProps
>((props, ref) => {
  return <CollapsiblePanelImpl ref={ref} {...props} />;
});

CollapsiblePanel.displayName = 'CollapsiblePanel';
