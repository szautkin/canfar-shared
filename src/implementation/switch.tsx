'use client';

import {
  Switch as MuiSwitch,
  FormControlLabel,
  FormHelperText,
  Box,
} from '@mui/material';
import { SwitchProps } from '@/types/SwitchProps';
import { tokens } from '@/design-system/tokens';
import React from 'react';

const sizeMapping = {
  sm: 'small',
  md: 'medium',
  lg: 'medium', // MUI doesn't have large, we'll handle with sx
} as const;

export const SwitchImpl = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      label,
      labelPlacement = 'end',
      size = 'md',
      error = false,
      helperText,
      formControlLabelProps,
      sx,
      ...props
    },
    ref
  ) => {
    const muiSize = sizeMapping[size];

    const switchSx = {
      ...(size === 'lg' && {
        width: 52,
        height: 32,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: '4px',
          '&.Mui-checked': {
            transform: 'translateX(20px)',
          },
        },
        '& .MuiSwitch-thumb': {
          width: 24,
          height: 24,
        },
        '& .MuiSwitch-track': {
          borderRadius: 16,
        },
      }),
      ...(error && {
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: 'error.main',
          '& + .MuiSwitch-track': {
            backgroundColor: 'error.main',
          },
        },
      }),
      ...sx,
    };

    const switchComponent = (
      <MuiSwitch ref={ref} size={muiSize} sx={switchSx} {...props} />
    );

    if (!label && !helperText) {
      return switchComponent;
    }

    return (
      <Box>
        {label ? (
          <FormControlLabel
            control={switchComponent}
            label={label}
            labelPlacement={labelPlacement}
            sx={{
              margin: 0,
              '& .MuiFormControlLabel-label': {
                fontSize: tokens.typography.fontSize.base,
                color: error ? 'error.main' : 'text.primary',
              },
            }}
            {...formControlLabelProps}
          />
        ) : (
          switchComponent
        )}
        {helperText && (
          <FormHelperText
            error={error}
            sx={{
              marginLeft: label ? 4 : 0,
              fontSize: tokens.typography.fontSize.sm,
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  }
);

SwitchImpl.displayName = 'SwitchImpl';
