import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface ExamDetailProps {
  onBack: () => void;
}

const mainExams = [
  { title: 'III B.TECH II SEMESTER R22 REGULAR EXAMINATION APRIL 2026', date: '02 March, 2026 11:05 PM', status: 'success' },
  { title: 'III B.TECH I SEMESTER R22 REGULAR EXAMINATION DECEMBER 2025', date: '08 September, 2025 04:24 PM', status: 'success' },
  { title: 'II B.TECH II SEMESTER R22 REGULAR EXAMINATION JUNE 2025', date: '11 March, 2025 09:00 PM', status: 'success' },
  { title: 'II B.TECH I SEMESTER R22 REGULAR EXAMINATION DECEMBER 2024', date: '25 October, 2024 04:35 PM', status: 'success' },
];

const midExams = [
  { title: 'III B.TECH II SEM R22 MID I', date: '19 January, 2026 04:29 PM', status: 'success' },
  { title: 'III B.TECH I SEM R22 MID II', date: '25 October, 2025 09:19 AM', status: 'success' },
  { title: 'III B.TECH I SEM R22 MID I', date: '25 August, 2025 10:40 AM', status: 'success' },
  { title: 'II B.TECH II SEM R22 MID I', date: '20 February, 2025 10:49 AM', status: 'success' },
  { title: 'I B.TECH II SEM R22 MID II', date: '13 June, 2024 03:34 PM', status: 'success' },
];

export default function ExamDetail({ onBack }: ExamDetailProps) {
  const [activeTab, setActiveTab] = useState<'MAINS' | 'MIDS'>('MAINS');

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {/* Header */}
      <div className="bg-bg-secondary px-6 pt-12 pb-4 flex items-center gap-4 border-b border-border-subtle sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-text-primary">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <img src="https://picsum.photos/seed/cmr/100/100" alt="CMR" className="w-6 h-6 rounded-sm opacity-80" referrerPolicy="no-referrer" />
           </div>
           <h1 className="text-xl font-bold font-headline text-text-primary">My Exams</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-bg-secondary w-full flex border-b border-border-subtle sticky top-[84px] z-10">
        {(['MAINS', 'MIDS'] as const).map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-xs font-bold tracking-widest transition-all relative ${activeTab === tab ? 'text-brand' : 'text-text-secondary'}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 w-full h-1 bg-brand" />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === 'MAINS' ? (
            <motion.div 
               key="mains" 
               initial={{ opacity: 0, y: 10 }} 
               animate={{ opacity: 1, y: 0 }} 
               exit={{ opacity: 0, y: -10 }}
               className="space-y-6"
            >
              {/* Summary Grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Total Exams', val: '6', color: 'text-brand' },
                  { label: 'Main Exams', val: '6', color: 'text-text-primary' },
                  { label: 'Supple Exams', val: '0', color: 'text-text-primary' },
                ].map((s, i) => (
                  <div key={i} className="bg-bg-secondary p-4 rounded-xl border border-border-subtle text-center shadow-sm">
                    <p className={`text-2xl font-black font-headline ${s.color}`}>{s.val}</p>
                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-tight mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Exam List */}
              <div className="space-y-4">
                {mainExams.map((exam, idx) => (
                  <div key={idx} className="bg-bg-secondary p-6 rounded-xl border border-border-subtle shadow-sm space-y-4">
                    <h3 className="text-sm font-bold font-headline leading-relaxed text-text-primary">{exam.title}</h3>
                    <div className="space-y-3 pt-2 border-t border-border-subtle">
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Applied Date</p>
                        <p className="text-xs font-medium">{exam.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 capitalize">{exam.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
               key="mids" 
               initial={{ opacity: 0, y: 10 }} 
               animate={{ opacity: 1, y: 0 }} 
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
            >
              <div className="space-y-4">
                {midExams.map((exam, idx) => (
                  <div key={idx} className="bg-bg-secondary p-6 rounded-xl border border-border-subtle shadow-sm space-y-4">
                    <h3 className="text-sm font-bold font-headline text-text-primary">{exam.title}</h3>
                    <div className="space-y-3 pt-2 border-t border-border-subtle">
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Applied Date</p>
                        <p className="text-xs font-medium">{exam.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 capitalize">{exam.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
