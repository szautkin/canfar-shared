'use client';

import { Box } from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';
import { Link } from '@/components/Link/Link';
import { useTheme } from '@mui/material/styles';
import { Breadcrumbs, Chip, Fade } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import type { MeetingsHeaderProps } from '@/types/MeetingsHeaderProps';

export const MeetingsHeaderImpl = ({
  showCreateButton = true,
  title = 'Meetings & Events',
  subtitle = 'Discover and register for astronomical research meetings, conferences, workshops, and seminars.',
}: MeetingsHeaderProps) => {
  const theme = useTheme();
  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          position: 'relative',
          mb: 6,
          p: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`,
          },
        }}
      >
        {/* Breadcrumb Navigation */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator="›"
            sx={{
              '& .MuiBreadcrumbs-separator': {
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                mx: 1,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <HomeIcon
                fontSize="small"
                sx={{ color: theme.palette.text.secondary }}
              />
              <Typography
                color="secondary"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                CANFAR
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EventIcon
                fontSize="small"
                sx={{ color: theme.palette.primary.main }}
              />
              <Typography
                color="primary"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                Meetings & Events
              </Typography>
            </Box>
          </Breadcrumbs>
        </Box>

        {/* Main Header Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* Title with icon and chip */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: '-0.02em',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                {title}
              </Typography>
              <Chip
                label="New"
                size="small"
                sx={{
                  backgroundColor: theme.palette.accent.main,
                  color: theme.palette.accent.contrastText,
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: '0.7rem',
                  height: '24px',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      boxShadow: `0 0 0 0 ${theme.palette.accent.main}40`,
                    },
                    '70%': {
                      boxShadow: `0 0 0 8px ${theme.palette.accent.main}00`,
                    },
                    '100%': {
                      boxShadow: `0 0 0 0 ${theme.palette.accent.main}00`,
                    },
                  },
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                lineHeight: 1.6,
                maxWidth: '700px',
                fontWeight: theme.typography.fontWeightRegular,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          {showCreateButton && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignSelf: { xs: 'stretch', sm: 'flex-start' },
                minWidth: { sm: '200px' },
              }}
            >
              <Button
                component={Link}
                href="/meetings/create"
                variant="primary"
                size="lg"
                startIcon={<AddIcon />}
                sx={{
                  whiteSpace: 'nowrap',
                  py: 1.5,
                  px: 3,
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeightBold,
                  textTransform: 'none',
                  borderRadius: theme.shape.borderRadius,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                  transition: theme.transitions.create(
                    ['transform', 'box-shadow', 'background'],
                    {
                      duration: theme.transitions.duration.short,
                      easing: theme.transitions.easing.easeOut,
                    }
                  ),
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}50`,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                Create Meeting
              </Button>

              {/* Secondary action button */}
              <Button
                variant="secondary"
                size="lg"
                sx={{
                  whiteSpace: 'nowrap',
                  py: 1.5,
                  px: 3,
                  fontSize: '1rem',
                  fontWeight: theme.typography.fontWeightMedium,
                  textTransform: 'none',
                  borderRadius: theme.shape.borderRadius,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent',
                  transition: theme.transitions.create(
                    ['background-color', 'transform', 'border-color'],
                    {
                      duration: theme.transitions.duration.short,
                      easing: theme.transitions.easing.easeOut,
                    }
                  ),
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '08',
                    borderColor: theme.palette.primary.dark,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Browse All
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  );
};
