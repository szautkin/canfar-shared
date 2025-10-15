import { DeleteSessionModalImpl } from '@/implementation/deleteSessionModal';
import { DeleteSessionModalProps } from '@/types/DeleteSessionModalProps';

export const DeleteSessionModal = (props: DeleteSessionModalProps) => {
  return <DeleteSessionModalImpl {...props} />;
};
