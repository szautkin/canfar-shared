'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Alert,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  AttachFile as FileIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import type {
  UploadDialogProps,
  UploadFile,
  FileValidationResult,
} from '@/types/UploadDialogProps';

export function UploadDialogImplementation({
  open,
  onClose,
  onUpload,
  title = 'Upload Files',
  maxFileSize = 50 * 1024 * 1024, // 50MB default
  acceptedFileTypes,
  maxFiles,
  multiple = true,
  validateFile,
  uploading = false,
  overallProgress = 0,
  helpText,
  dragZoneContent,
  ...dialogProps
}: UploadDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Reset state when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      setSelectedFiles([]);
      setGlobalError(null);
      setDragActive(false);
    }
  }, [open]);

  // Default file validation
  const defaultValidateFile = useCallback(
    (file: File): FileValidationResult => {
      // Check file size
      if (file.size > maxFileSize) {
        const sizeMB = Math.round(maxFileSize / (1024 * 1024));
        return {
          isValid: false,
          error: `File size exceeds ${sizeMB}MB limit`,
        };
      }

      // Check file type if specified
      if (acceptedFileTypes && acceptedFileTypes.length > 0) {
        const isValidType = acceptedFileTypes.some((type) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type === type;
        });

        if (!isValidType) {
          return {
            isValid: false,
            error: `File type not supported. Accepted types: ${acceptedFileTypes.join(', ')}`,
          };
        }
      }

      return { isValid: true };
    },
    [maxFileSize, acceptedFileTypes]
  );

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const newFiles: UploadFile[] = [];
      let hasError = false;

      // Check max files limit
      if (maxFiles && selectedFiles.length + fileArray.length > maxFiles) {
        setGlobalError(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      fileArray.forEach((file, index) => {
        const validation = validateFile
          ? validateFile(file)
          : defaultValidateFile(file);

        const uploadFile: UploadFile = {
          id: `${Date.now()}-${index}`,
          file,
          progress: 0,
          status: validation.isValid ? 'pending' : 'error',
          error: validation.error,
        };

        if (!validation.isValid) {
          hasError = true;
        }

        newFiles.push(uploadFile);
      });

      setSelectedFiles((prev) => [...prev, ...newFiles]);
      setGlobalError(hasError ? 'Some files have validation errors' : null);
    },
    [selectedFiles.length, maxFiles, validateFile, defaultValidateFile]
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const removeFile = (fileId: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== fileId));
    setGlobalError(null);
  };

  const handleUpload = async () => {
    const validFiles = selectedFiles
      .filter((uploadFile) => uploadFile.status === 'pending')
      .map((uploadFile) => uploadFile.file);

    if (validFiles.length > 0) {
      await onUpload(validFiles);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const validFilesCount = selectedFiles.filter(
    (f) => f.status !== 'error'
  ).length;
  const hasValidFiles = validFilesCount > 0;
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <Dialog
      open={open}
      onClose={uploading ? undefined : onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="upload-dialog-title"
      {...dialogProps}
      PaperProps={{
        sx: {
          ...(isMobile && {
            m: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
          }),
        },
      }}
    >
      <DialogTitle id="upload-dialog-title" sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <UploadIcon />
          {title}
        </Box>
      </DialogTitle>

      <DialogContent>
        {helpText && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {helpText}
          </Alert>
        )}

        {/* File Drop Zone */}
        <Box
          sx={{
            border: 2,
            borderStyle: 'dashed',
            borderColor: dragActive ? 'primary.main' : 'grey.300',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            backgroundColor: dragActive ? 'primary.50' : 'grey.50',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            mb: 2,
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'primary.50',
            },
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
        >
          {dragZoneContent || (
            <>
              <UploadIcon
                sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Drop files here or click to browse
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {multiple ? 'Select multiple files' : 'Select a file'} to upload
                {maxFileSize && ` (max ${formatFileSize(maxFileSize)} each)`}
              </Typography>
              {acceptedFileTypes && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Accepted types: {acceptedFileTypes.join(', ')}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>

        {/* File Input (Hidden) */}
        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple={multiple}
          accept={acceptedFileTypes?.join(',')}
          onChange={handleFileSelect}
        />

        {/* Global Error */}
        {globalError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {globalError}
          </Alert>
        )}

        {/* Upload Progress */}
        {uploading && (
          <Box sx={{ mb: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="body2">
                Uploading {validFilesCount} file
                {validFilesCount !== 1 ? 's' : ''}...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(overallProgress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={overallProgress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}

        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Selected Files ({selectedFiles.length})
              {maxFiles && ` / ${maxFiles} max`}
            </Typography>
            <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
              {selectedFiles.map((uploadFile) => (
                <ListItem key={uploadFile.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {uploadFile.status === 'error' ? (
                      <ErrorIcon color="error" />
                    ) : uploadFile.status === 'completed' ? (
                      <CheckIcon color="success" />
                    ) : (
                      <FileIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                          variant="body2"
                          sx={{ wordBreak: 'break-all' }}
                        >
                          {uploadFile.file.name}
                        </Typography>
                        <Chip
                          label={formatFileSize(uploadFile.file.size)}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        {uploadFile.error && (
                          <Typography
                            variant="caption"
                            color="error"
                            component="div"
                          >
                            {uploadFile.error}
                          </Typography>
                        )}
                        {uploadFile.status === 'uploading' && (
                          <LinearProgress
                            variant="determinate"
                            value={uploadFile.progress}
                            sx={{ mt: 0.5, height: 4 }}
                          />
                        )}
                      </>
                    }
                  />
                  {!uploading && (
                    <IconButton
                      size="small"
                      onClick={() => removeFile(uploadFile.id)}
                      aria-label={`Remove ${uploadFile.file.name}`}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleBrowseClick}
          variant="outlined"
          disabled={uploading}
        >
          Browse Files
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!hasValidFiles || uploading}
          startIcon={uploading ? undefined : <UploadIcon />}
        >
          {uploading
            ? 'Uploading...'
            : `Upload ${validFilesCount} file${validFilesCount !== 1 ? 's' : ''}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
