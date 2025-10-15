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
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { AddDOIModalProps, DOIObject } from '@/types/DOITableProps';

interface FormData {
  title: string;
  authors: string[];
  description: string;
}

interface FormErrors {
  title?: string;
  authors?: string;
  description?: string;
}

export function AddDOIModalImpl({
  open,
  onClose,
  onAddDOI,
  existingDOIs,
}: AddDOIModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    authors: [],
    description: '',
  });

  const [authorInput, setAuthorInput] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next DOI number
  const generateNextDOI = useCallback(() => {
    const existingNumbers = existingDOIs
      .map((doi) => parseFloat(doi))
      .filter((num) => !isNaN(num))
      .sort((a, b) => b - a);

    const lastNumber = existingNumbers.length > 0 ? existingNumbers[0] : 25.0;
    const nextNumber = lastNumber + 0.0001;
    return nextNumber.toFixed(4);
  }, [existingDOIs]);

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
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const newDOI: Omit<DOIObject, 'created' | 'modified'> = {
        doi: generateNextDOI(),
        status: 'In progress',
        title: formData.title.trim(),
        dataDirectory: `/storage/list/AstroDataCitationDOI/CISTI.CANFAR/${generateNextDOI()}/data`,
        authors: formData.authors,
        description: formData.description.trim(),
      };

      await onAddDOI(newDOI);
      onClose();
    } catch (error) {
      console.error('Failed to add DOI:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, generateNextDOI, onAddDOI]);

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setFormData({ title: '', authors: [], description: '' });
      setAuthorInput('');
      setErrors({});
      setIsSubmitting(false);
      onClose();
    }
  }, [isSubmitting, onClose]);

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
          <AssignmentIcon color="primary" />
          <Typography variant="h6" component="span">
            Request New DOI
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
            DOI Number: <strong>{generateNextDOI()}</strong> will be
            automatically assigned. Data will be stored at:{' '}
            <strong>
              /AstroDataCitationDOI/CISTI.CANFAR/{generateNextDOI()}/data
            </strong>
          </Typography>
        </Alert>

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
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
          {isSubmitting ? 'Creating...' : 'Create DOI'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
