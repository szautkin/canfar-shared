'use client';

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Slider,
  TextField,
  Stack,
} from '@mui/material';
import { ResourceSliderInputProps } from '@/types/ResourceSliderInputProps';
import { tokens } from '@/design-system/tokens';
import React, { useState, useCallback } from 'react';

const sizeMapping = {
  sm: 'small' as const,
  md: 'medium' as const,
  lg: 'medium' as const,
};

export const ResourceSliderInputImpl = React.forwardRef<
  HTMLDivElement,
  ResourceSliderInputProps
>((props, ref) => {
  const {
    label,
    value,
    onChange,
    min = 1,
    max = 192,
    step = 1,
    unit = '',
    disabled = false,
    error = false,
    helperText,
    showMarks = false,
    size = 'md',
    'aria-label': ariaLabel,
  } = props;

  const [inputValue, setInputValue] = useState<string>(value.toString());

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      const numValue = Array.isArray(newValue) ? newValue[0] : newValue;
      onChange(numValue);
      setInputValue(numValue.toString());
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);

      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        onChange(numValue);
      }
    },
    [min, max, onChange]
  );

  const handleInputBlur = useCallback(() => {
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue < min) {
      setInputValue(min.toString());
      onChange(min);
    } else if (numValue > max) {
      setInputValue(max.toString());
      onChange(max);
    } else {
      setInputValue(numValue.toString());
      onChange(numValue);
    }
  }, [inputValue, min, max, onChange]);

  const muiSize = sizeMapping[size];

  return (
    <FormControl fullWidth error={error} ref={ref}>
      <FormLabel
        sx={{
          fontSize: tokens.typography.fontSize.base,
          marginBottom: 2,
          fontWeight: tokens.typography.fontWeight.medium,
        }}
      >
        {label}
      </FormLabel>
      <Stack spacing={2}>
        <Box sx={{ paddingX: 1.5 }}>
          <Slider
            value={value}
            onChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            marks={showMarks}
            size={muiSize}
            valueLabelDisplay="auto"
            aria-label={ariaLabel || label}
            sx={{
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
                },
              }),
            }}
          />
        </Box>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabled}
          error={error}
          size={muiSize}
          type="number"
          inputProps={{
            min,
            max,
            step,
            'aria-label': `${label} input`,
          }}
          slotProps={{
            input: {
              endAdornment: unit ? (
                <Box
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    fontSize: tokens.typography.fontSize.sm,
                    ml: 1,
                  }}
                >
                  {unit}
                </Box>
              ) : undefined,
            },
          }}
          sx={{
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '& input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
          }}
        />
      </Stack>
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
});

ResourceSliderInputImpl.displayName = 'ResourceSliderInputImpl';
