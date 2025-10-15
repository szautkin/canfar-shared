'use client';

import React, { useCallback } from 'react';
import {
  MeetingDetailsModalProps,
  MeetingObject,
} from '@/types/MeetingDetailsModalProps';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Link,
} from '@mui/material';
import {
  Close as CloseIcon,
  Info as InfoIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  CalendarToday as CalendarTodayIcon,
  Link as LinkIcon,
  Label as LabelIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';

// Type guard to check if meeting has Meeting type properties
interface MeetingTypeGuarded {
  id: string;
  title: string;
  status: string;
  visibility?: string;
  description?: string;
  start?: string;
  end?: string;
  timezone?: string | null;
  owner?: {
    fullName: string;
    email?: string;
    institute?: string;
    department?: string | null;
    type?: string;
  };
  location?: string | null;
  contact?: string | null;
  keywords?: string[];
  links?: string[];
  createdAt?: string;
  lastModified?: string;
  [key: string]: unknown;
}

export function MeetingDetailsModalImpl({
  open,
  onClose,
  meeting,
  infoMode = false,
}: MeetingDetailsModalProps) {
  // Cast meeting to a type-safe version
  const typedMeeting = meeting as MeetingTypeGuarded | null | undefined;

  // Handle modal close
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Info mode - show general information about the meetings service
  if (infoMode || !typedMeeting) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon color="primary" />
            <Typography variant="h6">About CANFAR Meetings</Typography>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography paragraph>
            The CANFAR Meetings service provides a centralized platform for
            managing and discovering astronomy-related meetings, conferences,
            workshops, and seminars.
          </Typography>
          <Typography paragraph>
            <strong>Features:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>Browse upcoming astronomy meetings and events</li>
            <li>Submit new meetings for community visibility</li>
            <li>Filter by type, status, and location</li>
            <li>Search across all meeting fields</li>
            <li>Export meeting details to calendar</li>
          </Box>
          <Typography paragraph sx={{ mt: 2 }}>
            <strong>Meeting Types:</strong>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Conference" size="small" />
            <Chip label="Workshop" size="small" />
            <Chip label="Seminar" size="small" />
            <Chip label="Webinar" size="small" />
            <Chip label="Training" size="small" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Format status with appropriate icon and color
  const getStatusChip = () => {
    const statusConfig = {
      DRAFT: {
        icon: <ScheduleIcon />,
        color: 'default' as const,
        description: 'Meeting is in draft status',
      },
      PUBLISHED: {
        icon: <CheckCircleIcon />,
        color: 'success' as const,
        description: 'Meeting is published and visible',
      },
      COMPLETED: {
        icon: <CheckCircleIcon />,
        color: 'info' as const,
        description: 'Meeting has been completed',
      },
      CANCELLED: {
        icon: <CancelIcon />,
        color: 'error' as const,
        description: 'Meeting has been cancelled',
      },
    };

    const config =
      statusConfig[typedMeeting.status as keyof typeof statusConfig] ||
      statusConfig.DRAFT;
    return (
      <Tooltip title={config.description}>
        <Chip
          icon={config.icon}
          label={typedMeeting.status}
          color={config.color}
          variant="filled"
          size="medium"
        />
      </Tooltip>
    );
  };

  // Format date and time
  const formatDateTime = () => {
    // Handle both Meeting and MeetingObject types
    if ('start' in typedMeeting && 'end' in typedMeeting) {
      // Meeting type with start/end
      const start = dayjs(typedMeeting.start as string);
      const end = dayjs(typedMeeting.end as string);
      const isMultiDay = !start.isSame(end, 'day');

      if (isMultiDay) {
        return `${start.format('MMM DD, YYYY HH:mm')} - ${end.format('MMM DD, YYYY HH:mm')}`;
      } else {
        return `${start.format('MMM DD, YYYY')} • ${start.format('HH:mm')} - ${end.format('HH:mm')}`;
      }
    } else if ('date' in typedMeeting && 'time' in typedMeeting) {
      // MeetingObject type with date/time
      const dateTime = dayjs((typedMeeting as MeetingObject).date);
      return `${dateTime.format('MMM DD, YYYY')} • ${(typedMeeting as MeetingObject).time}`;
    }
    return 'Date not available';
  };

  // Calculate duration
  const calculateDuration = () => {
    if ('start' in typedMeeting && 'end' in typedMeeting) {
      const start = dayjs(typedMeeting.start as string);
      const end = dayjs(typedMeeting.end as string);
      const minutes = end.diff(start, 'minute');
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''}`;
      }
      return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes}m`;
    } else if ('duration' in typedMeeting) {
      return `${(typedMeeting as MeetingObject).duration} minutes`;
    }
    return 'Duration not available';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon color="primary" />
          <Typography variant="h6" component="span">
            Meeting Details
          </Typography>
        </Box>
        <IconButton onClick={handleClose} color="inherit" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        {/* Status and Visibility */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
          {getStatusChip()}
          <Chip
            label={String(typedMeeting.visibility || 'PUBLIC')}
            color="default"
            variant="outlined"
            size="medium"
          />
        </Box>

        {/* Main Meeting Information Card */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
              {typedMeeting.title}
            </Typography>

            {typedMeeting.description && (
              <Typography variant="body1" paragraph color="text.secondary">
                {typedMeeting.description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Date and Time */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date & Time
                  </Typography>
                  <Typography variant="body1">{formatDateTime()}</Typography>
                  {typedMeeting.timezone && (
                    <Typography variant="caption" color="text.secondary">
                      {typedMeeting.timezone}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Duration */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScheduleIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1">{calculateDuration()}</Typography>
                </Box>
              </Box>

              {/* Organizer */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Organizer
                  </Typography>
                  <Typography variant="body1">
                    {typedMeeting.owner?.fullName || 'Unknown'}
                  </Typography>
                  {typedMeeting.owner?.email && (
                    <Typography variant="caption" color="text.secondary">
                      {typedMeeting.owner.email}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Institution */}
              {typedMeeting.owner?.institute && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Institution
                    </Typography>
                    <Typography variant="body1">
                      {typedMeeting.owner.institute}
                      {typedMeeting.owner.department &&
                        ` - ${typedMeeting.owner.department}`}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Location */}
              {typedMeeting.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {typedMeeting.location}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Contact */}
              {typedMeeting.contact && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Contact
                    </Typography>
                    <Typography variant="body1">
                      {typedMeeting.contact}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Keywords */}
        {typedMeeting.keywords && typedMeeting.keywords.length > 0 && (
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <LabelIcon color="primary" />
                <Typography variant="h6" component="h3">
                  Keywords
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {typedMeeting.keywords.map((keyword: string, index: number) => (
                  <Chip
                    key={index}
                    label={keyword}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Links */}
        {typedMeeting.links && typedMeeting.links.length > 0 && (
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <LinkIcon color="primary" />
                <Typography variant="h6" component="h3">
                  Related Links
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {typedMeeting.links.map((link: string, index: number) => (
                  <Link
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Metadata Card */}
        <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarTodayIcon color="action" />
              <Typography variant="subtitle1" color="text.secondary">
                Meeting Information
              </Typography>
            </Box>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
            >
              <Box>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Meeting ID
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {typedMeeting.id}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Owner Type
                </Typography>
                <Typography variant="body2">
                  {typedMeeting.owner?.type || 'Unknown'}
                </Typography>
              </Box>
              {typedMeeting.createdAt && (
                <Box>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    Created
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(typedMeeting.createdAt).format('MMM DD, YYYY HH:mm')}
                  </Typography>
                </Box>
              )}
              {typedMeeting.lastModified && (
                <Box>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    Last Modified
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(typedMeeting.lastModified).format(
                      'MMM DD, YYYY HH:mm'
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
