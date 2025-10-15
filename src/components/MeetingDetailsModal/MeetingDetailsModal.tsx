import React from 'react';
import { MeetingDetailsModalProps } from '../../types/MeetingDetailsModalProps';
import { MeetingDetailsModalImpl } from '../../implementation/meetingDetailsModal';

/**
 * MeetingDetailsModal displays meeting information in a read-only view
 *
 * Features:
 * - Clean layout with all meeting information
 * - Read-only display of meeting details
 * - Proper formatting for dates, times, and status
 * - Close button for modal dismissal
 *
 * @example
 * ```tsx
 * <MeetingDetailsModal
 *   open={detailsModalOpen}
 *   onClose={() => setDetailsModalOpen(false)}
 *   meeting={selectedMeeting}
 * />
 * ```
 */
export const MeetingDetailsModal: React.FC<MeetingDetailsModalProps> = (
  props
) => {
  return <MeetingDetailsModalImpl {...props} />;
};
