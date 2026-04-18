import { BrainCircuit, PenTool, Sparkles, Activity, FileSpreadsheet, PlusCircle, ArrowRight, FileText, ClipboardList, CheckCircle, BarChart } from 'lucide-react';
import { useState } from 'react';
import AIEngineInterface from './AIEngineInterface.tsx';
import { AIAction } from '../../services/aiService.ts';

export default function FacultyAITools() {
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);

  const tools = [
    { id: 'question_gen' as AIAction, label: 'Question Gen', icon: BrainCircuit, desc: 'Generate difficulty-balanced academic questions and model answers.' },
    { id: 'notes_gen' as AIAction, label: 'Notes Generator', icon: FileText, desc: 'Convert complex syllabus topics into comprehensive lecture notes.' },
    { id: 'assignment_gen' as AIAction, label: 'Assignment Creator', icon: ClipboardList, desc: 'Create engaging and unique academic assignments for students.' },
    { id: 'evaluation' as AIAction, label: 'Answer Evaluation', icon: CheckCircle, desc: 'Evaluate student answers with automated scoring and feedback suggestions.' },
    { id: 'dashboard_insights' as AIAction, label: 'Performance Analytics', icon: BarChart, desc: 'Identify student growth trends and academic weak spots across batches.' }
  ];

  if (selectedAction) {
    const tool = tools.find(t => t.id === selectedAction);
    return (
      <AIEngineInterface 
        action={selectedAction}
        title={tool?.label || 'Faculty AI'}
        description={tool?.desc || ''}
        onBack={() => setSelectedAction(null)}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Teaching Intelligence</h2>
          <p className="text-text-secondary text-sm font-medium">Streamline your academic workflow with AI-powered content and evaluation engines.</p>
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
