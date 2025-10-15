import { BoxProps, ContainerProps, Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

export type PageLayoutVariant = 'full-width' | 'centered' | 'with-sidebar';

export interface PageLayoutProps
  extends Omit<BoxProps, 'children' | 'maxWidth'> {
  /**
   * The variant of the page layout
   * @default 'centered'
   */
  variant?: PageLayoutVariant;
  /**
   * Content for the header slot
   */
  header?: ReactNode;
  /**
   * Content for the main content area
   */
  children: ReactNode;
  /**
   * Content for the optional footer slot
   */
  footer?: ReactNode;
  /**
   * Content for the optional sidebar (only used when variant is 'with-sidebar')
   */
  sidebar?: ReactNode;
  /**
   * Position of the sidebar when variant is 'with-sidebar'
   * @default 'left'
   */
  sidebarPosition?: 'left' | 'right';
  /**
   * Width of the sidebar in pixels when variant is 'with-sidebar'
   * @default 280
   */
  sidebarWidth?: number;
  /**
   * Width of the sidebar when collapsed (0 means completely hidden)
   * @default 0
   */
  sidebarCollapsedWidth?: number;
  /**
   * Maximum width constraint for the main content when variant is 'centered'
   * @default 'lg'
   */
  maxWidth?: ContainerProps['maxWidth'];
  /**
   * Whether to add default padding to the main content area
   * @default false
   */
  disablePadding?: boolean;
  /**
   * Whether to add gutters (horizontal padding) when using Container
   * @default false
   */
  disableGutters?: boolean;
  /**
   * Minimum height for the main content area
   * Can be a number (pixels) or string (CSS value)
   * @default '100vh'
   */
  minHeight?: number | string;
  /**
   * Whether the layout should be fixed (non-scrolling header/footer)
   * @default false
   */
  fixed?: boolean;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Additional props for the main content Container (when variant is 'centered')
   */
  containerProps?: Omit<ContainerProps, 'maxWidth' | 'disableGutters'>;
  /**
   * Additional props for the header Box wrapper
   * Can include 'height' property to customize header height
   */
  headerProps?: BoxProps & { height?: number };
  /**
   * Additional props for the footer Box wrapper
   * Can include 'height' property to customize footer height
   */
  footerProps?: BoxProps & { height?: number };
  /**
   * Additional props for the sidebar Box wrapper
   * Can include 'disableSwipeToOpen' to disable swipe gesture on mobile
   */
  sidebarProps?: BoxProps & { disableSwipeToOpen?: boolean };
  /**
   * Whether the mobile drawer is open (controlled mode)
   * If provided, you must also provide onMobileDrawerToggle
   */
  mobileDrawerOpen?: boolean;
  /**
   * Callback when the mobile drawer should be toggled
   * @param open - Whether the drawer should be open
   */
  onMobileDrawerToggle?: (open: boolean) => void;
  /**
   * Breakpoint at which to switch to mobile drawer behavior
   * @default 'md'
   */
  mobileDrawerBreakpoint?: Breakpoint;
  /**
   * Custom background color for the main content area
   * If not provided, uses theme.palette.background.default
   */
  contentBackgroundColor?: string;
  /**
   * Whether to make the footer sticky at the bottom of the viewport
   * @default false
   */
  enableStickyFooter?: boolean;
}
