// src/components/Card/Card.tsx
import { CardProps } from '@/types/CardProps';
import { CardImpl } from '@/implementation/card';
import React from 'react';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    return <CardImpl ref={ref} {...props} />;
  }
);

Card.displayName = 'Card';
