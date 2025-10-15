'use client';

import { useState, useTransition } from 'react';
import { Box } from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';
import { MeetingCard } from '@/components/MeetingCard/MeetingCard';
import { InlineLoading } from '@/components/LoadingStates/LoadingStates';
import { Alert } from '@/components/Alert/Alert';
import { useTheme } from '@mui/material/styles';
import { Fade, Skeleton } from '@mui/material';
import { getMeetings } from '@/actions/meetings';
import type { MeetingsListProps } from '@/types/MeetingsListProps';
import type { MeetingListResponse } from '@/types/MeetingProps';

export const MeetingsListImpl = ({
  initialData,
  searchParams,
}: MeetingsListProps) => {
  const theme = useTheme();
  const [data, setData] = useState<MeetingListResponse>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = async () => {
    if (loading || !data.hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const nextPage = (searchParams.page || 1) + 1;
      const newData = await getMeetings({
        ...searchParams,
        page: nextPage,
      });

      setData((prev) => ({
        ...newData,
        meetings: [...prev.meetings, ...newData.meetings],
      }));
    } catch (err) {
      setError('Failed to load more meetings');
      console.error('Error loading more meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMeetingAction = (action: string, meetingId: string) => {
    startTransition(() => {
      switch (action) {
        case 'view':
          window.location.href = `/meetings/${meetingId}`;
          break;
        case 'edit':
          window.location.href = `/meetings/${meetingId}/edit`;
          break;
        case 'register':
          // Handle registration - could open a modal or navigate
          console.log('Register for meeting:', meetingId);
          break;
        default:
          console.log('Unknown action:', action, meetingId);
      }
    });
  };

  if (!data.meetings.length && !loading) {
    return (
      <Fade in timeout={600}>
        <Box
          sx={{
            textAlign: 'center',
            py: 10,
            px: 4,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            mx: 'auto',
            maxWidth: '500px',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.text.primary,
            }}
          >
            No meetings found
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            sx={{
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Try adjusting your search criteria or filters to discover more
            events.
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Results header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          p: 2,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: '0.95rem',
          }}
        >
          {data.total} meeting{data.total !== 1 ? 's' : ''} found
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.disabled,
            fontSize: '0.8rem',
          }}
        >
          Page {Math.floor(searchParams.page || 1)} of{' '}
          {Math.ceil(data.total / (searchParams.limit || 10))}
        </Typography>
      </Box>

      {/* Error display */}
      {error && (
        <Fade in timeout={400}>
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[2],
            }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Meetings grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(350px, 1fr))',
            md: 'repeat(auto-fit, minmax(380px, 1fr))',
            lg: 'repeat(auto-fit, minmax(400px, 1fr))',
          },
          gap: {
            xs: 2.5,
            sm: 3,
            md: 3.5,
            lg: 4,
          },
          mb: 6,
          alignItems: 'start',
          justifyContent: 'center',
          // Ensure grid items don't stretch too wide
          '& > *': {
            maxWidth: '500px',
            width: '100%',
            justifySelf: 'center',
          },
        }}
      >
        {data.meetings.map((meeting, index) => (
          <Fade
            key={meeting.id}
            in
            timeout={400}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div>
              <MeetingCard
                meeting={meeting}
                onView={(id) => handleMeetingAction('view', id)}
                onEdit={(id) => handleMeetingAction('edit', id)}
                onRegister={(id) => handleMeetingAction('register', id)}
                showActions
                variant="compact"
              />
            </div>
          </Fade>
        ))}
      </Box>

      {/* Load more button */}
      {data.hasMore && (
        <Fade in timeout={400}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
              mb: 4,
            }}
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={handleLoadMore}
              disabled={loading || isPending}
              sx={{
                minWidth: 240,
                py: 1.5,
                px: 4,
                borderRadius: theme.shape.borderRadius,
                fontWeight: theme.typography.fontWeightMedium,
                textTransform: 'none',
                fontSize: '1rem',
                border: `2px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                backgroundColor: 'transparent',
                transition: theme.transitions.create(
                  ['background-color', 'transform', 'box-shadow'],
                  {
                    duration: theme.transitions.duration.short,
                    easing: theme.transitions.easing.easeOut,
                  }
                ),
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8],
                  border: `2px solid ${theme.palette.primary.main}`,
                },
                '&:disabled': {
                  opacity: 0.6,
                  transform: 'none',
                },
              }}
            >
              {loading ? (
                <InlineLoading message="Loading..." />
              ) : (
                'Load More Meetings'
              )}
            </Button>
          </Box>
        </Fade>
      )}

      {/* Loading indicator for initial load */}
      {isPending && (
        <Fade in timeout={200}>
          <Box
            sx={{
              position: 'fixed',
              top: 24,
              right: 24,
              zIndex: theme.zIndex.tooltip,
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[8],
              border: `1px solid ${theme.palette.divider}`,
              p: 2,
            }}
          >
            <InlineLoading />
          </Box>
        </Fade>
      )}

      {/* Loading skeleton for initial page load */}
      {loading && data.meetings.length === 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fit, minmax(350px, 1fr))',
              md: 'repeat(auto-fit, minmax(380px, 1fr))',
              lg: 'repeat(auto-fit, minmax(400px, 1fr))',
            },
            gap: {
              xs: 2.5,
              sm: 3,
              md: 3.5,
              lg: 4,
            },
            mb: 6,
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          {[...Array(6)].map((_, index) => (
            <Fade
              key={index}
              in
              timeout={400}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <Box
                sx={{
                  maxWidth: '500px',
                  width: '100%',
                  justifySelf: 'center',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={320}
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    bgcolor: theme.palette.action.hover,
                  }}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};
