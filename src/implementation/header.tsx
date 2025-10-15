'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  useTheme as useMuiTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import '@/theme/createTheme'; // Import for theme type augmentation
import { HeaderProps } from '@/types/HeaderProps';
import { AppBar } from '@/components/AppBar/AppBar';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { Box } from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { IconButton } from '@/components/IconButton/IconButton';
import { Menu } from '@/components/Menu/Menu';
import { MenuItem } from '@/components/MenuItem/MenuItem';
import { Link } from '@/components/Link/Link';
import { Divider } from '@/components/Divider/Divider';
import { Typography } from '@/components/Typography/Typography';
import { Avatar } from '@/components/Avatar/Avatar';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Drawer } from '@/components/Drawer/Drawer';
import { List } from '@/components/List/List';
import { ListItem } from '@/components/List/ListItem';

export const HeaderImpl = React.forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      logo,
      logoHref = '/',
      onLogoClick,
      brandText = 'CANFAR',
      navItems = [],
      dropdowns = [],
      isAuthenticated = false,
      userInfo,
      onLogin,
      onLogout,
      userMenuItems = [],
      showThemeToggle = true,
      additionalActions,
      mobileBreakpoint = 'md',
      position = 'sticky',
      variant = 'surface',
      elevation = 0,
    },
    ref
  ) => {
    const theme = useMuiTheme() as Theme;
    const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));

    // State for dropdowns
    const [dropdownAnchors, setDropdownAnchors] = useState<{
      [key: string]: HTMLElement | null;
    }>({});
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
      null
    );
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<{
      [key: string]: boolean;
    }>({});

    // Handlers for dropdown menus
    const handleDropdownOpen = useCallback(
      (dropdownKey: string) => (event: React.MouseEvent<HTMLElement>) => {
        setDropdownAnchors((prev) => ({
          ...prev,
          [dropdownKey]: event.currentTarget,
        }));
      },
      []
    );

    const handleDropdownClose = useCallback(
      (dropdownKey: string) => () => {
        setDropdownAnchors((prev) => ({ ...prev, [dropdownKey]: null }));
      },
      []
    );

    // User menu handlers
    const handleUserMenuOpen = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuAnchor(event.currentTarget);
      },
      []
    );

    const handleUserMenuClose = useCallback(() => {
      setUserMenuAnchor(null);
    }, []);

    // Mobile menu handlers
    const toggleMobileMenu = useCallback(() => {
      setMobileMenuOpen((prev) => !prev);
    }, []);

    const handleMobileDropdownToggle = useCallback((dropdownKey: string) => {
      setMobileDropdownOpen((prev) => ({
        ...prev,
        [dropdownKey]: !prev[dropdownKey],
      }));
    }, []);

    const handleLogoClick = useCallback(
      (e: React.MouseEvent) => {
        if (onLogoClick) {
          e.preventDefault();
          onLogoClick();
        }
      },
      [onLogoClick]
    );

    // Memoized user menu items
    const defaultUserMenuItems = useMemo(
      () => [
        {
          label: 'Profile',
          icon: <PersonIcon />,
          onClick: () => {
            handleUserMenuClose();
            // Navigate to profile
          },
        },
        {
          label: 'Logout',
          icon: <LogoutIcon />,
          onClick: () => {
            handleUserMenuClose();
            onLogout?.();
          },
          divider: true,
        },
      ],
      [handleUserMenuClose, onLogout]
    );

    const finalUserMenuItems = userMenuItems.length
      ? userMenuItems
      : defaultUserMenuItems;

    // Render desktop navigation
    const renderDesktopNav = () => (
      <>
        {/* Navigation Items */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
          }}
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={item.onClick}
              variant="inherit"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                borderRadius: theme.shape.borderRadius,
                transition: theme.transitions.create(['background-color'], {
                  duration: theme.transitions.duration.short,
                }),
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {item.icon && (
                <Box sx={{ mr: 1, display: 'flex' }}>{item.icon}</Box>
              )}
              {item.label}
            </Link>
          ))}

          {/* Dropdown Menus */}
          {dropdowns.map((dropdown, index) => (
            <Box key={`dropdown-${index}`}>
              <Button
                variant="ghost"
                endIcon={
                  <ArrowDropDownIcon
                    sx={{
                      transform: dropdownAnchors[`dropdown-${index}`]
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition: theme.transitions.create('transform'),
                    }}
                  />
                }
                onClick={handleDropdownOpen(`dropdown-${index}`)}
                sx={{
                  textTransform: 'none',
                  color: 'inherit',
                }}
              >
                {dropdown.label}
              </Button>
              <Menu
                anchorEl={dropdownAnchors[`dropdown-${index}`]}
                open={Boolean(dropdownAnchors[`dropdown-${index}`])}
                onClose={handleDropdownClose(`dropdown-${index}`)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {dropdown.items.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    {item.divider && itemIndex > 0 && <Divider />}
                    <MenuItem
                      onClick={() => {
                        handleDropdownClose(`dropdown-${index}`)();
                        item.onClick?.();
                      }}
                      icon={item.icon}
                    >
                      {item.label}
                    </MenuItem>
                  </React.Fragment>
                ))}
              </Menu>
            </Box>
          ))}
        </Box>
      </>
    );

    // Render mobile navigation
    const renderMobileNav = () => (
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 360,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Navigation
          </Typography>

          {/* User info in mobile menu */}
          {isAuthenticated && userInfo && (
            <Box
              sx={{
                mb: 3,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={
                    typeof userInfo.avatar === 'string'
                      ? userInfo.avatar
                      : undefined
                  }
                  sx={{ mr: 2 }}
                >
                  {typeof userInfo.avatar !== 'string' && userInfo.avatar}
                  {!userInfo.avatar && userInfo.name[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">{userInfo.name}</Typography>
                  {userInfo.email && (
                    <Typography variant="caption" color="secondary">
                      {userInfo.email}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          <List>
            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => {
                  toggleMobileMenu();
                  item.onClick?.();
                }}
                component={item.href ? Link : 'div'}
                {...(item.href ? { href: item.href } : {})}
              >
                {item.icon && (
                  <Box sx={{ mr: 2, display: 'flex' }}>{item.icon}</Box>
                )}
                <Typography>{item.label}</Typography>
              </ListItem>
            ))}

            {/* Dropdown Menus in Mobile */}
            {dropdowns.map((dropdown, index) => (
              <Box key={`mobile-dropdown-${index}`}>
                <ListItem
                  button
                  onClick={() =>
                    handleMobileDropdownToggle(`mobile-dropdown-${index}`)
                  }
                >
                  <Typography sx={{ flexGrow: 1 }}>{dropdown.label}</Typography>
                  <ArrowDropDownIcon
                    sx={{
                      transform: mobileDropdownOpen[`mobile-dropdown-${index}`]
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition: theme.transitions.create('transform'),
                    }}
                  />
                </ListItem>
                <Collapse
                  in={mobileDropdownOpen[`mobile-dropdown-${index}`]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List sx={{ pl: 4 }}>
                    {dropdown.items.map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                        {item.divider && itemIndex > 0 && <Divider />}
                        <ListItem
                          button
                          onClick={() => {
                            toggleMobileMenu();
                            item.onClick?.();
                          }}
                          component={item.href ? Link : 'div'}
                          {...(item.href ? { href: item.href } : {})}
                        >
                          {item.icon && (
                            <Box sx={{ mr: 2, display: 'flex' }}>
                              {item.icon}
                            </Box>
                          )}
                          <Typography variant="body2">{item.label}</Typography>
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}

            {/* User menu items in mobile */}
            {isAuthenticated && (
              <>
                <Divider sx={{ my: 2 }} />
                {finalUserMenuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.divider && index > 0 && <Divider />}
                    <ListItem
                      button
                      onClick={() => {
                        toggleMobileMenu();
                        item.onClick?.();
                      }}
                    >
                      {item.icon && (
                        <Box sx={{ mr: 2, display: 'flex' }}>{item.icon}</Box>
                      )}
                      <Typography>{item.label}</Typography>
                    </ListItem>
                  </React.Fragment>
                ))}
              </>
            )}

            {/* Login button in mobile menu */}
            {!isAuthenticated && (
              <>
                <Divider sx={{ my: 2 }} />
                <ListItem>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      toggleMobileMenu();
                      onLogin?.();
                    }}
                  >
                    Login
                  </Button>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    );

    return (
      <AppBar
        ref={ref}
        position={position}
        variant={variant}
        elevation={elevation}
      >
        <Toolbar>
          {/* Logo and Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {logo && (
              <Link
                href={logoHref}
                onClick={handleLogoClick}
                variant="inherit"
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: brandText ? 2 : 0,
                }}
              >
                {logo}
              </Link>
            )}
            {brandText && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  color: 'inherit',
                }}
                component={logo ? 'span' : Link}
                {...(logo
                  ? {}
                  : {
                      href: logoHref,
                      onClick: handleLogoClick,
                      underline: 'none',
                    })}
              >
                {brandText}
              </Typography>
            )}
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && renderDesktopNav()}

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Theme Toggle */}
            {showThemeToggle && !isMobile && <ThemeToggle />}

            {/* Additional Actions */}
            {additionalActions && !isMobile && additionalActions}

            {/* Authentication Section */}
            {!isMobile && (
              <>
                {isAuthenticated && userInfo ? (
                  <>
                    <IconButton
                      onClick={handleUserMenuOpen}
                      sx={{ ml: 1 }}
                      aria-label="User menu"
                      aria-controls={
                        Boolean(userMenuAnchor) ? 'user-menu' : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={Boolean(userMenuAnchor) ? 'true' : 'false'}
                    >
                      <Avatar
                        src={
                          typeof userInfo.avatar === 'string'
                            ? userInfo.avatar
                            : undefined
                        }
                        sx={{ width: 32, height: 32 }}
                      >
                        {typeof userInfo.avatar !== 'string' && userInfo.avatar}
                        {!userInfo.avatar && userInfo.name[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                    <Menu
                      id="user-menu"
                      anchorEl={userMenuAnchor}
                      open={Boolean(userMenuAnchor)}
                      onClose={handleUserMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      {/* User info header */}
                      <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
                        <Typography variant="subtitle1">
                          {userInfo.name}
                        </Typography>
                        {userInfo.email && (
                          <Typography variant="caption" color="secondary">
                            {userInfo.email}
                          </Typography>
                        )}
                      </Box>
                      <Divider />
                      {/* Menu items */}
                      {finalUserMenuItems.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.divider && index > 0 && <Divider />}
                          <MenuItem
                            onClick={() => {
                              handleUserMenuClose();
                              item.onClick?.();
                            }}
                            icon={item.icon}
                          >
                            {item.label}
                          </MenuItem>
                        </React.Fragment>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button variant="primary" onClick={onLogin} sx={{ ml: 1 }}>
                    Login
                  </Button>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="Open navigation menu"
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Navigation Drawer */}
        {renderMobileNav()}
      </AppBar>
    );
  }
);

HeaderImpl.displayName = 'HeaderImpl';
