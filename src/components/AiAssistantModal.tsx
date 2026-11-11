import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  PhoneCall, 
  ShieldCheck, 
  Clock,
  Building2,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/apiClient';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Namaste! I am the ASAW Legal Intelligence Assistant. How can I help you today with company registration, GST filing, trademark protection, or annual compliance in India?',
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputMessage.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build history for multi-turn Gemini reasoning
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.sender === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: m.text }],
        }));

      const res = await api.askAiSupport(query, history);
      
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: res.reply || 'Thank you for your question. You can also reach our senior advisors at +91 94159 94473.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'ai',
        text: 'I am experiencing a momentary network delay. Please feel free to call our central office near Ram Katha Park, Gomti Nagar, Lucknow at +91 94159 94473 or email asawconsultancy@gmail.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'How do I build a custom business website?',
    'What business operations can I automate with n8n?',
    'Documents needed for Private Limited Company?',
    'What is the threshold for GST Registration in India?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-xl h-[85vh] sm:h-[650px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/50 flex items-center justify-center text-amber-300 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight text-white">
                  ASAW AI Legal &amp; Automation Intelligence
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Powered by Gemini AI · HQ: Ram Katha Park, Gomti Nagar, Lucknow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                  isUser ? 'bg-slate-800 text-white' : 'bg-blue-700 text-amber-300'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-blue-700 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs whitespace-pre-line'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1.5 ${isUser ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-700 text-amber-300 flex items-center justify-center text-xs shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-xs shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputMessage(prompt)}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Ask anything about company registration, tax, or legal filings..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="w-10 h-10 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Escalation Banner */}
        <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Need human review?</span>
          </div>
          <a
            href="tel:+919415994473"
            className="font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
            title="Call CA Specialist: +91 94159 94473"
          >
            <span>Talk with CA (+91 94159 94473)</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
