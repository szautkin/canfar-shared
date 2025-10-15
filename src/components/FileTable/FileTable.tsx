import { FileTableImplementation } from '@/implementation/fileTable';
import { FileTableProps } from '@/types/FileTableProps';

export function FileTable(props: FileTableProps) {
  return <FileTableImplementation {...props} />;
}

export default FileTable;
