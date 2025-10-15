import { TableRow as TableRowImplementation } from '@/implementation/table';
import { TableRowProps } from '@/types/TableProps';

export function TableRow(props: TableRowProps) {
  return <TableRowImplementation {...props} />;
}
