import React from 'react';
import { SkipNavigationProps } from '@/types/SkipNavigationProps';
import { SkipNavigationImpl } from '@/implementation/skipNavigation';

export const SkipNavigation: React.FC<SkipNavigationProps> = (props) => {
  return <SkipNavigationImpl {...props} />;
};
