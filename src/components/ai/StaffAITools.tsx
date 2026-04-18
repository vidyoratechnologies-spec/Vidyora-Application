import { CheckSquare, Workflow, ShieldAlert, ArrowRight, Zap } from 'lucide-react';
import { useState } from 'react';
import AIEngineInterface from './AIEngineInterface.tsx';
import { AIAction } from '../../services/aiService.ts';

export default function StaffAITools() {
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);

  const tools = [
    { id: 'planner' as AIAction, label: 'Task Automation', icon: CheckSquare, desc: 'AI-generated task reminders and workflow schedules.' },
    { id: 'optimization' as AIAction, label: 'Workflow AI', icon: Workflow, desc: 'Optimization of administrative workflows and processes.' },
    { id: 'anomaly' as AIAction, label: 'Operational Alerts', icon: ShieldAlert, desc: 'Detect anomalies in operational performance and resource use.' }
  ];

  if (selectedAction) {
    const tool = tools.find(t => t.id === selectedAction);
    return (
      <AIEngineInterface 
        action={selectedAction}
        title={tool?.label || 'Staff AI'}
        description={tool?.desc || ''}
        onBack={() => setSelectedAction(null)}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Staff Intelligence</h2>
          <p className="text-text-secondary text-sm font-medium">Workflow automation and operational intelligence for institution support staff.</p>
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
