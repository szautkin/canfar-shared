'use client';

import React from 'react';
import { Grid } from '@/components/Grid/Grid';
import { ServiceCardSkeleton } from '@/components/ServiceCardSkeleton/ServiceCardSkeleton';
import { ServicesGridSkeletonProps } from '@/components/ServicesGridSkeleton/ServicesGridSkeleton';

export const ServicesGridSkeletonImpl: React.FC<ServicesGridSkeletonProps> = ({
  count = 8,
  columns = { xs: 6, sm: 4, md: 4, lg: 2 },
}) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {Array.from({ length: count }).map((_, index) => (
        <Grid size={columns} key={`skeleton-${index}`}>
          <ServiceCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};
