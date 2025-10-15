import { SelectProps } from '@/types/SelectProps';
import { SelectImpl } from '@/implementation/select';
import React from 'react';

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => {
    return <SelectImpl ref={ref} {...props} />;
  }
);

Select.displayName = 'Select';
