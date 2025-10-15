'use client';

import { FormHelperText as MuiFormHelperText } from '@mui/material';
import { FormHelperTextProps } from '@/types/FormControlProps';
import { tokens } from '@/design-system/tokens';
import React from 'react';

export const FormHelperTextImpl = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>(({ sx, ...props }, ref) => {
  return (
    <MuiFormHelperText
      ref={ref}
      sx={{
        fontSize: tokens.typography.fontSize.sm,
        marginTop: 0.5,
        ...sx,
      }}
      {...props}
    />
  );
});

FormHelperTextImpl.displayName = 'FormHelperTextImpl';
