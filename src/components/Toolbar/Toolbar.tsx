import { ToolbarProps } from '@/types/ToolbarProps';
import { ToolbarImpl } from '@/implementation/toolbar';
import React from 'react';

export const Toolbar: React.FC<ToolbarProps> = (props) => {
  return <ToolbarImpl {...props} />;
};
