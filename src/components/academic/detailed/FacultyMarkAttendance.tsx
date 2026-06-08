import { ArrowLeft, Check, X, Clock, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface FacultyMarkAttendanceProps {
  onBack: () => void;
}

type AttendanceStatus = 'present' | 'absent' | 'late' | 'none';

interface StudentData {
  id: string;
  name: string;
  rollNumber: string;
  status: AttendanceStatus;
}

const initialStudents: StudentData[] = [
  { id: '1', name: 'John Doe', rollNumber: 'BT-2022-001', status: 'none' },
  { id: '2', name: 'Sarah Miller', rollNumber: 'BT-2022-002', status: 'none' },
  { id: '3', name: 'Harshith Kudikala', rollNumber: 'BT-2022-012', status: 'none' },
  { id: '4', name: 'Alia Bhatt', rollNumber: 'BT-2022-023', status: 'none' },
  { id: '5', name: 'Ranbir Kapoor', rollNumber: 'BT-2022-025', status: 'none' },
];

export default function FacultyMarkAttendance({ onBack }: FacultyMarkAttendanceProps) {
  const [students, setStudents] = useState<StudentData[]>(initialStudents);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateStatus = (id: string, newStatus: AttendanceStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAllAs = (status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  
  const submitAttendance = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Attendance Submitted', content: `Successfully marked attendance. ${presentCount} Present, ${absentCount} Absent, ${lateCount} Late.` }}));
      onBack();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {/* Header */}
      <div className="bg-bg-secondary px-6 pt-12 pb-4 flex items-center justify-between border-b border-border-subtle sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors text-text-primary">
            <ArrowLeft size={24} />
          </button>
          <div>
             <h1 className="text-xl font-black font-headline text-text-primary leading-tight">Mark Attendance</h1>
             <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-0.5">Advanced Thermodynamics • ME-402</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-bg-secondary p-4 rounded-2xl border border-border-subtle shadow-sm flex items-center justify-between text-center divide-x divide-border-subtle">
            <div className="flex-1 px-2">
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">Present</p>
                <p className="text-xl font-black font-headline text-emerald-500">{presentCount}</p>
            </div>
            <div className="flex-1 px-2">
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">Absent</p>
                <p className="text-xl font-black font-headline text-red-500">{absentCount}</p>
            </div>
            <div className="flex-1 px-2">
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">Late</p>
                <p className="text-xl font-black font-headline text-orange-400">{lateCount}</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
           <button onClick={() => markAllAs('present')} className="flex-1 py-3 text-xs bg-emerald-500/10 text-emerald-600 font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500/20 transition-colors">Mark All Present</button>
           <button onClick={() => markAllAs('none')} className="flex-1 py-3 text-xs bg-bg-secondary border border-border-subtle text-text-secondary font-bold uppercase tracking-widest rounded-xl hover:bg-bg-card transition-colors">Reset All</button>
        </div>

        <div className="space-y-3">
          {students.map((student, idx) => (
            <motion.div 
              key={student.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-bg-secondary p-4 rounded-2xl border ${student.status === 'present' ? 'border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : student.status === 'absent' ? 'border-red-500/30' : student.status === 'late' ? 'border-orange-500/30' : 'border-border-subtle'} shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all`}
            >
               <div>
                  <h4 className="text-sm font-bold font-headline text-text-primary">{student.name}</h4>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{student.rollNumber}</p>
               </div>
               <div className="flex items-center gap-2">
                  <button onClick={() => updateStatus(student.id, 'present')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${student.status === 'present' ? 'bg-emerald-500 text-white' : 'bg-bg-primary text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10'}`}>
                      <Check size={18} />
                  </button>
                  <button onClick={() => updateStatus(student.id, 'absent')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${student.status === 'absent' ? 'bg-red-500 text-white' : 'bg-bg-primary text-red-500 border border-red-500/20 hover:bg-red-500/10'}`}>
                      <X size={18} />
                  </button>
                  <button onClick={() => updateStatus(student.id, 'late')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${student.status === 'late' ? 'bg-orange-500 text-white' : 'bg-bg-primary text-orange-500 border border-orange-500/20 hover:bg-orange-500/10'}`}>
                      <Clock size={18} />
                  </button>
               </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={submitAttendance}
          disabled={isSubmitting || students.some(s => s.status === 'none')}
          className="w-full py-4 bg-brand hover:bg-brand-accent disabled:opacity-50 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          ) : 'Submit Attendance Record'}
        </button>

      </div>
    </div>
  );
}
