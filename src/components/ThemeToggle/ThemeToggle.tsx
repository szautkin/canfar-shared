import { ThemeToggleProps } from '@/types/ThemeToggleProps';
import { ThemeToggleImpl } from '@/implementation/themeToggle';
import React from 'react';

export const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  return <ThemeToggleImpl {...props} />;
};
