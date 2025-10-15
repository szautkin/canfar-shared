'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme as useMuiTheme,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CollapsiblePanelProps } from '@/types/CollapsiblePanelProps';
import { Divider } from '@/components/Divider/Divider';
import '@/theme/createTheme'; // Import for theme type augmentation

export const CollapsiblePanelImpl = React.forwardRef<
  HTMLDivElement,
  CollapsiblePanelProps
>(
  (
    {
      header,
      children,
      defaultExpanded = false,
      expanded: controlledExpanded,
      onExpandedChange,
      expandIcon = <ExpandMoreIcon />,
      disabled = false,
      variant = 'outlined',
      elevation = 1,
      showDivider = true,
      headerClassName,
      contentClassName,
      expandAriaLabel = 'expand',
      collapseAriaLabel = 'collapse',
      sx,
      ...accordionProps
    },
    ref
  ) => {
    const theme = useMuiTheme() as Theme;
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

    // Determine if we're in controlled mode
    const isControlled = controlledExpanded !== undefined;
    const expanded = isControlled ? controlledExpanded : internalExpanded;

    // Handle expansion change
    const handleChange = useCallback(
      (_event: React.SyntheticEvent, isExpanded: boolean) => {
        if (!isControlled) {
          setInternalExpanded(isExpanded);
        }
        onExpandedChange?.(isExpanded);
      },
      [isControlled, onExpandedChange]
    );

    // Variant-based styles
    const variantStyles = useMemo(() => {
      const styles: Record<string, Record<string, unknown>> = {
        outlined: {
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
          '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        elevation: {
          boxShadow: theme.shadows[elevation],
          borderRadius: theme.shape.borderRadius,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '16px 0',
          },
          '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        plain: {
          boxShadow: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      };

      return styles[variant] || styles.outlined;
    }, [theme, variant, elevation]);

    // Merge styles
    const mergedSx = useMemo(
      () => ({
        ...variantStyles,
        transition: theme.transitions.create(['margin', 'box-shadow'], {
          duration: theme.transitions.duration.standard,
        }),
        '&.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
        },
        ...sx,
      }),
      [variantStyles, theme, sx]
    );

    // Aria label for expand icon
    const expandIconAriaLabel = expanded ? collapseAriaLabel : expandAriaLabel;

    return (
      <Accordion
        ref={ref}
        expanded={expanded}
        onChange={handleChange}
        disabled={disabled}
        disableGutters
        square={false}
        sx={mergedSx}
        {...accordionProps}
      >
        <AccordionSummary
          expandIcon={expandIcon}
          aria-label={expandIconAriaLabel}
          className={headerClassName}
          sx={{
            '& .MuiAccordionSummary-expandIconWrapper': {
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
            },
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(180deg)',
            },
            '&.Mui-disabled': {
              opacity: theme.palette.action.disabledOpacity,
            },
            minHeight: 48,
            '&.Mui-expanded': {
              minHeight: 48,
            },
          }}
        >
          {header}
        </AccordionSummary>
        {showDivider && variant !== 'plain' && <Divider />}
        <AccordionDetails
          className={contentClassName}
          sx={{
            padding: theme.spacing(2),
            ...(variant === 'plain' && {
              paddingLeft: 0,
              paddingRight: 0,
            }),
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    );
  }
);

CollapsiblePanelImpl.displayName = 'CollapsiblePanelImpl';
