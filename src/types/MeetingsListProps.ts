import type { MeetingListResponse, MeetingSearchParams } from './MeetingProps';

export interface MeetingsListProps {
  initialData: MeetingListResponse;
  searchParams: MeetingSearchParams;
}
