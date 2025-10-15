import { ReactNode } from 'react';
import {
  TableProps as MuiTableProps,
  TableHeadProps as MuiTableHeadProps,
  TableBodyProps as MuiTableBodyProps,
  TableRowProps as MuiTableRowProps,
  TableCellProps as MuiTableCellProps,
  TablePaginationProps as MuiTablePaginationProps,
  TableSortLabelProps as MuiTableSortLabelProps,
} from '@mui/material';

export type SortDirection = 'asc' | 'desc' | false;

export interface TableProps extends MuiTableProps {
  children: ReactNode;
  stickyHeader?: boolean;
  size?: 'small' | 'medium';
  responsive?: boolean;
  className?: string;
}

export interface TableHeadProps extends MuiTableHeadProps {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps extends MuiTableBodyProps {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps extends MuiTableRowProps {
  children: ReactNode;
  hover?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface TableCellProps extends MuiTableCellProps {
  children?: ReactNode;
  sortDirection?: SortDirection;
  className?: string;
}

export interface TableSortLabelProps extends MuiTableSortLabelProps {
  active?: boolean;
  direction?: 'asc' | 'desc';
  onClick?: () => void;
  children: ReactNode;
}

export interface TablePaginationProps
  extends Omit<MuiTablePaginationProps, 'component'> {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
  className?: string;
}

export interface SortableColumn<T = unknown> {
  id: keyof T | string;
  label: string;
  numeric?: boolean;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  format?: (value: unknown) => string | ReactNode;
  minWidth?: number;
  width?: string | number;
}

export interface TableState<T = unknown> {
  page: number;
  rowsPerPage: number;
  orderBy: keyof T | string;
  order: 'asc' | 'desc';
}

export interface UseTableSortingProps<T = unknown> {
  data: T[];
  orderBy: keyof T | string;
  order: 'asc' | 'desc';
}

export interface UseTablePaginationProps {
  totalCount: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
}
