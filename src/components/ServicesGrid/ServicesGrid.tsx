import React from 'react';
import { Grid } from '@/components/Grid/Grid';
import {
  ServiceCard,
  ServiceCardProps,
} from '@/components/ServiceCard/ServiceCard';

export interface ServicesGridProps {
  services: ServiceCardProps[];
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

// Memoized to prevent re-renders when parent re-renders
// ServicesGrid only needs to re-render when services or columns change
export const ServicesGrid: React.FC<ServicesGridProps> = React.memo(
  ({ services, columns = { xs: 6, sm: 4, md: 4, lg: 2 } }) => {
    return (
      <Grid container spacing={3} justifyContent="center">
        {services.map((service, index) => (
          <Grid size={columns} key={`${service.href}-${index}`}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    );
  }
);

ServicesGrid.displayName = 'ServicesGrid';
