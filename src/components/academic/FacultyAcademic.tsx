import { BookOpen, Users, Clock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FacultyAcademic() {
  const classes = [
    { name: 'Advanced Thermodynamics', code: 'ME-402', attendance: '92%', progress: 65, nextTopic: 'Entropy & Laws' },
    { name: 'Mechanical Vibrations', code: 'ME-501', attendance: '88%', progress: 40, nextTopic: 'Damping Systems' },
    { name: 'Machine Design I', code: 'ME-305', attendance: '95%', progress: 85, nextTopic: 'Bearings' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
        <h2 className="text-3xl font-black font-headline tracking-tighter mb-2 text-text-primary">Academic Control</h2>
        <p className="text-text-secondary text-sm font-medium">Manage your courses, grading, and syllabus progress.</p>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-bg-secondary rounded-3xl p-6 border border-border-subtle hover:border-orange-500/20 transition-all group shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold font-headline text-text-primary group-hover:text-orange-400 transition-colors">{cls.name}</h3>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mt-1">{cls.code} • {cls.attendance} Avg. Attendance</p>
              </div>
              <div className="bg-orange-500/10 p-2 rounded-xl text-orange-400">
                <BookOpen size={20} />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-end text-xs">
                <span className="text-text-secondary font-bold uppercase tracking-widest">Syllabus Progress</span>
                <span className="font-bold text-text-primary">{cls.progress}%</span>
              </div>
              <div className="h-2 w-full bg-bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${cls.progress}%` }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock size={14} className="text-text-secondary" />
                Next: <span className="font-bold text-text-primary">{cls.nextTopic}</span>
              </div>
              <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'LMS Portal', content: 'Redirecting to your Canvas / Moodle learning management system for detailed course administration.' }}))} className="text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform">
                Open LMS <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Time Table / Schedule */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold font-headline text-text-primary">Today's Schedule</h3>
          <span onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Full Faculty Calendar', content: 'View full week schedule, upcoming invigilation duties, and cross-departmental meetings.' }}))} className="text-orange-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:underline">Full Calendar</span>
        </div>
        <div className="space-y-4">
          <div className="relative p-6 rounded-3xl bg-bg-secondary border border-border-subtle shadow-sm ring-1 ring-inset ring-brand/10">
            <div className="absolute top-0 right-8 w-px h-full bg-border-subtle"></div>
            <div className="absolute top-8 right-[29px] w-2 h-2 rounded-full bg-brand ring-4 ring-bg-secondary"></div>
            <p className="text-[10px] text-brand font-bold uppercase tracking-widest mb-1">10:00 AM - 11:30 AM</p>
            <h4 className="text-lg font-black font-headline text-text-primary">Advanced Thermodynamics</h4>
            <p className="text-xs text-text-secondary font-medium mt-1">Room 302 • B.Tech ME (3rd Year)</p>
          </div>
          <div className="relative p-6 rounded-3xl bg-bg-primary border border-border-subtle shadow-sm opacity-70">
            <div className="absolute top-0 right-8 w-px h-full bg-border-subtle"></div>
            <div className="absolute top-8 right-[29px] w-2 h-2 rounded-full bg-text-secondary ring-4 ring-bg-primary"></div>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">01:30 PM - 02:30 PM</p>
            <h4 className="text-lg font-black font-headline text-text-primary">Applied Mathematics</h4>
            <p className="text-xs text-text-secondary font-medium mt-1">Room 105 • B.Tech CSE (1st Year)</p>
          </div>
        </div>
      </section>

      {/* Grading Tasks */}
      <section className="bg-bg-secondary p-8 rounded-3xl border border-border-subtle shadow-sm">
        <h3 className="text-xl font-bold font-headline mb-6 flex items-center gap-2 text-text-primary">
            <CheckCircle2 size={24} className="text-green-500" />
            Grading Tasks
        </h3>
        <div className="space-y-4">
            {[
                { task: 'Thermodynamics Quiz 2', deadline: 'Due in 2 days', pending: '14/48', priority: 'high' },
                { task: 'Vibration Lab Reports', deadline: 'Due in 5 days', pending: '48/48', priority: 'medium' },
            ].map((task, i) => (
                <div key={i} onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: task.task, content: `Opening grading rubric and submissions for ${task.task}. Pending: ${task.pending}` }}))} className="flex items-center justify-between p-4 bg-bg-primary rounded-2xl border border-border-subtle hover:bg-bg-card transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-orange-500'}`}></div>
                        <div>
                            <h4 className="text-sm font-bold text-text-primary">{task.task}</h4>
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-0.5">{task.deadline}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-orange-400">{task.pending} pending</span>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
