import { Table as TableImplementation } from '@/implementation/table';
import { TableProps } from '@/types/TableProps';

export function Table(props: TableProps) {
  return <TableImplementation {...props} />;
}
