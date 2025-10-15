import { DividerProps } from '@/types/DividerProps';
import { DividerImpl } from '@/implementation/divider';
import React from 'react';

export const Divider: React.FC<DividerProps> = (props) => {
  return <DividerImpl {...props} />;
};
