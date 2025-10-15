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
  FileTableProps,
  FileTableState,
  FileObject,
  FileAction,
} from '@/types/FileTableProps';

export function FileTableImplementation({
  files,
  columns,
  searchable = true,
  selectable = true,
  onSelectionChange,
  initialSelected = [],
  loading = false,
  emptyMessage = 'No files found',
  searchPlaceholder = 'Search files...',
  className,
  sx,
  stickyHeader = true,
  pagination = true,
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 25,
  actions = [],
  actionsLabel = 'Actions',
  toolbarActions = [],
  showToolbar = true,
}: FileTableProps) {
  const [state, setState] = useState<FileTableState>({
    searchTerm: '',
    selectedFiles: new Set(initialSelected),
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

  // Filter files based on search term
  const filteredFiles = useMemo(() => {
    if (!state.searchTerm.trim()) return files;

    const searchLower = state.searchTerm.toLowerCase();
    return files.filter((file) =>
      file.name.toLowerCase().includes(searchLower)
    );
  }, [files, state.searchTerm]);

  // Sort filtered files
  const sortedFiles = useTableSorting(
    filteredFiles,
    state.orderBy,
    state.order
  );

  // Paginate sorted files
  const paginatedFiles = useTablePagination(
    sortedFiles,
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
    (fileName: string) => {
      setState((prev) => {
        const newSelected = new Set(prev.selectedFiles);

        if (newSelected.has(fileName)) {
          newSelected.delete(fileName);
          delete animationDelayRef.current[fileName];
        } else {
          newSelected.add(fileName);
          // Add stagger delay for selection animation
          animationDelayRef.current[fileName] = newSelected.size * 50;
        }

        // Notify parent of selection change
        onSelectionChange?.(Array.from(newSelected));

        return {
          ...prev,
          selectedFiles: newSelected,
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
          ? new Set(filteredFiles.map((file) => file.name))
          : new Set<string>();

        // Add stagger delay for batch selection
        if (event.target.checked) {
          filteredFiles.forEach((file, index) => {
            animationDelayRef.current[file.name] = index * 25;
          });
        } else {
          animationDelayRef.current = {};
        }

        // Notify parent of selection change
        onSelectionChange?.(Array.from(newSelected));

        return {
          ...prev,
          selectedFiles: newSelected,
        };
      });
    },
    [filteredFiles, onSelectionChange]
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
    (event: React.MouseEvent<HTMLElement>, fileName: string) => {
      event.stopPropagation();
      setAnchorEl((prev) => ({ ...prev, [fileName]: event.currentTarget }));
    },
    []
  );

  // Handle actions menu close
  const handleActionsClose = useCallback((fileName: string) => {
    setAnchorEl((prev) => ({ ...prev, [fileName]: null }));
  }, []);

  // Handle action click
  const handleActionClick = useCallback(
    (action: FileAction, file: FileObject) => {
      action.onClick(file);
      handleActionsClose(file.name);
    },
    [handleActionsClose]
  );

  // Calculate selection state for header checkbox
  const isAllSelected = useMemo(() => {
    const visibleFileNames = filteredFiles.map((file) => file.name);
    return (
      visibleFileNames.length > 0 &&
      visibleFileNames.every((name) => state.selectedFiles.has(name))
    );
  }, [filteredFiles, state.selectedFiles]);

  const isIndeterminate = useMemo(() => {
    const visibleFileNames = filteredFiles.map((file) => file.name);
    const selectedVisible = visibleFileNames.filter((name) =>
      state.selectedFiles.has(name)
    );
    return (
      selectedVisible.length > 0 &&
      selectedVisible.length < visibleFileNames.length
    );
  }, [filteredFiles, state.selectedFiles]);

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

  const hasSelectedItems = state.selectedFiles.size > 0;

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
                {state.selectedFiles.size} selected
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
                    // Pass selected files to the action
                    const selectedFileObjects = files.filter((file) =>
                      state.selectedFiles.has(file.name)
                    );
                    if (selectedFileObjects.length > 0) {
                      selectedFileObjects.forEach((file) =>
                        action.onClick(file)
                      );
                    }
                  }}
                  disabled={
                    !hasSelectedItems ||
                    (hasSelectedItems &&
                      files
                        .filter((file) => state.selectedFiles.has(file.name))
                        .some((file) => action.disabled?.(file)))
                  }
                  color={action.color || 'primary'}
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create(
                        ['background-color', 'transform', 'box-shadow'],
                        { duration: theme.transitions.duration.short }
                      ),
                    '&:hover:not(:disabled)': {
                      transform: 'translateY(-1px)',
                      boxShadow: (theme) => theme.shadows[2],
                    },
                    '&:active:not(:disabled)': {
                      transform: 'translateY(0px)',
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
      <Table stickyHeader={stickyHeader} responsive>
        <TableHead>
          <TableRow>
            {/* Selection Column */}
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  disabled={filteredFiles.length === 0}
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create(['transform', 'color'], {
                        duration: theme.transitions.duration.shorter,
                      }),
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                    '&.Mui-checked': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </TableCell>
            )}

            {/* Data Columns */}
            {columns.map((column) => (
              <TableCell
                key={column.id as string}
                align={column.align || 'left'}
                style={{ minWidth: column.minWidth, width: column.width }}
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

            {/* Actions Column */}
            {actions.length > 0 && (
              <TableCell align="center" style={{ width: 48 }}>
                {actionsLabel}
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedFiles.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length +
                  (selectable ? 1 : 0) +
                  (actions.length > 0 ? 1 : 0)
                }
                align="center"
              >
                <Alert severity="info" variant="outlined">
                  {emptyMessage}
                </Alert>
              </TableCell>
            </TableRow>
          ) : (
            paginatedFiles.map((file) => {
              const isSelected = state.selectedFiles.has(file.name);
              const animationDelay = animationDelayRef.current[file.name] || 0;

              return (
                <TableRow
                  key={file.name}
                  hover
                  selected={isSelected}
                  onClick={
                    selectable ? () => handleRowSelect(file.name) : undefined
                  }
                  sx={{
                    cursor: selectable ? 'pointer' : 'default',
                    transition: (theme) =>
                      theme.transitions.create(['background-color'], {
                        duration: 150,
                        delay: animationDelay,
                      }),
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.action.hover + '80',
                    },
                    '&.Mui-selected': {
                      backgroundColor: (theme) =>
                        theme.palette.primary.main + '15',
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.primary.main + '25',
                      },
                    },
                    // Smooth scrolling behavior
                    scrollBehavior: 'smooth',
                  }}
                >
                  {/* Selection Column */}
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleRowSelect(file.name)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          transition: (theme) =>
                            theme.transitions.create(['transform', 'color'], {
                              duration: 100,
                              delay: animationDelay,
                            }),
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                          '&.Mui-checked': {
                            transform: 'scale(1.05)',
                            color: 'primary.main',
                          },
                        }}
                      />
                    </TableCell>
                  )}

                  {/* Data Columns */}
                  {columns.map((column) => {
                    const value = getNestedProperty(file, column.id as string);
                    const displayValue = column.format
                      ? column.format(value, file)
                      : String(value || '');

                    return (
                      <TableCell
                        key={column.id as string}
                        align={column.align || 'left'}
                        sx={{
                          transition: (theme) =>
                            theme.transitions.create(['color'], {
                              duration: theme.transitions.duration.short,
                            }),
                        }}
                      >
                        {displayValue}
                      </TableCell>
                    );
                  })}

                  {/* Actions Column */}
                  {actions.length > 0 && (
                    <TableCell align="center" padding="none">
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionsClick(e, file.name)}
                        aria-label="actions menu"
                        sx={{
                          transition: (theme) =>
                            theme.transitions.create(['transform', 'color'], {
                              duration: theme.transitions.duration.shorter,
                            }),
                          '&:hover': {
                            transform: 'scale(1.1)',
                            color: 'primary.main',
                          },
                          '&:focus-visible': {
                            outline: (theme) =>
                              `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: '2px',
                          },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[file.name]}
                        open={Boolean(anchorEl[file.name])}
                        onClose={() => handleActionsClose(file.name)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        TransitionComponent={Fade}
                        transitionDuration={200}
                        sx={{
                          '& .MuiPaper-root': {
                            transition: (theme) =>
                              theme.transitions.create(
                                ['opacity', 'transform'],
                                {
                                  duration: theme.transitions.duration.short,
                                }
                              ),
                          },
                        }}
                      >
                        {actions.map((action, actionIndex) => (
                          <MenuItem
                            key={actionIndex}
                            onClick={() => handleActionClick(action, file)}
                            disabled={action.disabled?.(file)}
                            sx={{
                              transition: (theme) =>
                                theme.transitions.create(['background-color'], {
                                  duration: theme.transitions.duration.shorter,
                                }),
                              '&:hover:not(.Mui-disabled)': {
                                backgroundColor: (theme) =>
                                  theme.palette.action.hover,
                              },
                            }}
                          >
                            {action.icon && (
                              <ListItemIcon
                                sx={{
                                  transition: (theme) =>
                                    theme.transitions.create(['color'], {
                                      duration:
                                        theme.transitions.duration.shorter,
                                    }),
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
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination with transitions */}
      {pagination && filteredFiles.length > 0 && (
        <Fade in={filteredFiles.length > 0} timeout={300}>
          <Box>
            <TablePagination
              count={filteredFiles.length}
              page={state.page}
              rowsPerPage={state.rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={rowsPerPageOptions}
              sx={{
                '& .MuiTablePagination-toolbar': {
                  transition: (theme) =>
                    theme.transitions.create(['padding'], {
                      duration: theme.transitions.duration.standard,
                    }),
                },
                '& .MuiIconButton-root': {
                  transition: (theme) =>
                    theme.transitions.create(['transform', 'color'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  '&:hover:not(:disabled)': {
                    transform: 'scale(1.1)',
                    color: 'primary.main',
                  },
                  '&:focus-visible': {
                    outline: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px',
                  },
                },
                '& .MuiSelect-select': {
                  transition: (theme) =>
                    theme.transitions.create(['background-color'], {
                      duration: theme.transitions.duration.short,
                    }),
                },
              }}
            />
          </Box>
        </Fade>
      )}
    </Box>
  );
}

// Utility function to get nested property value
function getNestedProperty(obj: FileObject, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (current, property) => (current as Record<string, unknown>)?.[property],
      obj
    );
}
