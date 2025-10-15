import React from 'react';
import { CreateFolderDialogImplementation } from '@/implementation/createFolderDialog';
import type { CreateFolderDialogProps } from '@/types/CreateFolderDialogProps';

export const CreateFolderDialog: React.FC<CreateFolderDialogProps> = (
  props
) => {
  return <CreateFolderDialogImplementation {...props} />;
};
