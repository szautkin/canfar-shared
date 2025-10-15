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
import { GroupAdd as GroupAddIcon } from '@mui/icons-material';
import type {
  AddGroupDialogProps,
  GroupObject,
} from '@/types/GroupTableProps';

interface GroupValidation {
  isValid: boolean;
  errorMessage?: string;
}

export function AddGroupDialogImplementation({
  open,
  onClose,
  onAddGroup,
  existingGroups,
}: AddGroupDialogProps) {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [validation, setValidation] = useState<GroupValidation>({
    isValid: false,
  });

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setGroupName('');
      setDescription('');
      setIsCreating(false);
      setValidation({ isValid: false });
    }
  }, [open]);

  // Validate group name
  const validateGroupName = useCallback(
    (name: string): GroupValidation => {
      if (!name.trim()) {
        return { isValid: false, errorMessage: 'Group name cannot be empty' };
      }

      // Check for minimum length
      if (name.trim().length < 3) {
        return {
          isValid: false,
          errorMessage: 'Group name must be at least 3 characters long',
        };
      }

      // Check for invalid characters (alphanumeric, hyphens, underscores only)
      const invalidChars = /[^a-zA-Z0-9\-_]/;
      if (invalidChars.test(name)) {
        return {
          isValid: false,
          errorMessage:
            'Group name can only contain letters, numbers, hyphens, and underscores',
        };
      }

      // Check for names starting with numbers or special characters
      if (!/^[a-zA-Z]/.test(name)) {
        return {
          isValid: false,
          errorMessage: 'Group name must start with a letter',
        };
      }

      // Check for duplicate names (case-insensitive)
      if (
        existingGroups.some(
          (group) => group.toLowerCase() === name.toLowerCase()
        )
      ) {
        return {
          isValid: false,
          errorMessage: 'A group with this name already exists',
        };
      }

      // Check for reserved names
      const reservedNames = ['admin', 'root', 'system', 'public', 'private'];
      if (reservedNames.includes(name.toLowerCase())) {
        return {
          isValid: false,
          errorMessage: 'This name is reserved by the system',
        };
      }

      // Check for excessively long names
      if (name.length > 50) {
        return {
          isValid: false,
          errorMessage: 'Group name is too long (max 50 characters)',
        };
      }

      return { isValid: true };
    },
    [existingGroups]
  );

  // Update validation when group name changes
  useEffect(() => {
    const newValidation = validateGroupName(groupName);
    setValidation(newValidation);
  }, [groupName, validateGroupName]);

  const handleSubmit = async () => {
    if (validation.isValid && groupName.trim()) {
      setIsCreating(true);
      try {
        const newGroup: Omit<GroupObject, 'created' | 'modified'> = {
          name: groupName.trim(),
          ownerName: 'current.user', // This would be replaced with actual current user
          administrators: ['current.user'], // Owner is automatically an admin
          members: [],
          description: description.trim(),
        };

        await onAddGroup(newGroup);
        onClose();
      } catch (error) {
        console.error('Failed to create group:', error);
        // Error handling would be done by parent component
      } finally {
        setIsCreating(false);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && validation.isValid && !isCreating) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isCreating ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="add-group-dialog-title"
    >
      <DialogTitle id="add-group-dialog-title" sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <GroupAddIcon />
          Create New Group
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Create a new group for collaboration and resource sharing. You will
            automatically be added as the group owner and administrator.
          </Typography>
        </Box>

        <TextField
          autoFocus
          margin="dense"
          label="Group Name"
          fullWidth
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onKeyDown={handleKeyDown}
          error={!!validation.errorMessage}
          helperText={
            validation.errorMessage ||
            'Use letters, numbers, hyphens, and underscores only'
          }
          disabled={isCreating}
          placeholder="e.g., astro-team"
          sx={{ mb: 2 }}
        />

        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isCreating}
          placeholder="Briefly describe the purpose of this group..."
          helperText="Optional: Provide a brief description of this group's purpose"
        />

        {groupName.trim() && validation.isValid && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Group:</strong> {groupName.trim()}
              <br />
              <strong>Owner:</strong> current.user (you)
              <br />
              <strong>Initial members:</strong> You will be the only member
              initially
            </Typography>
          </Alert>
        )}

        {validation.errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {validation.errorMessage}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isCreating}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!validation.isValid || isCreating}
          startIcon={
            isCreating ? <CircularProgress size={16} /> : <GroupAddIcon />
          }
        >
          {isCreating ? 'Creating...' : 'Create Group'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
