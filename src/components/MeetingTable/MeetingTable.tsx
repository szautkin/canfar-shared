import { MeetingTableImplementation } from '@/implementation/meetingTable';
import { MeetingTableProps } from '@/types/MeetingTableProps';

export function MeetingTable(props: MeetingTableProps) {
  return <MeetingTableImplementation {...props} />;
}

export default MeetingTable;
