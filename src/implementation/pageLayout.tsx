'use client';

import React from 'react';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  SwipeableDrawer,
  SwipeableDrawerProps,
} from '@mui/material';
import { PageLayoutProps } from '@/types/PageLayoutProps';

export const PageLayoutImplementation: React.FC<PageLayoutProps> = ({
  variant = 'centered',
  header,
  children,
  footer,
  sidebar,
  sidebarPosition = 'left',
  sidebarWidth = 280,
  sidebarCollapsedWidth = 0,
  maxWidth = 'lg',
  disablePadding = false,
  disableGutters = false,
  minHeight = '100vh',
  fixed = false,
  className,
  containerProps,
  headerProps,
  footerProps,
  sidebarProps,
  mobileDrawerOpen,
  onMobileDrawerToggle,
  mobileDrawerBreakpoint = 'md',
  contentBackgroundColor,
  enableStickyFooter = false,
  sx,
  ...boxProps
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(
    theme.breakpoints.down(mobileDrawerBreakpoint)
  );
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Responsive sidebar width
  const responsiveSidebarWidth = React.useMemo(() => {
    if (isMobile) return '80%'; // 80% of screen on mobile
    if (isTablet) return Math.min(sidebarWidth, 320); // Cap at 320px on tablet
    return sidebarWidth; // Full width on desktop
  }, [isMobile, isTablet, sidebarWidth]);

  const showSidebar = variant === 'with-sidebar' && sidebar;
  const useMobileDrawer =
    isMobile && showSidebar && onMobileDrawerToggle !== undefined;

  // Calculate main content styles based on layout
  const getMainContentStyles = () => {
    const baseStyles = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: fixed && (header || footer) ? 'auto' : minHeight,
      backgroundColor:
        contentBackgroundColor || theme.palette.background.default,
      transition: theme.transitions.create(['margin', 'padding'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),
      ...(disablePadding
        ? {}
        : {
            padding: {
              xs: theme.spacing(2),
              sm: theme.spacing(3),
              md: theme.spacing(4),
              lg: theme.spacing(6),
              xl: theme.spacing(8),
            },
          }),
    };

    if (fixed && (header || footer)) {
      const headerHeight = headerProps?.height || 64; // Allow custom header height
      const footerHeight = footerProps?.height || 64; // Allow custom footer height
      let heightCalc = '100vh';

      if (header && footer) {
        heightCalc = `calc(100vh - ${headerHeight + footerHeight}px)`;
      } else if (header) {
        heightCalc = `calc(100vh - ${headerHeight}px)`;
      } else if (footer) {
        heightCalc = `calc(100vh - ${footerHeight}px)`;
      }

      baseStyles.minHeight = heightCalc;
    }

    return baseStyles;
  };

  // Render main content based on variant
  const renderMainContent = () => {
    const mainContent = <Box sx={getMainContentStyles()}>{children}</Box>;

    if (variant === 'centered') {
      return (
        <Container
          maxWidth={maxWidth}
          disableGutters={disableGutters}
          {...containerProps}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            ...containerProps?.sx,
          }}
        >
          {mainContent}
        </Container>
      );
    }

    return mainContent;
  };

  // Layout wrapper styles
  const layoutStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: minHeight,
    backgroundColor: theme.palette.background.default,
  };

  // Fixed layout styles
  const fixedLayoutStyles = fixed
    ? {
        height: '100vh',
        overflow: 'hidden',
      }
    : {};

  // Content area styles (header + main + footer)
  const contentAreaStyles = {
    display: 'flex',
    flex: 1,
    overflow: fixed ? 'hidden' : 'visible',
  };

  // Sidebar styles
  const sidebarStyles = React.useMemo(
    () => ({
      width: responsiveSidebarWidth,
      flexShrink: 0,
      backgroundColor: theme.palette.background.paper,
      borderRight:
        sidebarPosition === 'left'
          ? `1px solid ${theme.palette.divider}`
          : undefined,
      borderLeft:
        sidebarPosition === 'right'
          ? `1px solid ${theme.palette.divider}`
          : undefined,
      overflow: fixed ? 'auto' : 'visible',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),
      height: fixed ? '100%' : 'auto',
    }),
    [responsiveSidebarWidth, sidebarPosition, theme, fixed]
  );

  // Main area wrapper (for sidebar layout)
  const mainAreaStyles = React.useMemo(
    () => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: fixed ? 'auto' : 'visible',
      // Only add margin when not using mobile drawer
      ...(!useMobileDrawer &&
        showSidebar &&
        !isMobile && {
          marginLeft:
            sidebarPosition === 'left' && !sidebarCollapsedWidth
              ? 0
              : undefined,
          marginRight:
            sidebarPosition === 'right' && !sidebarCollapsedWidth
              ? 0
              : undefined,
        }),
    }),
    [
      fixed,
      useMobileDrawer,
      showSidebar,
      isMobile,
      sidebarPosition,
      sidebarCollapsedWidth,
    ]
  );

  // Render sidebar content
  const renderSidebarContent = () => (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        ...sidebarProps?.sx,
      }}
    >
      {sidebar}
    </Box>
  );

  // Render sidebar based on mobile/desktop
  const renderSidebar = () => {
    if (!showSidebar) return null;

    if (useMobileDrawer) {
      const DrawerComponent = sidebarProps?.disableSwipeToOpen
        ? Drawer
        : SwipeableDrawer;
      const baseDrawerProps = {
        anchor: sidebarPosition,
        open: mobileDrawerOpen || false,
        onClose: onMobileDrawerToggle
          ? () => onMobileDrawerToggle(false)
          : undefined,
        sx: {
          '& .MuiDrawer-paper': {
            ...sidebarStyles,
            width: responsiveSidebarWidth, // width should come after spread to override
          },
        },
      };

      if (
        !sidebarProps?.disableSwipeToOpen &&
        DrawerComponent === SwipeableDrawer
      ) {
        const swipeableProps: SwipeableDrawerProps = {
          ...baseDrawerProps,
          onOpen: () => onMobileDrawerToggle?.(true),
          onClose: () => {
            if (onMobileDrawerToggle) {
              onMobileDrawerToggle(false);
            }
          },
          disableBackdropTransition: !theme.transitions.duration.standard,
          disableDiscovery: false,
        };
        return (
          <SwipeableDrawer {...swipeableProps}>
            {renderSidebarContent()}
          </SwipeableDrawer>
        );
      }

      return <Drawer {...baseDrawerProps}>{renderSidebarContent()}</Drawer>;
    }

    return (
      <Box
        component="aside"
        sx={{
          ...sidebarStyles,
          ...sidebarProps?.sx,
        }}
        {...sidebarProps}
      >
        {sidebar}
      </Box>
    );
  };

  return (
    <Box
      className={className}
      sx={{
        ...layoutStyles,
        ...fixedLayoutStyles,
        ...sx,
      }}
      {...boxProps}
    >
      {/* Header */}
      {header && (
        <Box
          component="header"
          sx={{
            flexShrink: 0,
            zIndex: theme.zIndex.appBar,
            position: fixed ? 'sticky' : 'relative',
            top: 0,
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            ...headerProps?.sx,
          }}
          {...headerProps}
        >
          {header}
        </Box>
      )}

      {/* Content Area */}
      <Box sx={contentAreaStyles}>
        {/* Sidebar (left position) - Desktop */}
        {showSidebar &&
          sidebarPosition === 'left' &&
          !useMobileDrawer &&
          renderSidebar()}

        {/* Main Content */}
        <Box sx={mainAreaStyles}>
          <Box component="main" sx={{ flex: 1 }}>
            {renderMainContent()}
          </Box>

          {/* Footer */}
          {footer && (
            <Box
              component="footer"
              sx={{
                flexShrink: 0,
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
                ...(enableStickyFooter && {
                  position: 'sticky',
                  bottom: 0,
                  zIndex: theme.zIndex.appBar - 1,
                }),
                ...footerProps?.sx,
              }}
              {...footerProps}
            >
              {footer}
            </Box>
          )}
        </Box>

        {/* Sidebar (right position) - Desktop */}
        {showSidebar &&
          sidebarPosition === 'right' &&
          !useMobileDrawer &&
          renderSidebar()}
      </Box>

      {/* Mobile Drawer */}
      {useMobileDrawer && renderSidebar()}
    </Box>
  );
};
