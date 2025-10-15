'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Select } from '@/components/Select/Select';
import { SessionSettingsDialogProps } from '@/types/SessionSettingsDialogProps';

export const SessionSettingsDialogImpl = React.forwardRef<
  HTMLDivElement,
  SessionSettingsDialogProps
>(
  (
    {
      open,
      onClose,
      onSave,
      currentSettings,
      memoryOptions = [
        1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 26, 28, 30, 32, 36, 40, 44, 48,
        56, 64, 80, 92, 112, 128, 140, 170, 192,
      ],
      coreOptions = Array.from({ length: 16 }, (_, i) => i + 1),
      ...dialogProps
    },
    ref
  ) => {
    const theme = useTheme();
    const [settings, setSettings] = useState(currentSettings);

    useEffect(() => {
      setSettings(currentSettings);
    }, [currentSettings, open]);

    const handleSave = () => {
      onSave(settings);
      onClose();
    };

    const handleCancel = () => {
      setSettings(currentSettings);
      onClose();
    };

    return (
      <Dialog
        ref={ref}
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="session-settings-dialog-title"
        {...dialogProps}
      >
        <DialogTitle id="session-settings-dialog-title">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            Notebook Settings
            <IconButton
              aria-label="Close settings dialog"
              onClick={handleCancel}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(3),
              pt: theme.spacing(2),
              // Adjust spacing for mobile
              [theme.breakpoints.down('sm')]: {
                gap: theme.spacing(2),
                pt: theme.spacing(1),
              },
            }}
          >
            <Select
              label="Number of Cores"
              id="settings-cores"
              value={settings.cores}
              fullWidth
              onChange={(e) =>
                setSettings({ ...settings, cores: Number(e.target.value) })
              }
            >
              {coreOptions.map((cores) => (
                <MenuItem key={cores} value={cores}>
                  {cores} {cores === 1 ? 'core' : 'cores'}
                </MenuItem>
              ))}
            </Select>

            <Select
              label="Memory Size (GB)"
              id="settings-memory"
              value={settings.memory}
              fullWidth
              onChange={(e) =>
                setSettings({ ...settings, memory: Number(e.target.value) })
              }
            >
              {memoryOptions.map((memory) => (
                <MenuItem key={memory} value={memory}>
                  {memory} GB
                </MenuItem>
              ))}
            </Select>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

SessionSettingsDialogImpl.displayName = 'SessionSettingsDialogImpl';
