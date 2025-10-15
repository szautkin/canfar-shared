export interface ResourceRange {
  min: number;
  max: number;
}

export interface ResourceRangeSliderProps {
  label: string;
  value: ResourceRange;
  onChange: (value: ResourceRange) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  showMarks?: boolean;
  showInputs?: boolean;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}
