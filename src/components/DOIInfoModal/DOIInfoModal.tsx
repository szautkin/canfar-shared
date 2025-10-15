import React from 'react';
import { DOIInfoModalProps } from '../../types/DOITableProps';
import { DOIInfoModalImpl } from '../../implementation/doiInfoModal';

/**
 * DOIInfoModal provides information about the Data Publication service
 *
 * Features:
 * - Explains what DOI (Digital Object Identifier) service is
 * - Provides context about DataCite organization
 * - Describes the purpose and workflow
 * - Accessible from question mark icon next to page title
 *
 * @example
 * ```tsx
 * <DOIInfoModal
 *   open={infoModalOpen}
 *   onClose={() => setInfoModalOpen(false)}
 * />
 * ```
 */
export const DOIInfoModal: React.FC<DOIInfoModalProps> = (props) => {
  return <DOIInfoModalImpl {...props} />;
};
