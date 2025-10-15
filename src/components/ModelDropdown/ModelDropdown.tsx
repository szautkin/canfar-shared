import { ModelDropdownProps } from '@/types/ModelDropdownProps';
import { ModelDropdownImpl } from '@/implementation/modelDropdown';
import React from 'react';

export const ModelDropdown = React.forwardRef<
  HTMLDivElement,
  ModelDropdownProps
>((props, ref) => {
  return <ModelDropdownImpl ref={ref} {...props} />;
});

ModelDropdown.displayName = 'ModelDropdown';
