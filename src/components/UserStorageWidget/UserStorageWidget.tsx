import { UserStorageWidgetProps } from '@/types/UserStorageWidgetProps';
import { UserStorageWidgetImpl } from '@/implementation/userStorageWidget';
import React from 'react';

export const UserStorageWidget = React.forwardRef<
  HTMLDivElement,
  UserStorageWidgetProps
>((props, ref) => {
  return <UserStorageWidgetImpl ref={ref} {...props} />;
});

UserStorageWidget.displayName = 'UserStorageWidget';
