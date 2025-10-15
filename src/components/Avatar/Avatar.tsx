// src/components/Avatar/Avatar.tsx
import { AvatarProps } from '@/types/AvatarProps';
import { AvatarImpl, AvatarGroupImpl } from '@/implementation/avatar';
import React from 'react';

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    return <AvatarImpl ref={ref} {...props} />;
  }
);

Avatar.displayName = 'Avatar';

// Export AvatarGroup as well
export const AvatarGroup = AvatarGroupImpl;
