import React from 'react';
import { PaperImplementation } from '@/implementation/paper';
import { PaperProps } from '@/types/PaperProps';

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  (props, ref) => {
    return <PaperImplementation ref={ref} {...props} />;
  }
);

Paper.displayName = 'Paper';
