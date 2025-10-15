// src/components/Card/CardMedia.tsx
import { CardMediaProps } from '@/types/CardProps';
import { CardMediaImpl } from '@/implementation/card';
import React from 'react';

export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  (props, ref) => {
    return <CardMediaImpl ref={ref} {...props} />;
  }
);

CardMedia.displayName = 'CardMedia';
