import { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
import { AlertProps } from './AlertProps';

export type SnackbarPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface SnackbarProps
  extends Omit<MuiSnackbarProps, 'anchorOrigin' | 'open'> {
  open: boolean;
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  position?: SnackbarPosition;
  autoHideDuration?: number;
  message?: React.ReactNode;
  severity?: AlertProps['severity'];
  action?: React.ReactNode;
  disableWindowBlurListener?: boolean;
  resumeHideDuration?: number;
  children?: React.ReactElement<AlertProps>;
}

export interface SnackbarQueueItem {
  key: number;
  message: React.ReactNode;
  severity?: AlertProps['severity'];
  action?: React.ReactNode;
  autoHideDuration?: number;
  position?: SnackbarPosition;
}
