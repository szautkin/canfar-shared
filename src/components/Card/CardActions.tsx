// src/components/Card/CardActions.tsx
import { CardActionsProps } from '@/types/CardProps';
import { CardActionsImpl } from '@/implementation/card';
import React from 'react';

export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  (props, ref) => {
    return <CardActionsImpl ref={ref} {...props} />;
  }
);

CardActions.displayName = 'CardActions';
