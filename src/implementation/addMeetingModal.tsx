'use client';

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
  Alert,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import {
  AddMeetingModalProps,
  MeetingObject,
} from '@/types/MeetingTableProps';

interface FormData {
  title: string;
  speaker: string;
  date: string; // ISO date string
  time: string; // HH:mm format
  duration: number;
  institution: string;
  abstract: string;
  location: string;
  meetingType: 'Presentation' | 'Workshop' | 'Seminar' | 'Conference' | 'Other';
}

interface FormErrors {
  title?: string;
  speaker?: string;
  date?: string;
  time?: string;
  duration?: string;
  institution?: string;
  abstract?: string;
  location?: string;
  meetingType?: string;
}

const meetingTypes = [
  'Presentation',
  'Workshop',
  'Seminar',
  'Conference',
  'Other',
] as const;

export function AddMeetingModalImpl({
  open,
  onClose,
  onAddMeeting,
}: AddMeetingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    speaker: '',
    date: '',
    time: '',
    duration: 60,
    institution: '',
    abstract: '',
    location: '',
    meetingType: 'Presentation',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in YYYY-MM-DD format for date input minimum
  const getTodayDate = useCallback(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // Validate form
  const validateForm = useCallback((data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (data.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!data.speaker.trim()) {
      newErrors.speaker = 'Speaker is required';
    }

    if (!data.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!data.time) {
      newErrors.time = 'Time is required';
    }

    if (!data.duration || data.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    } else if (data.duration > 480) {
      newErrors.duration = 'Duration cannot exceed 8 hours (480 minutes)';
    }

    if (!data.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }

    if (!data.abstract.trim()) {
      newErrors.abstract = 'Abstract is required';
    } else if (data.abstract.length < 10) {
      newErrors.abstract = 'Abstract must be at least 10 characters long';
    }

    if (!data.location.trim()) {
      newErrors.location = 'Location is required';
    }

    return newErrors;
  }, []);

  // Handle form field changes
  const handleInputChange = useCallback(
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'duration'
          ? parseInt(event.target.value, 10) || 0
          : event.target.value;

      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setFormData({
        title: '',
        speaker: '',
        date: '',
        time: '',
        duration: 60,
        institution: '',
        abstract: '',
        location: '',
        meetingType: 'Presentation',
      });
      setErrors({});
      setIsSubmitting(false);
      onClose();
    }
  }, [isSubmitting, onClose]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const newMeeting: Omit<MeetingObject, 'id' | 'created' | 'modified'> = {
        title: formData.title.trim(),
        speaker: formData.speaker.trim(),
        date: new Date(formData.date),
        time: formData.time,
        duration: formData.duration,
        institution: formData.institution.trim(),
        abstract: formData.abstract.trim(),
        location: formData.location.trim(),
        meetingType: formData.meetingType,
        status: 'Scheduled',
      };

      await onAddMeeting(newMeeting);
      handleClose();
    } catch (error) {
      console.error('Failed to add meeting:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onAddMeeting, handleClose]);

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
            Schedule New Meeting
          </Typography>
        </Box>
        <Button
          onClick={handleClose}
          color="inherit"
          size="small"
          disabled={isSubmitting}
          sx={{ minWidth: 'auto', p: 0.5 }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Schedule a new meeting or event. All fields marked with * are
            required.
          </Typography>
        </Alert>

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* Title Field */}
          <TextField
            label="Meeting Title"
            value={formData.title}
            onChange={handleInputChange('title')}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
            placeholder="Enter the meeting title"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Speaker and Institution */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              label="Speaker"
              value={formData.speaker}
              onChange={handleInputChange('speaker')}
              error={!!errors.speaker}
              helperText={errors.speaker}
              fullWidth
              required
              placeholder="Speaker name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Institution"
              value={formData.institution}
              onChange={handleInputChange('institution')}
              error={!!errors.institution}
              helperText={errors.institution}
              fullWidth
              required
              placeholder="Speaker's institution"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Date, Time, and Duration */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
              error={!!errors.date}
              helperText={errors.date}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: getTodayDate() }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Time"
              type="time"
              value={formData.time}
              onChange={handleInputChange('time')}
              error={!!errors.time}
              helperText={errors.time}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ScheduleIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Duration (minutes)"
              type="number"
              value={formData.duration}
              onChange={handleInputChange('duration')}
              error={!!errors.duration}
              helperText={errors.duration}
              fullWidth
              required
              inputProps={{ min: 15, max: 480, step: 15 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ScheduleIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Meeting Type and Location */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              label="Meeting Type"
              select
              value={formData.meetingType}
              onChange={handleInputChange('meetingType')}
              error={!!errors.meetingType}
              helperText={errors.meetingType}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon color="action" />
                  </InputAdornment>
                ),
              }}
            >
              {meetingTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Location"
              value={formData.location}
              onChange={handleInputChange('location')}
              error={!!errors.location}
              helperText={errors.location}
              fullWidth
              required
              placeholder="Room number, online link, etc."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Abstract Field */}
          <TextField
            label="Abstract"
            value={formData.abstract}
            onChange={handleInputChange('abstract')}
            error={!!errors.abstract}
            helperText={errors.abstract}
            fullWidth
            required
            multiline
            rows={4}
            placeholder="Describe the meeting content and objectives"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ alignSelf: 'flex-start', mt: 1 }}
                >
                  <DescriptionIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={handleClose} disabled={isSubmitting} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? undefined : <AddIcon />}
          sx={{
            minWidth: 120,
            transition: (theme) =>
              theme.transitions.create(['transform'], {
                duration: theme.transitions.duration.shorter,
              }),
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
