'use client';

import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { AppLayoutProps } from '@/types/AppLayoutProps';
import { AppBar } from '@/components/AppBar/AppBar';
import { Drawer } from '@/components/Drawer/Drawer';
import { IconButton } from '@/components/IconButton/IconButton';
import { Button } from '@/components/Button/Button';
import { Typography } from '@/components/Typography/Typography';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export const AppLayoutImpl = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    {
      children,
      appBarProps = {},
      drawerWidth = 320,
      mobileBreakpoint = 'md',
      persistentDrawer = true,
      drawerContent,
      navigationItems = [],
      userMenuItems = [],
      userMenuLabel,
      logo,
      logoHref = '/',
      onLogoClick,
      showThemeToggle = true,
      themeToggleProps = {},
    },
    ref
  ) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // Only show persistent drawer on large screens (lg and up)
    const shouldShowPersistentDrawer = persistentDrawer && !isMobile;

    const handleDrawerToggle = () => {
      setMobileDrawerOpen(!mobileDrawerOpen);
    };

    const handleDrawerClose = () => {
      setMobileDrawerOpen(false);
    };

    // Convert navigation items to AppBar format
    const appBarLinks = navigationItems.map((item) => ({
      label: item.label,
      href: item.type === 'link' ? item.href : undefined,
      onClick: item.type === 'link' ? item.onClick : undefined,
      menuItems:
        item.type === 'menu'
          ? item.menuItems?.map((subItem) => ({
              label: subItem.label,
              icon: subItem.icon,
              href: subItem.href,
              onClick: subItem.onClick,
              divider: subItem.divider,
            }))
          : undefined,
    }));

    // Default drawer content if not provided
    const defaultDrawerContent = (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {logo}
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Navigation
            </Typography>
          </Box>
          {isMobile && (
            <IconButton
              size="sm"
              onClick={handleDrawerClose}
              aria-label="Close navigation drawer"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Navigation content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {navigationItems.map((navItem, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              {navItem.type === 'link' ? (
                <Button
                  variant="ghost"
                  fullWidth
                  href={navItem.href}
                  onClick={navItem.onClick}
                  sx={{
                    justifyContent: 'flex-start',
                    gap: 2,
                    p: 1.5,
                    borderRadius: 1,
                  }}
                >
                  {navItem.icon}
                  {navItem.label}
                </Button>
              ) : (
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      px: 1.5,
                      py: 1,
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      fontWeight: 'medium',
                    }}
                  >
                    {navItem.label}
                  </Typography>
                  {navItem.menuItems?.map((subItem, subIndex) => (
                    <Button
                      key={subIndex}
                      variant="ghost"
                      fullWidth
                      href={subItem.href}
                      onClick={subItem.onClick}
                      sx={{
                        justifyContent: 'flex-start',
                        gap: 2,
                        p: 1,
                        borderRadius: 1,
                        ml: 1,
                      }}
                    >
                      {subItem.icon}
                      {subItem.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* User section */}
        {userMenuItems.length > 0 && (
          <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, p: 2 }}>
            {userMenuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                fullWidth
                href={item.href}
                onClick={item.onClick}
                sx={{
                  justifyContent: 'flex-start',
                  gap: 2,
                  p: 1,
                  borderRadius: 1,
                  mb: 0.5,
                  ...(item.divider && {
                    mt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    pt: 2,
                  }),
                }}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    );

    const finalDrawerContent = drawerContent || defaultDrawerContent;

    return (
      <Box
        ref={ref}
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        {/* AppBar */}
        <AppBar
          position="fixed"
          logo={logo}
          logoHref={logoHref}
          onLogoClick={onLogoClick}
          links={isMobile ? [] : appBarLinks}
          menuItems={userMenuItems}
          menuLabel={userMenuLabel}
          accountButton={
            showThemeToggle ? (
              <ThemeToggle
                size={themeToggleProps.size || 'md'}
                showLabel={themeToggleProps.showLabel || false}
              />
            ) : undefined
          }
          variant={appBarProps.variant}
          wordmark={appBarProps.wordmark}
          elevation={appBarProps.elevation}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            ...(appBarProps.sx || {}),
          }}
        />

        {/* Main layout */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            mt: theme.spacing(8), // AppBar height
          }}
        >
          {/* Mobile Drawer */}
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileDrawerOpen}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true, // Better mobile performance
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
            >
              {finalDrawerContent}
            </Drawer>
          ) : (
            /* Desktop Drawer */
            shouldShowPersistentDrawer && (
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'relative',
                  },
                }}
              >
                {finalDrawerContent}
              </Drawer>
            )
          )}

          {/* Main content */}
          <Box
            id="main-content"
            component="main"
            tabIndex={-1}
            sx={{
              flex: 1,
              p: 3,
              backgroundColor: theme.palette.background.default,
              minHeight: `calc(100vh - ${theme.spacing(8)})`,
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            {children}
          </Box>
        </Box>

        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            aria-label="Open navigation menu"
            sx={{
              position: 'fixed',
              top: theme.spacing(9),
              left: theme.spacing(2),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              zIndex: theme.zIndex.drawer + 2,
              boxShadow: theme.shadows[3],
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>
    );
  }
);

AppLayoutImpl.displayName = 'AppLayoutImpl';
