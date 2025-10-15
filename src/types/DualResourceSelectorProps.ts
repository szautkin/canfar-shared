export interface ResourceValue {
  cores: number;
  memory: number;
}

export interface DualResourceSelectorProps {
  value: ResourceValue;
  onChange: (value: ResourceValue) => void;
  coresMin?: number;
  coresMax?: number;
  coresStep?: number;
  memoryMin?: number;
  memoryMax?: number;
  memoryStep?: number;
  disabled?: boolean;
  variant?: 'slider' | 'stepper';
  size?: 'sm' | 'md' | 'lg';
  showRecommendations?: boolean;
}
