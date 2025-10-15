// Table styling patterns for meetings service components
// Based on existing DOI table patterns and enhanced for meetings

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';

export const tableStyles = {
  // Main table container
  tableContainer: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2],
    overflow: 'hidden',
    position: 'relative',
  }),

  // Table wrapper for horizontal scroll
  tableWrapper: (theme: Theme): SxProps<Theme> => ({
    overflow: 'auto',
    maxHeight: '70vh',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main + '40',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: theme.palette.primary.main + '60',
      },
    },
  }),

  // Toolbar styles
  toolbar: (theme: Theme): SxProps<Theme> => ({
    pl: { sm: 2 },
    pr: { xs: 1, sm: 1 },
    py: 2,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    gap: 2,
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar - 1,
    backdropFilter: 'blur(8px)',
  }),

  // Enhanced search field
  searchField: (theme: Theme): SxProps<Theme> => ({
    width: '300px',
    minWidth: 200,
    maxWidth: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
      transition: theme.transitions.create(
        ['border-color', 'box-shadow', 'transform', 'background-color'],
        { duration: theme.transitions.duration.short }
      ),
      '&:hover': {
        transform: 'scale(1.02)',
        backgroundColor: theme.palette.background.paper,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main + '60',
        },
      },
      '&.Mui-focused': {
        transform: 'scale(1.02)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
      },
    },
    '& .MuiInputAdornment-root': {
      color: theme.palette.primary.main,
    },
  }),

  // Table header styles
  tableHead: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.primary.main + '08',
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar - 2,
    '& .MuiTableCell-root': {
      backgroundColor: 'inherit',
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '0.875rem',
      color: theme.palette.text.primary,
      borderBottom: `2px solid ${theme.palette.primary.main}30`,
      py: 2,
    },
  }),

  // Header cell with sorting
  headerCell: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: 'inherit',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
    py: 2,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: theme.palette.primary.main + '30',
    },
  }),

  // Sort label enhanced
  sortLabel: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    cursor: 'pointer',
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&.Mui-active': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
  }),

  // Table row styles
  tableRow: (theme: Theme): SxProps<Theme> => ({
    cursor: 'pointer',
    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '08',
      transform: 'scale(1.005)',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main + '15',
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: theme.palette.primary.main + '20',
      },
    },
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      py: 2,
    },
  }),

  // Data cell styles
  dataCell: (theme: Theme): SxProps<Theme> => ({
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
    py: 2,
    px: 2,
  }),

  // Status chip in table
  statusChip: (theme: Theme, status: string): SxProps<Theme> => {
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'published':
        case 'ongoing':
          return theme.palette.success;
        case 'draft':
          return theme.palette.warning;
        case 'cancelled':
          return theme.palette.error;
        default:
          return theme.palette.info;
      }
    };

    const statusColor = getStatusColor(status);
    return {
      backgroundColor: statusColor.main + '15',
      color: statusColor.main,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: '0.75rem',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${statusColor.main}30`,
      minWidth: '80px',
      height: '24px',
    };
  },

  // Meeting type chip
  typeChip: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.secondary.main + '15',
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '0.75rem',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.secondary.main}30`,
    minWidth: '70px',
    height: '24px',
  }),

  // Location indicator
  locationIndicator: (theme: Theme, locationType: string): SxProps<Theme> => {
    const getLocationColor = (type: string) => {
      switch (type) {
        case 'virtual':
          return theme.palette.info.main;
        case 'hybrid':
          return theme.palette.warning.main;
        case 'in-person':
          return theme.palette.success.main;
        default:
          return theme.palette.grey[500];
      }
    };

    return {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      color: getLocationColor(locationType),
      fontSize: '0.875rem',
      fontWeight: theme.typography.fontWeightMedium,
    };
  },

  // Date cell formatting
  dateCell: (theme: Theme): SxProps<Theme> => ({
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    minWidth: '120px',
  }),

  // Actions column
  actionsCell: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    justifyContent: 'flex-end',
    minWidth: '120px',
  }),

  // Action button
  actionButton: (theme: Theme): SxProps<Theme> => ({
    minWidth: 'auto',
    p: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(
      ['background-color', 'color', 'transform', 'border-color'],
      { duration: theme.transitions.duration.shorter }
    ),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      transform: 'scale(1.1)',
      borderColor: theme.palette.primary.main,
    },
  }),

  // Primary action button
  primaryActionButton: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.primary.main + '10',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}30`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      transform: 'scale(1.1)',
    },
  }),

  // Attendees count display
  attendeesDisplay: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
  }),

  // Tags display in table
  tagsDisplay: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    maxWidth: '200px',
  }),

  // Tag chip in table
  tagChip: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.accent.main + '15',
    color: theme.palette.accent.dark,
    fontSize: '0.7rem',
    height: '20px',
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.accent.main + '25',
    },
  }),

  // Empty state
  emptyState: (theme: Theme): SxProps<Theme> => ({
    textAlign: 'center',
    py: 8,
    px: 4,
    color: theme.palette.text.secondary,
  }),

  // Loading skeleton row
  skeletonRow: (theme: Theme): SxProps<Theme> => ({
    '& .MuiSkeleton-root': {
      bgcolor: theme.palette.action.hover,
      borderRadius: theme.shape.borderRadius,
    },
  }),

  // Pagination styles
  pagination: (theme: Theme): SxProps<Theme> => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    '& .MuiTablePagination-toolbar': {
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
    '& .MuiIconButton-root': {
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(['background-color', 'transform'], {
        duration: theme.transitions.duration.shorter,
      }),
      '&:hover': {
        backgroundColor: theme.palette.primary.main + '10',
        transform: 'scale(1.1)',
      },
      '&.Mui-disabled': {
        opacity: 0.5,
      },
    },
  }),

  // Selection checkbox
  selectionCheckbox: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: theme.palette.primary.main + '10',
    },
    '&.Mui-checked': {
      color: theme.palette.primary.main,
    },
  }),

  // Toolbar selection info
  selectionInfo: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.primary.main + '08',
    px: 2,
    py: 0.5,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}30`,
  }),

  // Bulk action buttons
  bulkActionButton: (theme: Theme): SxProps<Theme> => ({
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    px: 2,
    py: 1,
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[4],
    },
  }),
};

// Utility function to get table styles with theme
export const getTableStyles = (theme: Theme) => ({
  ...tableStyles,
  // Helper functions for specific table elements
  getStatusChipStyles: (status: string) =>
    tableStyles.statusChip(theme, status),
  getLocationStyles: (locationType: string) =>
    tableStyles.locationIndicator(theme, locationType),
  getRowStyles: (selected?: boolean, disabled?: boolean) => ({
    ...tableStyles.tableRow(theme),
    ...(selected && {
      backgroundColor: theme.palette.primary.main + '15',
      borderLeft: `4px solid ${theme.palette.primary.main}`,
    }),
    ...(disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',
    }),
  }),
});

export type TableStylesType = typeof tableStyles;
