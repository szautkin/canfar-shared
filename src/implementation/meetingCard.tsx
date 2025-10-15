import { Card, CardContent, CardActions } from '@mui/material';
import { Box } from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/Button/Button';
import { Chip } from '@/components/Chip/Chip';
import { IconButton } from '@/components/IconButton/IconButton';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material/styles';
import type { MeetingCardProps } from '@/types/MeetingProps';

export const MeetingCardImpl = ({
  meeting,
  onEdit,
  onView,
  onRegister,
  showActions = false,
  variant = 'compact',
}: MeetingCardProps) => {
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create(
          ['transform', 'box-shadow', 'border-color'],
          {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeOut,
          }
        ),
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          borderColor: theme.palette.primary.main,
          '& .meeting-card-actions': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        cursor: onView ? 'pointer' : 'default',
        overflow: 'hidden',
      }}
      onClick={() => onView?.(meeting.id)}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          pb: showActions ? 1 : 3,
          p: 3,
          position: 'relative',
        }}
      >
        {/* Header with type and status */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2.5,
            gap: 1,
          }}
        >
          <Chip
            label={getTypeLabel(meeting.type)}
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.primary.main + '08',
              borderColor: theme.palette.primary.main + '30',
              color: theme.palette.primary.main,
              fontWeight: theme.typography.fontWeightMedium,
              fontSize: '0.75rem',
            }}
          />
          <Chip
            label={meeting.status}
            size="small"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              fontSize: '0.75rem',
              boxShadow: `0 1px 3px ${theme.palette.action.hover}`,
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: theme.typography.fontWeightBold,
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            color: theme.palette.text.primary,
            fontSize: variant === 'compact' ? '1.1rem' : '1.25rem',
            letterSpacing: '-0.01em',
          }}
        >
          {meeting.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="secondary"
          sx={{
            mb: 2.5,
            display: '-webkit-box',
            WebkitLineClamp: variant === 'compact' ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
            fontSize: '0.875rem',
            color: theme.palette.text.secondary,
          }}
        >
          {meeting.description}
        </Typography>

        {/* Date */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1.5,
            color: theme.palette.text.secondary,
            p: 1,
            borderRadius: 1,
            backgroundColor: theme.palette.action.hover,
          }}
        >
          <EventIcon
            fontSize="small"
            sx={{
              mr: 1.5,
              color: theme.palette.primary.main,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.8rem',
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            {formatDate(meeting.startDate)}
            {meeting.startDate !== meeting.endDate && (
              <> - {formatDate(meeting.endDate)}</>
            )}
          </Typography>
        </Box>

        {/* Location */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1.5,
            color: theme.palette.text.secondary,
            p: 1,
            borderRadius: 1,
            backgroundColor: theme.palette.action.hover,
          }}
        >
          <LocationOnIcon
            fontSize="small"
            sx={{
              mr: 1.5,
              color:
                meeting.location.type === 'virtual'
                  ? theme.palette.info.main
                  : meeting.location.type === 'hybrid'
                    ? theme.palette.warning.main
                    : theme.palette.success.main,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.8rem',
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            {meeting.location.type === 'virtual'
              ? 'Virtual Event'
              : meeting.location.type === 'hybrid'
                ? 'Hybrid Event'
                : meeting.location.venue ||
                  meeting.location.city ||
                  'In Person'}
          </Typography>
        </Box>

        {/* Attendees count */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2.5,
            color: theme.palette.text.secondary,
            p: 1,
            borderRadius: 1,
            backgroundColor: theme.palette.action.hover,
          }}
        >
          <PeopleIcon
            fontSize="small"
            sx={{
              mr: 1.5,
              color: theme.palette.tertiary.main,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.8rem',
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            {meeting.attendees.length} attendee
            {meeting.attendees.length !== 1 ? 's' : ''}
            {meeting.maxAttendees && (
              <Box
                component="span"
                sx={{
                  ml: 0.5,
                  color: theme.palette.text.disabled,
                  fontSize: '0.75rem',
                }}
              >
                / {meeting.maxAttendees} max
              </Box>
            )}
          </Typography>
        </Box>

        {/* Tags */}
        {meeting.tags.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.75,
              mt: 'auto',
              pt: 1,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            {meeting.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: '22px',
                  backgroundColor: theme.palette.accent.main + '08',
                  borderColor: theme.palette.accent.main + '30',
                  color: theme.palette.accent.dark,
                  fontWeight: theme.typography.fontWeightMedium,
                  '&:hover': {
                    backgroundColor: theme.palette.accent.main + '15',
                  },
                }}
              />
            ))}
            {meeting.tags.length > 3 && (
              <Chip
                label={`+${meeting.tags.length - 3} more`}
                size="small"
                variant="filled"
                sx={{
                  fontSize: '0.7rem',
                  height: '22px',
                  backgroundColor: theme.palette.grey[200],
                  color: theme.palette.text.secondary,
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              />
            )}
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      {showActions && (
        <CardActions
          className="meeting-card-actions"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            pb: 3,
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            opacity: 0.8,
            transform: 'translateY(4px)',
            transition: theme.transitions.create(['opacity', 'transform'], {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeOut,
            }),
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView?.(meeting.id);
              }}
              aria-label="View meeting details"
              sx={{
                backgroundColor: theme.palette.primary.main + '10',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '20',
                  transform: 'scale(1.1)',
                },
                transition: theme.transitions.create(
                  ['transform', 'background-color'],
                  { duration: theme.transitions.duration.shorter }
                ),
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            {onEdit && (
              <IconButton
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(meeting.id);
                }}
                aria-label="Edit meeting"
                sx={{
                  backgroundColor: theme.palette.secondary.main + '10',
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main + '20',
                    transform: 'scale(1.1)',
                  },
                  transition: theme.transitions.create(
                    ['transform', 'background-color'],
                    { duration: theme.transitions.duration.shorter }
                  ),
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {onRegister &&
            meeting.allowRegistration &&
            meeting.registrationStatus === 'open' && (
              <Button
                size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onRegister(meeting.id);
                }}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: theme.typography.fontWeightMedium,
                  textTransform: 'none',
                  minHeight: '32px',
                  px: 2,
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: theme.shadows[4],
                  },
                  transition: theme.transitions.create(
                    ['transform', 'box-shadow'],
                    { duration: theme.transitions.duration.shorter }
                  ),
                }}
              >
                Register
              </Button>
            )}
        </CardActions>
      )}
    </Card>
  );
};
