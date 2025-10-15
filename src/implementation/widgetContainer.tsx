'use client';

import React, { useMemo } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Box,
  LinearProgress,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { WidgetContainerProps } from '../types/WidgetContainerProps';
import { tokens } from '../design-system/tokens';

/**
 * WidgetContainer implementation component
 */
export const WidgetContainerImpl: React.FC<WidgetContainerProps> = ({
  title,
  isLoading = false,
  onRefresh,
  lastUpdate,
  showRefresh,
  footer,
  children,
  className,
  sx,
  ...paperProps
}) => {
  const theme = useTheme();

  // Determine if refresh button should be shown
  const shouldShowRefresh =
    showRefresh !== undefined ? showRefresh : !!onRefresh;

  // Memoized to prevent recalculation on every render
  const formattedLastUpdate = useMemo(() => {
    if (!lastUpdate) return null;
    return `last update: ${lastUpdate.toISOString().replace('T', ' ').slice(0, -5)} UTC`;
  }, [lastUpdate]);

  return (
    <Paper
      className={className}
      elevation={1}
      sx={{
        position: 'relative',
        padding: theme.spacing(2),
        overflow: 'hidden',
        borderRadius: 1,
        ...sx,
      }}
      component="div"
      {...paperProps}
    >
      {/* Header - only render if title or refresh button exists */}
      {(title || shouldShowRefresh) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(1),
          }}
        >
          {title &&
            (typeof title === 'string' ? (
              <Typography variant="h6" component="h2">
                {title}
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>{title}</Box>
            ))}
          {shouldShowRefresh && onRefresh && (
            <IconButton
              aria-label="refresh"
              onClick={onRefresh}
              disabled={isLoading}
              size="small"
            >
              <RefreshIcon />
            </IconButton>
          )}
        </Box>
      )}

      {/* Loading Bar - Always visible, positioned after header */}
      <LinearProgress
        color={isLoading ? 'primary' : 'success'}
        variant={isLoading ? 'indeterminate' : 'determinate'}
        value={isLoading ? undefined : 100}
        sx={{
          width: '100%',
          height: 4,
          marginBottom: theme.spacing(2),
          borderRadius: 2,
          '& .MuiLinearProgress-bar': {
            borderRadius: 2,
          },
        }}
      />

      {/* Content */}
      <Box>{children}</Box>

      {/* Footer - render custom footer or default lastUpdate */}
      {(footer || formattedLastUpdate) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: theme.spacing(2),
          }}
        >
          {footer || (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontFamily: tokens.typography.fontFamily.mono,
              }}
            >
              {formattedLastUpdate}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};
