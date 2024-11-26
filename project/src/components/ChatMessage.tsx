import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  return (
    <div
      className={`py-4 ${
        message.role === 'assistant'
          ? 'bg-white/5'
          : ''
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className={`flex ${message.role === 'user' ? 'justify-end' : ''}`}>
          <div className={`max-w-[80%] ${
            message.role === 'user'
              ? 'bg-blue-500/10 rounded-2xl px-6 py-3'
              : 'flex-1'
          }`}>
            <ReactMarkdown
              className="prose dark:prose-invert max-w-none"
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}