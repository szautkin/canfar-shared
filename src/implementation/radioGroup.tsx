'use client';

import {
  RadioGroup as MuiRadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { RadioGroupProps } from '@/types/RadioProps';
import { tokens } from '@/design-system/tokens';
import React from 'react';

const sizeMapping = {
  sm: 'small',
  md: 'medium',
  lg: 'medium',
} as const;

export const RadioGroupImpl = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      error = false,
      helperText,
      required = false,
      options = [],
      size = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const muiSize = sizeMapping[size];

    const radioGroupContent =
      options.length > 0
        ? options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={
                <Radio
                  size={muiSize}
                  sx={{
                    ...(size === 'lg' && {
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                      },
                    }),
                  }}
                />
              }
              label={option.label}
              disabled={option.disabled}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: tokens.typography.fontSize.base,
                },
              }}
            />
          ))
        : children;

    const radioGroup = (
      <MuiRadioGroup ref={ref} {...props}>
        {radioGroupContent}
      </MuiRadioGroup>
    );

    if (!label && !helperText) {
      return radioGroup;
    }

    return (
      <FormControl error={error} required={required}>
        {label && (
          <FormLabel
            sx={{
              fontSize: tokens.typography.fontSize.base,
              marginBottom: 1,
            }}
          >
            {label}
          </FormLabel>
        )}
        {radioGroup}
        {helperText && (
          <FormHelperText
            sx={{
              fontSize: tokens.typography.fontSize.sm,
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

RadioGroupImpl.displayName = 'RadioGroupImpl';
