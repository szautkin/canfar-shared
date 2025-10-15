'use client';

import {
  Avatar as MuiAvatar,
  AvatarGroup as MuiAvatarGroup,
  useTheme,
  Theme,
} from '@mui/material';
import { AvatarProps } from '@/types/AvatarProps';
import React, { useState } from 'react';

const getSizeMap = (theme: Theme) => ({
  small: {
    width: 32,
    height: 32,
    fontSize: theme.typography.body2.fontSize,
  },
  medium: {
    width: 40,
    height: 40,
    fontSize: theme.typography.body1.fontSize,
  },
  large: {
    width: 56,
    height: 56,
    fontSize: theme.typography.h6.fontSize,
  },
});

// Helper function to generate initials from children or alt text
const generateInitials = (children: React.ReactNode, alt?: string): string => {
  // If children is a string, use it
  if (typeof children === 'string') {
    const names = children.trim().split(' ');
    if (names.length === 1) {
      // Single name - take first two characters
      return names[0].substring(0, 2).toUpperCase();
    } else {
      // Multiple names - take first character of first and last name
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
  }

  // If alt text is provided and children is not a string
  if (alt) {
    const names = alt.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    } else {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
  }

  // Default fallback
  return '';
};

// Helper function to generate a consistent color based on the name
const stringToColor = (string: string, theme: Theme): string => {
  if (!string) return theme.palette.primary.main;

  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use a predefined set of colors for consistency
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    '#9c27b0', // Purple
    '#009688', // Teal
    '#795548', // Brown
  ];

  return colors[Math.abs(hash) % colors.length];
};

export const AvatarImpl = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt, children, size = 'medium', variant = 'circular', sx, ...props },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);
    const theme = useTheme();
    const sizeMap = getSizeMap(theme);

    // Handle image load errors
    const handleError = () => {
      setImgError(true);
    };

    // Determine what to display
    const displayContent = () => {
      // If image failed to load or no src provided, show initials
      if (imgError || !src) {
        const initials = generateInitials(children, alt);
        return initials || children;
      }
      return children;
    };

    // Get background color for initials
    const getBackgroundColor = () => {
      if (imgError || !src) {
        // Use the name (from children or alt) to generate color
        const nameForColor =
          typeof children === 'string' ? children : alt || '';
        return stringToColor(nameForColor, theme);
      }
      return undefined;
    };

    return (
      <MuiAvatar
        ref={ref}
        src={imgError ? undefined : src}
        alt={alt}
        variant={variant}
        imgProps={{
          onError: handleError,
        }}
        sx={{
          ...sizeMap[size],
          backgroundColor: getBackgroundColor(),
          fontWeight: theme.typography.fontWeightMedium,
          transition: theme.transitions.create(['all']),
          // Ensure text doesn't overflow
          '& .MuiAvatar-fallback': {
            width: '100%',
            height: '100%',
          },
          // Custom background colors should have proper text contrast
          color: theme.palette.primary.contrastText,
          ...sx,
        }}
        {...props}
      >
        {displayContent()}
      </MuiAvatar>
    );
  }
);

AvatarImpl.displayName = 'AvatarImpl';

// Export AvatarGroup for convenience
export const AvatarGroupImpl = MuiAvatarGroup;
