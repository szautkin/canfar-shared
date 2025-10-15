import { LinkProps } from '@/types/LinkProps';
import { LinkImpl } from '@/implementation/link';
import React from 'react';

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    return <LinkImpl ref={ref} {...props} />;
  }
);

Link.displayName = 'Link';
