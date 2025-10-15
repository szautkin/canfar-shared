import { TableSortLabel as TableSortLabelImplementation } from '@/implementation/table';
import { TableSortLabelProps } from '@/types/TableProps';

export function TableSortLabel(props: TableSortLabelProps) {
  return <TableSortLabelImplementation {...props} />;
}
