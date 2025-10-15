// src/app/components/FormHelperText/FormHelperText.tsx
import { FormHelperTextProps } from '@/types/FormControlProps';
import { FormHelperTextImpl } from '@/implementation/formHelperText';
import React from 'react';

export const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>((props, ref) => {
  return <FormHelperTextImpl ref={ref} {...props} />;
});

FormHelperText.displayName = 'FormHelperText';
