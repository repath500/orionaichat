import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import ModelSelector from './components/ModelSelector';
import ChatMessage from './components/ChatMessage';
import WelcomeModal from './components/WelcomeModal';
import BetaBanner from './components/BetaBanner';
import { Message, Model, Theme } from './types';
import { AIFactory } from './services/AIService';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState<Model>('8b');
  const [theme, setTheme] = useState<Theme>('light');
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const provider = AIFactory.createProvider(
        currentModel,
        import.meta.env.VITE_HUGGINGFACE_API_KEY,
        import.meta.env.VITE_OPENAI_API_KEY
      );
      
      const stream = await provider.generateResponse(input);
      let content = '';
      
      const aiMessage: Message = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, aiMessage]);

      for await (const chunk of stream) {
        content += chunk.choices[0]?.delta?.content || '';
        setMessages(prev => [
          ...prev.slice(0, -1),
          { ...aiMessage, content }
        ]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${errorMessage}. Please try again or switch to a different model.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
      e.preventDefault();
      setInput(prev => prev + '\n');
    } else if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const themeClasses = {
    light: 'bg-gradient-to-br from-blue-50 to-purple-50',
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800',
    pastel: 'bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue',
    cosmic: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className={`min-h-screen ${themeClasses[theme]} text-gray-900 dark:text-gray-100`}>
        <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
        <div className="flex flex-col min-h-screen">
          <BetaBanner />

          {/* Header */}
          <header className="border-b border-white/10 bg-white/5 dark:bg-black/5">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex-1" />
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                OrionAI Chat
              </h1>
              <div className="flex-1 flex justify-end">
                <ModelSelector
                  currentModel={currentModel}
                  onModelChange={setCurrentModel}
                  theme={theme}
                  onThemeChange={setTheme}
                />
              </div>
            </div>
          </header>

          {/* Chat Messages */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </main>

          {/* Input Form */}
          <div className="bg-gradient-to-t from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={clearChat}
                  className="p-3 rounded-full hover:bg-white/10 transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Ctrl+Enter to send)"
                    className="w-full p-3 pr-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    disabled={isLoading}
                    rows={1}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
                    title="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Model Indicator */}
          <div className="fixed bottom-24 right-4">
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              {currentModel === '8b' ? '🚀 Fast Mode' : 
               currentModel === '22b' ? '🧠 Advanced Mode' : 
               currentModel === '72b' ? '🌟 Ultra Mode' :
               '⚡ GPT-4o Mini'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;