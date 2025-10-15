'use client';

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Slider,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import { ResourceRangeSliderProps } from '@/types/ResourceRangeSliderProps';
import { tokens } from '@/design-system/tokens';
import React, { useState, useCallback, useEffect } from 'react';

const sizeMapping = {
  sm: 'small' as const,
  md: 'medium' as const,
  lg: 'medium' as const,
};

export const ResourceRangeSliderImpl = React.forwardRef<
  HTMLDivElement,
  ResourceRangeSliderProps
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
    showInputs = true,
    size = 'md',
    'aria-label': ariaLabel,
  } = props;

  const [minInput, setMinInput] = useState<string>(value.min.toString());
  const [maxInput, setMaxInput] = useState<string>(value.max.toString());

  // Sync inputs with prop value changes
  useEffect(() => {
    setMinInput(value.min.toString());
    setMaxInput(value.max.toString());
  }, [value.min, value.max]);

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue) && newValue.length === 2) {
        const [newMin, newMax] = newValue;
        onChange({ min: newMin, max: newMax });
        setMinInput(newMin.toString());
        setMaxInput(newMax.toString());
      }
    },
    [onChange]
  );

  const handleMinInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setMinInput(newValue);

      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue) && numValue >= min && numValue <= value.max) {
        onChange({ ...value, min: numValue });
      }
    },
    [min, value, onChange]
  );

  const handleMaxInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setMaxInput(newValue);

      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue) && numValue <= max && numValue >= value.min) {
        onChange({ ...value, max: numValue });
      }
    },
    [max, value, onChange]
  );

  const handleMinInputBlur = useCallback(() => {
    const numValue = parseInt(minInput, 10);
    if (isNaN(numValue) || numValue < min) {
      setMinInput(min.toString());
      onChange({ ...value, min });
    } else if (numValue > value.max) {
      setMinInput(value.max.toString());
      onChange({ ...value, min: value.max });
    } else {
      setMinInput(numValue.toString());
      onChange({ ...value, min: numValue });
    }
  }, [minInput, min, value, onChange]);

  const handleMaxInputBlur = useCallback(() => {
    const numValue = parseInt(maxInput, 10);
    if (isNaN(numValue) || numValue > max) {
      setMaxInput(max.toString());
      onChange({ ...value, max });
    } else if (numValue < value.min) {
      setMaxInput(value.min.toString());
      onChange({ ...value, max: value.min });
    } else {
      setMaxInput(numValue.toString());
      onChange({ ...value, max: numValue });
    }
  }, [maxInput, max, value, onChange]);

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
            value={[value.min, value.max]}
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
        {showInputs && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: tokens.typography.fontSize.xs,
                  display: 'block',
                  mb: 0.5,
                }}
              >
                Minimum
              </Typography>
              <TextField
                value={minInput}
                onChange={handleMinInputChange}
                onBlur={handleMinInputBlur}
                disabled={disabled}
                error={error}
                size={muiSize}
                type="number"
                fullWidth
                inputProps={{
                  min,
                  max: value.max,
                  step,
                  'aria-label': `${label} minimum`,
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
            </Box>
            <Box
              sx={{
                pt: 3,
                color: 'text.secondary',
                fontSize: tokens.typography.fontSize.lg,
                fontWeight: tokens.typography.fontWeight.bold,
              }}
            >
              —
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: tokens.typography.fontSize.xs,
                  display: 'block',
                  mb: 0.5,
                }}
              >
                Maximum
              </Typography>
              <TextField
                value={maxInput}
                onChange={handleMaxInputChange}
                onBlur={handleMaxInputBlur}
                disabled={disabled}
                error={error}
                size={muiSize}
                type="number"
                fullWidth
                inputProps={{
                  min: value.min,
                  max,
                  step,
                  'aria-label': `${label} maximum`,
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
            </Box>
          </Stack>
        )}
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

ResourceRangeSliderImpl.displayName = 'ResourceRangeSliderImpl';
