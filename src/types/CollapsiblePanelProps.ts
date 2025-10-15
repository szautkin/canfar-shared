import { AccordionProps } from '@mui/material/Accordion';
import { ReactNode } from 'react';

export interface CollapsiblePanelProps
  extends Omit<
    AccordionProps,
    'children' | 'expanded' | 'onChange' | 'variant'
  > {
  /**
   * Content to display in the panel header
   */
  header: ReactNode;

  /**
   * Content to display when the panel is expanded
   */
  children: ReactNode;

  /**
   * Whether the panel is expanded by default
   * @default false
   */
  defaultExpanded?: boolean;

  /**
   * Controlled expanded state
   */
  expanded?: boolean;

  /**
   * Callback fired when the expansion state changes
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Custom expand icon
   */
  expandIcon?: ReactNode;

  /**
   * Whether to disable the panel
   * @default false
   */
  disabled?: boolean;

  /**
   * Visual variant of the panel
   * @default 'outlined'
   */
  variant?: 'outlined' | 'elevation' | 'plain';

  /**
   * Elevation when variant is 'elevation'
   * @default 1
   */
  elevation?: number;

  /**
   * Whether to show a divider between header and content
   * @default true
   */
  showDivider?: boolean;

  /**
   * Additional CSS class for the header
   */
  headerClassName?: string;

  /**
   * Additional CSS class for the content
   */
  contentClassName?: string;

  /**
   * ARIA label for the expand button
   */
  expandAriaLabel?: string;

  /**
   * ARIA label for the collapse button
   */
  collapseAriaLabel?: string;
}
