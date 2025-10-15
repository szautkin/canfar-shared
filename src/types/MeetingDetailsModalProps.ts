import { MeetingObject } from '@/types/MeetingTableProps';

export type { MeetingObject };

interface Meeting {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  timezone: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
  visibility: 'PUBLIC' | 'PRIVATE';
  owner?: {
    fullName: string;
    email?: string;
    institute?: string;
    department?: string | null;
    type?: string;
  };
  location?: string | null;
  contact?: string | null;
  keywords?: string[];
  links?: string[];
  createdAt?: string;
  lastModified?: string;
}

export interface MeetingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  meeting?: Meeting | MeetingObject | null;
  infoMode?: boolean;
}
