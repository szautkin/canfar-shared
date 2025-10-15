import {
  TabProps as MuiTabProps,
  TabsProps as MuiTabsProps,
} from '@mui/material';

export interface TabProps extends Omit<MuiTabProps, 'variant'> {
  variant?: 'standard' | 'fullWidth' | 'scrollable';
}

export interface TabsProps extends Omit<MuiTabsProps, 'variant'> {
  variant?: 'standard' | 'fullWidth' | 'scrollable';
}
