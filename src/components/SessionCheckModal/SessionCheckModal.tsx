import { SessionCheckModalImpl } from '@/implementation/sessionCheckModal';
import { SessionCheckModalProps } from '@/types/SessionCheckModalProps';

export const SessionCheckModal = (props: SessionCheckModalProps) => {
  return <SessionCheckModalImpl {...props} />;
};
