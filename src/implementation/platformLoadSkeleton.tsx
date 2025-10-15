'use client';

import React from 'react';
import { Paper, Box } from '@mui/material';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { tokens } from '@/design-system/tokens';

export const PlatformLoadSkeletonImpl: React.FC = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: tokens.spacing[4], sm: tokens.spacing[6] },
        borderRadius: tokens.borderRadius.mdCSS,
        backgroundColor: 'background.paper',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: tokens.spacing[4],
        }}
      >
        <Skeleton
          variant="text"
          width={140}
          height={32}
          sx={{ width: { xs: 100, sm: 140 } }}
        />
        <Skeleton
          variant="circular"
          width={36}
          height={36}
          sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 } }}
        />
      </Box>

      {/* Metric Blocks */}
      {[1, 2, 3].map((index) => (
        <Box key={index} sx={{ mb: tokens.spacing[3] }}>
          {/* Metric Label */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: tokens.spacing[1],
            }}
          >
            <Skeleton
              variant="text"
              width={60}
              height={20}
              sx={{ width: { xs: 50, sm: 60 } }}
            />
            <Skeleton
              variant="text"
              width={100}
              height={20}
              sx={{ width: { xs: 80, sm: 100 } }}
            />
          </Box>

          {/* Bar Chart */}
          <Skeleton
            variant="rounded"
            width="100%"
            height={24}
            sx={{ borderRadius: tokens.borderRadius.smCSS }}
          />
        </Box>
      ))}

      {/* Last Update */}
      <Box sx={{ mt: tokens.spacing[4] }}>
        <Skeleton
          variant="text"
          width={180}
          height={16}
          sx={{ width: { xs: 150, sm: 180 } }}
        />
      </Box>
    </Paper>
  );
};
