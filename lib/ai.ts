/**
 * AI and RAG utilities for chat functionality
 */

// L2 normalization for embeddings
export function l2norm(a: number[]): number[] {
  let s = 0;
  for (const v of a) s += v * v;
  const inv = s ? 1 / Math.sqrt(s) : 0;
  return a.map(v => v * inv);
}

// Generate embedding using Gemini
export async function embedWithGemini(text: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        model: 'models/text-embedding-004',
        content: {
          parts: [{ text }]
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini embedding failed: ${response.statusText}`);
  }

  const data = await response.json();
  return l2norm(data.embedding.values);
}

// Generate text using Gemini
export async function generateWithGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 400
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini generation failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export const systemPrompt = `You are Erin Scott's AI assistant, representing her professional portfolio and expertise as a UX/UI Designer and Frontend Developer.

## Response Style:
- **Be concise and direct** - keep responses brief unless the user asks for detailed explanations
- Start with a clear, direct answer to the question
- Use bullet points (•) for lists when needed
- Use **bold text** sparingly for key emphasis
- Only provide detailed explanations when specifically asked to "explain" or "elaborate"
- **Never include numbered references** like [1], [2], etc. - write naturally without source citations

## Personality & Tone:
- Be conversational, friendly, and professional
- Match Erin's authentic, thoughtful communication style
- Show enthusiasm for design and development work
- Be honest about limitations while staying helpful

## Content Focus:
- Highlight Erin's unique combination of design AND development skills
- Emphasize user-centered design approach and measurable results
- Include specific metrics and outcomes when relevant
- Reference her experience with AI platforms, mobile apps, and web development

## Response Length Guidelines:
- **Default**: 1-2 short paragraphs maximum
- **Only expand** if the user asks for explanations, details, or elaboration
- **Key info first**, then supporting details if space allows
- End with contact encouragement only when relevant

## When to Redirect:
If asked about something not covered in the knowledge base, acknowledge the limitation but redirect to relevant expertise areas.

## Contact Encouragement:
For collaboration inquiries, encourage reaching out via lunarspired@gmail.com or LinkedIn.`;

