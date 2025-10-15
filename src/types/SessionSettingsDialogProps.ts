import { DialogProps } from '@mui/material';
import { SessionSettings } from './SessionLaunchFormProps';

export interface SessionSettingsDialogProps
  extends Omit<DialogProps, 'onClose'> {
  open: boolean;
  onClose: () => void;
  onSave: (settings: SessionSettings) => void;
  currentSettings: SessionSettings;
  memoryOptions?: number[];
  coreOptions?: number[];
}
