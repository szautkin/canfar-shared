import { TooltipProps } from '@/types/TooltipProps';
import { TooltipImpl } from '@/implementation/tooltip';
import React from 'react';

export const Tooltip: React.FC<TooltipProps> = (props) => {
  return <TooltipImpl {...props} />;
};
