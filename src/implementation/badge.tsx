'use client';

import React from 'react';
import MuiBadge from '@mui/material/Badge';
import type { BadgeProps, BadgePosition } from '@/types/BadgeProps';

// Memoized position mapping to avoid recreation on each render
const positionMap: Record<
  BadgePosition,
  { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }
> = {
  'top-left': { vertical: 'top', horizontal: 'left' },
  'top-right': { vertical: 'top', horizontal: 'right' },
  'bottom-left': { vertical: 'bottom', horizontal: 'left' },
  'bottom-right': { vertical: 'bottom', horizontal: 'right' },
};

const getAnchorOrigin = (position: BadgePosition) => positionMap[position];

export const BadgeImplementation: React.FC<BadgeProps> = ({
  variant = 'primary',
  contentType = 'number',
  position = 'top-right',
  maxCount = 99,
  showZero = false,
  badgeContent,
  children,
  sx,
  ...rest
}) => {
  // Map our variant names to MUI color names
  const colorMap = {
    primary: 'primary',
    secondary: 'secondary',
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success',
  } as const;

  const isDot = contentType === 'dot';
  const anchorOrigin = getAnchorOrigin(position);

  // Format badge content for number type
  let formattedContent = badgeContent;
  if (contentType === 'number' && typeof badgeContent === 'number') {
    formattedContent = badgeContent > maxCount ? `${maxCount}+` : badgeContent;
  }

  return (
    <MuiBadge
      color={colorMap[variant]}
      variant={isDot ? 'dot' : 'standard'}
      anchorOrigin={anchorOrigin}
      badgeContent={isDot ? undefined : formattedContent}
      showZero={showZero}
      max={maxCount}
      sx={{
        '& .MuiBadge-badge': {
          ...(isDot && {
            minWidth: 8,
            height: 8,
            padding: 0,
          }),
          ...(contentType === 'number' && {
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: 20,
            height: 20,
          }),
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiBadge>
  );
};
