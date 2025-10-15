import { PromptTextareaProps } from '@/types/PromptTextareaProps';
import { PromptTextareaImpl } from '@/implementation/promptTextarea';
import React from 'react';

export const PromptTextarea = React.forwardRef<
  HTMLTextAreaElement,
  PromptTextareaProps
>((props, ref) => {
  return <PromptTextareaImpl ref={ref} {...props} />;
});

PromptTextarea.displayName = 'PromptTextarea';
