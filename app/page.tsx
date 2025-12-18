'use client';

import { useState } from 'react';
import { Sparkles, Facebook, Instagram, Linkedin, Twitter, Image as ImageIcon, Loader2 } from 'lucide-react';
import PlatformPreview from '@/components/PlatformPreview';

type Platform = 'facebook' | 'instagram' | 'linkedin' | 'twitter';

interface FormData {
  platforms: Platform[];
  topic: string;
  tone: string;
  targetAudience: string;
  callToAction: string;
  keywords: string;
  contentType: string;
  includeHashtags: boolean;
  includeEmojis: boolean;
}

interface GeneratedContent {
  platform: Platform;
  content: string;
  hashtags: string[];
  imagePrompt: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    platforms: [],
    topic: '',
    tone: 'professional',
    targetAudience: '',
    callToAction: '',
    keywords: '',
    contentType: 'promotional',
    includeHashtags: true,
    includeEmojis: false,
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const platformIcons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  const togglePlatform = (platform: Platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const generateContent = async () => {
    if (formData.platforms.length === 0) {
      setError('Please select at least one platform');
      return;
    }
    if (!formData.topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Social Content Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Create viral, platform-optimized social media content powered by AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Smart Content Builder</h2>

            {/* Platform Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Platforms *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(platformIcons) as Platform[]).map(platform => {
                  const Icon = platformIcons[platform];
                  const isSelected = formData.platforms.includes(platform);
                  return (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium capitalize">{platform}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic / Message *
              </label>
              <textarea
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="E.g., Launching our new eco-friendly product line"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe what you want to communicate
              </p>
            </div>

            {/* Tone */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tone & Style
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual & Friendly</option>
                <option value="enthusiastic">Enthusiastic & Energetic</option>
                <option value="inspirational">Inspirational</option>
                <option value="humorous">Humorous</option>
                <option value="educational">Educational</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="E.g., Young professionals, Small business owners"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Content Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={formData.contentType}
                onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="promotional">Promotional</option>
                <option value="announcement">Announcement</option>
                <option value="educational">Educational</option>
                <option value="engagement">Engagement / Question</option>
                <option value="testimonial">Testimonial / Review</option>
                <option value="behind-the-scenes">Behind the Scenes</option>
              </select>
            </div>

            {/* Call to Action */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Call to Action
              </label>
              <input
                type="text"
                value={formData.callToAction}
                onChange={(e) => setFormData({ ...formData, callToAction: e.target.value })}
                placeholder="E.g., Visit our website, Sign up now, Learn more"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Keywords */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="E.g., sustainability, innovation, quality"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Options */}
            <div className="mb-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeHashtags}
                  onChange={(e) => setFormData({ ...formData, includeHashtags: e.target.checked })}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Include Hashtags</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeEmojis}
                  onChange={(e) => setFormData({ ...formData, includeEmojis: e.target.checked })}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Include Emojis</span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateContent}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Content
                </>
              )}
            </button>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {generatedContent.length === 0 && !loading && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No Content Yet
                </h3>
                <p className="text-gray-500">
                  Fill out the form and generate AI-powered content for your selected platforms
                </p>
              </div>
            )}

            {generatedContent.map((content, index) => (
              <PlatformPreview
                key={`${content.platform}-${index}`}
                platform={content.platform}
                content={content.content}
                hashtags={content.hashtags}
                imagePrompt={content.imagePrompt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
