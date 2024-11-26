import OpenAI from 'openai';

const ORION_8B_URL = "https://et9tw2069lrs34h0.us-east-1.aws.endpoints.huggingface.cloud/v1/";
const ORION_22B_URL = "https://v5vavtgazg458sit.us-east-1.aws.endpoints.huggingface.cloud/v1/";
const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function streamResponse(model: string, message: string) {
  try {
    if (model === 'gpt4-mini') {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured');
      }

      const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
      return await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message }
        ],
        stream: true,
      });
    } else {
      if (!HF_API_KEY) {
        throw new Error('HuggingFace API key is not configured');
      }

      const client = new OpenAI({
        baseURL: model === '8b' ? ORION_8B_URL : ORION_22B_URL,
        apiKey: HF_API_KEY,
      });

      return await client.chat.completions.create({
        model: "tgi",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful AI assistant trained to provide detailed and accurate responses."
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        stream: true,
        max_tokens: model === '8b' ? 8000 : 32000,
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}