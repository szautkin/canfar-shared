import { GroupTableImplementation } from '@/implementation/groupTable';
import { GroupTableProps } from '@/types/GroupTableProps';

export function GroupTable(props: GroupTableProps) {
  return <GroupTableImplementation {...props} />;
}

export default GroupTable;
