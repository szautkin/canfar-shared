import { AppBarProps } from '@/types/AppBarProps';
import { AppBarImpl } from '@/implementation/appBar';
import React from 'react';

export const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>(
  (props, ref) => {
    return <AppBarImpl ref={ref} {...props} />;
  }
);

AppBar.displayName = 'AppBar';
