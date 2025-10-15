export interface CreateFolderDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;

  /**
   * Callback fired when the dialog should be closed
   */
  onClose: () => void;

  /**
   * Current path where the folder will be created
   */
  currentPath: string;

  /**
   * List of existing folder names in the current directory to check for duplicates
   */
  existingFolders: string[];

  /**
   * Callback fired when a folder should be created
   * @param folderName - The name of the folder to create
   * @param fullPath - The complete path including the folder name
   */
  onCreateFolder: (folderName: string, fullPath: string) => void;

  /**
   * Whether the create operation is in progress
   */
  isCreating?: boolean;
}

export interface FolderValidation {
  isValid: boolean;
  errorMessage?: string;
}
