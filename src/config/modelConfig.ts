// Stub file for model configuration
// This should be implemented by the consuming application

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;
}

export const models: ModelConfig[] = [];
