import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface DOIObject {
  doi: string; // DOI number like "25.0087"
  status: 'In progress' | 'Published';
  title: string; // Publication title
  dataDirectory: string; // Storage path for data
  authors?: string[];
  description?: string;
  created?: Date;
  modified?: Date;
  publishedDate?: Date;
  [key: string]: unknown;
}

export interface DOITableColumn {
  id: keyof DOIObject | string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  format?: (value: unknown, doi: DOIObject) => string | ReactNode;
  minWidth?: number;
  width?: string | number;
}

export interface DOIAction {
  label: string;
  icon?: ReactNode;
  onClick: (doi: DOIObject) => void;
  disabled?: (doi: DOIObject) => boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export interface DOITableProps {
  dois: DOIObject[];
  columns: DOITableColumn[];
  searchable?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedDOIs: string[]) => void;
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
  actions?: DOIAction[];
  actionsLabel?: string;
  toolbarActions?: DOIAction[];
  showToolbar?: boolean;
}

export interface DOITableState {
  searchTerm: string;
  selectedDOIs: Set<string>;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: 'asc' | 'desc';
}

export interface DOIInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export interface AddDOIModalProps {
  open: boolean;
  onClose: () => void;
  onAddDOI: (doi: Omit<DOIObject, 'created' | 'modified'>) => Promise<void>;
  existingDOIs: string[];
}

export interface EditDOIModalProps {
  open: boolean;
  onClose: () => void;
  onEditDOI: (doi: DOIObject) => Promise<void>;
  doi: DOIObject | null;
}
