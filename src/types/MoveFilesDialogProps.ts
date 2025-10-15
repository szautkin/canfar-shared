export interface FileItem {
  /**
   * Name of the file or folder
   */
  name: string;

  /**
   * Full path to the file or folder
   */
  path: string;

  /**
   * Type of the item (file or directory)
   */
  type: 'file' | 'directory';

  /**
   * File size in bytes (undefined for directories)
   */
  size?: number;

  /**
   * File extension (without the dot)
   */
  extension?: string;

  /**
   * Last modified date
   */
  lastModified?: Date;
}

export interface FolderNode {
  /**
   * Name of the folder
   */
  name: string;

  /**
   * Full path to the folder
   */
  path: string;

  /**
   * Whether the user has write permissions to this folder
   */
  hasWritePermission: boolean;

  /**
   * Whether this folder is currently expanded in the tree
   */
  expanded?: boolean;

  /**
   * Whether this folder is currently being loaded
   */
  loading?: boolean;

  /**
   * Child folders (lazy loaded)
   */
  children?: FolderNode[];

  /**
   * Parent folder path
   */
  parentPath?: string;
}

export interface RecentDestination {
  /**
   * Display name for the destination
   */
  name: string;

  /**
   * Full path to the destination
   */
  path: string;

  /**
   * When this destination was last used
   */
  lastUsed: Date;
}

export interface MoveOperation {
  /**
   * Source files being moved
   */
  sourceFiles: FileItem[];

  /**
   * Destination folder path
   */
  destinationPath: string;

  /**
   * Whether to overwrite existing files
   */
  overwrite?: boolean;
}

export interface MoveFilesDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;

  /**
   * Callback fired when the dialog should be closed
   */
  onClose: () => void;

  /**
   * Files to be moved
   */
  files: FileItem[];

  /**
   * Current path where the files are located
   */
  currentPath: string;

  /**
   * Root folder node for the destination browser
   */
  destinationRoot: FolderNode;

  /**
   * Callback fired when files should be moved
   * @param operation - The move operation details
   */
  onMove: (operation: MoveOperation) => Promise<void>;

  /**
   * Callback to load child folders for a given path
   * @param parentPath - The path of the parent folder
   * @returns Promise resolving to child folders
   */
  onLoadFolders: (parentPath: string) => Promise<FolderNode[]>;

  /**
   * Whether the move operation is in progress
   */
  isMoving?: boolean;

  /**
   * Recent destinations for quick selection
   */
  recentDestinations?: RecentDestination[];

  /**
   * Maximum number of recent destinations to show
   */
  maxRecentDestinations?: number;

  /**
   * Whether to show the search functionality
   */
  enableSearch?: boolean;

  /**
   * Callback for folder search
   * @param query - Search query
   * @returns Promise resolving to matching folders
   */
  onSearchFolders?: (query: string) => Promise<FolderNode[]>;

  /**
   * Custom validation for move operations
   * @param operation - The proposed move operation
   * @returns Validation result
   */
  validateMove?: (operation: MoveOperation) => MoveValidationResult;
}

export interface MoveValidationResult {
  /**
   * Whether the move operation is valid
   */
  isValid: boolean;

  /**
   * Error message if validation failed
   */
  errorMessage?: string;

  /**
   * Warning message (operation can proceed but user should be aware)
   */
  warningMessage?: string;

  /**
   * Whether the operation requires confirmation (e.g., overwriting files)
   */
  requiresConfirmation?: boolean;

  /**
   * Conflicts detected (files that would be overwritten)
   */
  conflicts?: FileConflict[];
}

export interface FileConflict {
  /**
   * Source file being moved
   */
  sourceFile: FileItem;

  /**
   * Existing file at destination that would be overwritten
   */
  existingFile: FileItem;

  /**
   * Type of conflict
   */
  conflictType: 'name' | 'overwrite';
}

export interface PathBreadcrumb {
  /**
   * Display name for this part of the path
   */
  name: string;

  /**
   * Full path up to this point
   */
  path: string;

  /**
   * Whether this is the current/active part of the path
   */
  isActive?: boolean;
}
