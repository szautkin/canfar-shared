'use client';

import React from 'react';
import { Paper, Box } from '@mui/material';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { tokens } from '@/design-system/tokens';

export const ServiceCardSkeletonImpl: React.FC = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: tokens.spacing[3], sm: tokens.spacing[4] },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: tokens.borderRadius.mdCSS,
        backgroundColor: 'background.paper',
      }}
    >
      {/* Icon */}
      <Skeleton
        variant="circular"
        width={48}
        height={48}
        sx={{ mb: { xs: tokens.spacing[2], sm: tokens.spacing[3] } }}
      />

      {/* Title */}
      <Skeleton
        variant="text"
        width="80%"
        height={24}
        sx={{ mb: tokens.spacing[2] }}
      />

      {/* Chips */}
      <Box
        sx={{
          display: 'flex',
          gap: tokens.spacing[1],
          flexWrap: 'wrap',
          justifyContent: 'center',
          mt: 'auto',
        }}
      >
        <Skeleton
          variant="rounded"
          width={60}
          height={24}
          sx={{ borderRadius: tokens.borderRadius.fullCSS }}
        />
        <Skeleton
          variant="rounded"
          width={80}
          height={24}
          sx={{ borderRadius: tokens.borderRadius.fullCSS }}
        />
      </Box>
    </Paper>
  );
};
