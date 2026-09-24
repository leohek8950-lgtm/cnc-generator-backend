// api/generate-gcode.js - Vercel Serverless Function
// Это backend, который устраняет CORS проблему

export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Берём API ключ из переменных окружения
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key not configured. Set ANTHROPIC_API_KEY in Vercel environment variables.' 
      });
    }

    // Запрос к Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2500,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ 
        error: `Claude API error: ${errorData.error?.message || response.statusText}` 
      });
    }

    const data = await response.json();
    const generatedCode = data.content[0]?.text || '';

    return res.status(200).json({
      success: true,
      code: generatedCode,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: `Server error: ${error.message}` 
    });
  }
}
