'use client';

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  IconButton,
  Stack,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { ResourceStepperInputProps } from '@/types/ResourceStepperInputProps';
import { tokens } from '@/design-system/tokens';
import React, { useState, useCallback } from 'react';

const sizeMapping = {
  sm: 'small' as const,
  md: 'medium' as const,
  lg: 'medium' as const,
};

export const ResourceStepperInputImpl = React.forwardRef<
  HTMLDivElement,
  ResourceStepperInputProps
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
    size = 'md',
    'aria-label': ariaLabel,
  } = props;

  const [inputValue, setInputValue] = useState<string>(value.toString());

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
    setInputValue(newValue.toString());
  }, [value, step, max, onChange]);

  const handleDecrement = useCallback(() => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
    setInputValue(newValue.toString());
  }, [value, step, min, onChange]);

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
  const iconSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium';

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
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          size={iconSize}
          aria-label="Decrease value"
          sx={{
            border: 1,
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
        >
          <Remove fontSize={iconSize} />
        </IconButton>
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
            'aria-label': ariaLabel || label,
            style: { textAlign: 'center' },
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
            flex: 1,
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
        <IconButton
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          size={iconSize}
          aria-label="Increase value"
          sx={{
            border: 1,
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
        >
          <Add fontSize={iconSize} />
        </IconButton>
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

ResourceStepperInputImpl.displayName = 'ResourceStepperInputImpl';
