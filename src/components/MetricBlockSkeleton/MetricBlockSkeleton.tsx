// src/app/components/MetricBlockSkeleton/MetricBlockSkeleton.tsx
import React from 'react';
import { MetricBlockSkeletonImpl } from '@/implementation/metricBlockSkeleton';

/**
 * MetricBlockSkeleton component for displaying loading state of MetricBlock
 *
 * Features:
 * - Skeleton placeholders for label and bar chart
 * - Matches exact layout of MetricBlock component
 * - Smooth pulse animations
 * - Minimal and clean design
 *
 * @example
 * ```tsx
 * <MetricBlockSkeleton />
 * ```
 */
export const MetricBlockSkeleton: React.FC = () => {
  return <MetricBlockSkeletonImpl />;
};
