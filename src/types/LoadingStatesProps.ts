// Type definitions for LoadingStates components

export interface LoadingStatesProps {
  variant: 'skeleton' | 'circular' | 'linear' | 'dots';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface SkeletonProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animation?: 'wave' | 'pulse' | 'none';
}

export type SkeletonTextFieldProps = SkeletonProps;

export type SkeletonSelectProps = SkeletonProps;

export interface SkeletonButtonProps extends SkeletonProps {
  fullWidth?: boolean;
}

export interface SkeletonCardProps {
  className?: string;
}

export interface SkeletonTableRowProps {
  columns?: number;
  className?: string;
}

export interface SkeletonTextProps {
  variant?: 'body' | 'small' | 'large' | 'heading';
  width?: string | number;
  className?: string;
}

export interface SkeletonAvatarProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface CircularProgressProps {
  size?: number;
  thickness?: number;
  color?: 'primary' | 'secondary' | 'inherit';
  className?: string;
}

export interface LinearProgressProps {
  variant?: 'determinate' | 'indeterminate';
  value?: number;
  color?: 'primary' | 'secondary' | 'inherit';
  className?: string;
}

export interface LoadingOverlayProps {
  open?: boolean;
  light?: boolean;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface ComponentLoadingOverlayProps {
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface InlineLoadingProps {
  loading?: boolean;
  size?: number;
  text?: string;
  className?: string;
}

export interface LoadingDotsProps {
  className?: string;
}
