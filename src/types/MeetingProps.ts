// Import ReactNode when needed for component props
// import { ReactNode } from 'react';

export type MeetingType =
  | 'conference'
  | 'workshop'
  | 'seminar'
  | 'webinar'
  | 'training'
  | 'board'
  | 'committee';
export type MeetingStatus =
  | 'draft'
  | 'published'
  | 'ongoing'
  | 'completed'
  | 'cancelled';
export type AttendeeRole = 'organizer' | 'speaker' | 'participant' | 'observer';
export type RegistrationStatus = 'open' | 'closed' | 'waitlist' | 'invite_only';

export interface MeetingLocation {
  type: 'in_person' | 'virtual' | 'hybrid';
  venue?: string;
  address?: string;
  city?: string;
  country?: string;
  room?: string;
  virtualUrl?: string;
  dialInInfo?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface MeetingSpeaker {
  id: string;
  name: string;
  title?: string;
  affiliation?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  presentationTitle?: string;
  presentationAbstract?: string;
  presentationFiles?: string[];
}

export interface MeetingSession {
  id: string;
  title: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  description?: string;
  speakers: MeetingSpeaker[];
  location?: Partial<MeetingLocation>;
  sessionType?:
    | 'presentation'
    | 'panel'
    | 'workshop'
    | 'break'
    | 'poster'
    | 'discussion';
  tags?: string[];
}

export interface MeetingAttendee {
  id: string;
  userId?: string; // Reference to user system
  name: string;
  email: string;
  affiliation?: string;
  role: AttendeeRole;
  registrationDate: string; // ISO 8601
  dietary?: string;
  accessibilityNeeds?: string;
  notes?: string;
}

export interface MeetingDocument {
  id: string;
  title: string;
  type:
    | 'agenda'
    | 'abstract'
    | 'presentation'
    | 'poster'
    | 'proceedings'
    | 'minutes'
    | 'recording';
  url: string;
  filename: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string; // ISO 8601
  description?: string;
  isPublic: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  abstract?: string;
  type: MeetingType;
  status: MeetingStatus;

  // Timing
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  timezone: string; // IANA timezone

  // Location
  location: MeetingLocation;

  // Organization
  organizers: string[]; // User IDs
  contactEmail: string;
  website?: string;

  // Registration
  registrationStatus: RegistrationStatus;
  registrationDeadline?: string; // ISO 8601
  maxAttendees?: number;
  registrationFee?: number;
  registrationCurrency?: string;

  // Content
  sessions: MeetingSession[];
  speakers: MeetingSpeaker[];
  attendees: MeetingAttendee[];
  documents: MeetingDocument[];

  // Metadata
  tags: string[];
  keywords: string[];
  createdBy: string; // User ID
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601

  // Settings
  isPublic: boolean;
  allowRegistration: boolean;
  requireApproval: boolean;
  sendNotifications: boolean;
}

// Component Props
export interface MeetingCardProps {
  meeting: Meeting;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onRegister?: (id: string) => void;
  showActions?: boolean;
  variant?: 'compact' | 'detailed';
}

export interface MeetingListProps {
  meetings: Meeting[];
  loading?: boolean;
  error?: string | null;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onRegister?: (id: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  filters?: MeetingFilters;
  onFilterChange?: (filters: MeetingFilters) => void;
  sortBy?: MeetingSortOption;
  onSortChange?: (sort: MeetingSortOption) => void;
}

export interface MeetingFilters {
  type?: MeetingType[];
  status?: MeetingStatus[];
  dateRange?: {
    start?: string;
    end?: string;
  };
  location?: {
    type?: MeetingLocation['type'][];
    country?: string[];
  };
  tags?: string[];
  searchQuery?: string;
}

export type MeetingSortOption =
  | 'startDate_asc'
  | 'startDate_desc'
  | 'title_asc'
  | 'title_desc'
  | 'createdAt_desc'
  | 'updatedAt_desc';

export interface MeetingFormProps {
  meeting?: Partial<Meeting>;
  onSubmit: (meeting: Partial<Meeting>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
  mode: 'create' | 'edit';
}

export interface MeetingDetailProps {
  meeting: Meeting;
  onEdit?: () => void;
  onDelete?: () => void;
  onRegister?: () => void;
  onUnregister?: () => void;
  currentUserId?: string;
  canEdit?: boolean;
  canDelete?: boolean;
  showRegistration?: boolean;
}

// Server Action Types
export interface CreateMeetingData {
  title: string;
  description: string;
  abstract?: string;
  type: MeetingType;
  startDate: string;
  endDate: string;
  timezone: string;
  location: MeetingLocation;
  contactEmail: string;
  website?: string;
  registrationStatus: RegistrationStatus;
  registrationDeadline?: string;
  maxAttendees?: number;
  tags: string[];
  isPublic: boolean;
  allowRegistration: boolean;
  requireApproval: boolean;
}

export interface UpdateMeetingData extends Partial<CreateMeetingData> {
  id: string;
}

export interface MeetingSearchParams {
  page?: number;
  limit?: number;
  filters?: MeetingFilters;
  sort?: MeetingSortOption;
}

// API Response Types
export interface MeetingListResponse {
  meetings: Meeting[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface MeetingActionResult {
  success: boolean;
  data?: Meeting;
  error?: string;
  validationErrors?: Record<string, string[]>;
}
