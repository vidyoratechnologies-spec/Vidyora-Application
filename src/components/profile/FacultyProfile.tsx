import { User, Mail, Briefcase, Shield, Edit3, LogOut, Award, Link, Sun, Moon } from 'lucide-react';

interface FacultyProfileProps {
  onLogout: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export default function FacultyProfile({ onLogout, toggleTheme, isDarkMode }: FacultyProfileProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="text-center">
        <div className="relative inline-block">
          <img src="https://picsum.photos/seed/faculty/200/200" alt="Faculty" className="w-32 h-32 rounded-3xl border-4 border-brand/20 object-cover shadow-2xl" referrerPolicy="no-referrer" />
          <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Edit Avatar', content: 'Upload a new profile picture.' }}))} className="absolute -bottom-2 -right-2 p-3 bg-brand rounded-2xl text-white shadow-lg active:scale-95 transition-transform border border-white/20">
            <Edit3 size={16} />
          </button>
        </div>
        <h2 className="text-3xl font-black font-headline tracking-tighter mt-6 text-text-primary">Prof. Sharma</h2>
        <p className="text-brand-accent font-bold uppercase tracking-widest text-xs mt-1">Senior Professor • Mechanical Dept.</p>
      </section>

      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="w-full h-14 bg-bg-secondary rounded-2xl border border-border-subtle flex items-center justify-between px-6 transition-all hover:border-brand-accent/30 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-bg-primary flex items-center justify-center text-brand-accent">
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          <span className="font-bold text-sm text-text-primary">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
        <div className={`w-12 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-brand' : 'bg-slate-300'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
        </div>
      </button>

      {/* Stats Row */}
      <div className="flex justify-center gap-8 py-4 border-y border-border-subtle">
         <div className="text-center">
             <p className="text-2xl font-black font-headline text-text-primary">12+</p>
             <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Experience</p>
         </div>
         <div className="text-center">
             <p className="text-2xl font-black font-headline text-text-primary">24</p>
             <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Papers</p>
         </div>
         <div className="text-center">
             <p className="text-2xl font-black font-headline text-text-primary">3</p>
             <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Patents</p>
         </div>
      </div>

      <div className="space-y-4">
         {[
           { icon: <Mail size={18} />, label: 'Email', value: 'sharma@institute.edu' },
           { icon: <Briefcase size={18} />, label: 'Employee ID', value: 'EMP-7622' },
           { icon: <Award size={18} />, label: 'Qualification', value: 'PhD, Stanford University' },
           { icon: <Link size={18} />, label: 'ORCID', value: '0000-0002-1825-0097' },
         ].map((item, i) => (
           <div key={i} className="bg-bg-secondary p-5 rounded-2xl border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-text-secondary">{item.icon}</div>
                <div>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-bold text-text-primary">{item.value}</p>
                </div>
              </div>
           </div>
         ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full py-4 rounded-2xl border border-red-500/20 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors"
      >
        <LogOut size={18} /> Logout Session
      </button>
    </div>
  );
}
