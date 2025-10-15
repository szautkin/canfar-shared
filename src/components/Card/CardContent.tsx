// src/components/Card/CardContent.tsx
import { CardContentProps } from '@/types/CardProps';
import { CardContentImpl } from '@/implementation/card';
import React from 'react';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (props, ref) => {
    return <CardContentImpl ref={ref} {...props} />;
  }
);

CardContent.displayName = 'CardContent';
