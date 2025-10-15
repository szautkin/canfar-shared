'use client';

import { FormLabel as MuiFormLabel } from '@mui/material';
import { FormLabelProps } from '@/types/FormControlProps';
import { tokens } from '@/design-system/tokens';
import React from 'react';

export const FormLabelImpl = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ sx, ...props }, ref) => {
    return (
      <MuiFormLabel
        ref={ref}
        sx={{
          fontSize: tokens.typography.fontSize.base,
          marginBottom: 1,
          ...sx,
        }}
        {...props}
      />
    );
  }
);

FormLabelImpl.displayName = 'FormLabelImpl';
