import { MenuProps } from '@/types/MenuProps';
import { MenuImpl } from '@/implementation/menu';
import React from 'react';

export const Menu: React.FC<MenuProps> = (props) => {
  return <MenuImpl {...props} />;
};
