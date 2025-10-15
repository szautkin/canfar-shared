import type { MeetingFilters, MeetingSortOption } from './MeetingProps';

export interface MeetingsFiltersProps {
  initialFilters?: MeetingFilters;
  initialSort?: MeetingSortOption;
  onFiltersChange?: (filters: MeetingFilters) => void;
  onSortChange?: (sort: MeetingSortOption) => void;
}
