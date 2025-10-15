'use client';

import React from 'react';
import { FormFieldErrorProps } from '@/types/FormFieldErrorProps';
import { Box } from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';
import { errorStates } from '@/design-system/error-states';
import { keyframes } from '@mui/system';

// Define animations
const errorFadeIn = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(-4px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FormFieldErrorImplementation: React.FC<FormFieldErrorProps> = ({
  error,
  show = true,
  fieldId,
  animate = true,
  size = 'md',
  showIcon = true,
  icon,
  className,
  style,
}) => {
  const theme = useTheme();

  if (!error || !show) {
    return null;
  }

  const errorId = fieldId ? `${fieldId}-error` : undefined;
  const iconSize = errorStates.formField.icon.size[size];

  return (
    <Box
      id={errorId}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        marginTop: 0.5,
        animation: animate
          ? `${errorFadeIn} ${errorStates.formField.animation.fadeIn.duration} ${errorStates.formField.animation.fadeIn.easing}`
          : 'none',
        ...style,
      }}
    >
      {showIcon && (
        <Box
          sx={{
            color: errorStates.formField.visual.iconColor,
            fontSize: iconSize,
            lineHeight: 1,
            marginTop: '2px',
          }}
        >
          {icon || <ErrorOutlineIcon sx={{ fontSize: iconSize }} />}
        </Box>
      )}

      <Typography
        variant="caption"
        sx={{
          color: errorStates.formField.visual.helperTextColor,
          fontSize:
            size === 'sm'
              ? '0.75rem'
              : size === 'lg'
                ? '0.875rem'
                : '0.8125rem',
          fontWeight: theme.typography.fontWeightMedium,
          lineHeight: errorStates.formField.helperText.lineHeight,
          flex: 1,
        }}
      >
        {error}
      </Typography>
    </Box>
  );
};
