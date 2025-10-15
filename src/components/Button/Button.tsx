// src/components/Button/Button.tsx
import { ButtonProps } from '@/types/ButtonProps';
import { ButtonImpl } from '@/implementation/button';
import React from 'react';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <ButtonImpl ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';
