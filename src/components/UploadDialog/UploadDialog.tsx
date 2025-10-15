import React from 'react';
import { UploadDialogImplementation } from '@/implementation/uploadDialog';
import type { UploadDialogProps } from '@/types/UploadDialogProps';

export const UploadDialog: React.FC<UploadDialogProps> = (props) => {
  return <UploadDialogImplementation {...props} />;
};
