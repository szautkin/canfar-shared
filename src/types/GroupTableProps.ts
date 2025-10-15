import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface GroupObject {
  name: string;
  ownerName: string;
  administrators: string[];
  members: string[];
  description: string;
  created?: Date;
  modified?: Date;
  [key: string]: unknown;
}

export interface GroupTableColumn {
  id: keyof GroupObject | string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  format?: (value: unknown, group: GroupObject) => string | ReactNode;
  minWidth?: number;
  width?: string | number;
}

export interface GroupAction {
  label: string;
  icon?: ReactNode;
  onClick: (group: GroupObject) => void;
  disabled?: (group: GroupObject) => boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export interface GroupTableProps {
  groups: GroupObject[];
  columns: GroupTableColumn[];
  searchable?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedGroups: string[]) => void;
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
  actions?: GroupAction[];
  actionsLabel?: string;
  toolbarActions?: GroupAction[];
  showToolbar?: boolean;
}

export interface GroupTableState {
  searchTerm: string;
  selectedGroups: Set<string>;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: 'asc' | 'desc';
}

export interface AddGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onAddGroup: (
    group: Omit<GroupObject, 'created' | 'modified'>
  ) => Promise<void>;
  existingGroups: string[];
}

export interface EditGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onEditGroup: (group: GroupObject) => Promise<void>;
  group: GroupObject | null;
}

export interface ManageGroupMembersDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdateMembers: (
    groupName: string,
    administrators: string[],
    members: string[]
  ) => Promise<void>;
  group: GroupObject | null;
  availableUsers: string[];
}
