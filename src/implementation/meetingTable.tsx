'use client';

import React, { useState, useMemo, ChangeEvent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Typography,
  Toolbar,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  TableSortLabel,
  Skeleton,
  Alert,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import {
  MeetingTableProps,
  MeetingObject,
  MeetingTableColumn,
} from '@/types/MeetingTableProps';

export type MeetingTableImplementationProps = MeetingTableProps;

const formatDisplayValue = (value: unknown): React.ReactNode => {
  if (value === null || value === undefined) {
    return '';
  }

  if (React.isValidElement(value)) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
};

export function MeetingTableImplementation({
  meetings,
  columns = [],
  searchable = true,
  selectable = false,
  onSelectionChange,
  loading = false,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No meetings found',
  pagination = true,
  defaultRowsPerPage = 10,
  actions = [],
  actionsLabel = 'Actions',
  toolbarActions = [],
  showToolbar = true,
}: MeetingTableImplementationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMeeting, setCurrentMeeting] = useState<MeetingObject | null>(
    null
  );

  // Default columns if none provided
  const defaultColumns: MeetingTableColumn[] = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'speaker', label: 'Speaker', sortable: true },
    { id: 'date', label: 'Date', sortable: true },
    { id: 'location', label: 'Location', sortable: false },
    { id: 'status', label: 'Status', sortable: true },
  ];

  const columnsToUse = columns.length > 0 ? columns : defaultColumns;

  // Filter meetings based on search
  const filteredMeetings = useMemo(() => {
    if (!searchTerm) return meetings;
    const term = searchTerm.toLowerCase();
    return meetings.filter((meeting) => {
      const searchableText = [
        meeting.title,
        meeting.speaker,
        meeting.institution,
        meeting.location,
        meeting.status,
        meeting.abstract,
        meeting.meetingType,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return searchableText.includes(term);
    });
  }, [meetings, searchTerm]);

  // Sort meetings
  const sortedMeetings = useMemo(() => {
    if (!orderBy) return filteredMeetings;
    return [...filteredMeetings].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[orderBy];
      const bVal = (b as Record<string, unknown>)[orderBy];
      if (!aVal) return 1;
      if (!bVal) return -1;

      // Convert to strings for comparison
      const aStr =
        typeof aVal === 'string'
          ? aVal.toLowerCase()
          : String(aVal).toLowerCase();
      const bStr =
        typeof bVal === 'string'
          ? bVal.toLowerCase()
          : String(bVal).toLowerCase();
      if (aStr < bStr) return order === 'asc' ? -1 : 1;
      if (aStr > bStr) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredMeetings, orderBy, order]);

  // Paginate meetings
  const paginatedMeetings = useMemo(() => {
    if (!pagination) return sortedMeetings;
    const start = page * rowsPerPage;
    return sortedMeetings.slice(start, start + rowsPerPage);
  }, [sortedMeetings, page, rowsPerPage, pagination]);

  // Handle selection
  const handleSelectAll = () => {
    if (selected.length === paginatedMeetings.length) {
      setSelected([]);
      onSelectionChange?.([]);
    } else {
      const newSelected = paginatedMeetings.map((m) => m.id);
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
    }
  };

  const handleSelect = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    meeting: MeetingObject
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentMeeting(meeting);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setCurrentMeeting(null);
  };

  // Render mobile card
  const renderMobileCard = (meeting: MeetingObject) => (
    <Card key={meeting.id} sx={{ mb: 2 }}>
      <CardContent>
        {selectable && (
          <Checkbox
            checked={selected.includes(meeting.id)}
            onChange={() => handleSelect(meeting.id)}
            sx={{ float: 'right', mt: -1, mr: -1 }}
          />
        )}
        <Typography variant="h6" gutterBottom>
          {meeting.title}
        </Typography>
        {columnsToUse.map((column) => {
          if (column.id === 'title') return null;
          const rawValue = column.format
            ? column.format(
                (meeting as Record<string, unknown>)[column.id],
                meeting
              )
            : (meeting as Record<string, unknown>)[column.id];
          const value = formatDisplayValue(rawValue);
          return (
            <Box key={column.id} sx={{ mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {column.label}:
              </Typography>
              <Box>{value}</Box>
            </Box>
          );
        })}
      </CardContent>
      {actions.length > 0 && (
        <CardActions>
          {actions.map((action, idx) => (
            <Button
              key={idx}
              size="small"
              color={action.color || 'primary'}
              onClick={() => action.onClick(meeting)}
              disabled={action.disabled ? action.disabled(meeting) : false}
              startIcon={action.icon}
            >
              {action.label}
            </Button>
          ))}
        </CardActions>
      )}
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        {isMobile
          ? [...Array(5)].map((_, i) => (
              <Card key={i} sx={{ mb: 2 }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="30%" />
                </CardContent>
              </Card>
            ))
          : [...Array(5)].map((_, i) => (
              <Skeleton key={i} height={60} sx={{ mb: 1 }} />
            ))}
      </Box>
    );
  }

  if (meetings.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="info">{emptyMessage}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {showToolbar && (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {/* Title handled by parent */}
            </Typography>
          )}

          {toolbarActions.map((action, idx) => {
            // Check if this is a "New" action that doesn't require selection
            const isNewAction =
              action.label.toLowerCase().includes('new') ||
              action.label.toLowerCase().includes('add');
            // Check if meetings are selected
            const hasSelection = selected.length > 0;
            // Get first selected meeting if available
            const firstSelectedMeeting = hasSelection
              ? meetings.find((m) => selected.includes(m.id))
              : null;

            return (
              <Tooltip key={idx} title={action.label}>
                <span>
                  <Button
                    onClick={() => {
                      if (isNewAction) {
                        // For "New" actions, call without a meeting parameter
                        (action.onClick as () => void)();
                      } else if (firstSelectedMeeting) {
                        // For other actions, pass the first selected meeting
                        action.onClick(firstSelectedMeeting);
                      }
                    }}
                    disabled={!isNewAction && !hasSelection}
                    color={action.color || 'primary'}
                    startIcon={action.icon}
                    sx={{ mr: 1 }}
                  >
                    {action.label}
                  </Button>
                </span>
              </Tooltip>
            );
          })}
        </Toolbar>
      )}

      {searchable && (
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {isMobile ? (
        <Box sx={{ px: 2 }}>
          {paginatedMeetings.map((meeting) => renderMobileCard(meeting))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < paginatedMeetings.length
                      }
                      checked={
                        paginatedMeetings.length > 0 &&
                        selected.length === paginatedMeetings.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                )}
                {columnsToUse.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    style={{ minWidth: column.minWidth, width: column.width }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => handleSort(String(column.id))}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell align="right">{actionsLabel}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMeetings.map((meeting) => (
                <TableRow key={meeting.id} hover>
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(meeting.id)}
                        onChange={() => handleSelect(meeting.id)}
                      />
                    </TableCell>
                  )}
                  {columnsToUse.map((column) => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.format
                        ? column.format(
                            (meeting as Record<string, unknown>)[column.id],
                            meeting
                          )
                        : String(
                            (meeting as Record<string, unknown>)[column.id] ||
                              ''
                          )}
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleActionClick(e, meeting)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={sortedMeetings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionClose}
      >
        {actions.map((action, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              if (currentMeeting) {
                action.onClick(currentMeeting);
                handleActionClose();
              }
            }}
            disabled={
              action.disabled && currentMeeting
                ? action.disabled(currentMeeting)
                : false
            }
          >
            {action.icon}
            <Box sx={{ ml: 1 }}>{action.label}</Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
