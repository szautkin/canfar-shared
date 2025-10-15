import { MenuItemProps } from '@/types/MenuItemProps';
import { MenuItemImpl } from '@/implementation/menuItem';
import React from 'react';

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  return <MenuItemImpl {...props} />;
};
