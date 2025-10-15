import { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import { FormControlLabelProps } from '@mui/material/FormControlLabel';

export interface SwitchProps extends Omit<MuiSwitchProps, 'size'> {
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
}
