import { APIKeyInputProps } from '@/types/APIKeyInputProps';
import { APIKeyInputImpl } from '@/implementation/apiKeyInput';
import React from 'react';

export const APIKeyInput = React.forwardRef<HTMLDivElement, APIKeyInputProps>(
  (props, ref) => {
    return <APIKeyInputImpl ref={ref} {...props} />;
  }
);

APIKeyInput.displayName = 'APIKeyInput';
