'use client';

import { useState, useEffect } from 'react';
import { PROMPT_CATEGORIES, getCategoryById } from '@/lib/promptCategories';
import { buildPrompt } from '@/lib/promptBuilder';
import { getSavedPrompts, savePrompt, deletePrompt, getEnabledLLMConfigs } from '@/lib/storage';
import { PromptCategory, SavedPrompt, LLMConfig } from '@/lib/types';
import {
  Code2,
  GraduationCap,
  BookOpen,
  FileText,
  BarChart3,
  Sparkles,
  Briefcase,
  FileCode,
  Lightbulb,
  Brain,
  Save,
  Trash2,
  Copy,
  Settings,
  Loader2,
  ChevronDown,
  History,
  Download,
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  Code2,
  GraduationCap,
  BookOpen,
  FileText,
  BarChart3,
  Sparkles,
  Briefcase,
  FileCode,
  Lightbulb,
  Brain,
};

export default function PromptGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>('coding');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLLM, setSelectedLLM] = useState<LLMConfig | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [promptTitle, setPromptTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load saved prompts
    setSavedPrompts(getSavedPrompts());

    // Load enabled LLMs and select first one
    const enabledLLMs = getEnabledLLMConfigs();
    if (enabledLLMs.length > 0) {
      setSelectedLLM(enabledLLMs[0]);
    }
  }, []);

  const categoryConfig = getCategoryById(selectedCategory);

  const handleCategoryChange = (category: PromptCategory) => {
    setSelectedCategory(category);
    setFormData({});
    setGeneratedPrompt('');
    setOutput('');
    setError('');
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleGeneratePrompt = () => {
    try {
      setError('');
      const prompt = buildPrompt(selectedCategory, formData);
      setGeneratedPrompt(prompt);
    } catch (err: any) {
      setError(err.message || 'Failed to generate prompt');
    }
  };

  const handleRunPrompt = async () => {
    if (!generatedPrompt) {
      setError('Please generate a prompt first');
      return;
    }

    if (!selectedLLM) {
      setError('Please configure an LLM in Settings');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('/api/prompt-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: generatedPrompt,
          systemPrompt: categoryConfig?.systemPrompt || '',
          llmProvider: selectedLLM.provider,
          llmModel: selectedLLM.model,
          apiKey: selectedLLM.apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (err: any) {
      setError(err.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrompt = () => {
    if (!promptTitle.trim()) {
      setError('Please enter a title for this prompt');
      return;
    }

    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      title: promptTitle,
      category: selectedCategory,
      formData,
      generatedPrompt,
      llmProvider: selectedLLM?.provider || 'anthropic',
      llmModel: selectedLLM?.model || '',
      output,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    savePrompt(newPrompt);
    setSavedPrompts(getSavedPrompts());
    setShowSaveDialog(false);
    setPromptTitle('');
  };

  const handleLoadPrompt = (prompt: SavedPrompt) => {
    setSelectedCategory(prompt.category);
    setFormData(prompt.formData);
    setGeneratedPrompt(prompt.generatedPrompt);
    setOutput(prompt.output || '');
    setShowHistory(false);
  };

  const handleDeletePrompt = (id: string) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      deletePrompt(id);
      setSavedPrompts(getSavedPrompts());
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportPrompt = () => {
    const dataStr = JSON.stringify({
      category: selectedCategory,
      formData,
      generatedPrompt,
      output,
      exportedAt: new Date().toISOString(),
    }, null, 2);

    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${Date.now()}.json`;
    a.click();
  };

  const enabledLLMs = getEnabledLLMConfigs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Smart Prompt Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Generate optimized prompts for any LLM using best practices
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              <Settings className="w-4 h-4" />
              LLM Settings
            </Link>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              <History className="w-4 h-4" />
              History ({savedPrompts.length})
            </button>
          </div>
        </div>

        {enabledLLMs.length === 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-200">
              No LLM configured. Please go to{' '}
              <Link href="/settings" className="underline font-semibold">
                Settings
              </Link>{' '}
              to add your API keys.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Category Selection */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Select Category</h2>
              <div className="space-y-2">
                {PROMPT_CATEGORIES.map((category) => {
                  const Icon = iconMap[category.icon];
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition flex items-start gap-3 ${
                        selectedCategory === category.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">{category.name}</div>
                        <div className="text-xs opacity-80 mt-1">{category.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dynamic Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                {categoryConfig?.name} Details
              </h2>
              <div className="space-y-4">
                {categoryConfig?.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    {field.description && (
                      <p className="text-xs text-gray-400 mb-2">{field.description}</p>
                    )}

                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select...</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === 'number' && (
                      <input
                        type="number"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, parseInt(e.target.value))}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}

                    {field.type === 'checkbox' && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData[field.name] || false}
                          onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                          className="w-4 h-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-300">{field.label}</span>
                      </label>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleGeneratePrompt}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Generate Prompt
                </button>
              </div>
            </div>

            {/* Generated Prompt */}
            {generatedPrompt && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Generated Prompt</h3>
                  <button
                    onClick={() => copyToClipboard(generatedPrompt)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {generatedPrompt}
                </div>

                <div className="mt-4 flex gap-3">
                  {enabledLLMs.length > 0 && (
                    <>
                      <select
                        value={selectedLLM?.id || ''}
                        onChange={(e) => {
                          const llm = enabledLLMs.find(l => l.id === e.target.value);
                          setSelectedLLM(llm || null);
                        }}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {enabledLLMs.map((llm) => (
                          <option key={llm.id} value={llm.id}>
                            {llm.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleRunPrompt}
                        disabled={loading}
                        className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          'Run with LLM'
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Output */}
            {output && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Output</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(output)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowSaveDialog(true)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={exportPrompt}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {output}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-200">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Save Prompt</h3>
              <input
                type="text"
                value={promptTitle}
                onChange={(e) => setPromptTitle(e.target.value)}
                placeholder="Enter a title for this prompt..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePrompt}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Sidebar */}
        {showHistory && (
          <div className="fixed inset-y-0 right-0 w-96 bg-gray-800 border-l border-gray-700 shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Saved Prompts</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                {savedPrompts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No saved prompts yet</p>
                ) : (
                  savedPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-purple-500 transition cursor-pointer"
                      onClick={() => handleLoadPrompt(prompt)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white">{prompt.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePrompt(prompt.id);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{prompt.category}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(prompt.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
