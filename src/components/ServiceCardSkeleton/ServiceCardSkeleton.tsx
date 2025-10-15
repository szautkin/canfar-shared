// src/app/components/ServiceCardSkeleton/ServiceCardSkeleton.tsx
import React from 'react';
import { ServiceCardSkeletonImpl } from '@/implementation/serviceCardSkeleton';

/**
 * ServiceCardSkeleton component for displaying loading state of ServiceCard
 *
 * Features:
 * - Skeleton placeholders for icon, title, and chips
 * - Matches exact layout of ServiceCard component
 * - Smooth pulse animations
 * - Hover state disabled during loading
 *
 * @example
 * ```tsx
 * <ServiceCardSkeleton />
 * ```
 */
export const ServiceCardSkeleton: React.FC = () => {
  return <ServiceCardSkeletonImpl />;
};
