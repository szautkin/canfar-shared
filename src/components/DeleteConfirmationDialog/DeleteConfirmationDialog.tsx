import React from 'react';
import { DeleteConfirmationDialogImpl } from '@/implementation/deleteConfirmationDialog';
import type { DeleteConfirmationDialogProps } from '@/types/DeleteConfirmationDialogProps';

export const DeleteConfirmationDialog = React.forwardRef<
  HTMLDivElement,
  DeleteConfirmationDialogProps
>((props, ref) => {
  return <DeleteConfirmationDialogImpl {...props} ref={ref} />;
});

DeleteConfirmationDialog.displayName = 'DeleteConfirmationDialog';
