import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, systemPrompt, llmProvider, llmModel, apiKey } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    let output = '';
    let usage = {
      inputTokens: 0,
      outputTokens: 0,
    };

    // Handle different LLM providers
    switch (llmProvider) {
      case 'anthropic':
        const anthropicResult = await callAnthropic(prompt, systemPrompt, llmModel, apiKey);
        output = anthropicResult.output;
        usage = anthropicResult.usage;
        break;

      case 'openai':
        const openaiResult = await callOpenAI(prompt, systemPrompt, llmModel, apiKey);
        output = openaiResult.output;
        usage = openaiResult.usage;
        break;

      case 'google':
        const googleResult = await callGoogle(prompt, systemPrompt, llmModel, apiKey);
        output = googleResult.output;
        usage = googleResult.usage;
        break;

      case 'cohere':
        const cohereResult = await callCohere(prompt, systemPrompt, llmModel, apiKey);
        output = cohereResult.output;
        usage = cohereResult.usage;
        break;

      default:
        return NextResponse.json(
          { error: `Unsupported LLM provider: ${llmProvider}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      output,
      usage,
    });
  } catch (error: any) {
    console.error('Error generating with LLM:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}

async function callAnthropic(prompt: string, systemPrompt: string, model: string, apiKey: string) {
  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: model,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const output = response.content[0].type === 'text' ? response.content[0].text : '';

  return {
    output,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  };
}

async function callOpenAI(prompt: string, systemPrompt: string, model: string, apiKey: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API request failed');
  }

  const data = await response.json();
  const output = data.choices[0]?.message?.content || '';

  return {
    output,
    usage: {
      inputTokens: data.usage?.prompt_tokens || 0,
      outputTokens: data.usage?.completion_tokens || 0,
    },
  };
}

async function callGoogle(prompt: string, systemPrompt: string, model: string, apiKey: string) {
  const fullPrompt = `${systemPrompt}\n\n${prompt}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Google API request failed');
  }

  const data = await response.json();
  const output = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Google doesn't always provide detailed usage stats
  const usage = {
    inputTokens: data.usageMetadata?.promptTokenCount || 0,
    outputTokens: data.usageMetadata?.candidatesTokenCount || 0,
  };

  return { output, usage };
}

async function callCohere(prompt: string, systemPrompt: string, model: string, apiKey: string) {
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      prompt: `${systemPrompt}\n\n${prompt}`,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Cohere API request failed');
  }

  const data = await response.json();
  const output = data.generations?.[0]?.text || '';

  return {
    output,
    usage: {
      inputTokens: 0, // Cohere doesn't provide detailed token counts in basic API
      outputTokens: 0,
    },
  };
}
