import React from 'react';
import { AlertImplementation } from '@/implementation/alert';
import { AlertProps } from '@/types/AlertProps';

export const Alert: React.FC<AlertProps> = (props) => {
  return <AlertImplementation {...props} />;
};
