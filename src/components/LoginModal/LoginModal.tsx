import { LoginModalProps } from '@/types/LoginModalProps';
import { LoginModalImpl } from '@/implementation/loginModal';
import React from 'react';

export const LoginModal = React.forwardRef<HTMLDivElement, LoginModalProps>(
  (props, ref) => {
    return <LoginModalImpl ref={ref} {...props} />;
  }
);

LoginModal.displayName = 'LoginModal';
