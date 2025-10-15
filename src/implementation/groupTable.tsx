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
  Divider,
  Fade,
  Skeleton,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
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
  GroupTableProps,
  GroupTableState,
  GroupObject,
  GroupAction,
} from '@/types/GroupTableProps';

export function GroupTableImplementation({
  groups,
  columns,
  searchable = true,
  selectable = true,
  onSelectionChange,
  initialSelected = [],
  loading = false,
  emptyMessage = 'No groups found',
  searchPlaceholder = 'Search groups...',
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
}: GroupTableProps) {
  const [state, setState] = useState<GroupTableState>({
    searchTerm: '',
    selectedGroups: new Set(initialSelected),
    page: 0,
    rowsPerPage: defaultRowsPerPage,
    orderBy: 'name',
    order: 'asc',
  });

  // Menu anchor state for actions
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  // Animation delay for stagger effect
  const animationDelayRef = useRef<{ [key: string]: number }>({});

  // Filter groups based on search term
  const filteredGroups = useMemo(() => {
    if (!state.searchTerm.trim()) return groups;

    const searchLower = state.searchTerm.toLowerCase();
    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchLower) ||
        group.ownerName.toLowerCase().includes(searchLower) ||
        group.description.toLowerCase().includes(searchLower)
    );
  }, [groups, state.searchTerm]);

  // Sort filtered groups
  const sortedGroups = useTableSorting(
    filteredGroups,
    state.orderBy,
    state.order
  );

  // Paginate sorted groups
  const paginatedGroups = useTablePagination(
    sortedGroups,
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
    (groupName: string) => {
      setState((prev) => {
        const newSelected = new Set(prev.selectedGroups);

        if (newSelected.has(groupName)) {
          newSelected.delete(groupName);
          delete animationDelayRef.current[groupName];
        } else {
          newSelected.add(groupName);
          // Add stagger delay for selection animation
          animationDelayRef.current[groupName] = newSelected.size * 50;
        }

        // Notify parent of selection change
        onSelectionChange?.(Array.from(newSelected));

        return {
          ...prev,
          selectedGroups: newSelected,
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
          ? new Set(filteredGroups.map((group) => group.name))
          : new Set<string>();

        // Add stagger delay for batch selection
        if (event.target.checked) {
          filteredGroups.forEach((group, index) => {
            animationDelayRef.current[group.name] = index * 25;
          });
        } else {
          animationDelayRef.current = {};
        }

        // Notify parent of selection change
        onSelectionChange?.(Array.from(newSelected));

        return {
          ...prev,
          selectedGroups: newSelected,
        };
      });
    },
    [filteredGroups, onSelectionChange]
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
    (event: React.MouseEvent<HTMLElement>, groupName: string) => {
      event.stopPropagation();
      setAnchorEl((prev) => ({ ...prev, [groupName]: event.currentTarget }));
    },
    []
  );

  // Handle actions menu close
  const handleActionsClose = useCallback((groupName: string) => {
    setAnchorEl((prev) => ({ ...prev, [groupName]: null }));
  }, []);

  // Handle action click
  const handleActionClick = useCallback(
    (action: GroupAction, group: GroupObject) => {
      action.onClick(group);
      handleActionsClose(group.name);
    },
    [handleActionsClose]
  );

  // Calculate selection state for header checkbox
  const isAllSelected = useMemo(() => {
    const visibleGroupNames = filteredGroups.map((group) => group.name);
    return (
      visibleGroupNames.length > 0 &&
      visibleGroupNames.every((name) => state.selectedGroups.has(name))
    );
  }, [filteredGroups, state.selectedGroups]);

  const isIndeterminate = useMemo(() => {
    const visibleGroupNames = filteredGroups.map((group) => group.name);
    const selectedVisible = visibleGroupNames.filter((name) =>
      state.selectedGroups.has(name)
    );
    return (
      selectedVisible.length > 0 &&
      selectedVisible.length < visibleGroupNames.length
    );
  }, [filteredGroups, state.selectedGroups]);

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
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={52}
                  sx={{
                    mb: 1,
                    transition: (theme) =>
                      theme.transitions.create(['opacity'], {
                        duration: theme.transitions.duration.standard,
                        delay: index * 100,
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

  const hasSelectedItems = state.selectedGroups.size > 0;

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
          {/* Search Field - 20% width with focus animations */}
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
                '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                  transition: (theme) =>
                    theme.transitions.create(['color', 'transform'], {
                      duration: theme.transitions.duration.short,
                    }),
                },
                '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                },
              }}
            />
          )}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Selection info with fade animation */}
          <Fade in={hasSelectedItems} timeout={200}>
            <Box
              sx={{
                display: hasSelectedItems ? 'flex' : 'none',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  transition: (theme) =>
                    theme.transitions.create(['color'], {
                      duration: theme.transitions.duration.short,
                    }),
                }}
              >
                {state.selectedGroups.size} selected
              </Typography>
              <Divider orientation="vertical" flexItem />
            </Box>
          </Fade>

          {/* Toolbar Actions */}
          {toolbarActions.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {toolbarActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  startIcon={action.icon}
                  onClick={() => {
                    // Pass selected groups to the action
                    const selectedGroupObjects = groups.filter((group) =>
                      state.selectedGroups.has(group.name)
                    );
                    if (selectedGroupObjects.length > 0) {
                      action.onClick(selectedGroupObjects[0]);
                    } else if (groups.length > 0) {
                      action.onClick(groups[0]);
                    }
                  }}
                  color={action.color || 'primary'}
                  disabled={
                    action.disabled
                      ? groups.some(
                          (g) =>
                            state.selectedGroups.has(g.name) &&
                            action.disabled!(g)
                        )
                      : false
                  }
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create(
                        ['background-color', 'transform', 'box-shadow'],
                        { duration: theme.transitions.duration.short }
                      ),
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2,
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      )}

      {/* Table */}
      <Table stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow>
            {/* Selection checkbox */}
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  inputProps={{ 'aria-label': 'select all groups' }}
                />
              </TableCell>
            )}

            {/* Column headers */}
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                sx={{ minWidth: column.minWidth, width: column.width }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={state.orderBy === column.id}
                    direction={
                      state.orderBy === column.id ? state.order : 'asc'
                    }
                    onClick={() => handleSortChange(column.id as string)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}

            {/* Actions column header */}
            {actions.length > 0 && (
              <TableCell align="center">{actionsLabel}</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedGroups.length === 0 ? (
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
                <Alert severity="info" sx={{ display: 'inline-flex' }}>
                  {emptyMessage}
                </Alert>
              </TableCell>
            </TableRow>
          ) : (
            paginatedGroups.map((group, rowIndex) => {
              const isItemSelected = state.selectedGroups.has(group.name);
              const labelId = `enhanced-table-checkbox-${rowIndex}`;
              const animationDelay = animationDelayRef.current[group.name] || 0;

              return (
                <TableRow
                  hover
                  key={group.name}
                  selected={isItemSelected}
                  onClick={() => selectable && handleRowSelect(group.name)}
                  sx={{
                    cursor: selectable ? 'pointer' : 'default',
                    animation: isItemSelected ? 'pulse 0.3s ease-out' : 'none',
                    animationDelay: `${animationDelay}ms`,
                    transition: (theme) =>
                      theme.transitions.create(['background-color'], {
                        duration: theme.transitions.duration.short,
                      }),
                    '@keyframes pulse': {
                      '0%': { backgroundColor: 'transparent' },
                      '50%': { backgroundColor: 'action.selected' },
                      '100%': { backgroundColor: 'transparent' },
                    },
                  }}
                >
                  {/* Selection checkbox */}
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleRowSelect(group.name)}
                        sx={{
                          transition: (theme) =>
                            theme.transitions.create(['transform'], {
                              duration: theme.transitions.duration.short,
                            }),
                          '&.Mui-checked': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </TableCell>
                  )}

                  {/* Data cells */}
                  {columns.map((column) => {
                    const value = group[column.id as keyof GroupObject];
                    let displayValue: React.ReactNode =
                      value as React.ReactNode;

                    // Format value if formatter is provided
                    if (column.format) {
                      displayValue = column.format(value, group);
                    } else if (
                      column.id === 'administrators' ||
                      column.id === 'members'
                    ) {
                      // Special handling for arrays - show count with chip
                      const items = value as string[];
                      displayValue = (
                        <Chip
                          label={`${items.length} ${column.id === 'administrators' ? 'admin' : 'member'}${items.length !== 1 ? 's' : ''}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderRadius: 1,
                            transition: (theme) =>
                              theme.transitions.create(
                                ['transform', 'box-shadow'],
                                {
                                  duration: theme.transitions.duration.short,
                                }
                              ),
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: 1,
                            },
                          }}
                        />
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        <Fade in timeout={300 + rowIndex * 50}>
                          <Box>{displayValue}</Box>
                        </Fade>
                      </TableCell>
                    );
                  })}

                  {/* Actions cell */}
                  {actions.length > 0 && (
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionsClick(e, group.name)}
                        sx={{
                          transition: (theme) =>
                            theme.transitions.create(['transform', 'color'], {
                              duration: theme.transitions.duration.short,
                            }),
                          '&:hover': {
                            transform: 'rotate(90deg)',
                            color: 'primary.main',
                          },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[group.name]}
                        open={Boolean(anchorEl[group.name])}
                        onClose={() => handleActionsClose(group.name)}
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 200 }}
                      >
                        {actions.map((action, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => handleActionClick(action, group)}
                            disabled={
                              action.disabled ? action.disabled(group) : false
                            }
                            sx={{
                              color: action.color,
                              transition: (theme) =>
                                theme.transitions.create(
                                  ['background-color', 'padding-left'],
                                  { duration: theme.transitions.duration.short }
                                ),
                              '&:hover': {
                                pl: 3,
                              },
                            }}
                          >
                            {action.icon && (
                              <ListItemIcon sx={{ color: 'inherit' }}>
                                {action.icon}
                              </ListItemIcon>
                            )}
                            <ListItemText primary={action.label} />
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          count={filteredGroups.length}
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </Box>
  );
}
