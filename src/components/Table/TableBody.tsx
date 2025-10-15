import { TableBody as TableBodyImplementation } from '@/implementation/table';
import { TableBodyProps } from '@/types/TableProps';

export function TableBody(props: TableBodyProps) {
  return <TableBodyImplementation {...props} />;
}
