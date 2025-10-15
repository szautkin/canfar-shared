import { AppLayoutProps } from '@/types/AppLayoutProps';
import { AppLayoutImpl } from '@/implementation/appLayout';
import React from 'react';

export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  (props, ref) => {
    return <AppLayoutImpl ref={ref} {...props} />;
  }
);

AppLayout.displayName = 'AppLayout';
