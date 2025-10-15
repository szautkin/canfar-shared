'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { DeleteConfirmationDialogProps } from '@/types/DeleteConfirmationDialogProps';

export const DeleteConfirmationDialogImpl = React.forwardRef<
  HTMLDivElement,
  DeleteConfirmationDialogProps
>(
  (
    {
      open,
      onClose,
      onConfirm,
      items,
      title = 'Delete Items',
      isDeleting = false,
      itemType = 'item',
    },
    ref
  ) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [confirmed, setConfirmed] = useState(false);

    // Reset confirmation state when dialog opens/closes
    React.useEffect(() => {
      if (!open) {
        setConfirmed(false);
      }
    }, [open]);

    const handleConfirm = async () => {
      if (!confirmed) return;
      await onConfirm();
      setConfirmed(false);
    };

    const displayItems = items.slice(0, 5);
    const remainingCount = items.length - 5;

    const itemLabel =
      items.length === 1
        ? itemType
        : itemType === 'item'
          ? 'items'
          : `${itemType}s`;

    return (
      <Dialog
        ref={ref}
        open={open}
        onClose={isDeleting ? undefined : onClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        aria-labelledby="delete-confirmation-dialog-title"
        aria-describedby="delete-confirmation-dialog-description"
        PaperProps={{
          sx: {
            ...(isMobile && {
              m: 0,
              width: '100%',
              height: '100%',
              borderRadius: 0,
            }),
          },
        }}
      >
        <DialogTitle
          id="delete-confirmation-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            color: theme.palette.error.main,
            pb: theme.spacing(1),
          }}
        >
          <WarningIcon color="error" />
          {title}
        </DialogTitle>

        <DialogContent>
          <Typography
            id="delete-confirmation-dialog-description"
            variant="body1"
            gutterBottom
            sx={{ mb: theme.spacing(2) }}
          >
            Are you sure you want to delete the following {itemLabel}? This
            action cannot be undone.
          </Typography>

          <Box
            sx={{
              backgroundColor: theme.palette.error.light,
              borderRadius: theme.shape.borderRadius,
              p: theme.spacing(1),
              mb: theme.spacing(2),
              maxHeight: '200px',
              overflow: 'auto',
            }}
          >
            <List dense sx={{ py: 0 }}>
              {displayItems.map((item, index) => (
                <ListItem key={index} sx={{ px: theme.spacing(1), py: 0.5 }}>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: {
                        color: theme.palette.error.contrastText,
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                      },
                    }}
                  />
                </ListItem>
              ))}
              {remainingCount > 0 && (
                <ListItem sx={{ px: theme.spacing(1), py: 0.5 }}>
                  <ListItemText
                    primary={`... and ${remainingCount} more ${itemLabel}`}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: {
                        color: theme.palette.error.contrastText,
                        fontStyle: 'italic',
                      },
                    }}
                  />
                </ListItem>
              )}
            </List>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                color="error"
                disabled={isDeleting}
              />
            }
            label={
              <Typography variant="body2" sx={{ userSelect: 'none' }}>
                I understand this action cannot be undone
              </Typography>
            }
            sx={{ mt: theme.spacing(1) }}
          />
        </DialogContent>

        <DialogActions sx={{ p: theme.spacing(2), pt: 0 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={isDeleting}
            sx={{
              bgcolor: theme.palette.grey[600],
              color: theme.palette.common.white,
              borderColor: theme.palette.grey[600],
              '&:hover': {
                bgcolor: theme.palette.grey[700],
                borderColor: theme.palette.grey[700],
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="error"
            disabled={!confirmed || isDeleting}
            startIcon={
              isDeleting ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
          >
            {isDeleting ? 'Deleting...' : `Delete ${items.length} ${itemLabel}`}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

DeleteConfirmationDialogImpl.displayName = 'DeleteConfirmationDialogImpl';
