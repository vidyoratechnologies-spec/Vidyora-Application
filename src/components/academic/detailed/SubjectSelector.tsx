import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Download, PlayCircle } from 'lucide-react';

interface SubjectSelectorProps {
  onBack: () => void;
  mode: 'notes' | 'test';
}

const subjects = [
  { id: 1, name: 'Advanced Thermodynamics', instructor: 'Prof. Sharma', topics: 12 },
  { id: 2, name: 'Machine Learning', instructor: 'Prof. Lal', topics: 8 },
  { id: 3, name: 'Natural Language Processing', instructor: 'Prof. Revathi', topics: 15 },
  { id: 4, name: 'Computer Networks', instructor: 'Prof. Kumar', topics: 10 },
];

export default function SubjectSelector({ onBack, mode }: SubjectSelectorProps) {
  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {/* Header */}
      <div className="bg-bg-secondary px-6 pt-12 pb-4 flex items-center gap-4 border-b border-border-subtle sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-text-primary">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold font-headline text-text-primary">
          Select {mode === 'notes' ? 'Subject for Notes' : 'Subject for Test'}
        </h1>
      </div>

      <div className="p-6 space-y-4">
        {subjects.map((sub, idx) => (
          <motion.div 
            key={sub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-secondary p-6 rounded-2xl border border-border-subtle shadow-sm flex items-center justify-between group hover:border-brand/40 transition-all cursor-pointer"
            onClick={() => {
              if (mode === 'notes') {
                window.dispatchEvent(new CustomEvent('export-pdf', { 
                  detail: { 
                    title: `${sub.name} - Study Notes`, 
                    content: [
                      `Subject: ${sub.name}`,
                      `Instructor: ${sub.instructor}`,
                      `Chapters Covered: 1 to ${sub.topics}`,
                      '',
                      'Core Concepts:',
                      '- Fundamental Principles',
                      '- Key Methodologies',
                      '- Case Studies and Applications',
                      '',
                      'Summary of recent lectures included. For detailed references, please visit the library.'
                    ] 
                  } 
                }));
              } else {
                window.dispatchEvent(new CustomEvent('start-quiz', { detail: { grade: '12th' } }));
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                 {mode === 'notes' ? <BookOpen size={24} /> : <PlayCircle size={24} />}
              </div>
              <div>
                <h3 className="font-bold font-headline">{sub.name}</h3>
                <p className="text-xs text-text-secondary">{sub.instructor} • {sub.topics} topics</p>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-bg-primary text-text-secondary group-hover:text-brand transition-colors">
              {mode === 'notes' ? <Download size={20} /> : <ArrowLeft className="rotate-180" size={20} />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
