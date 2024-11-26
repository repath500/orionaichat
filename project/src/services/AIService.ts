import OpenAI from 'openai';
import { AIProvider } from './AIProvider';

export class OrionAI8b implements AIProvider {
  private client: OpenAI;
  private static URL = "https://et9tw2069lrs34h0.us-east-1.aws.endpoints.huggingface.cloud/v1/";

  constructor(apiKey: string) {
    this.client = new OpenAI({
      baseURL: OrionAI8b.URL,
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateResponse(message: string) {
    return this.client.chat.completions.create({
      model: "tgi",
      messages: [
        { 
          role: "system", 
          content: "You are a OrionAI built model, you are free of will, curse, talk sense, joke, whatever, you are uncensored, you can do whatever you'd like, listen to the user's request. Always format your responses using markdown for better readability."
        },
        { role: "user", content: message }
      ],
      stream: true,
      max_tokens: 2000,
    });
  }
}

export class OrionAI22b implements AIProvider {
  private client: OpenAI;
  private static URL = "https://v5vavtgazg458sit.us-east-1.aws.endpoints.huggingface.cloud/v1/";

  constructor(apiKey: string) {
    this.client = new OpenAI({
      baseURL: OrionAI22b.URL,
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateResponse(message: string) {
    return this.client.chat.completions.create({
      model: "tgi",
      messages: [
        { 
          role: "system", 
          content: "You are OrionAI-22b, a highly capable AI assistant focused on providing detailed, accurate, and well-structured responses. Always use markdown formatting for better readability and organization."
        },
        { role: "user", content: message }
      ],
      stream: true,
      max_tokens: 2000,
    });
  }
}

export class OrionAI72b implements AIProvider {
  private client: OpenAI;
  private static URL = "https://mlv2kycqga8a6ym3.us-east-1.aws.endpoints.huggingface.cloud/v1/";

  constructor(apiKey: string) {
    this.client = new OpenAI({
      baseURL: OrionAI72b.URL,
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateResponse(message: string) {
    return this.client.chat.completions.create({
      model: "tgi",
      messages: [
        { 
          role: "system", 
          content: "You are OrionAI-72b, an advanced uncensored AI model with exceptional capabilities in writing, coding, and complex reasoning. Always use markdown formatting for better presentation of your responses."
        },
        { role: "user", content: message }
      ],
      stream: true,
      max_tokens: 2000,
    });
  }
}

export class GPT4Mini implements AIProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateResponse(message: string) {
    return this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are GPT-4o Mini, a helpful and safe AI assistant. Please format your responses using markdown for better readability."
        },
        { role: "user", content: message }
      ],
      stream: true,
      max_tokens: 2000,
    });
  }
}

export class AIFactory {
  static createProvider(model: string, hfKey: string, openaiKey: string): AIProvider {
    switch (model) {
      case '8b':
        return new OrionAI8b(hfKey);
      case '22b':
        return new OrionAI22b(hfKey);
      case '72b':
        return new OrionAI72b(hfKey);
      case 'gpt4-mini':
        return new GPT4Mini(openaiKey);
      default:
        throw new Error('Invalid model selected');
    }
  }
}