'use client';

import React from 'react';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { TabProps, TabsProps } from '../types/TabProps';

export const TabImpl: React.FC<TabProps> = ({ ...props }) => {
  return <MuiTab {...props} />;
};

export const TabsImpl: React.FC<TabsProps> = ({
  variant = 'standard',
  ...props
}) => {
  const muiVariant =
    variant === 'fullWidth'
      ? 'fullWidth'
      : variant === 'scrollable'
        ? 'scrollable'
        : 'standard';

  return <MuiTabs variant={muiVariant} {...props} />;
};
