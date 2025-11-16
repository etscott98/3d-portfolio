'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function ChatInterfaceSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hi! I'm Erin's AI assistant. I can answer questions about her design work, personality, and experience. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What's Erin's design philosophy?",
    "Tell me about Erin's technical skills",
    "What are Erin's recent projects?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (chatRef.current) {
      gsap.from(chatRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chatRef.current,
          start: 'top 80%',
        }
      });
    }
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      const aiMessage: Message = {
        role: 'ai',
        content: data.response || "I couldn't process that. Please try again."
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'ai',
        content: "Sorry, I'm having trouble connecting. You can reach Erin at lunarspired@gmail.com"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chat-section" ref={chatRef} className="py-32 px-6 bg-black border-t border-zinc-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
            Ask AI About Erin
          </h2>
          <p className="text-xl text-gray-400">
            Ask me anything about Erin's work & experience
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-zinc-900 border-2 border-zinc-800 overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-black">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-lime-400" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-lime-400 text-black'
                      : 'bg-zinc-800 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-lime-400" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-lime-400" />
                </div>
                <div className="bg-zinc-800 text-white px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-lime-400" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 bg-zinc-900 border-t border-zinc-800">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="px-3 py-2 bg-zinc-800 text-gray-300 text-xs hover:bg-lime-400 hover:text-black transition-colors border border-zinc-700 hover:border-lime-400"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-zinc-900 border-t-2 border-zinc-800">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Erin's work..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-black border border-zinc-800 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-lime-400 text-black font-medium hover:bg-lime-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center uppercase tracking-wide">
              Powered by AI • Responses may vary
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

