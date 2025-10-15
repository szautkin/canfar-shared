import { BoxProps } from '@/types/BoxProps';
import { BoxImpl } from '@/implementation/box';
import React from 'react';

export const Box: React.FC<BoxProps> = (props) => {
  return <BoxImpl {...props} />;
};
