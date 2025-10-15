import React from 'react';
import { PageLayoutImplementation } from '@/implementation/pageLayout';
import { PageLayoutProps } from '@/types/PageLayoutProps';

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  return <PageLayoutImplementation {...props} />;
};
