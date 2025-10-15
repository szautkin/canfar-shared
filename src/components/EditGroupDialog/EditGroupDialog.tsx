import React from 'react';
import { EditGroupDialogImplementation } from '@/implementation/editGroupDialog';
import type { EditGroupDialogProps } from '@/types/GroupTableProps';

export const EditGroupDialog: React.FC<EditGroupDialogProps> = (props) => {
  return <EditGroupDialogImplementation {...props} />;
};
