// Type definitions for AI API responses
// These types can be imported and used by frontend components

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  enabled: boolean;
  maxTokens: number;
  costPer1kTokens?: {
    input: number;
    output: number;
  };
}

export interface ModelsResponse {
  models: AIModel[];
  enabledModels: AIModel[];
  totalCount: number;
  enabledCount: number;
}

export interface ChatUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost?: number;
}

export interface ChatResponse {
  response: string;
  model: string;
  usage: ChatUsage;
  finishReason: string;
  timestamp: string;
}

export interface ChatRequestOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stream?: boolean;
}

export interface ChatRequest {
  model: string;
  prompt: string;
  apiKey: string;
  options?: ChatRequestOptions;
}

// Standard API response types (from errorHandler.ts)
export interface ApiError {
  success: false;
  error: string;
  message?: string;
  details?: unknown;
  statusCode: number;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

// Typed API responses
export type ModelsApiResponse = ApiResponse<ModelsResponse>;
export type ChatApiResponse = ApiResponse<ChatResponse>;

// Error types for better error handling
export type AIApiErrorType =
  | 'INVALID_API_KEY'
  | 'RATE_LIMIT_EXCEEDED'
  | 'MODEL_NOT_SUPPORTED'
  | 'VALIDATION_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'UNKNOWN_ERROR';

export interface AIApiError extends ApiError {
  error: AIApiErrorType;
}
