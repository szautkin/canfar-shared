'use client';

import React from 'react';
import {
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
  Box,
  Typography,
} from '@mui/material';
import {
  LinearProgressProps,
  CircularProgressProps,
  ProgressProps,
} from '../types/ProgressProps';

/**
 * LinearProgress implementation component
 * Enhanced version with label support and improved styling
 */
export const LinearProgressImpl: React.FC<LinearProgressProps> = (props) => {
  const {
    variant = 'indeterminate',
    color = 'primary',
    value = 0,
    valueBuffer,
    showLabel = false,
    sx,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...otherProps
  } = props;

  const progressElement = (
    <MuiLinearProgress
      variant={variant}
      color={color}
      value={value}
      valueBuffer={valueBuffer}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuenow={variant === 'determinate' ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        '& .MuiLinearProgress-bar': {
          borderRadius: 4,
          transition: 'transform 0.4s ease',
        },
        ...sx,
      }}
      {...otherProps}
    />
  );

  if (showLabel && variant === 'determinate') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: '100%', mr: 1 }}>{progressElement}</Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return progressElement;
};

/**
 * CircularProgress implementation component
 * Features size variants and label support
 */
export const CircularProgressImpl: React.FC<CircularProgressProps> = (
  props
) => {
  const {
    variant = 'indeterminate',
    color = 'primary',
    value = 0,
    size = 40,
    thickness = 3.6,
    showLabel = false,
    sx,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...otherProps
  } = props;

  const progressElement = (
    <MuiCircularProgress
      variant={variant}
      color={color}
      value={value}
      size={size}
      thickness={thickness}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuenow={variant === 'determinate' ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      sx={{
        transition: 'transform 0.3s ease',
        ...sx,
      }}
      {...otherProps}
    />
  );

  if (showLabel && variant === 'determinate') {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {progressElement}
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            sx={{ fontWeight: 'medium' }}
          >
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return progressElement;
};

/**
 * Progress wrapper implementation
 * Provides a unified interface for both linear and circular progress indicators
 */
export const ProgressImpl: React.FC<ProgressProps> = (props) => {
  const { type = 'linear', linearProps, circularProps } = props;

  if (type === 'circular') {
    return <CircularProgressImpl {...circularProps} />;
  }

  return <LinearProgressImpl {...linearProps} />;
};
