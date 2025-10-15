'use client';

import React from 'react';
import { Box } from '@mui/material';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { tokens } from '@/design-system/tokens';

export const MetricBlockSkeletonImpl: React.FC = () => {
  return (
    <Box>
      {/* Metric Label and Value */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: tokens.spacing[1],
        }}
      >
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={100} height={20} />
      </Box>

      {/* Bar Chart */}
      <Skeleton
        variant="rounded"
        width="100%"
        height={24}
        sx={{ borderRadius: tokens.borderRadius.smCSS }}
      />
    </Box>
  );
};
