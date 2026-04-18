import { BarChart3, LineChart, ShieldAlert, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import AIEngineInterface from './AIEngineInterface.tsx';
import { AIAction } from '../../services/aiService.ts';

export default function SuperAdminAITools() {
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);

  const tools = [
    { id: 'benchmarking' as AIAction, label: 'Performance Benchmark', icon: BarChart3, desc: 'Compare performance across all institutions and departments.', placeholder: 'Compare CSE vs EEE department results for 2025...' },
    { id: 'forecasting' as AIAction, label: 'Financial Forecaster', icon: LineChart, desc: 'Predict revenue growth and financial trends across branches.', placeholder: 'Predict next quarter tuition revenue based on 10% enrollment growth...' },
    { id: 'insights' as AIAction, label: 'Growth Insights', icon: TrendingUp, desc: 'Strategic institutional growth trends and risk alerts.', placeholder: 'How can we scale our research facility output by 20%?' },
    { id: 'anomaly' as AIAction, label: 'Anomaly Detection', icon: ShieldAlert, desc: 'AI-powered detection of unusual performance or revenue drops.', placeholder: 'Scan for enrollment discrepancies in the last 30 days...' },
    { id: 'recommendations' as AIAction, label: 'Decision Engine', icon: Zap, desc: 'Strategic recommendations for expansion or improvement.', placeholder: 'Evaluate feasibility of opening a new branch in North Zone...' }
  ];

  if (selectedAction) {
    const tool = tools.find(t => t.id === selectedAction);
    return (
      <AIEngineInterface 
        action={selectedAction}
        title={tool?.label || 'Strategic AI'}
        description={tool?.desc || ''}
        contextPlaceholder={tool?.placeholder}
        onBack={() => setSelectedAction(null)}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Strategic Intelligence</h2>
          <p className="text-text-secondary text-sm font-medium">Organization-level predictive modeling and decision support systems.</p>
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
