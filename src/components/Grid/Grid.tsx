import { GridProps } from '@/types/GridProps';
import { GridImpl } from '@/implementation/grid';
import React from 'react';

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (props, ref) => {
    return <GridImpl ref={ref} {...props} />;
  }
);

Grid.displayName = 'Grid';
