import { SessionRenewModalImpl } from '@/implementation/sessionRenewModal';
import { SessionRenewModalProps } from '@/types/SessionRenewModalProps';

export const SessionRenewModal = (props: SessionRenewModalProps) => {
  return <SessionRenewModalImpl {...props} />;
};
