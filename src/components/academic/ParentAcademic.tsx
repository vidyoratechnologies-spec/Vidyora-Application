import { GraduationCap, BookOpen, Clock, ArrowRight, User, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function ParentAcademic() {
  const children = [
    { name: 'Arjun Kudikala', grade: 'Grade 10-A', attendance: '96%', gpa: '8.4', status: 'Excellent' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Ward Performance</h2>
          <p className="text-text-secondary text-sm font-medium">Monitor your child's academic journey and institutional engagement.</p>
      </section>

      {/* Ward Cards */}
      {children.map((child, idx) => (
        <div key={idx} className="bg-bg-secondary rounded-3xl p-6 border border-border-subtle space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-bg-primary flex items-center justify-center text-brand font-headline font-black text-2xl border border-border-subtle">
                    {child.name[0]}
                </div>
                <div>
                   <h3 className="text-xl font-bold font-headline text-text-primary">{child.name}</h3>
                   <p className="text-xs text-text-secondary font-bold uppercase tracking-widest">{child.grade}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-bg-primary rounded-2xl">
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">Attendance</p>
                    <p className="text-xl font-black font-headline text-emerald-500">{child.attendance}</p>
                </div>
                <div className="p-4 bg-bg-primary rounded-2xl">
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">Current GPA</p>
                    <p className="text-xl font-black font-headline text-brand-accent">{child.gpa}</p>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border-subtle">
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={14} className="text-brand-accent" />
                    Latest Assessment
                </h4>
                <div className="p-4 bg-bg-primary rounded-xl border border-border-subtle flex justify-between items-center">
                    <div>
                        <p className="text-sm font-bold text-text-primary">Mathematics Mid-Term</p>
                        <p className="text-[10px] text-text-secondary font-bold uppercase mt-0.5">Scored 92/100</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 uppercase tracking-widest">
                        Distinction
                    </span>
                </div>
            </div>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('export-pdf', { 
                detail: { 
                  title: `Report Card: ${child.name}`, 
                  content: [
                    `Student: ${child.name}`,
                    `Grade: ${child.grade}`,
                    `Attendance: ${child.attendance}`,
                    `GPA: ${child.gpa}`,
                    `Status: ${child.status}`,
                    '',
                    'Latest Assessment:',
                    'Mathematics Mid-Term: 92/100 (Distinction)',
                    '',
                    'Professor Feedback: Excellent performance and consistency in class participation.'
                  ] 
                } 
              }))}
              className="w-full py-4 bg-bg-primary hover:bg-bg-card rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-border-subtle flex items-center justify-center gap-2 text-text-primary"
            >
                Detailed Report Card <ArrowRight size={14} />
            </button>
        </div>
      ))}
    </div>
  );
}
