import React from 'react';
import { SnackbarImplementation } from '@/implementation/snackbar';
import { SnackbarProps } from '@/types/SnackbarProps';

export const Snackbar: React.FC<SnackbarProps> = (props) => {
  return <SnackbarImplementation {...props} />;
};

// Re-export the queue hook for convenience
export { useSnackbarQueue } from '@/hooks/useSnackbarQueue';
