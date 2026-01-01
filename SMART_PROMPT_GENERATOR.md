# Smart Prompt Generator

An intelligent prompt engineering tool that helps you create optimized prompts for any LLM using best practices and category-specific templates.

## Features

### 🎯 10 Specialized Prompt Categories

1. **Coding/Programming** - Generate code, debug issues, learn programming concepts
2. **Learning/Education** - Personalized explanations and examples for any subject
3. **Studying/Research** - Deep research and comprehensive study materials
4. **Content Writing** - Blog posts, articles, marketing content
5. **Data Analysis** - Analyze data, create visualizations, derive insights
6. **Creative Writing** - Stories, poems, scripts, and creative content
7. **Business/Strategy** - Business plans, strategies, professional documents
8. **Technical Documentation** - API docs, user guides, specifications
9. **Problem Solving** - Systematic problem analysis and solutions
10. **Brainstorming/Ideation** - Generate ideas and explore possibilities

### 🤖 Multi-LLM Support

Connect and use multiple AI providers:
- **Anthropic Claude** (Sonnet, Opus, Haiku)
- **OpenAI GPT** (GPT-4, GPT-3.5)
- **Google Gemini** (Gemini Pro)
- **Cohere** (Command, Command Light)
- **Custom** - Add any other LLM provider

### 💾 Save & Organize

- Save prompts with outputs and titles
- Organize by category and tags
- Search through saved prompts
- Export/import functionality
- Track creation and update dates

### 🎨 Smart Features

- Dynamic form fields based on category
- Built-in best practices for each category
- Copy to clipboard functionality
- Token usage tracking
- Real-time output generation
- Responsive design

## Getting Started

### 1. Configure LLM API Keys

1. Navigate to **Settings** page
2. Click **"Add LLM Configuration"**
3. Choose your provider (Anthropic, OpenAI, Google, etc.)
4. Enter your API key
5. Select the model
6. Enable the configuration

#### Where to Get API Keys

- **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Google**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- **Cohere**: [dashboard.cohere.com/api-keys](https://dashboard.cohere.com/api-keys)

### 2. Generate Your First Prompt

1. Go to the **Prompt Generator** page
2. Select a category from the left sidebar
3. Fill in the dynamic form fields
4. Click **"Generate Prompt"** to see the optimized prompt
5. Select your LLM and click **"Run with LLM"**
6. Review the output

### 3. Save and Organize

1. Click the **Save** icon on generated outputs
2. Enter a descriptive title
3. Access saved prompts from the **History** panel
4. Click any saved prompt to reload it

## Category-Specific Fields

Each category has specialized fields designed to get the best results:

### Coding
- Task description
- Programming language
- Framework/library
- Complexity level
- Include comments/tests options

### Learning
- Topic to learn
- Current knowledge level
- Learning goals
- Preferred learning style
- Time available

### Content Writing
- Content type (blog, email, etc.)
- Target audience
- Tone and style
- SEO keywords
- Call-to-action

### Data Analysis
- Data description
- Analysis goals
- Analysis type
- Metrics to focus on
- Visualization preferences

*And more for each category...*

## Best Practices

### Prompt Engineering Tips

1. **Be Specific**: Include all relevant context and requirements
2. **Set Constraints**: Define scope, length, format, and style
3. **Provide Examples**: When possible, show what you want
4. **Iterate**: Refine based on outputs
5. **Use Templates**: Leverage category-specific templates

### LLM Selection

- **Claude Opus**: Best for complex reasoning and analysis
- **Claude Sonnet**: Balanced performance and cost
- **Claude Haiku**: Fast responses for simpler tasks
- **GPT-4**: Strong general capabilities
- **GPT-3.5**: Cost-effective for simpler tasks
- **Gemini Pro**: Good for multimodal tasks

## Data Management

### Export/Import

Export your prompts and configurations:
1. Go to **Settings**
2. Click **"Export Data"**
3. Save the JSON file

Import previously exported data:
1. Go to **Settings**
2. Click **"Import Data"**
3. Select your JSON file

**Note**: API keys are NOT included in exports for security.

### Storage

- All data is stored locally in your browser's localStorage
- No data is sent to external servers (except LLM API calls)
- Clear browser data will delete all saved prompts
- Export regularly to backup your work

## API Routes

### POST /api/prompt-generate

Generate content using configured LLM.

**Request Body**:
```json
{
  "prompt": "Your generated prompt",
  "systemPrompt": "Category system prompt",
  "llmProvider": "anthropic",
  "llmModel": "claude-3-5-sonnet-20241022",
  "apiKey": "your-api-key"
}
```

**Response**:
```json
{
  "output": "Generated content",
  "usage": {
    "inputTokens": 100,
    "outputTokens": 200
  }
}
```

## Technical Architecture

### Frontend
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Lucide Icons** for UI elements

### Storage
- **localStorage** for client-side persistence
- Structured data format for easy import/export
- No backend database required

### API Integration
- Supports multiple LLM providers
- Secure API key handling (client-side only)
- Extensible for new providers

## File Structure

```
/app
  /prompt-generator
    page.tsx          # Main prompt generator UI
  /settings
    page.tsx          # LLM configuration management
  /api
    /prompt-generate
      route.ts        # API route for LLM calls

/lib
  types.ts            # TypeScript interfaces
  promptCategories.ts # Category configurations
  promptBuilder.ts    # Prompt building logic
  storage.ts          # localStorage utilities
```

## Customization

### Adding New Categories

Edit `/lib/promptCategories.ts`:

```typescript
{
  id: 'your-category',
  name: 'Your Category',
  description: 'What this category does',
  icon: 'IconName',
  systemPrompt: 'System instructions for LLM',
  fields: [
    {
      name: 'fieldName',
      label: 'Field Label',
      type: 'text',
      required: true,
      description: 'Help text'
    }
  ]
}
```

### Adding New LLM Providers

Edit `/app/api/prompt-generate/route.ts`:

1. Add provider to switch statement
2. Implement API call function
3. Update LLM config defaults in `/lib/storage.ts`

## Troubleshooting

### "No LLM configured" Warning

- Go to Settings and add at least one LLM configuration
- Ensure the configuration is **enabled**
- Verify your API key is correct

### API Errors

- Check your API key is valid
- Ensure you have credits/quota with the provider
- Verify the model name is correct
- Check network connection

### Saved Prompts Not Loading

- Check browser localStorage is enabled
- Try clearing cache and re-importing data
- Export data before clearing browser data

## Security

- API keys are stored in browser localStorage only
- Keys are never sent to our servers
- Keys are excluded from data exports
- Use environment variables for server-side keys if deploying

## Future Enhancements

Potential features to add:
- [ ] Prompt versioning
- [ ] Collaboration features
- [ ] Prompt templates marketplace
- [ ] A/B testing different prompts
- [ ] Analytics on prompt performance
- [ ] Cloud sync option
- [ ] Prompt chaining/workflows
- [ ] Custom fields for categories

## License

MIT License - feel free to use and modify as needed.

## Support

For issues or questions:
1. Check this documentation
2. Review existing GitHub issues
3. Create a new issue with details

---

Built with ❤️ using Next.js, TypeScript, and Claude AI
