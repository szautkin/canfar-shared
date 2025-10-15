import React from 'react';
import { ListImplementation } from '@/implementation/list';
import { ListProps } from '@/types/ListProps';

export const List: React.FC<ListProps> = (props) => {
  return <ListImplementation {...props} />;
};
