'use client';

import {
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TablePagination as MuiTablePagination,
  TableSortLabel as MuiTableSortLabel,
  TableContainer,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Box } from '@mui/material';
import {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TablePaginationProps,
  TableSortLabelProps,
} from '@/types/TableProps';

export function Table({
  children,
  stickyHeader = false,
  size = 'medium',
  responsive = true,
  className,
  sx,
  ...props
}: TableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tableContent = (
    <MuiTable
      stickyHeader={stickyHeader}
      size={isMobile && responsive ? 'small' : size}
      className={className}
      sx={{
        minWidth: responsive && isMobile ? 300 : 650,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTable>
  );

  if (responsive) {
    return (
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'action.hover',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'action.selected',
            borderRadius: 4,
          },
        }}
      >
        {tableContent}
      </TableContainer>
    );
  }

  return tableContent;
}

export function TableHead({
  children,
  className,
  sx,
  ...props
}: TableHeadProps) {
  return (
    <MuiTableHead
      className={className}
      sx={{
        '& .MuiTableCell-head': {
          fontWeight: 600,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTableHead>
  );
}

export function TableBody({
  children,
  className,
  sx,
  ...props
}: TableBodyProps) {
  return (
    <MuiTableBody className={className} sx={sx} {...props}>
      {children}
    </MuiTableBody>
  );
}

export function TableRow({
  children,
  hover = false,
  selected = false,
  onClick,
  className,
  sx,
  ...props
}: TableRowProps) {
  return (
    <MuiTableRow
      hover={hover}
      selected={selected}
      onClick={onClick}
      className={className}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        '&:last-child td, &:last-child th': {
          border: 0,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTableRow>
  );
}

export function TableCell({
  children,
  sortDirection,
  className,
  sx,
  ...props
}: TableCellProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiTableCell
      sortDirection={sortDirection}
      className={className}
      sx={{
        ...(isMobile && {
          padding: '12px 8px',
          fontSize: '0.875rem',
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTableCell>
  );
}

export function TableSortLabel({
  active = false,
  direction = 'asc',
  onClick,
  children,
  ...props
}: TableSortLabelProps) {
  return (
    <MuiTableSortLabel
      active={active}
      direction={direction}
      onClick={onClick}
      {...props}
    >
      {children}
      {active && (
        <Box component="span" sx={visuallyHidden}>
          {direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </Box>
      )}
    </MuiTableSortLabel>
  );
}

export function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
  className,
  sx,
  ...props
}: TablePaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiTablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={rowsPerPageOptions}
      className={className}
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        ...(isMobile && {
          '.MuiTablePagination-toolbar': {
            paddingLeft: 1,
            paddingRight: 1,
          },
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
            {
              fontSize: '0.75rem',
            },
        }),
        ...sx,
      }}
      {...props}
    />
  );
}

// Utility hook for table sorting
export function useTableSorting<T>(
  data: T[],
  orderBy: keyof T | string,
  order: 'asc' | 'desc'
): T[] {
  return [...data].sort((a, b) => {
    const aValue = getNestedProperty(a, orderBy as string);
    const bValue = getNestedProperty(b, orderBy as string);

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    if (order === 'asc') {
      return aString < bString ? -1 : aString > bString ? 1 : 0;
    } else {
      return aString > bString ? -1 : aString < bString ? 1 : 0;
    }
  });
}

// Utility function to get nested property value
function getNestedProperty(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce(
      (current, property) => (current as Record<string, unknown>)?.[property],
      obj
    );
}

// Utility hook for table pagination
export function useTablePagination<T>(
  data: T[],
  page: number,
  rowsPerPage: number
): T[] {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return data.slice(startIndex, endIndex);
}
