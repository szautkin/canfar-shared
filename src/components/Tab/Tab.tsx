import React from 'react';
import { TabImpl, TabsImpl } from '../../implementation/tab';
import { TabProps, TabsProps } from '../../types/TabProps';

export const Tab: React.FC<TabProps> = (props) => {
  return <TabImpl {...props} />;
};

export const Tabs: React.FC<TabsProps> = (props) => {
  return <TabsImpl {...props} />;
};
