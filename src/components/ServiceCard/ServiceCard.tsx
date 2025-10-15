import React from 'react';
import { Box } from '@/components/Box/Box';
import { Link } from '@/components/Link/Link';
import { Typography } from '@/components/Typography/Typography';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { SvgIconProps } from '@mui/material';

export interface ServiceCardProps {
  href: string;
  icon: React.ReactElement<SvgIconProps>;
  title: string;
  tooltip?: string;
  target?: string;
  rel?: string;
}

// Memoized to prevent re-renders when parent re-renders
// ServiceCard only needs to re-render when its props change
export const ServiceCard: React.FC<ServiceCardProps> = React.memo(
  ({ href, icon, title, tooltip, target, rel }) => {
    const iconElement = React.cloneElement(icon, {
      sx: {
        fontSize: 48,
        color: 'text.secondary',
        transition: 'color 0.2s ease-in-out',
        '&:hover': {
          color: 'primary.main',
        },
      },
    });

    const content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 2,
          minWidth: 120,
          '&:hover .MuiSvgIcon-root': {
            color: 'primary.main',
          },
        }}
      >
        <Link
          href={href}
          target={target}
          rel={rel}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {iconElement}
          <Typography variant="body2" color="primary">
            {title}
          </Typography>
        </Link>
      </Box>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} placement="top">
          {content}
        </Tooltip>
      );
    }

    return content;
  }
);

ServiceCard.displayName = 'ServiceCard';
