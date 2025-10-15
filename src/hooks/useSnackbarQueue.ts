'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SnackbarQueueItem } from '@/types/SnackbarProps';

export const useSnackbarQueue = () => {
  const [snackbarQueue, setSnackbarQueue] = useState<SnackbarQueueItem[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarQueueItem | undefined>(
    undefined
  );

  // Use ref to track if we're processing to avoid race conditions
  const processingRef = useRef(false);

  useEffect(() => {
    if (snackbarQueue.length && !messageInfo && !processingRef.current) {
      // Set processing flag to avoid race conditions
      processingRef.current = true;

      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackbarQueue[0] });
      setSnackbarQueue((prev) => prev.slice(1));
      setOpen(true);

      // Reset processing flag
      processingRef.current = false;
    } else if (snackbarQueue.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackbarQueue, messageInfo, open]);

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    },
    []
  );

  const handleExited = useCallback(() => {
    setMessageInfo(undefined);
  }, []);

  const addSnackbar = useCallback((item: Omit<SnackbarQueueItem, 'key'>) => {
    setSnackbarQueue((prev) => [
      ...prev,
      { ...item, key: new Date().getTime() },
    ]);
  }, []);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      setSnackbarQueue([]);
      setMessageInfo(undefined);
      setOpen(false);
    };
  }, []);

  return {
    open,
    messageInfo,
    handleClose,
    handleExited,
    addSnackbar,
  };
};
