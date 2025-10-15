import { ReactNode } from 'react';
import { AppBarProps } from './AppBarProps';

export interface AppLayoutProps {
  /** Content to display in the main area */
  children: ReactNode;
  /** AppBar configuration */
  appBarProps?: Omit<AppBarProps, 'position'>;
  /** Drawer width in pixels */
  drawerWidth?: number;
  /** Breakpoint at which to switch to mobile layout */
  mobileBreakpoint?: 'sm' | 'md' | 'lg';
  /** Whether the drawer should be persistent on desktop */
  persistentDrawer?: boolean;
  /** Drawer content */
  drawerContent?: ReactNode;
  /** Custom navigation items (will be used in both AppBar and Drawer) */
  navigationItems?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    menuItems?: Array<{
      label: string;
      icon?: ReactNode;
      href?: string;
      onClick?: () => void;
      divider?: boolean;
    }>;
    icon?: ReactNode;
    type: 'link' | 'menu';
  }>;
  /** User menu items for AppBar */
  userMenuItems?: Array<{
    label: string;
    icon?: ReactNode;
    href?: string;
    onClick?: () => void;
    divider?: boolean;
  }>;
  /** User menu label */
  userMenuLabel?: string;
  /** Logo element */
  logo?: ReactNode;
  /** Logo href */
  logoHref?: string;
  /** Logo click handler */
  onLogoClick?: () => void;
  /** Show theme toggle in AppBar */
  showThemeToggle?: boolean;
  /** Theme toggle configuration */
  themeToggleProps?: {
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
  };
}
