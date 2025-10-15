// src/app/components/RadioGroup/RadioGroup.tsx
import { RadioGroupProps } from '@/types/RadioProps';
import { RadioGroupImpl } from '@/implementation/radioGroup';
import React from 'react';

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    return <RadioGroupImpl ref={ref} {...props} />;
  }
);

RadioGroup.displayName = 'RadioGroup';
