'use client';

import {
  Slider as MuiSlider,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from '@mui/material';
import { SliderProps } from '@/types/SliderProps';
import { tokens } from '@/design-system/tokens';
import React from 'react';

const sizeMapping = {
  sm: 'small',
  md: 'medium',
  lg: 'medium', // We'll handle large with custom styles
} as const;

export const SliderImpl = React.forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      label,
      size = 'md',
      error = false,
      helperText,
      showValueLabel = false,
      valueLabelDisplay = 'auto',
      sx,
      ...props
    },
    ref
  ) => {
    const muiSize = sizeMapping[size];

    const sliderSx = {
      ...(size === 'lg' && {
        height: 10,
        '& .MuiSlider-track': {
          height: 10,
        },
        '& .MuiSlider-rail': {
          height: 10,
        },
        '& .MuiSlider-thumb': {
          height: 28,
          width: 28,
          '&:hover': {
            boxShadow: '0 0 0 10px rgba(25, 118, 210, 0.16)',
          },
          '&.Mui-focusVisible': {
            boxShadow: '0 0 0 10px rgba(25, 118, 210, 0.16)',
          },
        },
        '& .MuiSlider-valueLabel': {
          fontSize: tokens.typography.fontSize.base,
        },
      }),
      ...(error && {
        color: 'error.main',
        '& .MuiSlider-thumb': {
          color: 'error.main',
        },
        '& .MuiSlider-track': {
          color: 'error.main',
        },
      }),
      width: '100%',
      ...sx,
    };

    const slider = (
      <MuiSlider
        ref={ref}
        size={muiSize}
        valueLabelDisplay={showValueLabel ? valueLabelDisplay : 'off'}
        sx={sliderSx}
        {...props}
      />
    );

    if (!label && !helperText) {
      return slider;
    }

    return (
      <FormControl fullWidth error={error}>
        {label && (
          <FormLabel
            sx={{
              fontSize: tokens.typography.fontSize.base,
              marginBottom: 2,
            }}
          >
            {label}
          </FormLabel>
        )}
        <Box sx={{ paddingX: 1.5 }}>{slider}</Box>
        {helperText && (
          <FormHelperText
            sx={{
              fontSize: tokens.typography.fontSize.sm,
              marginTop: 1,
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

SliderImpl.displayName = 'SliderImpl';
