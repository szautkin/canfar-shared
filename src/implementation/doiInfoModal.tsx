'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Info as InfoIcon,
  Assignment as AssignmentIcon,
  CloudUpload as CloudUploadIcon,
  Link as LinkIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DOIInfoModalProps } from '@/types/DOITableProps';

export function DOIInfoModalImpl({ open, onClose }: DOIInfoModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          gap: 1,
          pb: 1,
        }}
      >
        <InfoIcon color="primary" />
        <Typography variant="h6" component="span">
          What is the Data Publication service?
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" paragraph>
            This service allows users to publish data that is associated with a
            journal paper. The data (and associated material) need to be
            uploaded by the user into a specific CANFAR storage area and a
            Digital Object Identifier (DOI) is minted (issued by the
            international DataCite organization). The DOI needs to appear in the
            journal paper and it will point to the folder where the data is
            stored for long-term preservation.
          </Typography>

          <Typography variant="body1" paragraph>
            The purpose of this service is to allow readers of the journal paper
            to find and view (and perhaps download and evaluate) the actual data
            that was used to support the conclusions of the paper.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <AssignmentIcon color="primary" />
          How it works:
        </Typography>

        <List sx={{ mt: 2 }}>
          <ListItem>
            <ListItemIcon>
              <CloudUploadIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Upload Your Data"
              secondary="Upload your research data and associated materials to a specific CANFAR storage area"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <LinkIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="DOI Creation"
              secondary="A Digital Object Identifier (DOI) is minted by DataCite, providing a permanent link to your data"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Include in Publication"
              secondary="Add the DOI to your journal paper to provide readers with direct access to your data"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <VisibilityIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Long-term Access"
              secondary="Readers can find, view, download, and evaluate the data used in your research"
            />
          </ListItem>
        </List>

        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: 'primary.50',
            borderRadius: 1,
            border: 1,
            borderColor: 'primary.200',
          }}
        >
          <Typography variant="body2" color="primary.dark">
            <strong>Note:</strong> DOIs you have requested will be displayed in
            the table below. To generate a new DOI and data storage area, click
            the &quot;New DOI&quot; button.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            minWidth: 100,
            transition: (theme) =>
              theme.transitions.create(['transform'], {
                duration: theme.transitions.duration.shorter,
              }),
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
}
