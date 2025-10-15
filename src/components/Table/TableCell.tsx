import { TableCell as TableCellImplementation } from '@/implementation/table';
import { TableCellProps } from '@/types/TableProps';

export function TableCell(props: TableCellProps) {
  return <TableCellImplementation {...props} />;
}
