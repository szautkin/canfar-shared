import { ReactNode } from 'react';

export interface HeaderNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface HeaderDropdownItem extends HeaderNavItem {
  divider?: boolean;
}

export interface HeaderDropdown {
  label: string;
  items: HeaderDropdownItem[];
}

export interface HeaderUserInfo {
  name: string;
  email?: string;
  avatar?: string | ReactNode;
}

export interface HeaderProps {
  /** Logo element (can be an image or custom component) */
  logo?: ReactNode;
  /** URL to navigate when logo is clicked */
  logoHref?: string;
  /** Callback when logo is clicked */
  onLogoClick?: () => void;
  /** Brand text to display next to logo */
  brandText?: string;
  /** Main navigation items */
  navItems?: HeaderNavItem[];
  /** Dropdown menus (Services, Support, etc.) */
  dropdowns?: HeaderDropdown[];
  /** User authentication state */
  isAuthenticated?: boolean;
  /** User information when authenticated */
  userInfo?: HeaderUserInfo;
  /** Callback for login action */
  onLogin?: () => void;
  /** Callback for logout action */
  onLogout?: () => void;
  /** User menu items when authenticated */
  userMenuItems?: HeaderDropdownItem[];
  /** Whether to show theme toggle */
  showThemeToggle?: boolean;
  /** Additional actions to show in the header */
  additionalActions?: ReactNode;
  /** Mobile menu breakpoint */
  mobileBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Header position */
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  /** Header variant for styling */
  variant?: 'primary' | 'transparent' | 'dark' | 'surface';
  /** Elevation for shadow */
  elevation?: number;
}
