// src/app/components/Slider/Slider.tsx
import { SliderProps } from '@/types/SliderProps';
import { SliderImpl } from '@/implementation/slider';
import React from 'react';

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  (props, ref) => {
    return <SliderImpl ref={ref} {...props} />;
  }
);

Slider.displayName = 'Slider';
