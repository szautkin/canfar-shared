import { SessionSettingsDialogImpl } from '@/implementation/sessionSettingsDialog';
import { SessionSettingsDialogProps } from '@/types/SessionSettingsDialogProps';

export function SessionSettingsDialog(props: SessionSettingsDialogProps) {
  return <SessionSettingsDialogImpl {...props} />;
}
