import { TextFieldProps } from '@/types/TextFieldProps';
import { TextFieldImpl } from '@/implementation/textField';
import React from 'react';

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    return <TextFieldImpl ref={ref} {...props} />;
  }
);

TextField.displayName = 'TextField';
