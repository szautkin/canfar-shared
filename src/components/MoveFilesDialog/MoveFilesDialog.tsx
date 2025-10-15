import React from 'react';
import { MoveFilesDialogImplementation } from '@/implementation/moveFilesDialog';
import { MoveFilesDialogProps } from '@/types/MoveFilesDialogProps';

/**
 * MoveFilesDialog component for moving files and folders in the Storage page.
 *
 * Features:
 * - Tree view for destination folder browsing
 * - File preview with icons
 * - Path validation and permissions checking
 * - Recent destinations for quick access
 * - Search functionality for finding folders
 * - Smooth animations and transitions
 * - Mobile responsive design
 * - Keyboard navigation support
 * - Drag visual feedback
 *
 * @param props - MoveFilesDialog props
 * @returns MoveFilesDialog component
 */
export function MoveFilesDialog(props: MoveFilesDialogProps) {
  return <MoveFilesDialogImplementation {...props} />;
}

export type { MoveFilesDialogProps } from '@/types/MoveFilesDialogProps';
