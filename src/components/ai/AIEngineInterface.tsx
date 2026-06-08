import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Bot, ChevronLeft, Download, Grid, Calendar as CalendarIcon, FileText, BarChart3, Users, Layout } from 'lucide-react';
import { aiService, AIAction } from '../../services/aiService';
import Markdown from 'react-markdown';

interface AIEngineInterfaceProps {
  action: AIAction;
  title: string;
  description: string;
  contextPlaceholder?: string;
  onBack?: () => void;
}

export default function AIEngineInterface({ action, title, description, contextPlaceholder, onBack }: AIEngineInterfaceProps) {
  const [context, setContext] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const response = await aiService.generate({ action, context });
    setResult(response);
    setIsLoading(false);
  };

  // Specialized Renderers
  const renderVisualizer = () => {
    if (!result) return null;

    switch (action) {
      case 'seating':
        return (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 pt-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className={`aspect-square rounded-xl border flex items-center justify-center text-[10px] font-black ${i % 3 === 0 ? 'bg-brand/20 border-brand text-brand-accent' : 'bg-bg-primary border-border-subtle text-text-secondary'}`}
              >
                {i % 3 === 0 ? `ID: ${100 + i}` : 'EMPTY'}
              </motion.div>
            ))}
          </div>
        );
      case 'timetable':
        const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
        const periods = ['09:00', '10:00', '11:00', '12:00', '14:00'];
        return (
          <div className="overflow-x-auto pt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-bg-primary border border-border-subtle text-[10px] font-bold text-text-secondary uppercase tracking-widest">Time</th>
                  {days.map(d => <th key={d} className="p-3 bg-bg-primary border border-border-subtle text-[10px] font-bold text-text-secondary uppercase tracking-widest">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {periods.map((p, i) => (
                  <tr key={p}>
                    <td className="p-3 border border-border-subtle text-[10px] font-bold text-brand-accent">{p}</td>
                    {days.map(d => (
                      <td key={d} className="p-3 border border-border-subtle text-[10px] text-text-primary">
                        {i === 2 ? 'LUNCH' : i % 2 === 0 ? 'Maths' : 'Physics'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'benchmarking':
      case 'forecasting':
        return (
          <div className="space-y-4 pt-6">
             {[85, 92, 78, 95].map((val, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                   <span>Metric {i + 1}</span>
                   <span>{val}%</span>
                 </div>
                 <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-brand" 
                    />
                 </div>
               </div>
             ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getActionIcon = () => {
    if (action === 'seating') return <Grid size={24} />;
    if (action === 'timetable') return <CalendarIcon size={24} />;
    if (action === 'benchmarking') return <BarChart3 size={24} />;
    if (action === 'allocation') return <Users size={24} />;
    return <Bot size={24} />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-brand-accent transition-colors text-xs font-bold uppercase tracking-widest">
          <ChevronLeft size={16} /> Back to Hub
        </button>
      )}

      <div className="bg-bg-secondary border border-border-subtle rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-brand group-hover:scale-110 transition-transform duration-1000">
           <Sparkles size={120} />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                {getActionIcon()}
             </div>
             <div>
                <h2 className="text-2xl font-black font-headline tracking-tighter text-text-primary">{title}</h2>
                <p className="text-text-secondary text-sm">{description}</p>
             </div>
          </div>

          <div className="space-y-4 pt-4">
             <textarea 
               className="w-full bg-bg-primary border border-border-subtle rounded-2xl p-4 text-sm text-text-primary focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-text-secondary/50 min-h-[120px]"
               placeholder={contextPlaceholder || "Provide more context for better results..."}
               value={context}
               onChange={(e) => setContext(e.target.value)}
             />
             <button 
               onClick={handleGenerate}
               disabled={isLoading}
               className="w-full h-14 bg-brand hover:brightness-110 text-white rounded-2xl font-black font-headline shadow-lg shadow-brand/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
             >
               {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
               {isLoading ? 'Processing Intelligence...' : 'Generate AI Insights'}
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bg-secondary border border-border-subtle rounded-3xl p-8 space-y-6 shadow-2xl ring-1 ring-inset ring-brand/10"
          >
            <div className="flex justify-between items-center border-b border-border-subtle pb-4">
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-accent text-sm fill-1">verified</span>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">Validated AI Output</span>
               </div>
               <div className="flex gap-2">
                 <button 
                   onClick={() => window.dispatchEvent(new CustomEvent('export-pdf', { detail: { title: title + ' - AI Output', content: result } }))}
                   className="p-2 bg-bg-primary hover:bg-bg-card rounded-xl text-text-secondary transition-colors group relative"
                 >
                    <Download size={16} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-bg-primary text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">PDF</span>
                 </button>
                  <button className="p-2 bg-bg-primary hover:bg-bg-card rounded-xl text-text-secondary transition-colors">
                    <FileText size={16} />
                 </button>
               </div>
            </div>

            {/* Independent Visualizer Layer */}
            {renderVisualizer()}

            <div className="markdown-body p-6 bg-bg-primary/30 rounded-2xl">
              <Markdown>{result}</Markdown>
            </div>
            
            <div className="pt-4 border-t border-border-subtle flex gap-4">
                <button 
                  onClick={() => setResult(null)}
                  className="flex-1 py-3 bg-bg-primary border border-border-subtle hover:bg-bg-card rounded-xl text-xs font-bold uppercase tracking-widest text-text-secondary transition-colors"
                >
                    Discard
                </button>
                <button className="flex-1 py-3 bg-brand/10 hover:bg-brand/20 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-accent transition-colors">
                    Save to Archive
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
