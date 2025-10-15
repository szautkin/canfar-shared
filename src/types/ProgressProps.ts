import { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
import { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress';

/**
 * Common props for both LinearProgress and CircularProgress components
 */
export interface BaseProgressProps {
  /**
   * The color of the progress indicator
   * @default 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit';

  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value?: number;

  /**
   * The ARIA label for the progress indicator
   */
  'aria-label'?: string;

  /**
   * The ARIA labelledby attribute for the progress indicator
   */
  'aria-labelledby'?: string;
}

/**
 * Props for the LinearProgress component
 * Extends Material-UI LinearProgressProps with additional features
 */
export interface LinearProgressProps
  extends Omit<MuiLinearProgressProps, 'variant'>,
    BaseProgressProps {
  /**
   * The variant of the progress indicator
   * @default 'indeterminate'
   */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';

  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer?: number;

  /**
   * If true, shows a label with the percentage value (only for determinate variant)
   * @default false
   */
  showLabel?: boolean;
}

/**
 * Props for the CircularProgress component
 * Extends Material-UI CircularProgressProps with additional features
 */
export interface CircularProgressProps
  extends MuiCircularProgressProps,
    BaseProgressProps {
  /**
   * The variant of the progress indicator
   * @default 'indeterminate'
   */
  variant?: 'determinate' | 'indeterminate';

  /**
   * The size of the circular progress.
   * @default 40
   */
  size?: number | string;

  /**
   * The thickness of the circular progress.
   * @default 3.6
   */
  thickness?: number;

  /**
   * If true, shows a label with the percentage value (only for determinate variant)
   * @default false
   */
  showLabel?: boolean;
}

/**
 * Props for the Progress wrapper component
 */
export interface ProgressProps {
  /**
   * The type of progress indicator to display
   * @default 'linear'
   */
  type?: 'linear' | 'circular';

  /**
   * Props to pass to the LinearProgress component (when type is 'linear')
   */
  linearProps?: LinearProgressProps;

  /**
   * Props to pass to the CircularProgress component (when type is 'circular')
   */
  circularProps?: CircularProgressProps;
}
