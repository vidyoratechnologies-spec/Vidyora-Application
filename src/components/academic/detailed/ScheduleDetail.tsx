import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface ScheduleDetailProps {
  onBack: () => void;
}

const scheduleItems = [
  { 
    day: '15', 
    weekday: 'Wed', 
    items: [
      { time: '11:01 AM - 12:40 PM', title: 'ML LAB - Lal - F-104', status: 'SCHEDULED', initials: '', color: '' },
      { time: '01:21 PM - 02:10 PM', title: 'ML - Lal - F-208', status: 'SCHEDULED', initials: '', color: '' },
      { time: '02:11 PM - 03:50 PM', title: 'CLUB ACTIVITY - Suhasini - F-105', status: 'SCHEDULED', initials: 'CL', color: 'bg-brand' },
    ]
  },
  {
    day: '16',
    weekday: 'Thu',
    items: [
      { time: '10:11 AM - 11:00 AM', title: 'ML - Lal - F-208', status: 'SCHEDULED', initials: '', color: '' },
      { time: '11:51 AM - 12:40 PM', title: 'NLP - Revathi - F-208', status: 'SCHEDULED', initials: 'NL', color: 'bg-brand' },
      { time: '03:00 PM - 03:50 PM', title: 'LIBRARY - Venkateswarlu - F-208', status: 'SCHEDULED', initials: '', color: '' },
    ]
  },
  {
    day: '17',
    weekday: 'Fri',
    items: [
      { time: '11:01 AM - 11:50 AM', title: 'NLP - Revathi - F-208', status: 'SCHEDULED', initials: 'NL', color: 'bg-brand' },
    ]
  }
];

export default function ScheduleDetail({ onBack }: ScheduleDetailProps) {
  const dates = [
    { day: 'Sun', date: '12' },
    { day: 'Mon', date: '13' },
    { day: 'Tue', date: '14' },
    { day: 'Wed', date: '15' },
    { day: 'Thu', date: '16', active: true },
    { day: 'Fri', date: '17' },
    { day: 'Sat', date: '18' },
  ];

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
           <h1 className="text-xl font-bold font-headline text-text-primary">Daily Schedule</h1>
        </div>
      </div>

      {/* Week Selector */}
      <div className="bg-bg-secondary px-4 py-6 border-b border-border-subtle shadow-sm flex justify-between items-center text-center">
        {dates.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-4 flex-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{d.day}</span>
            <div className={`relative px-3 py-2 rounded-full transition-all ${d.active ? 'bg-brand text-white' : 'text-text-primary'}`}>
               <span className="text-sm font-bold relative z-10">{d.date}</span>
               {d.active && (
                 <motion.div layoutId="schedule-active" className="absolute -bottom-6 left-1/4 w-1/2 h-1 bg-brand rounded-full" />
               )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 space-y-12">
        <div className="text-center mb-8">
           <h2 className="text-lg font-bold text-text-secondary font-headline tracking-tighter">April 2026</h2>
        </div>

        {scheduleItems.map((group, idx) => (
          <div key={idx} className="flex gap-6">
            <div className="flex flex-col items-center gap-1 w-12 pt-4">
              <span className="text-3xl font-black font-headline text-brand leading-none">{group.day}</span>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{group.weekday}</span>
            </div>
            
            <div className="flex-1 space-y-4">
              {group.items.map((item, i) => (
                <div key={i} className="bg-bg-secondary p-6 rounded-xl border border-border-subtle shadow-sm flex items-center justify-between relative overflow-hidden group">
                  <div className="space-y-4 relative z-10">
                    <p className="text-text-secondary font-bold text-sm tracking-tight">{item.time}</p>
                    <h4 className="text-lg font-bold font-headline tracking-tight max-w-[200px] leading-tight text-text-primary">{item.title}</h4>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{item.status}</p>
                  </div>
                  {item.initials && (
                    <div className={`w-20 h-20 rounded-full ${item.color} flex items-center justify-center text-white font-black text-2xl shadow-xl transform translate-x-4`}>
                      {item.initials}
                    </div>
                  )}
                  <div className="absolute left-0 top-0 w-1 h-full bg-brand/10 group-hover:bg-brand transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
