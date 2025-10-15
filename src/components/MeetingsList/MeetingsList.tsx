import { MeetingsListProps } from '@/types/MeetingsListProps';
import { MeetingsListImpl } from '@/implementation/meetingsList';

export const MeetingsList = (props: MeetingsListProps) => {
  return <MeetingsListImpl {...props} />;
};
