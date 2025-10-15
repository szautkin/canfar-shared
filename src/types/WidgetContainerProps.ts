import { ReactNode } from 'react';
import { PaperProps } from '@mui/material';

/**
 * Props for the WidgetContainer component
 */
export interface WidgetContainerProps extends Omit<PaperProps, 'title'> {
  /**
   * Widget title (can be a string or custom ReactNode for complex titles)
   */
  title?: string | ReactNode;
  /**
   * Whether the widget is currently loading
   * @default false
   */
  isLoading?: boolean;
  /**
   * Callback function when refresh button is clicked
   */
  onRefresh?: () => void;
  /**
   * Optional last update timestamp
   */
  lastUpdate?: Date;
  /**
   * Whether to show the refresh button
   * @default true when onRefresh is provided
   */
  showRefresh?: boolean;
  /**
   * Custom footer content (replaces default lastUpdate display)
   */
  footer?: ReactNode;
  /**
   * Widget content
   */
  children: ReactNode;
}
