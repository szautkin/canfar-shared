// src/app/components/FormLabel/FormLabel.tsx
import { FormLabelProps } from '@/types/FormControlProps';
import { FormLabelImpl } from '@/implementation/formLabel';
import React from 'react';

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    return <FormLabelImpl ref={ref} {...props} />;
  }
);

FormLabel.displayName = 'FormLabel';
