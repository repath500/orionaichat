import React from 'react';
import { Settings, Check } from 'lucide-react';
import { Model, ModelInfo, Theme } from '../types';

const models: Record<Model, ModelInfo> = {
  '8b': {
    name: 'OrionAI-Chat-8b',
    description: 'Fast, uncensored model for general tasks',
    pros: [
      'Fastest response times',
      'Completely uncensored',
      'Great for casual chat',
      'Efficient processing'
    ],
    icon: '🚀',
    nsfw: true
  },
  '22b': {
    name: 'OrionAI-Chat-22b',
    description: 'GPT-4o Mini competitor with enhanced capabilities',
    pros: [
      'Advanced reasoning',
      'Detailed responses',
      'Professional output',
      'Balanced performance'
    ],
    icon: '🧠'
  },
  '72b': {
    name: 'OrionAI-Chat-72b',
    description: 'Most advanced uncensored model',
    pros: [
      'Superior writing & coding',
      'Outperforms GPT-4o Mini',
      'Complex reasoning',
      'Unrestricted creativity'
    ],
    icon: '🌟',
    nsfw: true
  },
  'gpt4-mini': {
    name: 'GPT-4o Mini',
    description: "OpenAI's streamlined model",
    pros: [
      'Politically correct',
      'Consistent outputs',
      'Professional responses',
      'Content filtering'
    ],
    icon: '⚡'
  }
};

type Props = {
  currentModel: Model;
  onModelChange: (model: Model) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export default function ModelSelector({ currentModel, onModelChange, theme, onThemeChange }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white dark:bg-gray-800 shadow-lg p-4 z-50">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Theme</h3>
              <div className="flex gap-2">
                {(['light', 'dark', 'pastel', 'cosmic'] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => onThemeChange(t)}
                    className={`px-3 py-1 rounded-full ${
                      theme === t
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Model Selection</h3>
            {(Object.entries(models) as [Model, ModelInfo][]).map(([key, model]) => (
              <div
                key={key}
                className={`p-3 rounded-lg mb-2 cursor-pointer ${
                  currentModel === key
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => {
                  onModelChange(key);
                  setIsOpen(false);
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium flex items-center gap-2">
                    {model.icon} {model.name}
                    {model.nsfw && (
                      <span className="text-xs px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full">
                        NSFW
                      </span>
                    )}
                  </span>
                  {currentModel === key && <Check className="w-4 h-4" />}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{model.description}</p>
                <ul className="mt-2 space-y-1">
                  {model.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-gray-500 dark:text-gray-400">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}