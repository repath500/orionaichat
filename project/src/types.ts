export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type Model = '8b' | '22b' | '72b' | 'gpt4-mini';

export type Theme = 'light' | 'dark' | 'pastel' | 'cosmic';

export type ModelInfo = {
  name: string;
  description: string;
  pros: string[];
  icon: string;
  nsfw?: boolean;
};