import { Activity, LayoutDashboard, Database, TrendingUp, Sparkles, AlertCircle, ShieldCheck, ArrowRight, Table, Fingerprint, Users, Box } from 'lucide-react';
import { useState } from 'react';
import AIEngineInterface from './AIEngineInterface.tsx';
import { AIAction } from '../../services/aiService.ts';

type AdminModule = 'hub' | 'engine';

export default function AdminAITools() {
  const [activeModule, setActiveModule] = useState<AdminModule>('hub');
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);

  const tools = [
    { id: 'timetable' as AIAction, label: 'Timetable Gen', icon: Table, desc: 'Auto-create clash-free schedules for all departments.', placeholder: 'Generate a weekly schedule for CSE Year 2 with specialized labs on Fri...' },
    { id: 'allocation' as AIAction, label: 'Batch Allocation', icon: Users, desc: 'Rank-based and learning-based student grouping.', placeholder: 'Allocate 120 new freshmen into 4 batches based on entrance ranks...' },
    { id: 'attendance_pred' as AIAction, label: 'Attendance Risk', icon: Fingerprint, desc: 'Identify shortage risks before they happen.', placeholder: 'Analyze patterns for EEE department and predict shortages for exams...' },
    { id: 'dropout_pred' as AIAction, label: 'Dropout Detection', icon: AlertCircle, desc: 'Identify high-risk students based on multi-factor data.', placeholder: 'Scan attendance and mid-term grades for students at risk...' },
    { id: 'dashboard_insights' as AIAction, label: 'Institutional Audit', icon: LayoutDashboard, desc: 'Deep dive into faculty performance & weak subjects.', placeholder: 'Identify subjects with more than 30% failure rate last sem...' },
    { id: 'seating' as AIAction, label: 'Exam Seating', icon: Box, desc: 'Anti-cheating exam seating arrangements.', placeholder: 'Generate a 6-col seating plan for Lab A preventing same-subject proximity...' },
    { id: 'optimization' as AIAction, label: 'Load Balancing', icon: TrendingUp, desc: 'Faculty load balancing and resource optimization.', placeholder: 'Optimize faculty assignments to ensure no more than 18 hours/week...' }
  ];

  if (selectedAction) {
    const tool = tools.find(t => t.id === selectedAction);
    return (
      <AIEngineInterface 
        action={selectedAction}
        title={tool?.label || 'AI Engine'}
        description={tool?.desc || ''}
        contextPlaceholder={tool?.placeholder}
        onBack={() => setSelectedAction(null)}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Operational Intelligence</h2>
          <p className="text-text-secondary text-sm font-medium">Powering institution-wide efficiency through specialized AI engines.</p>
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
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Launch Engine <ArrowRight size={12} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
