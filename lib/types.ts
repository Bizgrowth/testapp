// Types for Smart Prompt Generator

export type PromptCategory =
  | 'coding'
  | 'learning'
  | 'studying'
  | 'content-writing'
  | 'data-analysis'
  | 'creative-writing'
  | 'business'
  | 'technical-docs'
  | 'problem-solving'
  | 'brainstorming';

export type LLMProvider = 'anthropic' | 'openai' | 'google' | 'cohere' | 'custom';

export interface LLMConfig {
  id: string;
  provider: LLMProvider;
  apiKey: string;
  model: string;
  name: string;
  enabled: boolean;
}

export interface PromptField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'checkbox';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  description?: string;
}

export interface CategoryConfig {
  id: PromptCategory;
  name: string;
  description: string;
  icon: string;
  fields: PromptField[];
  systemPrompt: string;
}

export interface PromptFormData {
  category: PromptCategory;
  fields: Record<string, any>;
}

export interface SavedPrompt {
  id: string;
  title: string;
  category: PromptCategory;
  formData: Record<string, any>;
  generatedPrompt: string;
  llmProvider: LLMProvider;
  llmModel: string;
  output?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface GenerateRequest {
  category: PromptCategory;
  formData: Record<string, any>;
  llmProvider: LLMProvider;
  llmModel: string;
}

export interface GenerateResponse {
  generatedPrompt: string;
  output: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}
