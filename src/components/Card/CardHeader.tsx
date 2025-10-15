// src/components/Card/CardHeader.tsx
import { CardHeaderProps } from '@/types/CardProps';
import { CardHeaderImpl } from '@/implementation/card';
import React from 'react';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    return <CardHeaderImpl ref={ref} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';
