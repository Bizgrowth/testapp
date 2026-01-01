import { CategoryConfig } from './types';

export const PROMPT_CATEGORIES: CategoryConfig[] = [
  {
    id: 'coding',
    name: 'Coding/Programming',
    description: 'Generate optimized code, debug issues, or learn programming concepts',
    icon: 'Code2',
    systemPrompt: 'You are an expert programming assistant. Provide clear, well-documented, and efficient code solutions.',
    fields: [
      {
        name: 'task',
        label: 'Coding Task',
        type: 'textarea',
        placeholder: 'Describe what you want to build or solve...',
        required: true,
        description: 'What do you want to accomplish?'
      },
      {
        name: 'language',
        label: 'Programming Language',
        type: 'select',
        options: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'Ruby', 'PHP', 'Other'],
        required: true
      },
      {
        name: 'framework',
        label: 'Framework/Library',
        type: 'text',
        placeholder: 'e.g., React, Django, Express...',
      },
      {
        name: 'context',
        label: 'Additional Context',
        type: 'textarea',
        placeholder: 'Existing code, constraints, specific requirements...',
      },
      {
        name: 'level',
        label: 'Complexity Level',
        type: 'select',
        options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        required: true
      },
      {
        name: 'includeComments',
        label: 'Include detailed comments',
        type: 'checkbox',
      },
      {
        name: 'includeTests',
        label: 'Include unit tests',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'learning',
    name: 'Learning/Education',
    description: 'Learn new concepts with personalized explanations and examples',
    icon: 'GraduationCap',
    systemPrompt: 'You are a patient and knowledgeable teacher. Explain concepts clearly with relevant examples and check for understanding.',
    fields: [
      {
        name: 'topic',
        label: 'Topic to Learn',
        type: 'text',
        placeholder: 'e.g., Machine Learning, Quantum Physics...',
        required: true
      },
      {
        name: 'currentLevel',
        label: 'Current Knowledge Level',
        type: 'select',
        options: ['Complete Beginner', 'Some Basics', 'Intermediate', 'Advanced'],
        required: true
      },
      {
        name: 'learningGoal',
        label: 'Learning Goal',
        type: 'textarea',
        placeholder: 'What do you want to achieve?',
        required: true
      },
      {
        name: 'preferredStyle',
        label: 'Learning Style',
        type: 'select',
        options: ['Visual (diagrams/examples)', 'Step-by-step', 'Analogies', 'Technical', 'Interactive Q&A'],
      },
      {
        name: 'timeframe',
        label: 'Available Time',
        type: 'select',
        options: ['Quick overview (5 min)', 'Short lesson (15 min)', 'Deep dive (30+ min)'],
      },
      {
        name: 'includeExamples',
        label: 'Include practical examples',
        type: 'checkbox',
      },
      {
        name: 'includeExercises',
        label: 'Include practice exercises',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'studying',
    name: 'Studying/Research',
    description: 'Deep research, analysis, and comprehensive study materials',
    icon: 'BookOpen',
    systemPrompt: 'You are a thorough research assistant. Provide well-structured, cited, and comprehensive information.',
    fields: [
      {
        name: 'researchTopic',
        label: 'Research Topic',
        type: 'text',
        placeholder: 'What are you researching?',
        required: true
      },
      {
        name: 'researchQuestion',
        label: 'Research Question/Thesis',
        type: 'textarea',
        placeholder: 'Your specific question or thesis statement...',
        required: true
      },
      {
        name: 'scope',
        label: 'Research Scope',
        type: 'select',
        options: ['Overview', 'Detailed Analysis', 'Literature Review', 'Comparative Study', 'Case Study'],
        required: true
      },
      {
        name: 'academicLevel',
        label: 'Academic Level',
        type: 'select',
        options: ['High School', 'Undergraduate', 'Graduate', 'PhD', 'Professional'],
      },
      {
        name: 'focusAreas',
        label: 'Specific Focus Areas',
        type: 'textarea',
        placeholder: 'What aspects to focus on?',
      },
      {
        name: 'sources',
        label: 'Preferred Sources',
        type: 'select',
        options: ['Academic papers', 'Books', 'Industry reports', 'Mixed sources'],
      },
      {
        name: 'includeCitations',
        label: 'Include citations/references',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'content-writing',
    name: 'Content Writing',
    description: 'Create engaging articles, blog posts, and marketing content',
    icon: 'FileText',
    systemPrompt: 'You are a skilled content writer. Create engaging, well-structured content optimized for the target audience.',
    fields: [
      {
        name: 'contentType',
        label: 'Content Type',
        type: 'select',
        options: ['Blog Post', 'Article', 'Social Media', 'Email', 'Landing Page', 'Product Description', 'Press Release'],
        required: true
      },
      {
        name: 'topic',
        label: 'Topic/Subject',
        type: 'text',
        placeholder: 'Main topic or subject matter...',
        required: true
      },
      {
        name: 'targetAudience',
        label: 'Target Audience',
        type: 'text',
        placeholder: 'Who is this for?',
        required: true
      },
      {
        name: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['Professional', 'Casual', 'Friendly', 'Authoritative', 'Playful', 'Inspirational', 'Educational'],
        required: true
      },
      {
        name: 'length',
        label: 'Desired Length',
        type: 'select',
        options: ['Short (250-500 words)', 'Medium (500-1000 words)', 'Long (1000-2000 words)', 'Very Long (2000+ words)'],
      },
      {
        name: 'keywords',
        label: 'Keywords (SEO)',
        type: 'text',
        placeholder: 'Comma-separated keywords...',
      },
      {
        name: 'cta',
        label: 'Call-to-Action',
        type: 'text',
        placeholder: 'What action should readers take?',
      },
      {
        name: 'includeOutline',
        label: 'Include content outline',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Analyze data, create visualizations, and derive insights',
    icon: 'BarChart3',
    systemPrompt: 'You are a data analyst expert. Provide clear insights, statistical analysis, and actionable recommendations.',
    fields: [
      {
        name: 'dataDescription',
        label: 'Data Description',
        type: 'textarea',
        placeholder: 'Describe your dataset...',
        required: true
      },
      {
        name: 'analysisGoal',
        label: 'Analysis Goal',
        type: 'textarea',
        placeholder: 'What insights are you looking for?',
        required: true
      },
      {
        name: 'analysisType',
        label: 'Analysis Type',
        type: 'select',
        options: ['Exploratory', 'Descriptive', 'Predictive', 'Prescriptive', 'Statistical'],
        required: true
      },
      {
        name: 'dataFormat',
        label: 'Data Format',
        type: 'select',
        options: ['CSV', 'JSON', 'SQL', 'Excel', 'Raw text', 'API response'],
      },
      {
        name: 'metrics',
        label: 'Key Metrics',
        type: 'text',
        placeholder: 'Metrics to focus on...',
      },
      {
        name: 'visualizations',
        label: 'Visualization Type',
        type: 'select',
        options: ['Charts/Graphs', 'Tables', 'Dashboards', 'Statistical plots', 'No visualization needed'],
      },
      {
        name: 'includeCode',
        label: 'Include analysis code (Python/R)',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    description: 'Stories, poems, scripts, and creative content',
    icon: 'Sparkles',
    systemPrompt: 'You are a creative writing expert. Craft imaginative, engaging, and well-structured creative content.',
    fields: [
      {
        name: 'creativeType',
        label: 'Creative Type',
        type: 'select',
        options: ['Short Story', 'Novel Chapter', 'Poem', 'Script', 'Dialogue', 'Character Development', 'World Building'],
        required: true
      },
      {
        name: 'genre',
        label: 'Genre',
        type: 'select',
        options: ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Drama', 'Comedy', 'Literary Fiction'],
      },
      {
        name: 'theme',
        label: 'Theme/Concept',
        type: 'textarea',
        placeholder: 'Main theme or concept...',
        required: true
      },
      {
        name: 'style',
        label: 'Writing Style',
        type: 'select',
        options: ['Descriptive', 'Narrative', 'Dialogue-heavy', 'Poetic', 'Minimalist', 'Stream of consciousness'],
      },
      {
        name: 'mood',
        label: 'Mood/Atmosphere',
        type: 'select',
        options: ['Dark', 'Light-hearted', 'Mysterious', 'Romantic', 'Tense', 'Whimsical', 'Melancholic'],
      },
      {
        name: 'length',
        label: 'Length',
        type: 'select',
        options: ['Flash fiction (< 1000 words)', 'Short (1000-3000 words)', 'Medium (3000-7000 words)', 'Long (7000+ words)'],
      },
      {
        name: 'additionalDetails',
        label: 'Additional Details',
        type: 'textarea',
        placeholder: 'Characters, setting, plot points...',
      }
    ]
  },
  {
    id: 'business',
    name: 'Business/Strategy',
    description: 'Business plans, strategies, and professional documents',
    icon: 'Briefcase',
    systemPrompt: 'You are a business strategy consultant. Provide actionable, data-driven business insights and recommendations.',
    fields: [
      {
        name: 'businessTask',
        label: 'Business Task',
        type: 'select',
        options: ['Business Plan', 'Strategy Development', 'Market Analysis', 'SWOT Analysis', 'Financial Projection', 'Pitch Deck', 'Business Proposal'],
        required: true
      },
      {
        name: 'industry',
        label: 'Industry',
        type: 'text',
        placeholder: 'Your industry or sector...',
        required: true
      },
      {
        name: 'businessContext',
        label: 'Business Context',
        type: 'textarea',
        placeholder: 'Company background, current situation...',
        required: true
      },
      {
        name: 'objective',
        label: 'Primary Objective',
        type: 'textarea',
        placeholder: 'What do you want to achieve?',
        required: true
      },
      {
        name: 'targetMarket',
        label: 'Target Market',
        type: 'text',
        placeholder: 'Who are your customers?',
      },
      {
        name: 'timeHorizon',
        label: 'Time Horizon',
        type: 'select',
        options: ['Short-term (< 1 year)', 'Medium-term (1-3 years)', 'Long-term (3+ years)'],
      },
      {
        name: 'includeFinancials',
        label: 'Include financial analysis',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'technical-docs',
    name: 'Technical Documentation',
    description: 'API docs, user guides, and technical specifications',
    icon: 'FileCode',
    systemPrompt: 'You are a technical documentation specialist. Create clear, comprehensive, and well-organized documentation.',
    fields: [
      {
        name: 'docType',
        label: 'Documentation Type',
        type: 'select',
        options: ['API Documentation', 'User Guide', 'README', 'Technical Specification', 'Architecture Document', 'Installation Guide', 'Troubleshooting Guide'],
        required: true
      },
      {
        name: 'product',
        label: 'Product/System Name',
        type: 'text',
        placeholder: 'What are you documenting?',
        required: true
      },
      {
        name: 'audience',
        label: 'Target Audience',
        type: 'select',
        options: ['Developers', 'End Users', 'System Administrators', 'Business Users', 'Mixed audience'],
        required: true
      },
      {
        name: 'technicalLevel',
        label: 'Technical Level',
        type: 'select',
        options: ['Non-technical', 'Basic', 'Intermediate', 'Advanced', 'Expert'],
      },
      {
        name: 'scope',
        label: 'Scope/Coverage',
        type: 'textarea',
        placeholder: 'What should be covered?',
        required: true
      },
      {
        name: 'includeExamples',
        label: 'Include code examples',
        type: 'checkbox',
      },
      {
        name: 'includeDiagrams',
        label: 'Include diagrams/flowcharts',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Analyze and solve complex problems systematically',
    icon: 'Lightbulb',
    systemPrompt: 'You are an expert problem solver. Break down complex problems and provide systematic, actionable solutions.',
    fields: [
      {
        name: 'problem',
        label: 'Problem Statement',
        type: 'textarea',
        placeholder: 'Describe the problem in detail...',
        required: true
      },
      {
        name: 'problemType',
        label: 'Problem Type',
        type: 'select',
        options: ['Technical', 'Business', 'Personal', 'Strategic', 'Operational', 'Creative', 'Mathematical'],
        required: true
      },
      {
        name: 'constraints',
        label: 'Constraints',
        type: 'textarea',
        placeholder: 'Budget, time, resources, limitations...',
      },
      {
        name: 'goals',
        label: 'Success Criteria',
        type: 'textarea',
        placeholder: 'What would a successful solution look like?',
        required: true
      },
      {
        name: 'approach',
        label: 'Preferred Approach',
        type: 'select',
        options: ['Step-by-step', 'Root cause analysis', 'Multiple solutions', 'Best practices', 'Innovative/Creative'],
      },
      {
        name: 'context',
        label: 'Additional Context',
        type: 'textarea',
        placeholder: 'Relevant background information...',
      },
      {
        name: 'includeImplementation',
        label: 'Include implementation plan',
        type: 'checkbox',
      }
    ]
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming/Ideation',
    description: 'Generate ideas, explore possibilities, and think creatively',
    icon: 'Brain',
    systemPrompt: 'You are a creative thinking facilitator. Generate diverse, innovative ideas and explore possibilities.',
    fields: [
      {
        name: 'topic',
        label: 'Brainstorming Topic',
        type: 'text',
        placeholder: 'What do you want to brainstorm about?',
        required: true
      },
      {
        name: 'objective',
        label: 'Objective',
        type: 'textarea',
        placeholder: 'What are you trying to achieve?',
        required: true
      },
      {
        name: 'ideaType',
        label: 'Type of Ideas',
        type: 'select',
        options: ['Product Ideas', 'Business Ideas', 'Content Ideas', 'Solutions', 'Features', 'Campaigns', 'Innovations'],
        required: true
      },
      {
        name: 'quantity',
        label: 'Number of Ideas',
        type: 'select',
        options: ['5-10 ideas', '10-20 ideas', '20+ ideas'],
      },
      {
        name: 'creativity',
        label: 'Creativity Level',
        type: 'select',
        options: ['Practical/Realistic', 'Balanced', 'Innovative', 'Wild/Unconventional'],
      },
      {
        name: 'constraints',
        label: 'Constraints/Parameters',
        type: 'textarea',
        placeholder: 'Any boundaries or requirements...',
      },
      {
        name: 'includeEvaluation',
        label: 'Include evaluation/ranking of ideas',
        type: 'checkbox',
      }
    ]
  }
];

export function getCategoryById(id: string): CategoryConfig | undefined {
  return PROMPT_CATEGORIES.find(cat => cat.id === id);
}
