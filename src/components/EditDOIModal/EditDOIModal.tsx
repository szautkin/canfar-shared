import React from 'react';
import { EditDOIModalProps } from '../../types/DOITableProps';
import { EditDOIModalImpl } from '../../implementation/editDOIModal';

/**
 * EditDOIModal allows users to view and edit existing DOI records
 *
 * Features:
 * - Form pre-populated with existing DOI data
 * - Validation for required fields
 * - Status management (In progress/Published)
 * - Read-only fields for system-generated data
 *
 * @example
 * ```tsx
 * <EditDOIModal
 *   open={editModalOpen}
 *   onClose={() => setEditModalOpen(false)}
 *   onEditDOI={handleEditDOI}
 *   doi={selectedDOI}
 * />
 * ```
 */
export const EditDOIModal: React.FC<EditDOIModalProps> = (props) => {
  return <EditDOIModalImpl {...props} />;
};
