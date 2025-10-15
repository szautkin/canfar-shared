'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CreateFolderDialogProps,
  FolderValidation,
} from '@/types/CreateFolderDialogProps';

export function CreateFolderDialogImplementation({
  open,
  onClose,
  currentPath,
  existingFolders,
  onCreateFolder,
  isCreating = false,
}: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState('');
  const [validation, setValidation] = useState<FolderValidation>({
    isValid: false,
  });

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setFolderName('');
      setValidation({ isValid: false });
    }
  }, [open]);

  // Validate folder name
  const validateFolderName = useCallback(
    (name: string): FolderValidation => {
      if (!name.trim()) {
        return { isValid: false, errorMessage: 'Folder name cannot be empty' };
      }

      // Check for invalid characters (common filesystem restrictions)
      const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
      if (invalidChars.test(name)) {
        return {
          isValid: false,
          errorMessage:
            'Folder name contains invalid characters (< > : " / \\ | ? *)',
        };
      }

      // Check for reserved names (Windows)
      const reservedNames = [
        'CON',
        'PRN',
        'AUX',
        'NUL',
        'COM1',
        'COM2',
        'COM3',
        'COM4',
        'COM5',
        'COM6',
        'COM7',
        'COM8',
        'COM9',
        'LPT1',
        'LPT2',
        'LPT3',
        'LPT4',
        'LPT5',
        'LPT6',
        'LPT7',
        'LPT8',
        'LPT9',
      ];
      if (reservedNames.includes(name.toUpperCase())) {
        return {
          isValid: false,
          errorMessage: 'This name is reserved by the system',
        };
      }

      // Check for duplicate names (case-insensitive)
      if (
        existingFolders.some(
          (folder) => folder.toLowerCase() === name.toLowerCase()
        )
      ) {
        return {
          isValid: false,
          errorMessage: 'A folder with this name already exists',
        };
      }

      // Check for names starting or ending with spaces or dots
      if (name.startsWith(' ') || name.endsWith(' ')) {
        return {
          isValid: false,
          errorMessage: 'Folder name cannot start or end with spaces',
        };
      }

      if (name.startsWith('.') || name.endsWith('.')) {
        return {
          isValid: false,
          errorMessage: 'Folder name cannot start or end with dots',
        };
      }

      // Check for excessively long names
      if (name.length > 255) {
        return {
          isValid: false,
          errorMessage: 'Folder name is too long (max 255 characters)',
        };
      }

      return { isValid: true };
    },
    [existingFolders]
  );

  // Update validation when folder name changes
  useEffect(() => {
    const newValidation = validateFolderName(folderName);
    setValidation(newValidation);
  }, [folderName, validateFolderName]);

  const handleSubmit = () => {
    if (validation.isValid && folderName.trim()) {
      const fullPath = currentPath.endsWith('/')
        ? `${currentPath}${folderName.trim()}`
        : `${currentPath}/${folderName.trim()}`;

      onCreateFolder(folderName.trim(), fullPath);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && validation.isValid && !isCreating) {
      handleSubmit();
    }
  };

  const getPreviewPath = () => {
    if (!folderName.trim()) return currentPath;

    return currentPath.endsWith('/')
      ? `${currentPath}${folderName.trim()}/`
      : `${currentPath}/${folderName.trim()}/`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="create-folder-dialog-title"
    >
      <DialogTitle id="create-folder-dialog-title">
        Create New Folder
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current location:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'monospace',
              bgcolor: 'grey.50',
              p: 1,
              borderRadius: 1,
            }}
          >
            {currentPath}
          </Typography>
        </Box>

        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          fullWidth
          variant="outlined"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyDown={handleKeyDown}
          error={!!validation.errorMessage}
          helperText={validation.errorMessage}
          disabled={isCreating}
          placeholder="Enter folder name"
        />

        {folderName.trim() && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              New folder path:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                bgcolor: validation.isValid ? 'success.50' : 'error.50',
                p: 1,
                borderRadius: 1,
                border: 1,
                borderColor: validation.isValid ? 'success.200' : 'error.200',
              }}
            >
              {getPreviewPath()}
            </Typography>
          </Box>
        )}

        {validation.errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {validation.errorMessage}
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isCreating}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!validation.isValid || isCreating}
          startIcon={isCreating ? <CircularProgress size={16} /> : undefined}
        >
          {isCreating ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
