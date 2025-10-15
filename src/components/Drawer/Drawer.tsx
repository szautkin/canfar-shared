import { DrawerProps } from '@/types/DrawerProps';
import { DrawerImpl } from '@/implementation/drawer';
import React from 'react';

export const Drawer: React.FC<DrawerProps> = (props) => {
  return <DrawerImpl {...props} />;
};
