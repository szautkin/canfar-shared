import React from 'react';
import { ManageGroupMembersDialogImplementation } from '@/implementation/manageGroupMembersDialog';
import type { ManageGroupMembersDialogProps } from '@/types/GroupTableProps';

export const ManageGroupMembersDialog: React.FC<
  ManageGroupMembersDialogProps
> = (props) => {
  return <ManageGroupMembersDialogImplementation {...props} />;
};
