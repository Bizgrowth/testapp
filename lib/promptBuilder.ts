// Prompt builder utilities

import { PromptCategory, CategoryConfig } from './types';
import { getCategoryById } from './promptCategories';

export function buildPrompt(
  category: PromptCategory,
  formData: Record<string, any>
): string {
  const categoryConfig = getCategoryById(category);
  if (!categoryConfig) {
    throw new Error(`Invalid category: ${category}`);
  }

  const sections: string[] = [];

  // Add category-specific system context
  sections.push(`Context: ${categoryConfig.description}`);
  sections.push('');

  // Build prompt based on category
  switch (category) {
    case 'coding':
      sections.push(...buildCodingPrompt(formData));
      break;
    case 'learning':
      sections.push(...buildLearningPrompt(formData));
      break;
    case 'studying':
      sections.push(...buildStudyingPrompt(formData));
      break;
    case 'content-writing':
      sections.push(...buildContentWritingPrompt(formData));
      break;
    case 'data-analysis':
      sections.push(...buildDataAnalysisPrompt(formData));
      break;
    case 'creative-writing':
      sections.push(...buildCreativeWritingPrompt(formData));
      break;
    case 'business':
      sections.push(...buildBusinessPrompt(formData));
      break;
    case 'technical-docs':
      sections.push(...buildTechnicalDocsPrompt(formData));
      break;
    case 'problem-solving':
      sections.push(...buildProblemSolvingPrompt(formData));
      break;
    case 'brainstorming':
      sections.push(...buildBrainstormingPrompt(formData));
      break;
    default:
      sections.push(buildGenericPrompt(formData));
  }

  return sections.join('\n');
}

function buildCodingPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Task: ${data.task}`);
  sections.push(`Language: ${data.language}`);

  if (data.framework) {
    sections.push(`Framework/Library: ${data.framework}`);
  }

  sections.push(`Complexity Level: ${data.level}`);

  if (data.context) {
    sections.push('');
    sections.push('Additional Context:');
    sections.push(data.context);
  }

  sections.push('');
  sections.push('Requirements:');
  sections.push('- Write clean, efficient, and well-structured code');
  sections.push('- Follow best practices and design patterns');

  if (data.includeComments) {
    sections.push('- Include detailed inline comments explaining the logic');
  }

  if (data.includeTests) {
    sections.push('- Provide comprehensive unit tests');
  }

  sections.push('- Handle edge cases and errors appropriately');
  sections.push('- Ensure code is production-ready');

  return sections;
}

function buildLearningPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Topic: ${data.topic}`);
  sections.push(`Current Knowledge Level: ${data.currentLevel}`);
  sections.push(`Learning Goal: ${data.learningGoal}`);

  if (data.preferredStyle) {
    sections.push(`Preferred Learning Style: ${data.preferredStyle}`);
  }

  if (data.timeframe) {
    sections.push(`Time Available: ${data.timeframe}`);
  }

  sections.push('');
  sections.push('Teaching Approach:');
  sections.push('- Start with clear definitions and core concepts');
  sections.push('- Build complexity gradually');
  sections.push('- Use analogies and real-world examples');

  if (data.includeExamples) {
    sections.push('- Provide practical, hands-on examples');
  }

  if (data.includeExercises) {
    sections.push('- Include practice exercises with solutions');
  }

  sections.push('- Check for understanding at key points');
  sections.push('- Summarize key takeaways at the end');

  return sections;
}

function buildStudyingPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Research Topic: ${data.researchTopic}`);
  sections.push(`Research Question: ${data.researchQuestion}`);
  sections.push(`Scope: ${data.scope}`);

  if (data.academicLevel) {
    sections.push(`Academic Level: ${data.academicLevel}`);
  }

  if (data.focusAreas) {
    sections.push('');
    sections.push('Focus Areas:');
    sections.push(data.focusAreas);
  }

  if (data.sources) {
    sections.push(`Preferred Sources: ${data.sources}`);
  }

  sections.push('');
  sections.push('Research Requirements:');
  sections.push('- Provide comprehensive and well-structured information');
  sections.push('- Present multiple perspectives where applicable');
  sections.push('- Include relevant data and evidence');

  if (data.includeCitations) {
    sections.push('- Include proper citations and references');
  }

  sections.push('- Organize information logically');
  sections.push('- Highlight key findings and insights');

  return sections;
}

function buildContentWritingPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Content Type: ${data.contentType}`);
  sections.push(`Topic: ${data.topic}`);
  sections.push(`Target Audience: ${data.targetAudience}`);
  sections.push(`Tone: ${data.tone}`);

  if (data.length) {
    sections.push(`Desired Length: ${data.length}`);
  }

  if (data.keywords) {
    sections.push(`Keywords (SEO): ${data.keywords}`);
  }

  if (data.cta) {
    sections.push(`Call-to-Action: ${data.cta}`);
  }

  sections.push('');
  sections.push('Content Guidelines:');
  sections.push('- Create an engaging, attention-grabbing opening');
  sections.push('- Use clear, compelling language appropriate for the audience');
  sections.push('- Structure content with proper headings and flow');
  sections.push('- Include relevant examples and data points');

  if (data.includeOutline) {
    sections.push('- Provide a content outline before the full content');
  }

  if (data.keywords) {
    sections.push('- Naturally incorporate SEO keywords');
  }

  sections.push('- End with a strong conclusion and clear CTA');

  return sections;
}

function buildDataAnalysisPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push('Data Description:');
  sections.push(data.dataDescription);
  sections.push('');
  sections.push('Analysis Goal:');
  sections.push(data.analysisGoal);
  sections.push('');
  sections.push(`Analysis Type: ${data.analysisType}`);

  if (data.dataFormat) {
    sections.push(`Data Format: ${data.dataFormat}`);
  }

  if (data.metrics) {
    sections.push(`Key Metrics: ${data.metrics}`);
  }

  if (data.visualizations) {
    sections.push(`Visualization Preference: ${data.visualizations}`);
  }

  sections.push('');
  sections.push('Analysis Requirements:');
  sections.push('- Provide clear, actionable insights');
  sections.push('- Use appropriate statistical methods');
  sections.push('- Identify patterns, trends, and anomalies');
  sections.push('- Present findings in a clear, understandable way');

  if (data.includeCode) {
    sections.push('- Include code for data analysis (Python/R)');
  }

  sections.push('- Provide recommendations based on findings');

  return sections;
}

function buildCreativeWritingPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Creative Type: ${data.creativeType}`);

  if (data.genre) {
    sections.push(`Genre: ${data.genre}`);
  }

  sections.push('');
  sections.push('Theme/Concept:');
  sections.push(data.theme);

  if (data.style) {
    sections.push('');
    sections.push(`Writing Style: ${data.style}`);
  }

  if (data.mood) {
    sections.push(`Mood/Atmosphere: ${data.mood}`);
  }

  if (data.length) {
    sections.push(`Length: ${data.length}`);
  }

  if (data.additionalDetails) {
    sections.push('');
    sections.push('Additional Details:');
    sections.push(data.additionalDetails);
  }

  sections.push('');
  sections.push('Creative Writing Guidelines:');
  sections.push('- Create vivid, immersive descriptions');
  sections.push('- Develop compelling characters and dialogue');
  sections.push('- Build appropriate pacing and tension');
  sections.push('- Use literary devices effectively');
  sections.push('- Maintain consistency in voice and style');

  return sections;
}

function buildBusinessPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Business Task: ${data.businessTask}`);
  sections.push(`Industry: ${data.industry}`);
  sections.push('');
  sections.push('Business Context:');
  sections.push(data.businessContext);
  sections.push('');
  sections.push('Primary Objective:');
  sections.push(data.objective);

  if (data.targetMarket) {
    sections.push('');
    sections.push(`Target Market: ${data.targetMarket}`);
  }

  if (data.timeHorizon) {
    sections.push(`Time Horizon: ${data.timeHorizon}`);
  }

  sections.push('');
  sections.push('Business Requirements:');
  sections.push('- Provide strategic, actionable recommendations');
  sections.push('- Support with data and market insights');
  sections.push('- Consider competitive landscape');
  sections.push('- Address risks and mitigation strategies');

  if (data.includeFinancials) {
    sections.push('- Include financial projections and analysis');
  }

  sections.push('- Present in a professional, executive-ready format');

  return sections;
}

function buildTechnicalDocsPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Documentation Type: ${data.docType}`);
  sections.push(`Product/System: ${data.product}`);
  sections.push(`Target Audience: ${data.audience}`);

  if (data.technicalLevel) {
    sections.push(`Technical Level: ${data.technicalLevel}`);
  }

  sections.push('');
  sections.push('Scope/Coverage:');
  sections.push(data.scope);

  sections.push('');
  sections.push('Documentation Requirements:');
  sections.push('- Use clear, concise language appropriate for the audience');
  sections.push('- Organize content logically with proper headings');
  sections.push('- Include table of contents for longer documents');

  if (data.includeExamples) {
    sections.push('- Provide practical code examples');
  }

  if (data.includeDiagrams) {
    sections.push('- Include diagrams, flowcharts, or visual aids');
  }

  sections.push('- Ensure completeness and accuracy');
  sections.push('- Follow documentation best practices');

  return sections;
}

function buildProblemSolvingPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push('Problem Statement:');
  sections.push(data.problem);
  sections.push('');
  sections.push(`Problem Type: ${data.problemType}`);

  if (data.constraints) {
    sections.push('');
    sections.push('Constraints:');
    sections.push(data.constraints);
  }

  sections.push('');
  sections.push('Success Criteria:');
  sections.push(data.goals);

  if (data.approach) {
    sections.push('');
    sections.push(`Preferred Approach: ${data.approach}`);
  }

  if (data.context) {
    sections.push('');
    sections.push('Additional Context:');
    sections.push(data.context);
  }

  sections.push('');
  sections.push('Problem-Solving Approach:');
  sections.push('- Analyze the problem systematically');
  sections.push('- Break down into manageable components');
  sections.push('- Consider multiple solution approaches');
  sections.push('- Evaluate pros and cons of each approach');
  sections.push('- Provide clear, actionable recommendations');

  if (data.includeImplementation) {
    sections.push('- Include detailed implementation plan');
  }

  return sections;
}

function buildBrainstormingPrompt(data: Record<string, any>): string[] {
  const sections = [];

  sections.push(`Topic: ${data.topic}`);
  sections.push('');
  sections.push('Objective:');
  sections.push(data.objective);
  sections.push('');
  sections.push(`Type of Ideas: ${data.ideaType}`);

  if (data.quantity) {
    sections.push(`Desired Quantity: ${data.quantity}`);
  }

  if (data.creativity) {
    sections.push(`Creativity Level: ${data.creativity}`);
  }

  if (data.constraints) {
    sections.push('');
    sections.push('Constraints/Parameters:');
    sections.push(data.constraints);
  }

  sections.push('');
  sections.push('Brainstorming Guidelines:');
  sections.push('- Generate diverse, creative ideas');
  sections.push('- Think outside the box');
  sections.push('- Build on related concepts');
  sections.push('- Consider different perspectives');

  if (data.includeEvaluation) {
    sections.push('- Evaluate and rank ideas by feasibility and impact');
  }

  sections.push('- Provide brief explanations for each idea');

  return sections;
}

function buildGenericPrompt(data: Record<string, any>): string {
  return Object.entries(data)
    .filter(([_, value]) => value !== '' && value !== false)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}
