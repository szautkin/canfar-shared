import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { ReactNode } from 'react';

export interface UploadFile {
  /**
   * Unique identifier for the file
   */
  id: string;
  /**
   * The File object
   */
  file: File;
  /**
   * Upload progress (0-100)
   */
  progress: number;
  /**
   * Upload status
   */
  status: 'pending' | 'uploading' | 'completed' | 'error';
  /**
   * Error message if upload failed
   */
  error?: string;
}

export interface FileValidationResult {
  /**
   * Whether the file is valid
   */
  isValid: boolean;
  /**
   * Error message if invalid
   */
  error?: string;
}

export interface UploadDialogProps
  extends Omit<MuiDialogProps, 'children' | 'onClose' | 'title'> {
  /**
   * Whether the dialog is open
   */
  open: boolean;
  /**
   * Callback fired when the dialog should be closed
   */
  onClose: () => void;
  /**
   * Callback fired when files are selected for upload
   */
  onUpload: (files: File[]) => Promise<void>;
  /**
   * Title of the dialog
   * @default "Upload Files"
   */
  title?: ReactNode;
  /**
   * Maximum file size in bytes
   * @default 50MB (50 * 1024 * 1024)
   */
  maxFileSize?: number;
  /**
   * Accepted file types (MIME types or file extensions)
   * @default undefined (all files accepted)
   */
  acceptedFileTypes?: string[];
  /**
   * Maximum number of files that can be uploaded
   * @default undefined (unlimited)
   */
  maxFiles?: number;
  /**
   * Whether multiple files can be selected
   * @default true
   */
  multiple?: boolean;
  /**
   * Custom validation function for files
   */
  validateFile?: (file: File) => FileValidationResult;
  /**
   * Whether the upload is currently in progress
   * @default false
   */
  uploading?: boolean;
  /**
   * Current upload progress for all files (0-100)
   */
  overallProgress?: number;
  /**
   * Additional help text to display
   */
  helpText?: ReactNode;
  /**
   * Custom drag zone content
   */
  dragZoneContent?: ReactNode;
}
