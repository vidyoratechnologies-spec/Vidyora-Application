import { motion } from 'motion/react';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface AttendanceDetailProps {
  onBack: () => void;
}

const attendanceData = [
  { subject: 'PR', full: 'PATTERN RECOGNITION', percentage: 72.31, attended: 47, total: 65, color: '#fcd34d' },
  { subject: 'CN', full: 'COMPUTER NETWORKS', percentage: 73.53, attended: 50, total: 68, color: '#fcd34d' },
  { subject: 'ML', full: 'MACHINE LEARNING', percentage: 80.33, attended: 49, total: 61, color: '#86efac' },
  { subject: 'NLP', full: 'NATURAL LANGUAGE PROCESSING', percentage: 75.36, attended: 52, total: 69, color: '#86efac' },
  { subject: 'ML LAB', full: 'MACHINE LEARNING LAB', percentage: 84.62, attended: 11, total: 13, color: '#86efac' },
  { subject: 'CN LAB', full: 'COMPUTER NETWORKS LAB', percentage: 75, attended: 12, total: 16, color: '#86efac' },
  { subject: 'NLP LAB', full: 'NATURAL LANGUAGE PROCESSING LAB', percentage: 70.84, attended: 13, total: 18, color: '#fcd34d' },
];

export default function AttendanceDetail({ onBack }: AttendanceDetailProps) {
  return (
    <div className="min-h-screen bg-bg-primary pb-10">
      {/* Header */}
      <div className="bg-bg-secondary px-6 pt-12 pb-4 flex items-center gap-4 border-b border-border-subtle sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-text-primary">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <img src="https://picsum.photos/seed/cmr/100/100" alt="CMR" className="w-6 h-6 rounded-sm opacity-80" referrerPolicy="no-referrer" />
           </div>
           <h1 className="text-xl font-bold font-headline text-text-primary">Attendance</h1>
        </div>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Semester Selector */}
        <div className="flex items-center justify-between py-2 border-b border-border-subtle group cursor-pointer">
          <span className="text-sm font-semibold text-text-primary">III Year II Semester</span>
          <ChevronDown size={18} className="text-text-secondary group-hover:text-brand transition-colors" />
        </div>

        {/* Top Summary Card */}
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border-subtle shadow-sm flex items-center gap-8">
           <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-brand/5" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 * (1 - 0.7642)} className="text-emerald-400" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black font-headline">76.42%</span>
              </div>
           </div>
           <div className="flex-1">
              <h2 className="text-3xl font-black font-headline leading-tight tracking-tight">III Year</h2>
              <p className="text-text-secondary font-bold uppercase tracking-widest text-[10px] mt-1">II Semester</p>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
           {[
             { label: 'TOTAL', val: '386', color: 'text-text-primary' },
             { label: 'ATTENDED', val: '295', color: 'text-brand' },
             { label: 'ABSENT', val: '91', color: 'text-orange-500' },
           ].map((s, i) => (
             <div key={i} className="bg-bg-secondary p-4 rounded-xl border border-border-subtle text-center shadow-sm">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{s.label}</p>
                <p className={`text-xl font-black font-headline ${s.color}`}>{s.val}</p>
             </div>
           ))}
        </div>

        {/* Bar Chart Section */}
        <div className="bg-bg-secondary rounded-2xl p-4 border border-border-subtle shadow-sm h-64 overflow-hidden">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'var(--text-secondary)' }} />
                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'var(--text-secondary)' }} />
                <Bar dataKey="percentage" radius={[4, 4, 0, 0]} barSize={20}>
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="var(--text-secondary)" opacity={0.2} />
                  ))}
                </Bar>
              </BarChart>
           </ResponsiveContainer>
        </div>

        {/* Detailed Subject List */}
        <div className="space-y-3">
           {attendanceData.map((s, idx) => (
             <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.05 }}
               key={idx} 
               onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: `${s.full} Details`, content: `Attendance History: Attended ${s.attended} classes out of ${s.total}. Missing sessions occurred on Oct 11, Oct 15, and Nov 2.` }}))}
               className="bg-bg-secondary p-5 rounded-2xl border border-border-subtle shadow-sm cursor-pointer hover:bg-bg-card transition-colors group"
             >
                <div className="flex justify-between items-start mb-3">
                   <h3 className="text-xs font-bold uppercase tracking-tight max-w-[80%] text-text-primary group-hover:text-brand transition-colors">{s.full}</h3>
                   <div className="w-6 h-6 rounded-full border border-brand/20 flex items-center justify-center text-brand group-hover:bg-brand/10 transition-colors">
                      <ChevronRight size={14} />
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex-grow h-2 bg-text-secondary/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.percentage}%`, backgroundColor: s.color }} />
                   </div>
                   <span className="text-sm font-bold w-14 text-right text-text-primary">{s.percentage}%</span>
                </div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-2">
                   {s.attended} out of {s.total} sessions attended
                </p>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
