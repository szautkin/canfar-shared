import { ResourceStepperInputProps } from '@/types/ResourceStepperInputProps';
import { ResourceStepperInputImpl } from '@/implementation/resourceStepperInput';
import React from 'react';

export const ResourceStepperInput = React.forwardRef<
  HTMLDivElement,
  ResourceStepperInputProps
>((props, ref) => {
  return <ResourceStepperInputImpl ref={ref} {...props} />;
});

ResourceStepperInput.displayName = 'ResourceStepperInput';
