import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Briefcase,
  FileText,
  TrendingUp,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GEMINI_API_KEY = 'AIzaSyCSauceVVXIl436eoqYvv5TU2SFMMcyMFo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const BACKEND_API_URL = 'http://localhost:5000/api/career-ai/chat';

const CAREER_SYSTEM_PROMPT = `You are a Career AI Assistant powered by Matchly, an AI-driven recruitment and career development platform. Your role is to help job seekers with:

1. Career guidance and planning
2. Resume optimization suggestions
3. Job search strategies
4. Interview preparation tips
5. Skill development recommendations
6. Career transition advice
7. Salary negotiation guidance
8. Professional networking tips
9. Industry insights and trends
10. Work-life balance advice

Be encouraging, professional, and actionable in your responses. Provide specific, practical advice tailored to the user's questions. Keep responses concise but comprehensive.`;

const suggestedPrompts = [
  { icon: <Briefcase className="w-5 h-5" />, text: "How do I optimize my resume for ATS?" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "What skills should I learn for career growth?" },
  { icon: <FileText className="w-5 h-5" />, text: "Help me prepare for a job interview" },
  { icon: <MessageSquare className="w-5 h-5" />, text: "How do I negotiate a better salary?" },
];

export const CareerAIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! 👋 I'm your Career AI Assistant powered by Matchly. I'm here to help you with:

• Resume optimization and ATS compatibility
• Career path guidance and planning
• Interview preparation and tips
• Skill development recommendations
• Job search strategies
• Professional growth advice

What would you like to discuss today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Try backend API first (more secure)
      let aiResponse = '';
      let useBackend = true;

      try {
        const backendResponse = await fetch(BACKEND_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: messageText,
            history: messages.map(m => ({ role: m.role, content: m.content }))
          })
        });

        if (backendResponse.ok) {
          const backendData = await backendResponse.json();
          if (backendData.success && backendData.response) {
            aiResponse = backendData.response;
          } else {
            throw new Error('Backend returned invalid response');
          }
        } else {
          throw new Error('Backend unavailable');
        }
      } catch (backendError) {
        console.log('Backend unavailable, using direct API call');
        useBackend = false;
      }

      // Fallback to direct Gemini API call if backend fails
      if (!useBackend) {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: CAREER_SYSTEM_PROMPT },
                  { text: `User: ${messageText}\n\nAssistant:` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          aiResponse = data.candidates[0].content.parts[0].text;
        } else {
          throw new Error('Invalid response from AI');
        }
      }

      // Add AI response to messages
      if (aiResponse) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an error processing your request. Please try again or rephrase your question.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <Navbar />
      
      {/* Header */}
      <div className="pt-28 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Career AI Assistant
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Get personalized career advice powered by advanced AI
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden"
          style={{ height: 'calc(100vh - 360px)', minHeight: '500px' }}
        >
          {/* Messages Area */}
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-primary-600 to-primary-500' 
                        : 'bg-gradient-to-br from-secondary-600 to-accent-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`rounded-2xl px-5 py-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white'
                          : 'bg-neutral-800/80 text-neutral-100 border border-neutral-700'
                      }`}>
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className="text-xs text-neutral-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary-600 to-accent-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-neutral-800/80 border border-neutral-700 rounded-2xl px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-secondary-400 animate-spin" />
                      <span className="text-neutral-400 text-sm">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts (shown when chat is empty) */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-neutral-400 mb-3">Try asking:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="flex items-center gap-2 p-3 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 rounded-xl text-left text-sm text-neutral-300 transition-all hover:scale-[1.02]"
                    >
                      <div className="text-secondary-400">{prompt.icon}</div>
                      <span>{prompt.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-neutral-800 p-4 bg-neutral-900/80">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about your career..."
                    rows={1}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    style={{ maxHeight: '120px' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 disabled:from-neutral-700 disabled:to-neutral-600 disabled:cursor-not-allowed text-white rounded-xl transition-all hover:scale-105 disabled:hover:scale-100 flex items-center gap-2 font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
              <p className="text-xs text-neutral-500 mt-2 text-center">
                Powered by Google Gemini AI • Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};
