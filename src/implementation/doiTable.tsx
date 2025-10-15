'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  Typography,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Button,
  Fade,
  Skeleton,
  Chip,
  Link as MuiLink,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  useTableSorting,
  useTablePagination,
} from '@/implementation/table';
import {
  DOITableProps,
  DOITableState,
  DOIObject,
  DOIAction,
} from '@/types/DOITableProps';

export function DOITableImplementation({
  dois,
  columns,
  searchable = true,
  selectable = true,
  onSelectionChange,
  initialSelected = [],
  loading = false,
  emptyMessage = 'No DOIs found',
  searchPlaceholder = 'Search DOIs...',
  className,
  sx,
  stickyHeader = true,
  pagination = true,
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 10,
  actions = [],
  actionsLabel = 'Actions',
  toolbarActions = [],
  showToolbar = true,
}: DOITableProps) {
  const [state, setState] = useState<DOITableState>({
    searchTerm: '',
    selectedDOIs: new Set(initialSelected),
    page: 0,
    rowsPerPage: defaultRowsPerPage,
    orderBy: 'doi',
    order: 'asc',
  });

  // Menu anchor state for actions
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  // Animation delay for stagger effect
  const animationDelayRef = useRef<{ [key: string]: number }>({});

  // Filter DOIs based on search term
  const filteredDOIs = useMemo(() => {
    if (!state.searchTerm.trim()) return dois;

    const searchLower = state.searchTerm.toLowerCase();
    return dois.filter(
      (doi) =>
        doi.doi.toLowerCase().includes(searchLower) ||
        doi.title.toLowerCase().includes(searchLower) ||
        doi.status.toLowerCase().includes(searchLower)
    );
  }, [dois, state.searchTerm]);

  // Sort filtered DOIs
  const sortedDOIs = useTableSorting(filteredDOIs, state.orderBy, state.order);

  // Paginate sorted DOIs
  const paginatedDOIs = useTablePagination(
    sortedDOIs,
    state.page,
    state.rowsPerPage
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        searchTerm: event.target.value,
        page: 0, // Reset to first page when searching
      }));
    },
    []
  );

  // Handle sort change
  const handleSortChange = useCallback((columnId: string) => {
    setState((prev) => ({
      ...prev,
      orderBy: columnId,
      order: prev.orderBy === columnId && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  // Handle individual row selection with stagger animation
  const handleRowSelect = useCallback(
    (doiName: string) => {
      setState((prev) => {
        const newSelected = new Set(prev.selectedDOIs);

        if (newSelected.has(doiName)) {
          newSelected.delete(doiName);
          delete animationDelayRef.current[doiName];
        } else {
          newSelected.add(doiName);
          // Add stagger delay for selection animation
          animationDelayRef.current[doiName] = newSelected.size * 50;
        }

        // Notify parent of selection change
        onSelectionChange?.(Array.from(newSelected));

        return {
          ...prev,
          selectedDOIs: newSelected,
        };
      });
    },
    [onSelectionChange]
  );

  // Handle select all/none with stagger animation
  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => {
        const newSelected = event.target.checked
          ? new Set(filteredDOIs.map((doi) => doi.doi))
          : new Set<string>();

        // Add stagger delay for batch selection
        if (event.target.checked) {
          filteredDOIs.forEach((doi, index) => {
            animationDelayRef.current[doi.doi] = index * 25;
          });
        } else {
          animationDelayRef.current = {};
        }

        // Notify parent of selection change
        onSelectionChange?.(Array.from(newSelected));

        return {
          ...prev,
          selectedDOIs: newSelected,
        };
      });
    },
    [filteredDOIs, onSelectionChange]
  );

  // Handle page change
  const handlePageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setState((prev) => ({ ...prev, page: newPage }));
    },
    []
  );

  // Handle rows per page change
  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prev) => ({
        ...prev,
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0,
      }));
    },
    []
  );

  // Handle actions menu open
  const handleActionsClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, doiName: string) => {
      event.stopPropagation();
      setAnchorEl((prev) => ({ ...prev, [doiName]: event.currentTarget }));
    },
    []
  );

  // Handle actions menu close
  const handleActionsClose = useCallback((doiName: string) => {
    setAnchorEl((prev) => ({ ...prev, [doiName]: null }));
  }, []);

  // Handle action click
  const handleActionClick = useCallback(
    (action: DOIAction, doi: DOIObject) => {
      action.onClick(doi);
      handleActionsClose(doi.doi);
    },
    [handleActionsClose]
  );

  // Calculate selection state for header checkbox
  const isAllSelected = useMemo(() => {
    const visibleDOINames = filteredDOIs.map((doi) => doi.doi);
    return (
      visibleDOINames.length > 0 &&
      visibleDOINames.every((name) => state.selectedDOIs.has(name))
    );
  }, [filteredDOIs, state.selectedDOIs]);

  const isIndeterminate = useMemo(() => {
    const visibleDOINames = filteredDOIs.map((doi) => doi.doi);
    const selectedVisible = visibleDOINames.filter((name) =>
      state.selectedDOIs.has(name)
    );
    return (
      selectedVisible.length > 0 &&
      selectedVisible.length < visibleDOINames.length
    );
  }, [filteredDOIs, state.selectedDOIs]);

  // Custom formatting functions for DOI-specific columns
  const formatDOIName = useCallback((doi: DOIObject) => {
    return (
      <MuiLink
        component={Link}
        href={`/citation/request?doi=${doi.doi}`}
        sx={{
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {doi.doi}
      </MuiLink>
    );
  }, []);

  const formatStatus = useCallback((doi: DOIObject) => {
    const isPublished = doi.status === 'Published';
    return (
      <Chip
        icon={isPublished ? <CheckCircleIcon /> : <ScheduleIcon />}
        label={doi.status}
        color={isPublished ? 'success' : 'warning'}
        variant={isPublished ? 'filled' : 'outlined'}
        size="small"
      />
    );
  }, []);

  const formatTitle = useCallback((doi: DOIObject) => {
    return (
      <MuiLink
        component={Link}
        href={`/citation/request?doi=${doi.doi}`}
        sx={{
          color: 'text.primary',
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.main',
            textDecoration: 'underline',
          },
        }}
      >
        {doi.title}
      </MuiLink>
    );
  }, []);

  const formatDataDirectory = useCallback((doi: DOIObject) => {
    return (
      <MuiLink
        component={Link}
        href={doi.dataDirectory.replace('/storage/list', '/storage')}
        sx={{
          color: 'primary.main',
          textDecoration: 'none',
          fontSize: '0.875rem',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {doi.dataDirectory}
      </MuiLink>
    );
  }, []);

  const formatLandingPage = useCallback((doi: DOIObject) => {
    return (
      <MuiLink
        component={Link}
        href={`/citation/landing?doi=${doi.doi}`}
        sx={{
          color: 'primary.main',
          textDecoration: 'none',
          fontSize: '0.875rem',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {`/citation/landing?doi=${doi.doi}`}
      </MuiLink>
    );
  }, []);

  if (loading) {
    return (
      <Box className={className} sx={sx}>
        {/* Loading state with skeleton animation */}
        <Fade in={loading} timeout={300}>
          <Box>
            {/* Toolbar skeleton */}
            {showToolbar && (searchable || toolbarActions.length > 0) && (
              <Toolbar
                sx={{
                  pl: { sm: 2 },
                  pr: { xs: 1, sm: 1 },
                  bgcolor: 'background.paper',
                  borderBottom: 1,
                  borderColor: 'divider',
                  gap: 2,
                  minHeight: { xs: 64, sm: 64 },
                }}
              >
                <Skeleton variant="rectangular" width={200} height={40} />
                <Box sx={{ flexGrow: 1 }} />
                <Skeleton variant="rectangular" width={100} height={32} />
              </Toolbar>
            )}

            {/* Table skeleton */}
            <Box sx={{ p: 2 }}>
              {[...Array(5)].map((_, rowIndex) => (
                <Skeleton
                  key={rowIndex}
                  variant="rectangular"
                  width="100%"
                  height={52}
                  sx={{
                    mb: 1,
                    transition: (theme) =>
                      theme.transitions.create(['opacity'], {
                        duration: theme.transitions.duration.standard,
                        delay: rowIndex * 100,
                      }),
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      </Box>
    );
  }

  const hasSelectedItems = state.selectedDOIs.size > 0;

  return (
    <Box className={className} sx={sx}>
      {/* Toolbar */}
      {showToolbar && (searchable || toolbarActions.length > 0) && (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            gap: 2,
            minHeight: { xs: 64, sm: 64 },
          }}
        >
          {/* Search Field */}
          {searchable && (
            <TextField
              variant="outlined"
              size="small"
              placeholder={searchPlaceholder}
              value={state.searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '20%',
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  transition: (theme) =>
                    theme.transitions.create(
                      ['border-color', 'box-shadow', 'transform'],
                      { duration: theme.transitions.duration.short }
                    ),
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                  '&.Mui-focused': {
                    transform: 'scale(1.02)',
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.primary.main}25`,
                  },
                },
              }}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Selection Info */}
          {hasSelectedItems && (
            <Fade in={hasSelectedItems}>
              <Typography variant="body2" color="text.secondary">
                {state.selectedDOIs.size} selected
              </Typography>
            </Fade>
          )}

          {/* Toolbar Actions */}
          {toolbarActions.map((action, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              startIcon={action.icon}
              onClick={() => action.onClick(paginatedDOIs[0])} // Default to first item for toolbar actions
              color={action.color || 'primary'}
              sx={{
                transition: (theme) =>
                  theme.transitions.create(['transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              {action.label}
            </Button>
          ))}

          {/* DOI Help Icon - only show on citation page */}
          {typeof window !== 'undefined' &&
            window.location.pathname === '/citation' && (
              <Tooltip
                title={
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      gutterBottom
                    >
                      DOI Publication Help
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>New:</strong> Begin a new DOI.
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Delete:</strong> This will delete a) all DOI
                      information, b) the directory where the data resides, and
                      c) the DOI itself. You will start from scratch.
                    </Typography>
                    <Typography variant="body2">
                      <strong>Publish:</strong> Register the DOI and associated
                      landing page with DataCite. The DOI will be publicly
                      available.
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      <strong>Caution:</strong> The data directory will be
                      locked so that no further changes can be made. Be sure the
                      dataset and DOI information are finalized.
                    </Typography>
                  </Box>
                }
                placement="bottom"
                arrow
              >
                <IconButton
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
        </Toolbar>
      )}

      {/* Table Container */}
      <Box sx={{ overflow: 'auto' }}>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {/* Selection checkbox */}
              {selectable && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    bgcolor: 'background.paper',
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                  }}
                >
                  <Checkbox
                    color="primary"
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    size="small"
                    sx={{
                      transition: (theme) =>
                        theme.transitions.create(['transform'], {
                          duration: theme.transitions.duration.shorter,
                        }),
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                </TableCell>
              )}

              {/* Column headers */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    width: column.width,
                    bgcolor: 'background.paper',
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={state.orderBy === column.id}
                      direction={
                        state.orderBy === column.id ? state.order : 'asc'
                      }
                      onClick={() => handleSortChange(String(column.id))}
                      sx={{
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}

              {/* Actions column */}
              {actions.length > 0 && (
                <TableCell
                  align="right"
                  sx={{
                    bgcolor: 'background.paper',
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                  }}
                >
                  {actionsLabel}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedDOIs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (actions.length > 0 ? 1 : 0)
                  }
                  align="center"
                  sx={{ py: 8 }}
                >
                  <Alert severity="info" variant="outlined">
                    {emptyMessage}
                  </Alert>
                </TableCell>
              </TableRow>
            ) : (
              paginatedDOIs.map((doi) => (
                <TableRow
                  key={doi.doi}
                  selected={state.selectedDOIs.has(doi.doi)}
                  hover
                  onClick={() => selectable && handleRowSelect(doi.doi)}
                  sx={{
                    cursor: selectable ? 'pointer' : 'default',
                    transition: (theme) =>
                      theme.transitions.create(['background-color'], {
                        duration: theme.transitions.duration.shorter,
                        delay: animationDelayRef.current[doi.doi] || 0,
                      }),
                  }}
                >
                  {/* Selection checkbox */}
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={state.selectedDOIs.has(doi.doi)}
                        size="small"
                        sx={{
                          transition: (theme) =>
                            theme.transitions.create(['transform'], {
                              duration: theme.transitions.duration.shorter,
                            }),
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </TableCell>
                  )}

                  {/* Data cells */}
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format
                        ? column.format(doi[column.id as keyof DOIObject], doi)
                        : column.id === 'doi'
                          ? formatDOIName(doi)
                          : column.id === 'status'
                            ? formatStatus(doi)
                            : column.id === 'title'
                              ? formatTitle(doi)
                              : column.id === 'dataDirectory'
                                ? formatDataDirectory(doi)
                                : column.id === 'landingPage'
                                  ? formatLandingPage(doi)
                                  : String(
                                      doi[
                                        String(column.id) as keyof DOIObject
                                      ] || ''
                                    )}
                    </TableCell>
                  ))}

                  {/* Actions */}
                  {actions.length > 0 && (
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(event) => handleActionsClick(event, doi.doi)}
                        sx={{
                          transition: (theme) =>
                            theme.transitions.create(['transform'], {
                              duration: theme.transitions.duration.shorter,
                            }),
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[doi.doi]}
                        open={Boolean(anchorEl[doi.doi])}
                        onClose={() => handleActionsClose(doi.doi)}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                          elevation: 3,
                          sx: {
                            transition: (theme) =>
                              theme.transitions.create(['transform'], {
                                duration: theme.transitions.duration.shorter,
                              }),
                            transformOrigin: 'top right',
                          },
                        }}
                      >
                        {actions.map((action, actionIndex) => (
                          <MenuItem
                            key={actionIndex}
                            onClick={() => handleActionClick(action, doi)}
                            disabled={action.disabled?.(doi)}
                            sx={{
                              color:
                                action.color === 'error'
                                  ? 'error.main'
                                  : 'inherit',
                              '&:hover': {
                                bgcolor:
                                  action.color === 'error'
                                    ? 'error.light'
                                    : 'action.hover',
                                opacity: action.color === 'error' ? 0.1 : 1,
                              },
                            }}
                          >
                            {action.icon && (
                              <ListItemIcon
                                sx={{
                                  color:
                                    action.color === 'error'
                                      ? 'error.main'
                                      : 'inherit',
                                }}
                              >
                                {action.icon}
                              </ListItemIcon>
                            )}
                            <ListItemText>{action.label}</ListItemText>
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Pagination */}
      {pagination && sortedDOIs.length > 0 && (
        <TablePagination
          count={sortedDOIs.length}
          page={state.page}
          onPageChange={handlePageChange}
          rowsPerPage={state.rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            '& .MuiTablePagination-toolbar': {
              transition: (theme) =>
                theme.transitions.create(['background-color'], {
                  duration: theme.transitions.duration.shorter,
                }),
            },
          }}
        />
      )}
    </Box>
  );
}
