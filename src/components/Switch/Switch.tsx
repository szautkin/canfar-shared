// src/app/components/Switch/Switch.tsx
import { SwitchProps } from '@/types/SwitchProps';
import { SwitchImpl } from '@/implementation/switch';
import React from 'react';

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => {
    return <SwitchImpl ref={ref} {...props} />;
  }
);

Switch.displayName = 'Switch';
