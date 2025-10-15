import { MeetingsFiltersProps } from '@/types/MeetingsFiltersProps';
import { MeetingsFiltersImpl } from '@/implementation/meetingsFilters';

export const MeetingsFilters = (props: MeetingsFiltersProps) => {
  return <MeetingsFiltersImpl {...props} />;
};
