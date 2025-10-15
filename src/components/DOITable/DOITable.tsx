import { DOITableImplementation } from '@/implementation/doiTable';
import { DOITableProps } from '@/types/DOITableProps';

export function DOITable(props: DOITableProps) {
  return <DOITableImplementation {...props} />;
}

export default DOITable;
