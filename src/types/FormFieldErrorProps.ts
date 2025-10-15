import { ReactNode } from 'react';

export interface FormFieldErrorProps {
  /**
   * The error message to display
   */
  error?: string;

  /**
   * Whether to show the error state
   */
  show?: boolean;

  /**
   * The field ID to associate with aria-describedby
   */
  fieldId?: string;

  /**
   * Whether to animate the error appearance
   */
  animate?: boolean;

  /**
   * The size of the error message
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to show an error icon
   */
  showIcon?: boolean;

  /**
   * Custom error icon
   */
  icon?: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Inline style object
   */
  style?: React.CSSProperties;
}
