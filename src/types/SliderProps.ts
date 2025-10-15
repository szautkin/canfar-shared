import { SliderProps as MuiSliderProps } from '@mui/material/Slider';

export interface SliderProps extends Omit<MuiSliderProps, 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  showValueLabel?: boolean;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
}
