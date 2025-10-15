'use client';

import { FormControl as MuiFormControl } from '@mui/material';
import { FormControlProps } from '@/types/FormControlProps';
import { tokens } from '@/design-system/tokens';
import React from 'react';

export const FormControlImpl = React.forwardRef<
  HTMLDivElement,
  FormControlProps
>(({ sx, ...props }, ref) => {
  return (
    <MuiFormControl
      ref={ref}
      sx={{
        '& .MuiFormLabel-root': {
          fontSize: tokens.typography.fontSize.base,
        },
        '& .MuiFormHelperText-root': {
          fontSize: tokens.typography.fontSize.sm,
        },
        ...sx,
      }}
      {...props}
    />
  );
});

FormControlImpl.displayName = 'FormControlImpl';
