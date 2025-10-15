export interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  items: string[];
  title?: string;
  isDeleting?: boolean;
  itemType?: 'file' | 'folder' | 'item' | 'group' | 'meeting';
}
