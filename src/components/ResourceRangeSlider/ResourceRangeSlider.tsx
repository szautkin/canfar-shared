import { ResourceRangeSliderProps } from '@/types/ResourceRangeSliderProps';
import { ResourceRangeSliderImpl } from '@/implementation/resourceRangeSlider';
import React from 'react';

export const ResourceRangeSlider = React.forwardRef<
  HTMLDivElement,
  ResourceRangeSliderProps
>((props, ref) => {
  return <ResourceRangeSliderImpl ref={ref} {...props} />;
});

ResourceRangeSlider.displayName = 'ResourceRangeSlider';
