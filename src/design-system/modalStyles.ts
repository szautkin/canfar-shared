// Modal styling patterns for meetings service components
// Based on existing patterns from DOI modals and theme integration

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';

export const modalStyles = {
  // Base dialog styles
  dialog: (theme: Theme): SxProps<Theme> => ({
    '& .MuiDialog-paper': {
      borderRadius: 2,
      boxShadow: theme.shadows[24],
      border: `1px solid ${theme.palette.divider}`,
      overflow: 'hidden',
      maxWidth: '600px',
      width: '100%',
      margin: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1),
        maxWidth: '95vw',
        maxHeight: '95vh',
      },
    },
  }),

  // Meeting creation/edit modal
  meetingFormDialog: (theme: Theme): SxProps<Theme> => ({
    '& .MuiDialog-paper': {
      borderRadius: 2,
      boxShadow: theme.shadows[24],
      border: `1px solid ${theme.palette.divider}`,
      overflow: 'hidden',
      maxWidth: '800px',
      width: '100%',
      margin: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(1),
        maxWidth: '95vw',
        maxHeight: '95vh',
      },
    },
  }),

  // Dialog title with icon
  dialogTitle: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    p: theme.spacing(3),
    pb: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.main + '08',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  }),

  // Title with icon container
  titleContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    flex: 1,
  }),

  // Title text
  titleText: (theme: Theme): SxProps<Theme> => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
  }),

  // Close button
  closeButton: (theme: Theme): SxProps<Theme> => ({
    minWidth: 'auto',
    p: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.error.main + '10',
      transform: 'scale(1.1)',
    },
  }),

  // Dialog content
  dialogContent: (theme: Theme): SxProps<Theme> => ({
    p: theme.spacing(3),
    pt: theme.spacing(3),
  }),

  // Form container
  formContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  }),

  // Form section
  formSection: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),

  // Form section title
  sectionTitle: (theme: Theme): SxProps<Theme> => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1.1rem',
    color: theme.palette.text.primary,
    mb: theme.spacing(1),
  }),

  // Enhanced text field
  textField: (theme: Theme): SxProps<Theme> => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
      transition: theme.transitions.create(
        ['border-color', 'background-color', 'box-shadow'],
        {
          duration: theme.transitions.duration.short,
        }
      ),
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main + '60',
        },
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      },
    },
    '& .MuiFormLabel-root': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),

  // Select field
  selectField: (theme: Theme): SxProps<Theme> => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    '& .MuiFormLabel-root': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),

  // Date picker field
  dateField: (theme: Theme): SxProps<Theme> => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      },
    },
  }),

  // Chip container for tags
  chipContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    mt: theme.spacing(1),
  }),

  // Enhanced chip
  chip: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.primary.main + '15',
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '0.875rem',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '25',
      transform: 'scale(1.05)',
    },
    '& .MuiChip-deleteIcon': {
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  }),

  // Alert info box
  infoAlert: (theme: Theme): SxProps<Theme> => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.info.main + '08',
    borderColor: theme.palette.info.main + '30',
    mb: theme.spacing(3),
    '& .MuiAlert-icon': {
      color: theme.palette.info.main,
    },
  }),

  // Dialog actions
  dialogActions: (theme: Theme): SxProps<Theme> => ({
    p: theme.spacing(3),
    pt: theme.spacing(2),
    gap: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  }),

  // Primary action button
  primaryButton: (theme: Theme): SxProps<Theme> => ({
    minWidth: 120,
    py: theme.spacing(1.5),
    px: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'none',
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[6],
    },
    '&:disabled': {
      opacity: 0.6,
      transform: 'none',
    },
  }),

  // Secondary action button
  secondaryButton: (theme: Theme): SxProps<Theme> => ({
    minWidth: 100,
    py: theme.spacing(1.5),
    px: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
  }),

  // Form grid for two-column layout
  formGrid: (theme: Theme): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
    },
    gap: theme.spacing(3),
  }),

  // Location type selector
  locationTypeSelector: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    gap: theme.spacing(1),
    mb: theme.spacing(2),
    '& .MuiToggleButton-root': {
      borderRadius: theme.shape.borderRadius,
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightMedium,
      px: theme.spacing(2),
      py: theme.spacing(1),
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  }),

  // Registration settings container
  registrationContainer: (theme: Theme): SxProps<Theme> => ({
    p: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
  }),

  // Loading overlay
  loadingOverlay: (theme: Theme): SxProps<Theme> => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.background.paper + 'CC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    zIndex: theme.zIndex.modal + 1,
  }),

  // Confirmation dialog styles
  confirmationDialog: (theme: Theme): SxProps<Theme> => ({
    '& .MuiDialog-paper': {
      borderRadius: 2,
      maxWidth: '400px',
      textAlign: 'center',
      p: theme.spacing(3),
    },
  }),

  // Error state styles
  errorText: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.error.main,
    fontSize: '0.875rem',
    fontWeight: theme.typography.fontWeightMedium,
    mt: theme.spacing(0.5),
  }),

  // Success state styles
  successAlert: (theme: Theme): SxProps<Theme> => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.success.main + '08',
    borderColor: theme.palette.success.main + '30',
    '& .MuiAlert-icon': {
      color: theme.palette.success.main,
    },
  }),
};

// Utility function to get modal styles with theme
export const getModalStyles = (theme: Theme) => ({
  ...modalStyles,
  // Helper functions for specific modal types
  getMeetingModalStyles: () => modalStyles.meetingFormDialog(theme),
  getDialogTitleStyles: () => modalStyles.dialogTitle(theme),
  getFormFieldStyles: () => modalStyles.textField(theme),
  getActionButtonStyles: (variant: 'primary' | 'secondary') =>
    variant === 'primary'
      ? modalStyles.primaryButton(theme)
      : modalStyles.secondaryButton(theme),
});

export type ModalStylesType = typeof modalStyles;
