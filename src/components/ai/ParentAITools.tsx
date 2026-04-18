import { Heart, Bell, Activity, ArrowRight, UserCheck } from 'lucide-react';
import { useState } from 'react';
import AIEngineInterface from './AIEngineInterface.tsx';
import { AIAction } from '../../services/aiService.ts';

export default function ParentAITools() {
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);

  const tools = [
    { id: 'progress_summary' as AIAction, label: 'Child Progress Summary', icon: UserCheck, desc: 'Get a clear, automated AI breakdown of your child academics.' },
    { id: 'alert_pred' as AIAction, label: 'Predictive Alerts', icon: Bell, desc: 'AI predictions for attendance or marks shortages before they happen.' },
    { id: 'behavior_pred' as AIAction, label: 'Behavioral Insights', icon: Activity, desc: 'AI analysis of student behavior and performance correlation.' }
  ];

  if (selectedAction) {
    const tool = tools.find(t => t.id === selectedAction);
    return (
      <AIEngineInterface 
        action={selectedAction}
        title={tool?.label || 'Parental AI'}
        description={tool?.desc || ''}
        onBack={() => setSelectedAction(null)}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Parental Intelligence</h2>
          <p className="text-text-secondary text-sm font-medium">Monitoring tools powered by predictive AI for your child's success.</p>
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
