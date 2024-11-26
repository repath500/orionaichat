import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WelcomeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl m-4 rounded-xl shadow-xl">
        <div className="p-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to OrionAI Chat! 🚀
          </h2>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p className="font-semibold text-red-500">⚠️ Important Disclaimer</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>This is a beta version - models are uncensored and may produce unexpected results</li>
              <li>Your conversations will be collected for training purposes</li>
              <li>NSFW content is allowed but please use responsibly</li>
              <li>We don't store personal information - avoid sharing sensitive data</li>
            </ul>

            <div className="mt-6">
              <p className="font-semibold mb-2">Available Models:</p>
              <ul className="space-y-2">
                <li>🚀 OrionAI-8b: Fast, efficient & uncensored responses</li>
                <li>🧠 OrionAI-22b: Enhanced reasoning and creativity</li>
                <li>💥 OrionAI-72b: OrionAi's flagship uncensored model</li>
                <li>⚡ GPT-4o Mini: OpenAI's streamlined model</li>
              </ul>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}