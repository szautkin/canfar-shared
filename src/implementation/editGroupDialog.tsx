'use client';

import React, { useState, useEffect } from 'react';
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
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  SupervisedUserCircle as AdminIcon,
} from '@mui/icons-material';
import type {
  EditGroupDialogProps,
  GroupObject,
} from '@/types/GroupTableProps';

export function EditGroupDialogImplementation({
  open,
  onClose,
  onEditGroup,
  group,
}: EditGroupDialogProps) {
  const [description, setDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize state when dialog opens or group changes
  useEffect(() => {
    if (open && group) {
      setDescription(group.description || '');
      setIsUpdating(false);
      setHasChanges(false);
    }
  }, [open, group]);

  // Track changes
  useEffect(() => {
    if (group) {
      const descriptionChanged = description !== (group.description || '');
      setHasChanges(descriptionChanged);
    }
  }, [description, group]);

  const handleSubmit = async () => {
    if (!group || !hasChanges) return;

    setIsUpdating(true);
    try {
      const updatedGroup: GroupObject = {
        ...group,
        description: description.trim(),
        modified: new Date(),
      };

      await onEditGroup(updatedGroup);
      onClose();
    } catch (error) {
      console.error('Failed to update group:', error);
      // Error handling would be done by parent component
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey && hasChanges && !isUpdating) {
      event.preventDefault();
      handleSubmit();
    }
  };

  if (!group) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={isUpdating ? undefined : onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="edit-group-dialog-title"
    >
      <DialogTitle id="edit-group-dialog-title" sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <EditIcon />
          Edit Group: {group.name}
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Group Information Display */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Group Information
          </Typography>
          <Box
            sx={{
              bgcolor: 'grey.50',
              p: 2,
              borderRadius: 1,
              border: 1,
              borderColor: 'grey.200',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Group Name:</strong> {group.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Group names cannot be changed after creation
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Owner:</strong> {group.ownerName}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Administrators ({group.administrators.length}):</strong>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {group.administrators.map((admin, index) => (
                  <Chip
                    key={index}
                    label={admin}
                    size="small"
                    icon={<AdminIcon />}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Members ({group.members.length}):</strong>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {group.members.length > 0 ? (
                  group.members.map((member, index) => (
                    <Chip
                      key={index}
                      label={member}
                      size="small"
                      icon={<PersonIcon />}
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No members yet
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Editable Fields */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Editable Information
          </Typography>
        </Box>

        <TextField
          autoFocus
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isUpdating}
          placeholder="Update the group description..."
          helperText="Describe the purpose and scope of this group"
        />

        {/* Change Summary */}
        {hasChanges && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Changes to be saved:</strong>
              <br />
              • Description will be updated
              <br />
              <Typography variant="caption" color="text.secondary">
                Use Ctrl+Enter to save quickly
              </Typography>
            </Typography>
          </Alert>
        )}

        {/* Membership Management Info */}
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Note:</strong> To manage group administrators and members,
            use the &quot;Manage Members&quot; action from the group table.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isUpdating}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!hasChanges || isUpdating}
          startIcon={isUpdating ? <CircularProgress size={16} /> : <EditIcon />}
        >
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
