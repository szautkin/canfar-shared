import { HeaderProps } from '@/types/HeaderProps';
import { HeaderImpl } from '@/implementation/header';
import React from 'react';

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref) => {
    return <HeaderImpl ref={ref} {...props} />;
  }
);

Header.displayName = 'Header';
