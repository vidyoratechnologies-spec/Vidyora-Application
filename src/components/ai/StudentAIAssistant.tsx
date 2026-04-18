import { Menu, Settings, Sparkles, BookOpen, Activity, ArrowRight, Bot, FileText, Calendar, Zap, TrendingUp, Search, Puzzle, ChevronLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserRole } from '../../types.ts';
import { aiService, AIAction } from '../../services/aiService.ts';
import AIEngineInterface from './AIEngineInterface.tsx';
import Markdown from 'react-markdown';

export default function StudentAIAssistant() {
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);
  const [showChat, setShowChat] = useState(false);

  const tools = [
    { id: 'summarizer' as AIAction, label: 'Notes Summarizer', icon: FileText, desc: 'Convert long academic PDFs into short, digestible notes.' },
    { id: 'planner' as AIAction, label: 'Study Planner', icon: Calendar, desc: 'Auto-generate personalized daily/weekly study schedules.' },
    { id: 'simplifier' as AIAction, label: 'Concept Simplifier', icon: Zap, desc: 'Break down complex topics into easy-to-understand explanations.' },
    { id: 'performance_pred' as AIAction, label: 'Performance Tracker', icon: TrendingUp, desc: 'Predict your expected rank and scores based on current data.' },
    { id: 'weak_topic_detection' as AIAction, label: 'Weak Spot Finder', icon: Search, desc: 'Identify your weak topics and focus areas automatically.' },
    { id: 'flashcards' as AIAction, label: 'Flashcard Gen', icon: Puzzle, desc: 'Automate your revision with AI-generated active recall cards.' }
  ];

  if (selectedAction) {
    const tool = tools.find(t => t.id === selectedAction);
    return (
      <AIEngineInterface 
        action={selectedAction}
        title={tool?.label || 'Learning AI'}
        description={tool?.desc || ''}
        onBack={() => setSelectedAction(null)}
      />
    );
  }

  if (showChat) {
     return <StudentAIChat onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Learning Intelligence</h2>
          <p className="text-text-secondary text-sm font-medium">Personalized AI engines designed to accelerate your academic growth.</p>
        </section>

        {/* Chat Entry Card */}
        <section 
          onClick={() => setShowChat(true)}
          className="bg-brand p-8 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-2xl shadow-brand/20 active:scale-[0.98] transition-all"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20 text-white group-hover:scale-120 transition-transform duration-1000 rotate-12">
             <Bot size={140} />
          </div>
          <div className="relative z-10 space-y-4">
             <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                <Bot size={28} />
             </div>
             <div>
                <h3 className="text-2xl font-black font-headline text-white tracking-tight">AI Study Buddy</h3>
                <p className="text-white/80 text-sm font-medium">Chat with Vidyora AI for instant doubts clearing and support.</p>
             </div>
             <div className="pt-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/90">
                Start Conversation <ArrowRight size={16} />
             </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <button 
              key={tool.id}
              onClick={() => setSelectedAction(tool.id)}
              className="flex flex-col items-start gap-4 p-6 bg-bg-secondary border border-border-subtle rounded-3xl group hover:border-brand-accent/30 transition-all text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 text-brand group-hover:scale-110 transition-transform">
                 <tool.icon size={64} />
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                <tool.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold font-headline text-text-primary group-hover:text-brand-accent transition-colors">{tool.label}</h4>
                <p className="text-xs text-text-secondary mt-1">{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>
    </div>
  );
}

function StudentAIChat({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<any[]>([
    { role: 'ai', content: "Hi! I'm your Vidyora AI Study Buddy. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    const response = await aiService.generate({ action: 'summarizer', context: `Handle this as a student doubt query: ${userMsg}` });
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
       <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-brand-accent transition-colors text-xs font-bold uppercase tracking-widest mb-6">
          <ChevronLeft size={16} /> Hub
        </button>
        
        <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-32">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'flex-col gap-2'}`}>
              <div className={`p-5 rounded-2xl max-w-[90%] text-sm leading-relaxed shadow-xl ${msg.role === 'user' ? 'bg-brand text-white rounded-tr-none' : 'bg-bg-secondary border border-border-subtle text-text-primary rounded-tl-none markdown-body'}`}>
                {msg.role === 'ai' ? <Markdown>{msg.content}</Markdown> : msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="p-4 bg-bg-secondary border border-border-subtle rounded-2xl w-24 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:0.4s]"></span>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-4 w-full">
            <div className="bg-bg-secondary/90 backdrop-blur-xl p-2 rounded-2xl border border-border-subtle shadow-2xl flex items-center gap-2 ring-1 ring-inset ring-brand/10">
                <input 
                    className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary/50" 
                    placeholder="Ask me anything..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    </div>
  );
}
