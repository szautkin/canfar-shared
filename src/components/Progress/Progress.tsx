import React from 'react';
import {
  ProgressProps,
  LinearProgressProps,
  CircularProgressProps,
} from '../../types/ProgressProps';
import {
  ProgressImpl,
  LinearProgressImpl,
  CircularProgressImpl,
} from '../../implementation/progress';

/**
 * Progress component for displaying loading and progress states
 *
 * Features:
 * - Linear and circular variants
 * - Determinate and indeterminate modes
 * - Value prop for determinate mode (0-100)
 * - Multiple color variants
 * - Size variants for circular progress
 * - Smooth animations
 * - Label support for accessibility
 *
 * @example
 * ```tsx
 * // Linear progress examples
 * <LinearProgress />
 * <LinearProgress variant="determinate" value={50} />
 * <LinearProgress variant="determinate" value={75} showLabel />
 * <LinearProgress color="success" />
 *
 * // Circular progress examples
 * <CircularProgress />
 * <CircularProgress variant="determinate" value={65} />
 * <CircularProgress size={60} thickness={4} />
 * <CircularProgress variant="determinate" value={80} showLabel />
 *
 * // Progress wrapper example
 * <Progress type="linear" linearProps={{ value: 50, variant: "determinate" }} />
 * <Progress type="circular" circularProps={{ value: 75, variant: "determinate", showLabel: true }} />
 * ```
 */
export const Progress: React.FC<ProgressProps> = (props) => {
  return <ProgressImpl {...props} />;
};

/**
 * LinearProgress component for horizontal progress indication
 */
export const LinearProgress: React.FC<LinearProgressProps> = (props) => {
  return <LinearProgressImpl {...props} />;
};

/**
 * CircularProgress component for circular progress indication
 */
export const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  return <CircularProgressImpl {...props} />;
};
