import React from 'react';
import { ListItemImplementation } from '@/implementation/list';
import { ListItemProps } from '@/types/ListItemProps';

export const ListItem: React.FC<ListItemProps> = (props) => {
  return <ListItemImplementation {...props} />;
};
