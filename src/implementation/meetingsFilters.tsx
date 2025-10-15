'use client';

import { useState, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@/components/Box/Box';
import { Typography } from '@/components/Typography/Typography';
import { FormControl } from '@/components/FormControl/FormControl';
import { InputLabel } from '@mui/material';
import { Select } from '@/components/Select/Select';
import { MenuItem } from '@/components/MenuItem/MenuItem';
import { TextField } from '@/components/TextField/TextField';
import { Chip } from '@/components/Chip/Chip';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { MeetingsFiltersProps } from '@/types/MeetingsFiltersProps';
import type {
  MeetingFilters,
  MeetingSortOption,
  MeetingType,
  MeetingStatus,
} from '@/types/MeetingProps';

const MEETING_TYPES: { value: MeetingType; label: string }[] = [
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'training', label: 'Training' },
  { value: 'board', label: 'Board Meeting' },
  { value: 'committee', label: 'Committee' },
];

const MEETING_STATUSES: { value: MeetingStatus; label: string }[] = [
  { value: 'published', label: 'Published' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'draft', label: 'Draft' },
  { value: 'cancelled', label: 'Cancelled' },
];

const SORT_OPTIONS: { value: MeetingSortOption; label: string }[] = [
  { value: 'startDate_asc', label: 'Start Date (Earliest)' },
  { value: 'startDate_desc', label: 'Start Date (Latest)' },
  { value: 'title_asc', label: 'Title (A-Z)' },
  { value: 'title_desc', label: 'Title (Z-A)' },
  { value: 'createdAt_desc', label: 'Recently Created' },
  { value: 'updatedAt_desc', label: 'Recently Updated' },
];

export const MeetingsFiltersImpl = ({
  initialFilters = {},
  initialSort = 'startDate_asc',
  onFiltersChange,
  onSortChange,
}: MeetingsFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for filters
  const [filters, setFilters] = useState<MeetingFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<MeetingSortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState(
    initialFilters.searchQuery || ''
  );

  // Update URL with new filters
  const updateURL = useCallback(
    (newFilters: MeetingFilters, newSort: MeetingSortOption) => {
      const params = new URLSearchParams(searchParams);

      // Clear existing filter params
      params.delete('type');
      params.delete('status');
      params.delete('location');
      params.delete('tags');
      params.delete('search');
      params.delete('sort');
      params.delete('page'); // Reset to first page when filters change

      // Add new filter params
      if (newFilters.type?.length) {
        params.set('type', newFilters.type.join(','));
      }
      if (newFilters.status?.length) {
        params.set('status', newFilters.status.join(','));
      }
      if (newFilters.location?.type?.length) {
        params.set('location', newFilters.location.type.join(','));
      }
      if (newFilters.tags?.length) {
        params.set('tags', newFilters.tags.join(','));
      }
      if (newFilters.searchQuery) {
        params.set('search', newFilters.searchQuery);
      }
      if (newSort !== 'startDate_asc') {
        params.set('sort', newSort);
      }

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleFilterChange = useCallback(
    (newFilters: Partial<MeetingFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      onFiltersChange?.(updatedFilters);
      updateURL(updatedFilters, sortBy);
    },
    [filters, sortBy, onFiltersChange, updateURL]
  );

  const handleSortChange = useCallback(
    (newSort: MeetingSortOption) => {
      setSortBy(newSort);
      onSortChange?.(newSort);
      updateURL(filters, newSort);
    },
    [filters, onSortChange, updateURL]
  );

  const handleSearchSubmit = useCallback(() => {
    handleFilterChange({ searchQuery });
  }, [searchQuery, handleFilterChange]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters: MeetingFilters = {};
    const defaultSort: MeetingSortOption = 'startDate_asc';

    setFilters(clearedFilters);
    setSortBy(defaultSort);
    setSearchQuery('');

    onFiltersChange?.(clearedFilters);
    onSortChange?.(defaultSort);
    updateURL(clearedFilters, defaultSort);
  }, [onFiltersChange, onSortChange, updateURL]);

  const hasActiveFilters =
    Object.values(filters).some((value) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    ) ||
    searchQuery ||
    sortBy !== 'startDate_asc';

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        height: 'fit-content',
        position: 'sticky',
        top: 24,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 'medium',
        }}
      >
        Filters & Search
      </Typography>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search meetings"
          variant="outlined"
          fullWidth
          size="sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          InputProps={{
            endAdornment: (
              <Button
                size="sm"
                onClick={handleSearchSubmit}
                disabled={isPending}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <SearchIcon fontSize="small" />
              </Button>
            ),
          }}
        />
      </Box>

      {/* Sort */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          label="Sort by"
          onChange={(e) =>
            handleSortChange(e.target.value as MeetingSortOption)
          }
          disabled={isPending}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      {/* Meeting Type */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Meeting Type</InputLabel>
        <Select
          multiple
          value={filters.type || []}
          label="Meeting Type"
          onChange={(e) => {
            const types =
              typeof e.target.value === 'string'
                ? (e.target.value.split(',') as MeetingType[])
                : (e.target.value as MeetingType[]);
            handleFilterChange({ type: types });
          }}
          disabled={isPending}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as MeetingType[]).map((value) => (
                <Chip
                  key={value}
                  label={
                    MEETING_TYPES.find((t) => t.value === value)?.label || value
                  }
                  size="small"
                />
              ))}
            </Box>
          )}
        >
          {MEETING_TYPES.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Meeting Status */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Status</InputLabel>
        <Select
          multiple
          value={filters.status || []}
          label="Status"
          onChange={(e) => {
            const statuses =
              typeof e.target.value === 'string'
                ? (e.target.value.split(',') as MeetingStatus[])
                : (e.target.value as MeetingStatus[]);
            handleFilterChange({ status: statuses });
          }}
          disabled={isPending}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as MeetingStatus[]).map((value) => (
                <Chip
                  key={value}
                  label={
                    MEETING_STATUSES.find((s) => s.value === value)?.label ||
                    value
                  }
                  size="small"
                />
              ))}
            </Box>
          )}
        >
          {MEETING_STATUSES.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="secondary"
          fullWidth
          size="sm"
          startIcon={<ClearIcon />}
          onClick={handleClearFilters}
          disabled={isPending}
          sx={{ mt: 2 }}
        >
          Clear All Filters
        </Button>
      )}
    </Box>
  );
};
