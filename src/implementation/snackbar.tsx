'use client';

import React, { useEffect } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import {
  SnackbarProps,
  SnackbarPosition,
  SnackbarQueueItem,
} from '@/types/SnackbarProps';
import { Alert } from '@/components/Alert/Alert';
import { useSnackbarQueue } from '@/hooks/useSnackbarQueue';

// Transition component for smooth animations
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

// Convert position to Material UI anchorOrigin
const getAnchorOrigin = (position: SnackbarPosition = 'bottom-left') => {
  const [vertical, horizontal] = position.split('-') as [
    'top' | 'bottom',
    'left' | 'center' | 'right',
  ];
  return { vertical, horizontal };
};

export const SnackbarImplementation: React.FC<SnackbarProps> = ({
  open,
  onClose,
  position = 'bottom-left',
  autoHideDuration = 6000,
  message,
  severity,
  action,
  children,
  TransitionComponent = SlideTransition,
  disableWindowBlurListener = false,
  resumeHideDuration,
  ...props
}) => {
  const anchorOrigin = getAnchorOrigin(position);

  // Determine the transition direction based on position
  const getTransitionProps = (): SlideProps | undefined => {
    if (
      TransitionComponent === Slide ||
      TransitionComponent === SlideTransition
    ) {
      const direction = position.startsWith('top') ? 'down' : 'up';
      return { direction } as SlideProps;
    }
    return undefined;
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={TransitionComponent}
      TransitionProps={getTransitionProps()}
      disableWindowBlurListener={disableWindowBlurListener}
      resumeHideDuration={resumeHideDuration}
      {...props}
    >
      {children || severity || message ? (
        <Alert
          severity={severity || 'info'}
          onClose={onClose}
          action={action}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      ) : undefined}
    </MuiSnackbar>
  );
};

// Convenience component for managing multiple snackbars
export const SnackbarQueue: React.FC<{
  queue: SnackbarQueueItem[];
  onProcessed: () => void;
}> = ({ queue, onProcessed }) => {
  const { open, messageInfo, handleClose } = useSnackbarQueue();

  useEffect(() => {
    if (queue.length > 0) {
      // Process queue items
      queue.forEach(() => onProcessed());
    }
  }, [queue, onProcessed]);

  if (!messageInfo) return null;

  return (
    <SnackbarImplementation
      key={messageInfo.key}
      open={open}
      onClose={handleClose}
      message={messageInfo.message}
      severity={messageInfo.severity}
      action={messageInfo.action}
      autoHideDuration={messageInfo.autoHideDuration}
      position={messageInfo.position}
    />
  );
};
