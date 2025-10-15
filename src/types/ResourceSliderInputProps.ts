export interface ResourceSliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  showMarks?: boolean;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}
