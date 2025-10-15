import { TypographyProps } from '@/types/TypographyProps';
import { TypographyImpl } from '@/implementation/typography';
import React from 'react';

export const Typography: React.FC<TypographyProps> = (props) => {
  return <TypographyImpl {...props} />;
};
