'use client';

import { useState, useEffect } from 'react';
import { getLLMConfigs, saveLLMConfig, deleteLLMConfig, exportData, importData } from '@/lib/storage';
import { LLMConfig, LLMProvider } from '@/lib/types';
import { Settings, Plus, Trash2, Eye, EyeOff, Save, Upload, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [configs, setConfigs] = useState<LLMConfig[]>([]);
  const [editingConfig, setEditingConfig] = useState<LLMConfig | null>(null);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = () => {
    setConfigs(getLLMConfigs());
  };

  const handleSaveConfig = () => {
    if (!editingConfig) return;

    if (!editingConfig.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!editingConfig.model.trim()) {
      setError('Model is required');
      return;
    }

    try {
      saveLLMConfig(editingConfig);
      loadConfigs();
      setEditingConfig(null);
      setSuccess('Configuration saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save configuration');
    }
  };

  const handleDeleteConfig = (id: string) => {
    if (confirm('Are you sure you want to delete this configuration?')) {
      try {
        deleteLLMConfig(id);
        loadConfigs();
        setSuccess('Configuration deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err: any) {
        setError(err.message || 'Failed to delete configuration');
      }
    }
  };

  const handleAddNew = () => {
    const newConfig: LLMConfig = {
      id: Date.now().toString(),
      provider: 'anthropic',
      apiKey: '',
      model: '',
      name: '',
      enabled: false,
    };
    setEditingConfig(newConfig);
  };

  const toggleApiKeyVisibility = (id: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `smart-prompt-generator-export-${Date.now()}.json`;
      a.click();
      setSuccess('Data exported successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to export data');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        importData(content);
        loadConfigs();
        setSuccess('Data imported successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err: any) {
        setError(err.message || 'Failed to import data');
      }
    };
    reader.readAsText(file);
  };

  const providerModels: Record<LLMProvider, string[]> = {
    anthropic: [
      'claude-3-5-sonnet-20241022',
      'claude-3-haiku-20240307',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
    ],
    openai: [
      'gpt-4-turbo-preview',
      'gpt-4',
      'gpt-3.5-turbo',
    ],
    google: [
      'gemini-pro',
      'gemini-pro-vision',
    ],
    cohere: [
      'command',
      'command-light',
    ],
    custom: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/prompt-generator"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Generator
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Settings className="w-10 h-10" />
            LLM Configuration
          </h1>
          <p className="text-gray-300">
            Manage your API keys and LLM configurations
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4">
            <p className="text-green-200">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add LLM Configuration
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition cursor-pointer">
            <Upload className="w-4 h-4" />
            Import Data
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Configurations List */}
        <div className="space-y-4 mb-6">
          {configs.map((config) => (
            <div
              key={config.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{config.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="capitalize">{config.provider}</span>
                    <span>•</span>
                    <span>{config.model}</span>
                    <span>•</span>
                    <span className={config.enabled ? 'text-green-400' : 'text-gray-500'}>
                      {config.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingConfig(config)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteConfig(config.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type={showApiKey[config.id] ? 'text' : 'password'}
                  value={config.apiKey}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                  placeholder="API Key not set"
                />
                <button
                  onClick={() => toggleApiKeyVisibility(config.id)}
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                >
                  {showApiKey[config.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}

          {configs.length === 0 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700 text-center">
              <p className="text-gray-400">No LLM configurations yet. Add one to get started.</p>
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        {editingConfig && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6">
                {editingConfig.id ? 'Edit Configuration' : 'New Configuration'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Configuration Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingConfig.name}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, name: e.target.value })
                    }
                    placeholder="e.g., Claude 3.5 Sonnet"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Provider <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={editingConfig.provider}
                    onChange={(e) =>
                      setEditingConfig({
                        ...editingConfig,
                        provider: e.target.value as LLMProvider,
                        model: '',
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="anthropic">Anthropic (Claude)</option>
                    <option value="openai">OpenAI (GPT)</option>
                    <option value="google">Google (Gemini)</option>
                    <option value="cohere">Cohere</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Model <span className="text-red-400">*</span>
                  </label>
                  {editingConfig.provider === 'custom' ? (
                    <input
                      type="text"
                      value={editingConfig.model}
                      onChange={(e) =>
                        setEditingConfig({ ...editingConfig, model: e.target.value })
                      }
                      placeholder="Enter custom model name"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <select
                      value={editingConfig.model}
                      onChange={(e) =>
                        setEditingConfig({ ...editingConfig, model: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a model...</option>
                      {providerModels[editingConfig.provider]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    API Key <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={editingConfig.apiKey}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, apiKey: e.target.value })
                    }
                    placeholder="Enter your API key"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Your API key is stored locally in your browser and never sent to our servers
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingConfig.enabled}
                      onChange={(e) =>
                        setEditingConfig({ ...editingConfig, enabled: e.target.checked })
                      }
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-300">Enable this configuration</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditingConfig(null)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documentation */}
        <div className="mt-8 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Getting API Keys</h2>
          <div className="space-y-3 text-gray-300">
            <div>
              <strong className="text-white">Anthropic (Claude):</strong>{' '}
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                console.anthropic.com
              </a>
            </div>
            <div>
              <strong className="text-white">OpenAI (GPT):</strong>{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                platform.openai.com/api-keys
              </a>
            </div>
            <div>
              <strong className="text-white">Google (Gemini):</strong>{' '}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                makersuite.google.com/app/apikey
              </a>
            </div>
            <div>
              <strong className="text-white">Cohere:</strong>{' '}
              <a
                href="https://dashboard.cohere.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                dashboard.cohere.com/api-keys
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
