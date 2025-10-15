import { SessionLaunchFormImpl } from '@/implementation/sessionLaunchForm';
import { SessionLaunchFormProps } from '@/types/SessionLaunchFormProps';

export function SessionLaunchForm(props: SessionLaunchFormProps) {
  return <SessionLaunchFormImpl {...props} />;
}
