import React from 'react';
import { AddMeetingModalProps } from '../../types/MeetingTableProps';
import { AddMeetingModalImpl } from '../../implementation/addMeetingModal';

/**
 * AddMeetingModal allows users to create new meeting records
 *
 * Features:
 * - Form for entering meeting details (title, speaker, date, time, etc.)
 * - Validation for required fields
 * - Date and time selection
 * - Meeting type and location management
 *
 * @example
 * ```tsx
 * <AddMeetingModal
 *   open={addModalOpen}
 *   onClose={() => setAddModalOpen(false)}
 *   onAddMeeting={handleAddMeeting}
 * />
 * ```
 */
export const AddMeetingModal: React.FC<AddMeetingModalProps> = (props) => {
  return <AddMeetingModalImpl {...props} />;
};
