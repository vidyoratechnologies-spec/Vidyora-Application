import { Bell, FileText, HelpCircle, TrendingUp, Award, MessagesSquare, Home, School, Rss, Brain, User, ArrowRight, Sparkles } from 'lucide-react'; 
import { motion } from 'motion/react';
import { Screen } from '../../types.ts';

interface StudentDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function StudentDashboard({ navigate }: StudentDashboardProps) {
  return (
    <div className="space-y-12">
        {/* Hero Section */}
        <section className="flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#4DA3FF]/30 shadow-2xl">
                <img 
                  alt="student profile" 
                  className="w-full h-full object-cover" 
                  src="https://picsum.photos/seed/student/200/200" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] border-2 border-[#0B0F1A] rounded-full"></div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold font-headline tracking-tight">Hi, Harshith 👋</h2>
              <p className="text-[#94A3B8] text-sm font-medium mt-1">Ready to crush your goals today?</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={() => navigate('notes_selector')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-bg-secondary text-text-primary rounded-2xl font-bold border border-border-subtle hover:bg-bg-card transition-all active:scale-[0.98] shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px] text-brand">description</span>
              View Notes
            </button>
            <button 
              onClick={() => navigate('test_selector')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0A66C2] to-[#4DA3FF] text-white rounded-2xl font-bold shadow-[0_0_20px_-5px_rgba(77,163,255,0.3)] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">quiz</span>
              Take Test
            </button>
          </div>
        </section>

        {/* Performance Cards (Bento) */}
        <div className="grid grid-cols-1 gap-5">
          {/* Attendance */}
          <div 
            onClick={() => navigate('attendance_detail')}
            className="bg-bg-secondary p-6 rounded-2xl relative overflow-hidden group border border-border-subtle shadow-sm cursor-pointer"
          >
            <div className="absolute -right-2 -bottom-2 opacity-[0.05] text-text-primary group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">calendar_today</span>
            </div>
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-secondary font-headline">Attendance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black font-headline tracking-tight text-text-primary">92%</span>
                  <span className="flex items-center gap-0.5 text-[#10B981] text-[9px] font-bold px-1 py-0.5 bg-[#10B981]/10 rounded-full ring-1 ring-[#10B981]/20 shadow-[0_0_6px_rgba(16,185,129,0.15)] ml-1 translate-y-[-4px]">
                    <TrendingUp size={10} /> +2%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-brand/5 rounded-xl border border-brand/10">
                <span className="material-symbols-outlined text-brand">how_to_reg</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Marks */}
            <div 
              onClick={() => navigate('marks_detail')}
              className="cursor-pointer bg-bg-secondary p-6 rounded-2xl relative overflow-hidden group border border-border-subtle shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary font-headline mb-1">Marks</p>
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-4xl font-black font-headline tracking-tight text-text-primary">88.5%</span>
                <span className="text-[11px] font-bold text-[#10B981] px-2 py-0.5 bg-[#10B981]/10 rounded-full w-fit">Excellent</span>
              </div>
            </div>
            {/* Rank */}
            <div 
              onClick={() => navigate('rank_detail')}
              className="cursor-pointer bg-bg-secondary p-6 rounded-2xl relative overflow-hidden group border border-border-subtle shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary font-headline mb-1">State Rank</p>
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-4xl font-black font-headline tracking-tight text-text-primary">#12</span>
                <span className="text-[11px] font-bold text-brand px-2 py-0.5 bg-brand/10 rounded-full w-fit">Top 1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold font-headline flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-accent fill-1">auto_awesome</span>
            AI Insights
          </h3>
          <div className="bg-bg-secondary rounded-2xl relative overflow-hidden border border-border-subtle p-12 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#EF4444] text-[10px] font-bold uppercase tracking-[0.2em] font-headline">
                  <span className="material-symbols-outlined text-sm">priority_high</span>
                  Critical Focus
                </div>
                <p className="font-black leading-tight font-headline text-4xl text-text-primary">Focus more on Physics</p>
                <p className="text-text-secondary text-base leading-relaxed">Your recent mock tests indicate a dip in Thermodynamics concepts. Revisiting chapter 4 might help you score better.</p>
              </div>
              <div className="h-px bg-border-subtle"></div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#10B981] text-[10px] font-bold uppercase tracking-[0.2em] font-headline">
                   <TrendingUp size={14} />
                  Milestone Reached
                </div>
                <p className="text-2xl font-extrabold leading-tight font-headline text-text-primary">10% Performance Boost</p>
                <p className="text-text-secondary text-sm leading-relaxed">Great job! Your consistency in Mathematics practice has yielded significant results this week.</p>
              </div>
              <button 
                onClick={() => navigate('tutor')}
                className="w-full flex items-center justify-center gap-2 bg-brand text-white font-bold rounded-xl hover:bg-brand-accent transition-all group py-3 text-[15px]"
              >
                Ask AI <ArrowRight className="ml-1" size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Recent Milestones */}
        <section className="space-y-8 pt-8">
          <h3 className="text-xl font-headline font-semibold text-text-primary">Recent Milestones</h3>
          <div className="flex flex-col gap-6">
            {[
              { title: 'Math Quiz Completed', time: '2 hours ago', icon: 'assignment_turned_in', color: 'text-brand', bg: 'bg-brand/10', badge: '+120 XP', subBadge: 'Rank #1' },
              { title: 'Physics Chapter 3', time: 'Yesterday', icon: 'menu_book', color: 'text-orange-500', bg: 'bg-orange-500/10', badge: '+50 XP', subBadge: 'Mastered' },
              { title: 'Chem Discussion', time: 'Active Now', icon: 'forum', color: 'text-brand-accent', bg: 'bg-brand-accent/10', badge: 'Active', subBadge: '12 Online', active: true },
            ].map((milestone, idx) => (
              <div key={idx} onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: milestone.title, content: `Viewing detailed breakdown of ${milestone.title}. Status: ${milestone.badge}` }}))} className="group flex items-center justify-between p-5 bg-bg-secondary hover:bg-bg-card transition-all cursor-pointer rounded-2xl border border-border-subtle shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${milestone.bg} rounded-xl flex items-center justify-center ${milestone.color}`}>
                    <span className="material-symbols-outlined">{milestone.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold font-headline text-text-primary">{milestone.title}</h4>
                    <p className={`text-[10px] ${milestone.active ? 'text-[#10B981]' : 'text-text-secondary'} uppercase tracking-widest font-bold mt-1`}>{milestone.time}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className={`px-3 py-1 ${milestone.badge.includes('Active') ? 'bg-brand-accent/20 text-brand-accent' : milestone.badge.includes('120') ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-orange-500/20 text-orange-500'} rounded-full font-black text-sm font-headline whitespace-nowrap`}>
                    {milestone.badge}
                  </span>
                  <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider opacity-60">{milestone.subBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}
