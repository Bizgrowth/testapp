import { Facebook, Instagram, Linkedin, Twitter, Copy, CheckCircle2, ImageIcon } from 'lucide-react';
import { useState } from 'react';

type Platform = 'facebook' | 'instagram' | 'linkedin' | 'twitter';

interface PlatformPreviewProps {
  platform: Platform;
  content: string;
  hashtags: string[];
  imagePrompt: string;
}

const platformConfig = {
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-200',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-sky-500',
    textColor: 'text-sky-500',
    borderColor: 'border-sky-200',
  },
};

export default function PlatformPreview({ platform, content, hashtags, imagePrompt }: PlatformPreviewProps) {
  const [copied, setCopied] = useState(false);
  const config = platformConfig[platform];
  const Icon = config.icon;

  const copyToClipboard = () => {
    const fullContent = `${content}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${config.borderColor}`}>
      {/* Header */}
      <div className={`${config.color} text-white px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <h3 className="font-bold text-lg">{config.name}</h3>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm font-medium">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Image Placeholder */}
        {imagePrompt && (
          <div className="mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-sm font-semibold text-gray-600 mb-2">Suggested Image</p>
            <p className="text-xs text-gray-500 italic">{imagePrompt}</p>
            <p className="text-xs text-gray-400 mt-2">
              Use this prompt with DALL-E, Midjourney, or Stable Diffusion
            </p>
          </div>
        )}

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className={`${config.textColor} text-sm font-medium`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Platform-specific metrics simulation */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex gap-4 text-sm text-gray-500">
            <span>📊 Optimized for {config.name}</span>
            {platform === 'twitter' && <span>• Max 280 characters</span>}
            {platform === 'instagram' && <span>• Image-first format</span>}
            {platform === 'linkedin' && <span>• Professional tone</span>}
            {platform === 'facebook' && <span>• Engagement-focused</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
