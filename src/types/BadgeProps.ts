import type { BadgeProps as MuiBadgeProps } from '@mui/material/Badge';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type BadgeContent = 'number' | 'dot';
export type BadgePosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface BadgeProps
  extends Omit<MuiBadgeProps, 'color' | 'variant' | 'anchorOrigin'> {
  /**
   * The color variant of the badge
   * @default 'primary'
   */
  variant?: BadgeVariant;

  /**
   * The content type of the badge
   * @default 'number'
   */
  contentType?: BadgeContent;

  /**
   * The position of the badge relative to its children
   * @default 'top-right'
   */
  position?: BadgePosition;

  /**
   * The maximum count to display. Numbers higher than this will display as max+
   * @default 99
   */
  maxCount?: number;

  /**
   * Whether to show the badge even when content is 0
   * @default false
   */
  showZero?: boolean;

  /**
   * The content to display in the badge
   */
  badgeContent?: React.ReactNode;

  /**
   * The content to wrap with the badge
   */
  children?: React.ReactNode;
}
