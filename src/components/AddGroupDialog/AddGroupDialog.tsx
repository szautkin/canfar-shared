import React from 'react';
import { AddGroupDialogImplementation } from '@/implementation/addGroupDialog';
import type { AddGroupDialogProps } from '@/types/GroupTableProps';

export const AddGroupDialog: React.FC<AddGroupDialogProps> = (props) => {
  return <AddGroupDialogImplementation {...props} />;
};
