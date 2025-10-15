import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export type StorageType = 'arc' | 'vault';

export interface FileObject {
  name: string;
  size: number;
  lastModified: Date;
  readWrite: boolean;
  read: boolean;
  owner?: string; // Only for ARC storage
  [key: string]: unknown; // Allow additional properties
}

export interface FileTableColumn {
  id: keyof FileObject | string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  format?: (value: unknown, file: FileObject) => string | ReactNode;
  minWidth?: number;
  width?: string | number;
}

export interface FileAction {
  label: string;
  icon?: ReactNode;
  onClick: (file: FileObject) => void;
  disabled?: (file: FileObject) => boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export interface FileTableProps {
  files: FileObject[];
  columns: FileTableColumn[];
  searchable?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedFiles: string[]) => void;
  initialSelected?: string[];
  loading?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
  className?: string;
  sx?: SxProps<Theme>;
  stickyHeader?: boolean;
  pagination?: boolean;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  actions?: FileAction[];
  actionsLabel?: string;
  toolbarActions?: FileAction[];
  showToolbar?: boolean;
}

export interface FileTableState {
  searchTerm: string;
  selectedFiles: Set<string>;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: 'asc' | 'desc';
}

// Predefined column configurations for different storage types
export const ARC_COLUMNS: FileTableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    align: 'left',
  },
  {
    id: 'size',
    label: 'Size',
    sortable: true,
    align: 'right',
    format: (value: unknown) => {
      const bytes = Number(value);
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    },
  },
  {
    id: 'lastModified',
    label: 'Last Modified (UTC)',
    sortable: true,
    align: 'left',
    format: (value: unknown) => {
      const date = value instanceof Date ? value : new Date(value as string);
      return date.toISOString().replace('T', ' ').substring(0, 19);
    },
  },
  {
    id: 'readWrite',
    label: 'Read/Write',
    sortable: true,
    align: 'center',
    format: (value: unknown) => (value ? 'Yes' : 'No'),
  },
  {
    id: 'read',
    label: 'Read',
    sortable: true,
    align: 'center',
    format: (value: unknown) => (value ? 'Yes' : 'No'),
  },
  {
    id: 'owner',
    label: 'Owner',
    sortable: true,
    align: 'left',
  },
];

export const VAULT_COLUMNS: FileTableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    align: 'left',
  },
  {
    id: 'size',
    label: 'Size',
    sortable: true,
    align: 'right',
    format: (value: unknown) => {
      const bytes = Number(value);
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    },
  },
  {
    id: 'lastModified',
    label: 'Last Modified (UTC)',
    sortable: true,
    align: 'left',
    format: (value: unknown) => {
      const date = value instanceof Date ? value : new Date(value as string);
      return date.toISOString().replace('T', ' ').substring(0, 19);
    },
  },
  {
    id: 'readWrite',
    label: 'Read/Write',
    sortable: true,
    align: 'center',
    format: (value: unknown) => (value ? 'Yes' : 'No'),
  },
  {
    id: 'read',
    label: 'Read',
    sortable: true,
    align: 'center',
    format: (value: unknown) => (value ? 'Yes' : 'No'),
  },
];
