'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { EditDOIModalProps, DOIObject } from '@/types/DOITableProps';
import dayjs from 'dayjs';

interface FormData {
  title: string;
  authors: string[];
  description: string;
  status: 'In progress' | 'Published';
}

interface FormErrors {
  title?: string;
  authors?: string;
  description?: string;
  status?: string;
}

export function EditDOIModalImpl({
  open,
  onClose,
  onEditDOI,
  doi,
}: EditDOIModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    authors: [],
    description: '',
    status: 'In progress',
  });

  const [authorInput, setAuthorInput] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when DOI changes
  useEffect(() => {
    if (doi) {
      setFormData({
        title: doi.title || '',
        authors: doi.authors || [],
        description: doi.description || '',
        status: doi.status || 'In progress',
      });
    }
  }, [doi]);

  // Validate form
  const validateForm = useCallback((data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (data.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (data.authors.length === 0) {
      newErrors.authors = 'At least one author is required';
    }

    if (!data.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (data.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    return newErrors;
  }, []);

  // Handle form field changes
  const handleInputChange = useCallback(
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  // Handle status change
  const handleStatusChange = useCallback((event: SelectChangeEvent) => {
    const status = event.target.value as 'In progress' | 'Published';
    setFormData((prev) => ({ ...prev, status }));
  }, []);

  // Handle author input
  const handleAuthorInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuthorInput(event.target.value);
    },
    []
  );

  // Add author on Enter key or comma
  const handleAuthorKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        const author = authorInput.trim();
        if (author && !formData.authors.includes(author)) {
          setFormData((prev) => ({
            ...prev,
            authors: [...prev.authors, author],
          }));
          setAuthorInput('');

          // Clear authors error
          if (errors.authors) {
            setErrors((prev) => ({ ...prev, authors: undefined }));
          }
        }
      }
    },
    [authorInput, formData.authors, errors.authors]
  );

  // Remove author
  const handleRemoveAuthor = useCallback((authorToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((author) => author !== authorToRemove),
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!doi) return;

    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedDOI: DOIObject = {
        ...doi,
        title: formData.title.trim(),
        authors: formData.authors,
        description: formData.description.trim(),
        status: formData.status,
        modified: new Date(),
        // Set publishedDate if changing to Published status
        ...(formData.status === 'Published' &&
          doi.status !== 'Published' && {
            publishedDate: new Date(),
          }),
      };

      await onEditDOI(updatedDOI);
      onClose();
    } catch (error) {
      console.error('Failed to edit DOI:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [doi, formData, validateForm, onEditDOI]);

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setAuthorInput('');
      setErrors({});
      setIsSubmitting(false);
      onClose();
    }
  }, [isSubmitting]);

  if (!doi) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
          <EditIcon color="primary" />
          <Typography variant="h6" component="span">
            Edit DOI: {doi.doi}
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
        {/* DOI Information Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>DOI:</strong> {doi.doi} | <strong>Created:</strong>{' '}
            {doi.created
              ? dayjs(doi.created).format('YYYY-MM-DD HH:mm')
              : 'Unknown'}{' '}
            | <strong>Data Directory:</strong> {doi.dataDirectory}
          </Typography>
        </Alert>

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* Status Field */}
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={formData.status}
              onChange={handleStatusChange}
              label="Status"
              startAdornment={
                <InputAdornment position="start">
                  {formData.status === 'Published' ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <ScheduleIcon color="warning" />
                  )}
                </InputAdornment>
              }
            >
              <MenuItem value="In progress">In progress</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
            </Select>
          </FormControl>

          {/* Title Field */}
          <TextField
            label="Publication Title"
            value={formData.title}
            onChange={handleInputChange('title')}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
            multiline
            rows={2}
            placeholder="Enter the title of your publication"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Authors Field */}
          <Box>
            <TextField
              label="Authors"
              value={authorInput}
              onChange={handleAuthorInputChange}
              onKeyDown={handleAuthorKeyDown}
              error={!!errors.authors}
              fullWidth
              placeholder="Type author name and press Enter or comma to add"
              helperText={
                errors.authors || 'Press Enter or comma to add each author'
              }
            />

            {/* Authors Display */}
            {formData.authors.length > 0 && (
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.authors.map((author, index) => (
                  <Chip
                    key={index}
                    label={author}
                    onDelete={() => handleRemoveAuthor(author)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Description Field */}
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleInputChange('description')}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            required
            multiline
            rows={4}
            placeholder="Describe the data and research associated with this DOI"
          />

          {/* Publication Date Display */}
          {doi.publishedDate && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Published:</strong>{' '}
                {dayjs(doi.publishedDate).format('YYYY-MM-DD HH:mm')}
              </Typography>
            </Alert>
          )}
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
          startIcon={isSubmitting ? undefined : <EditIcon />}
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
          {isSubmitting ? 'Updating...' : 'Update DOI'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
