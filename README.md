# AI Social Content Generator + Smart Prompt Generator

A powerful AI-powered application featuring:
1. **Social Media Content Generator** - Creates platform-optimized content for Facebook, Instagram, LinkedIn, and Twitter
2. **Smart Prompt Generator** - Advanced prompt engineering tool for any LLM with 10 specialized categories

![AI Social Content Generator](https://img.shields.io/badge/AI-Powered-purple) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)

## Features

### Social Media Content Generator

- **Multi-Platform Support**: Generate content for Facebook, Instagram, LinkedIn, and Twitter simultaneously
- **AI-Powered**: Uses Claude AI (Anthropic) to create engaging, platform-specific content
- **Smart Prompting**: Guided form fields help users provide all necessary information
- **Platform Optimization**: Content is automatically optimized for each platform's:
  - Character limits
  - Best practices
  - Algorithm preferences
  - Audience expectations
- **Hashtag Generation**: Automatically generates relevant hashtags based on content
- **Image Prompts**: Provides AI image generation prompts for visual content
- **Copy to Clipboard**: One-click copying of generated content
- **Responsive Design**: Works perfectly on desktop and mobile devices

### Smart Prompt Generator ✨ NEW!

- **10 Specialized Categories**: Coding, Learning, Studying, Content Writing, Data Analysis, Creative Writing, Business, Technical Docs, Problem Solving, Brainstorming
- **Multi-LLM Support**: Works with Anthropic Claude, OpenAI GPT, Google Gemini, Cohere, and custom LLMs
- **Dynamic Forms**: Category-specific fields optimized for best results
- **Save & Organize**: Save prompts with outputs, search, and organize by category
- **Export/Import**: Backup and restore your prompt library
- **Best Practices Built-in**: Each category follows prompt engineering best practices
- **Token Tracking**: Monitor API usage across different LLMs

[**📖 View Smart Prompt Generator Documentation**](./SMART_PROMPT_GENERATOR.md)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd testapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

   Get your API key from: [https://console.anthropic.com/](https://console.anthropic.com/)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Social Media Content Generator

Navigate to the home page (`/`):

1. **Select Platforms**: Choose one or more social media platforms (Facebook, Instagram, LinkedIn, Twitter)

2. **Fill in the Smart Form**:
   - **Topic/Message**: Describe what you want to communicate
   - **Tone & Style**: Choose from professional, casual, enthusiastic, inspirational, humorous, or educational
   - **Target Audience**: Specify who you're targeting
   - **Content Type**: Select promotional, announcement, educational, engagement, testimonial, or behind-the-scenes
   - **Call to Action**: Add what you want users to do
   - **Keywords**: Include relevant keywords (comma-separated)
   - **Options**: Toggle hashtags and emojis on/off

3. **Generate Content**: Click the "Generate Content" button

4. **Review & Copy**: Review the generated content for each platform and copy it to your clipboard

### Smart Prompt Generator

Navigate to `/prompt-generator`:

1. **Configure LLMs** (first time only):
   - Go to Settings
   - Add API keys for your preferred LLMs (Anthropic, OpenAI, Google, etc.)
   - Enable the configurations

2. **Generate Prompts**:
   - Select a category from the sidebar
   - Fill in category-specific fields
   - Click "Generate Prompt"
   - Select your LLM and click "Run with LLM"

3. **Save & Organize**:
   - Click Save to store prompts with outputs
   - Access saved prompts from History
   - Export/import your prompt library

See the [Smart Prompt Generator Documentation](./SMART_PROMPT_GENERATOR.md) for detailed usage.

## Platform-Specific Features

### Twitter
- Maximum 280 characters
- Concise and punchy content
- 2-3 hashtags maximum
- Clear call-to-action

### Instagram
- Up to 2,200 characters
- Visual storytelling focus
- 5-10 relevant hashtags
- Engaging first sentence
- Image prompt included

### Facebook
- Up to 63,206 characters (practical limit: 500-1000)
- First 2-3 sentences visible before "See More"
- Engagement-focused content
- 2-5 hashtags
- Questions to boost interaction

### LinkedIn
- Up to 3,000 characters
- Professional yet personable
- Insights and value-driven
- 3-5 hashtags
- Minimal emoji use

## Project Structure

```
testapp/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts          # Social media content API
│   │   └── prompt-generate/
│   │       └── route.ts          # Smart prompt generator API
│   ├── prompt-generator/
│   │   └── page.tsx              # Smart prompt generator page
│   ├── settings/
│   │   └── page.tsx              # LLM configuration page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Social media generator (home)
├── components/
│   └── PlatformPreview.tsx       # Platform-specific preview component
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   ├── promptCategories.ts       # Prompt category configurations
│   ├── promptBuilder.ts          # Prompt building logic
│   └── storage.ts                # localStorage utilities
├── public/                       # Static assets
├── .env.local.example            # Environment variables template
├── SMART_PROMPT_GENERATOR.md     # Smart Prompt Generator docs
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## API Endpoint

### POST `/api/generate`

Generates platform-specific content using Claude AI.

**Request Body**:
```json
{
  "platforms": ["facebook", "instagram", "linkedin", "twitter"],
  "topic": "Launching our new product",
  "tone": "enthusiastic",
  "targetAudience": "Young professionals",
  "callToAction": "Visit our website",
  "keywords": "innovation, technology",
  "contentType": "promotional",
  "includeHashtags": true,
  "includeEmojis": true
}
```

**Response**:
```json
{
  "content": [
    {
      "platform": "facebook",
      "content": "The main post content...",
      "hashtags": ["#Innovation", "#Technology"],
      "imagePrompt": "A modern tech product on a clean white background..."
    }
  ]
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude AI (Social Media Generator) | Yes |

**Note**: For the Smart Prompt Generator, API keys are configured in the Settings page and stored in browser localStorage (not environment variables).

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `ANTHROPIC_API_KEY` environment variable
4. Deploy!

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean
- AWS
- Google Cloud

## Best Practices

1. **API Key Security**: Never commit your `.env.local` file. Always use environment variables for sensitive data.

2. **Content Review**: Always review generated content before posting to ensure it aligns with your brand voice.

3. **Image Selection**: Use the generated image prompts with tools like:
   - DALL-E
   - Midjourney
   - Stable Diffusion
   - Canva AI

4. **Rate Limiting**: The Anthropic API has rate limits. Consider implementing caching or rate limiting for production use.

5. **Cost Management**: Monitor your Anthropic API usage to manage costs effectively.

## Customization

### Adding New Platforms

1. Add the platform type to `app/page.tsx`:
   ```typescript
   type Platform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'newplatform';
   ```

2. Add platform specifications in `app/api/generate/route.ts`:
   ```typescript
   const platformSpecs: Record<Platform, PlatformSpecs> = {
     // ... existing platforms
     newplatform: {
       maxLength: 1000,
       bestPractices: ['...'],
       imageRequired: false,
     },
   };
   ```

3. Add platform configuration in `components/PlatformPreview.tsx`

### Customizing Tone Options

Edit the tone select options in `app/page.tsx` to add or modify tone styles.

### Styling

The application uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Global theme configuration
- Component files - Individual component styles

## Troubleshooting

### API Key Error

If you see "ANTHROPIC_API_KEY is not configured":
1. Ensure `.env.local` file exists in the root directory
2. Verify the API key is correct
3. Restart the development server after adding the key

### Content Generation Fails

1. Check your Anthropic API key is valid
2. Verify you have API credits remaining
3. Check the browser console and server logs for detailed errors

### Build Errors

1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
3. Check TypeScript errors: `npm run lint`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
- Check the Anthropic API documentation: [https://docs.anthropic.com](https://docs.anthropic.com)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Anthropic Claude](https://www.anthropic.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with AI** - This project demonstrates the power of AI-assisted development and AI-powered content generation.
