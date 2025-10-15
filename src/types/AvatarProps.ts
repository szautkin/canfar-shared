import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { SxProps } from '@mui/material/styles';

export interface AvatarProps extends Omit<MuiAvatarProps, 'variant'> {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'rounded' | 'square';
  sx?: SxProps;
}
