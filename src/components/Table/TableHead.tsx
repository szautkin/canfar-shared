import { TableHead as TableHeadImplementation } from '@/implementation/table';
import { TableHeadProps } from '@/types/TableProps';

export function TableHead(props: TableHeadProps) {
  return <TableHeadImplementation {...props} />;
}
