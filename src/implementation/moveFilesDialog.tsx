'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Breadcrumbs,
  Link,
  IconButton,
  Collapse,
  Divider,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  VideoFile as VideoIcon,
  AudioFile as AudioIcon,
  Description as DocumentIcon,
  Code as CodeIcon,
  Archive as ArchiveIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  NavigateNext as NavigateNextIcon,
  History as HistoryIcon,
  Home as HomeIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import {
  MoveFilesDialogProps,
  FolderNode,
  FileItem,
  MoveOperation,
  MoveValidationResult,
  PathBreadcrumb,
} from '@/types/MoveFilesDialogProps';

// File type to icon mapping
const getFileIcon = (file: FileItem) => {
  if (file.type === 'directory') {
    return <FolderIcon />;
  }

  const extension = file.extension?.toLowerCase();
  if (!extension) return <FileIcon />;

  // Image files
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(extension)) {
    return <ImageIcon />;
  }

  // Video files
  if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
    return <VideoIcon />;
  }

  // Audio files
  if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'].includes(extension)) {
    return <AudioIcon />;
  }

  // Document files
  if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
    return <DocumentIcon />;
  }

  // Code files
  if (
    [
      'js',
      'ts',
      'jsx',
      'tsx',
      'py',
      'java',
      'cpp',
      'c',
      'html',
      'css',
      'php',
      'rb',
      'go',
      'rs',
    ].includes(extension)
  ) {
    return <CodeIcon />;
  }

  // Archive files
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(extension)) {
    return <ArchiveIcon />;
  }

  return <FileIcon />;
};

// Format file size
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

// Generate breadcrumbs from path
const generateBreadcrumbs = (path: string): PathBreadcrumb[] => {
  const parts = path.split('/').filter(Boolean);
  const breadcrumbs: PathBreadcrumb[] = [
    { name: 'Root', path: '/', isActive: path === '/' },
  ];

  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    breadcrumbs.push({
      name: part,
      path: currentPath,
      isActive: index === parts.length - 1,
    });
  });

  return breadcrumbs;
};

// Folder tree node component
interface FolderTreeNodeProps {
  node: FolderNode;
  selectedPath: string;
  onSelect: (path: string) => void;
  onToggle: (path: string) => void;
  onLoadChildren: (path: string) => void;
  level: number;
  searchQuery?: string;
}

