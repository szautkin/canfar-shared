import React from 'react';
import { EditMeetingModalProps } from '../../types/MeetingTableProps';
import { EditMeetingModalImpl } from '../../implementation/editMeetingModal';

/**
 * EditMeetingModal allows users to edit existing meeting records
 *
 * Features:
 * - Form pre-populated with existing meeting data
 * - Validation for required fields
 * - Date and time modification
 * - Meeting type and location updates
 *
 * @example
 * ```tsx
 * <EditMeetingModal
 *   open={editModalOpen}
 *   onClose={() => setEditModalOpen(false)}
 *   onEditMeeting={handleEditMeeting}
 *   meeting={selectedMeeting}
 * />
 * ```
 */
export const EditMeetingModal: React.FC<EditMeetingModalProps> = (props) => {
  return <EditMeetingModalImpl {...props} />;
};
