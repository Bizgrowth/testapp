// Local storage utilities for Smart Prompt Generator

import { SavedPrompt, LLMConfig } from './types';

const STORAGE_KEYS = {
  PROMPTS: 'smart-prompt-generator-prompts',
  LLM_CONFIGS: 'smart-prompt-generator-llm-configs',
};

// Saved Prompts Management
export function getSavedPrompts(): SavedPrompt[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROMPTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading saved prompts:', error);
    return [];
  }
}

export function savePrompt(prompt: SavedPrompt): void {
  try {
    const prompts = getSavedPrompts();
    const existingIndex = prompts.findIndex(p => p.id === prompt.id);

    if (existingIndex >= 0) {
      prompts[existingIndex] = { ...prompt, updatedAt: new Date().toISOString() };
    } else {
      prompts.unshift(prompt);
    }

    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
  } catch (error) {
    console.error('Error saving prompt:', error);
    throw new Error('Failed to save prompt');
  }
}

export function deletePrompt(id: string): void {
  try {
    const prompts = getSavedPrompts();
    const filtered = prompts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting prompt:', error);
    throw new Error('Failed to delete prompt');
  }
}

export function getPromptById(id: string): SavedPrompt | undefined {
  const prompts = getSavedPrompts();
  return prompts.find(p => p.id === id);
}

export function searchPrompts(query: string): SavedPrompt[] {
  const prompts = getSavedPrompts();
  const lowerQuery = query.toLowerCase();

  return prompts.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    p.output?.toLowerCase().includes(lowerQuery)
  );
}

// LLM Configuration Management
export function getLLMConfigs(): LLMConfig[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LLM_CONFIGS);
    return data ? JSON.parse(data) : getDefaultLLMConfigs();
  } catch (error) {
    console.error('Error loading LLM configs:', error);
    return getDefaultLLMConfigs();
  }
}

function getDefaultLLMConfigs(): LLMConfig[] {
  return [
    {
      id: 'anthropic-1',
      provider: 'anthropic',
      apiKey: '',
      model: 'claude-3-5-sonnet-20241022',
      name: 'Claude 3.5 Sonnet',
      enabled: false,
    },
    {
      id: 'anthropic-2',
      provider: 'anthropic',
      apiKey: '',
      model: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      enabled: false,
    },
    {
      id: 'openai-1',
      provider: 'openai',
      apiKey: '',
      model: 'gpt-4-turbo-preview',
      name: 'GPT-4 Turbo',
      enabled: false,
    },
    {
      id: 'openai-2',
      provider: 'openai',
      apiKey: '',
      model: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      enabled: false,
    },
    {
      id: 'google-1',
      provider: 'google',
      apiKey: '',
      model: 'gemini-pro',
      name: 'Gemini Pro',
      enabled: false,
    },
  ];
}

export function saveLLMConfig(config: LLMConfig): void {
  try {
    const configs = getLLMConfigs();
    const existingIndex = configs.findIndex(c => c.id === config.id);

    if (existingIndex >= 0) {
      configs[existingIndex] = config;
    } else {
      configs.push(config);
    }

    localStorage.setItem(STORAGE_KEYS.LLM_CONFIGS, JSON.stringify(configs));
  } catch (error) {
    console.error('Error saving LLM config:', error);
    throw new Error('Failed to save LLM configuration');
  }
}

export function deleteLLMConfig(id: string): void {
  try {
    const configs = getLLMConfigs();
    const filtered = configs.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.LLM_CONFIGS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting LLM config:', error);
    throw new Error('Failed to delete LLM configuration');
  }
}

export function getEnabledLLMConfigs(): LLMConfig[] {
  return getLLMConfigs().filter(c => c.enabled && c.apiKey);
}

export function exportData(): string {
  const prompts = getSavedPrompts();
  const configs = getLLMConfigs().map(c => ({ ...c, apiKey: '' })); // Don't export API keys

  return JSON.stringify({
    prompts,
    configs,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  }, null, 2);
}

export function importData(jsonData: string): void {
  try {
    const data = JSON.parse(jsonData);

    if (data.prompts && Array.isArray(data.prompts)) {
      localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(data.prompts));
    }

    if (data.configs && Array.isArray(data.configs)) {
      // Merge with existing configs, keeping API keys
      const existingConfigs = getLLMConfigs();
      const merged = data.configs.map((imported: LLMConfig) => {
        const existing = existingConfigs.find(c => c.id === imported.id);
        return existing ? { ...imported, apiKey: existing.apiKey } : imported;
      });
      localStorage.setItem(STORAGE_KEYS.LLM_CONFIGS, JSON.stringify(merged));
    }
  } catch (error) {
    console.error('Error importing data:', error);
    throw new Error('Failed to import data. Please check the file format.');
  }
}
