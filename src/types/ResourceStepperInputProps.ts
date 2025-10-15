export interface ResourceStepperInputProps {
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
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}
