import { Receipt, BarChart2, PieChart, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';
import { useState } from 'react';
import AIEngineInterface from './AIEngineInterface.tsx';
import { AIAction } from '../../services/aiService.ts';

export default function AccountantAITools() {
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);

  const tools = [
    { id: 'forecasting' as AIAction, label: 'Revenue Forecasting', icon: BarChart2, desc: 'Predict future fee collection and institutional revenue.', placeholder: 'Forecast fee collection for Autumn 2026 based on previous trends...' },
    { id: 'payment_behavior' as AIAction, label: 'Payment Behavior', icon: CreditCard, desc: 'AI analysis of fee payment patterns and late risk identification.', placeholder: 'Analyze payment delays for Science department students...' },
    { id: 'expense_opt' as AIAction, label: 'Expense Optimizer', icon: PieChart, desc: 'Identify institutional cost-saving opportunities through AI.', placeholder: 'Identify top 3 cost-cutting areas in electricity and lab maintenance...' },
    { id: 'allocation' as AIAction, label: 'Budget Allocation', icon: Receipt, desc: 'AI-assisted departmental budget and resource allocation.', placeholder: 'Draft a 2.5 Cr budget for the upcoming Sports & Arts festival...' }
  ];

  if (selectedAction) {
    const tool = tools.find(t => t.id === selectedAction);
    return (
      <AIEngineInterface 
        action={selectedAction}
        title={tool?.label || 'Financial AI'}
        description={tool?.desc || ''}
        contextPlaceholder={tool?.placeholder}
        onBack={() => setSelectedAction(null)}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Financial Intelligence</h2>
          <p className="text-text-secondary text-sm font-medium">Predictive accounting and expense optimization for the organization.</p>
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
