import { User, Mail, Shield, Edit3, LogOut, Key, Globe, Eye, Sun, Moon } from 'lucide-react';

interface AdminProfileProps {
  onLogout: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export default function AdminProfile({ onLogout, toggleTheme, isDarkMode }: AdminProfileProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section className="text-center">
        <div className="relative inline-block">
          <img src="https://picsum.photos/seed/admin/200/200" alt="Admin" className="w-32 h-32 rounded-3xl border-4 border-brand/20 object-cover shadow-2xl" referrerPolicy="no-referrer" />
          <button className="absolute -bottom-2 -right-2 p-3 bg-brand rounded-2xl text-white shadow-lg active:scale-95 transition-transform border border-white/20">
            <Edit3 size={16} />
          </button>
        </div>
        <h2 className="text-3xl font-black font-headline tracking-tighter mt-6 text-text-primary">Systems Admin</h2>
        <p className="text-brand-accent font-bold uppercase tracking-widest text-xs mt-1">Super Admin • Infrastructure Control</p>
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

      {/* Access Summary */}
      <div className="bg-bg-secondary p-6 rounded-3xl border border-border-subtle space-y-4">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-border-subtle pb-3">Active Permissions</h3>
          <div className="flex flex-wrap gap-2">
              {['User-Write', 'Finance-Read', 'System-Root', 'Audit-Log', 'Staff-Approve'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-brand/10 text-brand-accent text-[9px] font-bold rounded-full border border-brand/20">{tag}</span>
              ))}
          </div>
      </div>

      <div className="space-y-4">
         {[
           { icon: <Mail size={18} />, label: 'System Email', value: 'root@institute.edu' },
           { icon: <Key size={18} />, label: 'Access Level', value: 'Level 10 (Sudo)' },
           { icon: <Globe size={18} />, label: 'Mainframe IP', value: '192.168.1.100' },
           { icon: <Eye size={18} />, label: 'Last Login', value: '2 mins ago (Delhi, IN)' },
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

      <div className="flex gap-4">
        <button className="flex-1 py-4 bg-bg-secondary border border-border-subtle text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-white/5 text-text-primary transition-colors"> Security Settings </button>
        <button 
          onClick={onLogout}
          className="flex-1 py-4 border border-red-500/20 text-red-500 font-bold rounded-2xl hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
        >
            <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
