import { TablePagination as TablePaginationImplementation } from '@/implementation/table';
import { TablePaginationProps } from '@/types/TableProps';

export function TablePagination(props: TablePaginationProps) {
  return <TablePaginationImplementation {...props} />;
}
