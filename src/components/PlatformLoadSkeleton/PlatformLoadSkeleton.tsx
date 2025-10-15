// src/app/components/PlatformLoadSkeleton/PlatformLoadSkeleton.tsx
import React from 'react';
import { PlatformLoadSkeletonImpl } from '@/implementation/platformLoadSkeleton';

/**
 * PlatformLoadSkeleton component for displaying loading state of PlatformLoad widget
 *
 * Features:
 * - Skeleton placeholders for all metric sections
 * - Matches exact layout of PlatformLoad component
 * - Smooth pulse animations
 * - Theme-aware coloring
 *
 * @example
 * ```tsx
 * <PlatformLoadSkeleton />
 * ```
 */
export const PlatformLoadSkeleton: React.FC = () => {
  return <PlatformLoadSkeletonImpl />;
};
