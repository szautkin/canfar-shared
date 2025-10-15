'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Autocomplete,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  People as PeopleIcon,
  SupervisedUserCircle as AdminIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  AdminPanelSettings as AdminPanelIcon,
  Person4 as Person4Icon,
} from '@mui/icons-material';
import type { ManageGroupMembersDialogProps } from '@/types/GroupTableProps';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`member-tabpanel-${index}`}
      aria-labelledby={`member-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

export function ManageGroupMembersDialogImplementation({
  open,
  onClose,
  onUpdateMembers,
  group,
  availableUsers,
}: ManageGroupMembersDialogProps) {
  const [administrators, setAdministrators] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Initialize state when dialog opens or group changes
  useEffect(() => {
    if (open && group) {
      setAdministrators([...group.administrators]);
      setMembers([...group.members]);
      setIsUpdating(false);
      setHasChanges(false);
      setTabValue(0);
      setSelectedUser(null);
    }
  }, [open, group]);

  // Track changes
  useEffect(() => {
    if (group) {
      const adminsChanged =
        administrators.length !== group.administrators.length ||
        !administrators.every((admin) => group.administrators.includes(admin));
      const membersChanged =
        members.length !== group.members.length ||
        !members.every((member) => group.members.includes(member));

      setHasChanges(adminsChanged || membersChanged);
    }
  }, [administrators, members, group]);

  // Get available users for adding (excluding current administrators and members)
  const availableUsersForAdding = useMemo(() => {
    const currentUsers = [...administrators, ...members];
    return availableUsers.filter((user) => !currentUsers.includes(user));
  }, [availableUsers, administrators, members]);

  // Get users that can be promoted to admin (current members only)
  const availableForPromotion = useMemo(() => {
    return members.filter((member) => !administrators.includes(member));
  }, [members, administrators]);

  const handleAddUser = () => {
    if (!selectedUser || !group) return;

    if (tabValue === 0) {
      // Adding to administrators
      if (!administrators.includes(selectedUser)) {
        setAdministrators([...administrators, selectedUser]);
        // Remove from members if they were there
        setMembers(members.filter((member) => member !== selectedUser));
      }
    } else {
      // Adding to members
      if (
        !members.includes(selectedUser) &&
        !administrators.includes(selectedUser)
      ) {
        setMembers([...members, selectedUser]);
      }
    }
    setSelectedUser(null);
  };

  const handleRemoveAdmin = (userToRemove: string) => {
    if (!group) return;

    // Prevent removing the group owner from administrators
    if (userToRemove === group.ownerName) {
      return;
    }

    setAdministrators(administrators.filter((admin) => admin !== userToRemove));
    // Demoted admins become regular members
    if (!members.includes(userToRemove)) {
      setMembers([...members, userToRemove]);
    }
  };

  const handleRemoveMember = (userToRemove: string) => {
    setMembers(members.filter((member) => member !== userToRemove));
  };

  const handlePromoteToAdmin = (userToPromote: string) => {
    if (!administrators.includes(userToPromote)) {
      setAdministrators([...administrators, userToPromote]);
      setMembers(members.filter((member) => member !== userToPromote));
    }
  };

  const handleSubmit = async () => {
    if (!group || !hasChanges) return;

    setIsUpdating(true);
    try {
      await onUpdateMembers(group.name, administrators, members);
      onClose();
    } catch (error) {
      console.error('Failed to update group members:', error);
      // Error handling would be done by parent component
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSelectedUser(null);
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
      aria-labelledby="manage-members-dialog-title"
    >
      <DialogTitle id="manage-members-dialog-title" sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <PeopleIcon />
          Manage Members: {group.name}
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Group Owner Info */}
        <Box sx={{ mb: 2 }}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Group Owner:</strong> {group.ownerName}
              <br />
              The group owner is automatically an administrator and cannot be
              removed.
            </Typography>
          </Alert>
        </Box>

        {/* Tabs for Administrators and Members */}
        <Paper variant="outlined" sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="member management tabs"
            variant="fullWidth"
          >
            <Tab
              label={`Administrators (${administrators.length})`}
              icon={<AdminIcon />}
              iconPosition="start"
            />
            <Tab
              label={`Members (${members.length})`}
              icon={<PersonIcon />}
              iconPosition="start"
            />
          </Tabs>

          {/* Add User Section */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <Autocomplete
                value={selectedUser}
                onChange={(_event, newValue) => setSelectedUser(newValue)}
                options={availableUsersForAdding}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={tabValue === 0 ? 'Add Administrator' : 'Add Member'}
                    variant="outlined"
                    size="small"
                  />
                )}
                disabled={isUpdating || availableUsersForAdding.length === 0}
                sx={{ flexGrow: 1, minWidth: 200 }}
              />
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={handleAddUser}
                disabled={!selectedUser || isUpdating}
                size="small"
              >
                Add
              </Button>
            </Box>
            {availableUsersForAdding.length === 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: 'block' }}
              >
                All available users are already group members or administrators
              </Typography>
            )}
          </Box>

          {/* Tab Content */}
          <TabPanel value={tabValue} index={0}>
            {/* Administrators List */}
            <Box sx={{ p: 2, pt: 0 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <AdminPanelIcon fontSize="small" />
                Administrators can manage group settings and members
              </Typography>
              <List dense>
                {administrators.map((admin) => {
                  const isOwner = admin === group.ownerName;
                  return (
                    <ListItem key={admin} divider>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2">{admin}</Typography>
                            {isOwner && (
                              <Chip
                                label="Owner"
                                size="small"
                                color="primary"
                                variant="filled"
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          isOwner
                            ? 'Group owner (cannot be removed)'
                            : 'Administrator'
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label={`Remove ${admin} from administrators`}
                          onClick={() => handleRemoveAdmin(admin)}
                          disabled={isOwner || isUpdating}
                          size="small"
                        >
                          <PersonRemoveIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
                {administrators.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ p: 2 }}
                  >
                    No administrators yet
                  </Typography>
                )}
              </List>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {/* Members List */}
            <Box sx={{ p: 2, pt: 0 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Person4Icon fontSize="small" />
                Regular members have access to group resources
              </Typography>
              <List dense>
                {members.map((member) => (
                  <ListItem key={member} divider>
                    <ListItemText primary={member} secondary="Member" />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          edge="end"
                          aria-label={`Promote ${member} to administrator`}
                          onClick={() => handlePromoteToAdmin(member)}
                          disabled={isUpdating}
                          size="small"
                          color="primary"
                        >
                          <AdminPanelIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label={`Remove ${member} from group`}
                          onClick={() => handleRemoveMember(member)}
                          disabled={isUpdating}
                          size="small"
                        >
                          <PersonRemoveIcon />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                {members.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ p: 2 }}
                  >
                    No regular members yet
                  </Typography>
                )}
              </List>
            </Box>
          </TabPanel>
        </Paper>

        {/* Change Summary */}
        {hasChanges && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Pending changes:</strong>
              <br />• Administrators: {administrators.length} users
              <br />• Members: {members.length} users
              <br />
              <Typography variant="caption" color="text.secondary">
                Changes will take effect immediately upon saving
              </Typography>
            </Typography>
          </Alert>
        )}

        {/* Promotion Available */}
        {availableForPromotion.length > 0 && tabValue === 1 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Tip:</strong> You can promote members to administrators
              using the{' '}
              <AdminPanelIcon
                fontSize="small"
                sx={{ verticalAlign: 'middle' }}
              />{' '}
              button
            </Typography>
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isUpdating}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!hasChanges || isUpdating}
          startIcon={
            isUpdating ? <CircularProgress size={16} /> : <PeopleIcon />
          }
        >
          {isUpdating ? 'Updating...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
