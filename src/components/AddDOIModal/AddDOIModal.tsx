import React from 'react';
import { AddDOIModalProps } from '../../types/DOITableProps';
import { AddDOIModalImpl } from '../../implementation/addDOIModal';

/**
 * AddDOIModal allows users to create new DOI records
 *
 * Features:
 * - Form for entering DOI details (title, authors, description)
 * - Validation for required fields
 * - Integration with existing DOI system
 * - Auto-generation of storage paths
 *
 * @example
 * ```tsx
 * <AddDOIModal
 *   open={addModalOpen}
 *   onClose={() => setAddModalOpen(false)}
 *   onAddDOI={handleAddDOI}
 *   existingDOIs={existingDOINumbers}
 * />
 * ```
 */
export const AddDOIModal: React.FC<AddDOIModalProps> = (props) => {
  return <AddDOIModalImpl {...props} />;
};
