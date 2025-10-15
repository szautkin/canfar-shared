// src/app/components/ServicesGridSkeleton/ServicesGridSkeleton.tsx
import React from 'react';
import { ServicesGridSkeletonImpl } from '@/implementation/servicesGridSkeleton';

export interface ServicesGridSkeletonProps {
  /**
   * Number of skeleton cards to display
   * @default 8
   */
  count?: number;
  /**
   * Grid columns configuration
   * @default { xs: 6, sm: 4, md: 4, lg: 2 }
   */
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

/**
 * ServicesGridSkeleton component for displaying loading state of ServicesGrid
 *
 * Features:
 * - Multiple skeleton cards in grid layout
 * - Responsive columns matching ServicesGrid
 * - Staggered animation for visual appeal
 * - Customizable number of skeleton cards
 *
 * @example
 * ```tsx
 * <ServicesGridSkeleton count={8} />
 * ```
 */
export const ServicesGridSkeleton: React.FC<ServicesGridSkeletonProps> = (
  props
) => {
  return <ServicesGridSkeletonImpl {...props} />;
};
