import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface MeetingObject {
  id: string; // Unique meeting identifier
  title: string; // Meeting title
  speaker: string; // Speaker name
  date: Date; // Meeting date
  time: string; // Meeting time (e.g., "14:00")
  duration: number; // Duration in minutes
  institution: string; // Speaker's institution
  abstract: string; // Meeting abstract/description
  location: string; // Meeting location (room, online link, etc.)
  meetingType: 'Presentation' | 'Workshop' | 'Seminar' | 'Conference' | 'Other';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  created?: Date;
  modified?: Date;
  [key: string]: unknown;
}

export interface MeetingTableColumn {
  id: keyof MeetingObject | string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  format?: (value: unknown, meeting: MeetingObject) => string | ReactNode;
  minWidth?: number;
  width?: string | number;
}

export interface MeetingAction {
  label: string;
  icon?: ReactNode;
  onClick: (meeting: MeetingObject) => void;
  disabled?: (meeting: MeetingObject) => boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export interface MeetingTableProps {
  meetings: MeetingObject[];
  columns: MeetingTableColumn[];
  searchable?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedMeetings: string[]) => void;
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
  actions?: MeetingAction[];
  actionsLabel?: string;
  toolbarActions?: MeetingAction[];
  showToolbar?: boolean;
}

export interface MeetingTableState {
  searchTerm: string;
  selectedMeetings: Set<string>;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: 'asc' | 'desc';
}

export interface AddMeetingModalProps {
  open: boolean;
  onClose: () => void;
  onAddMeeting: (
    meeting: Omit<MeetingObject, 'id' | 'created' | 'modified'>
  ) => Promise<void>;
}

export interface EditMeetingModalProps {
  open: boolean;
  onClose: () => void;
  onEditMeeting: (meeting: MeetingObject) => Promise<void>;
  meeting: MeetingObject | null;
}

export interface MeetingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  meeting: MeetingObject | null;
}
