import { ResourceSliderInputProps } from '@/types/ResourceSliderInputProps';
import { ResourceSliderInputImpl } from '@/implementation/resourceSliderInput';
import React from 'react';

export const ResourceSliderInput = React.forwardRef<
  HTMLDivElement,
  ResourceSliderInputProps
>((props, ref) => {
  return <ResourceSliderInputImpl ref={ref} {...props} />;
});

ResourceSliderInput.displayName = 'ResourceSliderInput';