const FolderTreeNode: React.FC<FolderTreeNodeProps> = ({
  node,
  selectedPath,
  onSelect,
  onToggle,
  onLoadChildren,
  level,
  searchQuery,
}) => {
  const theme = useTheme();
  const isSelected = selectedPath === node.path;
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = node.expanded || false;

  // Highlight search query in node name
  const highlightedName = useMemo(() => {
    if (!searchQuery || !searchQuery.trim()) {
      return node.name;
    }

    const query = searchQuery.toLowerCase();
    const name = node.name.toLowerCase();
    const index = name.indexOf(query);

    if (index === -1) {
      return node.name;
    }

    return (
      <>
        {node.name.substring(0, index)}
        <Box component="span" sx={{ bgcolor: 'warning.light', px: 0.5 }}>
          {node.name.substring(index, index + query.length)}
        </Box>
        {node.name.substring(index + query.length)}
      </>
    );
  }, [node.name, searchQuery]);

  const handleToggle = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (!hasChildren && !node.loading) {
        onLoadChildren(node.path);
      }
      onToggle(node.path);
    },
    [hasChildren, node.loading, node.path, onLoadChildren, onToggle]
  );

  const handleSelect = useCallback(() => {
    onSelect(node.path);
  }, [node.path, onSelect]);

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          pl: level * 2,
          borderLeft: level > 0 ? `1px solid ${theme.palette.divider}` : 'none',
          ml: level > 0 ? 1 : 0,
        }}
      >
        <ListItemButton
          selected={isSelected}
          onClick={handleSelect}
          disabled={!node.hasWritePermission}
          sx={{
            transition: theme.transitions.create(
              ['background-color', 'transform'],
              {
                duration: 200,
              }
            ),
            '&:hover': {
              transform: 'translateX(4px)',
            },
            '&.Mui-selected': {
              bgcolor: 'primary.50',
              borderRight: `3px solid ${theme.palette.primary.main}`,
            },
            '&.Mui-disabled': {
              opacity: 0.6,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <IconButton
              size="small"
              onClick={handleToggle}
              disabled={node.loading}
              sx={{
                transition: theme.transitions.create('transform', {
                  duration: 200,
                }),
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              {node.loading ? (
                <CircularProgress size={16} />
              ) : hasChildren || !node.children ? (
                <ExpandMoreIcon />
              ) : null}
            </IconButton>
          </ListItemIcon>

          <ListItemIcon sx={{ minWidth: 32 }}>
            {isExpanded ? <FolderOpenIcon /> : <FolderIcon />}
          </ListItemIcon>

          <ListItemText
            primary={highlightedName}
            primaryTypographyProps={{
              variant: 'body2',
              sx: {
                fontWeight: isSelected ? 600 : 400,
                color: !node.hasWritePermission
                  ? 'text.disabled'
                  : 'text.primary',
              },
            }}
          />

          {!node.hasWritePermission && (
            <Tooltip title="No write permission">
              <WarningIcon color="warning" fontSize="small" />
            </Tooltip>
          )}
        </ListItemButton>
      </ListItem>

      <Collapse in={isExpanded} timeout={200} unmountOnExit>
        {node.children?.map((child) => (
          <FolderTreeNode
            key={child.path}
            node={child}
            selectedPath={selectedPath}
            onSelect={onSelect}
            onToggle={onToggle}
            onLoadChildren={onLoadChildren}
            level={level + 1}
            searchQuery={searchQuery}
          />
        ))}
      </Collapse>
    </>
  );
};

export function MoveFilesDialogImplementation({
  open,
  onClose,
  files,
  currentPath,
  destinationRoot,
  onMove,
  onLoadFolders,
  isMoving = false,
  recentDestinations = [],
  maxRecentDestinations = 5,
  enableSearch = true,
  onSearchFolders,
  validateMove,
}: MoveFilesDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [folderTree, setFolderTree] = useState<FolderNode>(destinationRoot);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FolderNode[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showRecentDestinations, setShowRecentDestinations] = useState(true);
  const [validation, setValidation] = useState<MoveValidationResult>({
    isValid: false,
  });
  const [showPreview, setShowPreview] = useState(false);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setSelectedDestination('');
      setSearchQuery('');
      setSearchResults([]);
      setIsSearching(false);
      setShowRecentDestinations(true);
      setValidation({ isValid: false });
      setShowPreview(false);
      setFolderTree(destinationRoot);
    }
  }, [open, destinationRoot]);

  // Handle folder toggle (expand/collapse)
  const handleToggleFolder = useCallback(async (path: string) => {
    const updateNodeInTree = (
      node: FolderNode,
      targetPath: string
    ): FolderNode => {
      if (node.path === targetPath) {
        return { ...node, expanded: !node.expanded };
      }

      if (node.children) {
        return {
          ...node,
          children: node.children.map((child) =>
            updateNodeInTree(child, targetPath)
          ),
        };
      }

      return node;
    };

    setFolderTree((prev) => updateNodeInTree(prev, path));
  }, []);

  // Handle loading folder children
  const handleLoadFolderChildren = useCallback(
    async (path: string) => {
      const updateNodeInTree = (
        node: FolderNode,
        targetPath: string,
        children: FolderNode[]
      ): FolderNode => {
        if (node.path === targetPath) {
          return { ...node, children, loading: false, expanded: true };
        }

        if (node.children) {
          return {
            ...node,
            children: node.children.map((child) =>
              updateNodeInTree(child, targetPath, children)
            ),
          };
        }

        return node;
      };

      // Set loading state
      const setLoadingInTree = (
        node: FolderNode,
        targetPath: string
      ): FolderNode => {
        if (node.path === targetPath) {
          return { ...node, loading: true };
        }

        if (node.children) {
          return {
            ...node,
            children: node.children.map((child) =>
              setLoadingInTree(child, targetPath)
            ),
          };
        }

        return node;
      };

      setFolderTree((prev) => setLoadingInTree(prev, path));

      try {
        const children = await onLoadFolders(path);
        setFolderTree((prev) => updateNodeInTree(prev, path, children));
      } catch (error) {
        console.error('Failed to load folder children:', error);
        // Reset loading state on error
        setFolderTree((prev) => updateNodeInTree(prev, path, []));
      }
    },
    [onLoadFolders]
  );

  // Handle search
  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);

      if (!query.trim() || !enableSearch || !onSearchFolders) {
        setSearchResults([]);
        setIsSearching(false);
        setShowRecentDestinations(true);
        return;
      }

      setIsSearching(true);
      setShowRecentDestinations(false);

      try {
        const results = await onSearchFolders(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [enableSearch, onSearchFolders]
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setShowRecentDestinations(true);
  }, []);

  // Select destination
  const handleSelectDestination = useCallback((path: string) => {
    setSelectedDestination(path);
    setShowPreview(true);
  }, []);

  // Validate move operation
  useEffect(() => {
    if (!selectedDestination || selectedDestination === currentPath) {
      setValidation({
        isValid: false,
        errorMessage:
          selectedDestination === currentPath
            ? 'Cannot move files to the same location'
            : 'Please select a destination folder',
      });
      return;
    }

    const operation: MoveOperation = {
      sourceFiles: files,
      destinationPath: selectedDestination,
    };

    if (validateMove) {
      const result = validateMove(operation);
      setValidation(result);
    } else {
      // Default validation
      setValidation({ isValid: true });
    }
  }, [selectedDestination, currentPath, files, validateMove]);

  // Handle move operation
  const handleMove = useCallback(async () => {
    if (!validation.isValid || !selectedDestination) return;

    const operation: MoveOperation = {
      sourceFiles: files,
      destinationPath: selectedDestination,
    };

    try {
      await onMove(operation);
      onClose();
    } catch (error) {
      console.error('Move operation failed:', error);
    }
  }, [validation.isValid, selectedDestination, files, onMove, onClose]);

  // Generate breadcrumbs for selected destination
  const destinationBreadcrumbs = useMemo(() => {
    return selectedDestination ? generateBreadcrumbs(selectedDestination) : [];
  }, [selectedDestination]);

  // Filter recent destinations to show only valid ones
  const validRecentDestinations = useMemo(() => {
    return recentDestinations
      .filter((dest) => dest.path !== currentPath)
      .slice(0, maxRecentDestinations);
  }, [recentDestinations, currentPath, maxRecentDestinations]);

  // Files preview section
  const filesPreviewSection = (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Moving {files.length} {files.length === 1 ? 'item' : 'items'}
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: 'auto' }}>
        <Stack spacing={1}>
          {files.map((file, index) => (
            <Box
              key={`${file.path}-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: 'grey.50',
              }}
            >
              {getFileIcon(file)}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap>
                  {file.name}
                </Typography>
                {file.size && (
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );

  // Current location section
  const currentLocationSection = (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Current location:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'monospace',
          bgcolor: 'grey.50',
          p: 1,
          borderRadius: 1,
          border: 1,
          borderColor: 'grey.200',
        }}
      >
        {currentPath}
      </Typography>
    </Box>
  );

  // Search section
  const searchSection = enableSearch && (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search for destination folder..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isSearching && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="caption">Searching...</Typography>
        </Box>
      )}
    </Box>
  );

  // Recent destinations section
  const recentDestinationsSection = showRecentDestinations &&
    validRecentDestinations.length > 0 && (
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <HistoryIcon fontSize="small" />
          Recent destinations
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {validRecentDestinations.map((dest) => (
            <Chip
              key={dest.path}
              label={dest.name}
              onClick={() => handleSelectDestination(dest.path)}
              size="small"
              variant={
                selectedDestination === dest.path ? 'filled' : 'outlined'
              }
              color={selectedDestination === dest.path ? 'primary' : 'default'}
            />
          ))}
        </Stack>
      </Box>
    );

  // Folder browser section
  const folderBrowserSection = (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {searchQuery ? 'Search results' : 'Browse folders'}
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          maxHeight: 300,
          overflow: 'auto',
          '& .MuiList-root': {
            py: 0,
          },
        }}
      >
        <List dense>
          {searchQuery && searchResults.length > 0 ? (
            // Show search results
            searchResults.map((folder) => (
              <FolderTreeNode
                key={folder.path}
                node={folder}
                selectedPath={selectedDestination}
                onSelect={handleSelectDestination}
                onToggle={handleToggleFolder}
                onLoadChildren={handleLoadFolderChildren}
                level={0}
                searchQuery={searchQuery}
              />
            ))
          ) : searchQuery && !isSearching ? (
            // No search results
            <ListItem>
              <ListItemText
                primary="No folders found"
                secondary={`No folders match "${searchQuery}"`}
              />
            </ListItem>
          ) : (
            // Show folder tree
            <FolderTreeNode
              node={folderTree}
              selectedPath={selectedDestination}
              onSelect={handleSelectDestination}
              onToggle={handleToggleFolder}
              onLoadChildren={handleLoadFolderChildren}
              level={0}
            />
          )}
        </List>
      </Paper>
    </Box>
  );

  // Destination preview section
  const destinationPreviewSection = showPreview && selectedDestination && (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Destination:
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: validation.isValid ? 'success.50' : 'error.50',
          border: 1,
          borderColor: validation.isValid ? 'success.200' : 'error.200',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {validation.isValid ? (
            <CheckCircleIcon color="success" fontSize="small" />
          ) : (
            <ErrorIcon color="error" fontSize="small" />
          )}
          <Typography variant="body2" fontWeight={600}>
            {validation.isValid ? 'Valid destination' : 'Invalid destination'}
          </Typography>
        </Box>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 1 }}
        >
          {destinationBreadcrumbs.map((crumb, index) => (
            <Link
              key={crumb.path}
              component="button"
              variant="caption"
              onClick={() => handleSelectDestination(crumb.path)}
              sx={{
                textDecoration: 'none',
                color: crumb.isActive ? 'primary.main' : 'text.secondary',
                fontWeight: crumb.isActive ? 600 : 400,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {index === 0 ? <HomeIcon fontSize="small" /> : crumb.name}
            </Link>
          ))}
        </Breadcrumbs>

        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            display: 'block',
            color: 'text.secondary',
          }}
        >
          {selectedDestination}
        </Typography>
      </Paper>
    </Box>
  );

  // Validation messages
  const validationSection = (validation.errorMessage ||
    validation.warningMessage) && (
    <Box sx={{ mb: 2 }}>
      {validation.errorMessage && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {validation.errorMessage}
        </Alert>
      )}
      {validation.warningMessage && (
        <Alert severity="warning">{validation.warningMessage}</Alert>
      )}
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="move-files-dialog-title"
      PaperProps={{
        sx: {
          transition: theme.transitions.create(['transform', 'opacity'], {
            duration: 300,
          }),
        },
      }}
    >
      <DialogTitle id="move-files-dialog-title">Move Files</DialogTitle>

      <DialogContent>
        {filesPreviewSection}
        <Divider sx={{ my: 2 }} />
        {currentLocationSection}
        {searchSection}
        {recentDestinationsSection}
        {folderBrowserSection}
        {destinationPreviewSection}
        {validationSection}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isMoving}>
          Cancel
        </Button>
        <Button
          onClick={handleMove}
          variant="contained"
          disabled={!validation.isValid || isMoving}
          startIcon={isMoving ? <CircularProgress size={16} /> : undefined}
        >
          {isMoving ? 'Moving...' : 'Move'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
