import { ArrowUp, Video } from 'lucide-react'; 

export default function StudentAcademic() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* User Specific Landing */}
        <section>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight mb-1 text-text-primary">My Academics 👋</h2>
          <p className="text-text-secondary font-medium opacity-70">Track your learning progress, Harshith.</p>
        </section>

        {/* Quick Overview Bento Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-brand via-brand-accent to-brand shadow-lg border border-border-subtle">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 font-['Inter']">CUMULATIVE GPA</span>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-5xl font-extrabold font-headline leading-none text-white">7.69</span>
                <span className="text-lg font-bold text-white/60 mb-1">/ 10.0</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          </div>

          <div className="p-4 rounded-3xl bg-bg-secondary hover:bg-bg-card transition-colors group border border-border-subtle">
            <span className="material-symbols-outlined text-brand-accent mb-3">quiz</span>
            <p className="text-xs font-semibold text-text-secondary font-headline uppercase tracking-wider mb-1">My Exams</p>
            <div className="flex items-center gap-1.5 font-bold text-text-primary">12 <span className="text-[10px] opacity-60 font-normal">total</span></div>
          </div>
          <div className="p-4 rounded-3xl bg-bg-secondary hover:bg-bg-card transition-colors border border-border-subtle">
            <span className="material-symbols-outlined text-brand-accent mb-3">calendar_today</span>
            <p className="text-xs font-semibold text-text-secondary font-headline uppercase tracking-wider mb-1">Attendance</p>
            <div className="flex items-baseline gap-1.5 font-bold text-text-primary">94% <span className="text-[10px] opacity-60 font-normal">avg</span></div>
          </div>
        </section>

        {/* Class Schedule Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold font-headline text-text-primary">Today's Schedule</h3>
            <span className="text-brand text-xs font-bold uppercase tracking-widest cursor-pointer hover:underline">Full Calendar</span>
          </div>
          <div className="space-y-4">
            <div className="relative p-6 rounded-3xl bg-bg-secondary border border-border-subtle shadow-sm ring-1 ring-inset ring-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 text-red-500 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-['Inter']">LIVE</span>
                </div>
                <span className="text-xs font-semibold text-text-secondary">10:00 AM</span>
              </div>
              <h4 className="text-xl font-bold font-headline mb-1 text-text-primary">Advanced Thermodynamics</h4>
              <p className="text-text-secondary text-sm mb-4">Prof. Sharma • Room 402</p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Advanced Thermodynamics' } }))}
                className="w-full py-3.5 bg-brand hover:bg-brand-accent text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-blue-900/40"
              >
                <Video size={18} /> Join Class
              </button>
            </div>
          </div>
        </section>

        {/* Subject Mastery */}
        <section className="pb-10">
          <h3 className="text-2xl font-bold font-headline mb-6 text-text-primary">Subject Mastery</h3>
          <div className="space-y-6">
            {[
              { label: 'Mathematics', score: 92, status: 'Strong', color: 'bg-blue-500' },
              { label: 'Physics', score: 78, status: 'Needs Focus', color: 'bg-orange-500' },
              { label: 'Chemistry', score: 84, status: 'Strong', color: 'bg-emerald-500' },
            ].map((subject, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-text-primary">{subject.label}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-bg-secondary text-text-secondary`}>{subject.status}</span>
                  </div>
                  <span className="text-xs font-bold text-text-primary">{subject.score}%</span>
                </div>
                <div className="h-2 w-full bg-bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${subject.color} rounded-full`} style={{ width: `${subject.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}
