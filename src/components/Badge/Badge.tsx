import React from 'react';
import { BadgeImplementation } from '@/implementation/badge';
import type { BadgeProps } from '@/types/BadgeProps';

export const Badge: React.FC<BadgeProps> = (props) => {
  return <BadgeImplementation {...props} />;
};
