import { Building2, Users, CreditCard, Activity, TrendingUp, ArrowUpRight, Globe, ShieldCheck, Zap, Edit3, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Screen } from '../../types.ts';

interface SuperAdminDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function SuperAdminDashboard({ navigate }: SuperAdminDashboardProps) {
  const [showBranches, setShowBranches] = useState(false);
  const [isEditFeesOpen, setIsEditFeesOpen] = useState(false);

  const institutions = [
    { name: 'Vidyora University - Main', location: 'Hyderabad, TS', students: '12.4k', growth: '+5.2%', health: 98, status: 'Optimal' },
    { name: 'Vidyora Academy - North', location: 'Delhi, NCR', students: '4.1k', growth: '+12.8%', health: 85, status: 'Warning' },
    { name: 'Technical Wing - East', location: 'Kolkata, WB', students: '2.8k', growth: '-1.4%', health: 92, status: 'Stable' },
  ];

  const stats = [
    { label: 'Total Institutions', value: '18', icon: <Building2 className="text-blue-400" />, trend: '+2 this year', interactive: true },
    { label: 'Total Enrollments', value: '45.2k', icon: <Users className="text-purple-400" />, trend: '+8% vs LY', interactive: true },
    { label: 'Total Revenue', value: '₹2.4Cr', icon: <CreditCard className="text-green-400" />, trend: '+14% growth', interactive: true },
    { label: 'System Uptime', value: '99.9%', icon: <Activity className="text-orange-400" />, trend: 'Healthy', interactive: true },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            onClick={() => {
              if (idx === 0) setShowBranches(true);
              else window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: stat.label, content: `Viewing analytics for ${stat.label} (${stat.value}).` }}));
            }}
            className={`bg-bg-secondary p-4 rounded-2xl border border-border-subtle hover:border-brand/30 transition-all group shadow-sm ${stat.interactive ? 'cursor-pointer' : ''}`}
          >
            <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black font-headline mt-1 text-text-primary">{stat.value}</h3>
            <p className="text-[9px] font-bold text-brand-accent mt-1 uppercase tracking-wider">{stat.trend}</p>
          </div>
        ))}
      </section>

      {/* Quick Action Bar */}
      <section className="flex flex-wrap gap-4">
          <button 
            onClick={() => setIsEditFeesOpen(true)}
            className="flex items-center gap-2 bg-bg-secondary text-text-primary px-5 py-3 rounded-xl border border-border-subtle hover:bg-bg-card transition-all font-bold text-xs uppercase tracking-widest shadow-sm active:scale-95"
          >
             <Edit3 size={16} className="text-brand" />
             Edit Institution Fees
          </button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Network Configuration', content: 'Advanced network policy routing and DNS configurations. This action requires Level 4 clearance.' }}))} className="flex items-center gap-2 bg-bg-secondary text-text-primary px-5 py-3 rounded-xl border border-border-subtle hover:bg-bg-card transition-all font-bold text-xs uppercase tracking-widest shadow-sm active:scale-95">
             <Globe size={16} className="text-purple-400" />
             Network Config
          </button>
      </section>

      {/* Branch Places Modal/Overlay */}
      <AnimatePresence>
        {showBranches && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowBranches(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-secondary w-full max-w-lg rounded-3xl p-8 border border-border-subtle"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black font-headline uppercase tracking-tighter">Global Branches</h3>
                <button onClick={() => setShowBranches(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {institutions.map((inst, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-bg-primary rounded-2xl border border-border-subtle group hover:border-brand transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand font-bold">{inst.name[0]}</div>
                      <div>
                        <h4 className="font-bold text-sm">{inst.name}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-text-secondary mt-1">
                          <MapPin size={12} /> {inst.location}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-text-secondary group-hover:text-brand" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fee Edit Modal placeholder */}
      <AnimatePresence>
        {isEditFeesOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setIsEditFeesOpen(false)}
          >
             <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-secondary w-full max-w-md rounded-3xl p-8 border border-border-subtle"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black font-headline mb-6 tracking-tighter">Edit Institution Fee Structure</h3>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-secondary px-1">Select Institution</label>
                    <select className="w-full bg-bg-primary border-none rounded-xl py-4 px-4 text-sm font-medium outline-none ring-1 ring-border-subtle focus:ring-brand transition-all">
                      {institutions.map(inst => <option key={inst.name}>{inst.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-secondary px-1">Annual Tuition Base (₹)</label>
                    <input type="text" defaultValue="1,45,000" className="w-full bg-bg-primary border-none rounded-xl py-4 px-4 text-sm font-medium outline-none ring-1 ring-border-subtle focus:ring-brand transition-all" />
                 </div>
                 <button onClick={() => setIsEditFeesOpen(false)} className="w-full bg-brand text-white font-black py-4 rounded-xl mt-6 uppercase tracking-widest text-xs hover:bg-brand/90 transition-all">
                    Update Fee Structure
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Health Pulse */}
      <section className="bg-bg-secondary rounded-3xl p-8 relative overflow-hidden border border-border-subtle shadow-sm">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-brand">
          <Zap size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={16} />
              AI Organizational Health Pulse
            </div>
            <h2 className="text-3xl font-black font-headline leading-tight text-text-primary">Your organization is at <span className="text-brand">94.2%</span> efficiency.</h2>
            <p className="text-text-secondary max-w-md">Our neural engine has identified a bottleneck in "North Academy" fee collection workflows. Recommendation: Deploy automated reminders.</p>
          </div>
          <div className="flex flex-col gap-2">
            <button 
               onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Global Campus Broadcast' } }))}
               className="bg-bg-primary hover:bg-bg-card text-text-primary font-bold py-3 px-8 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 border border-border-subtle"
            >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Go Live Broadcast
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('export-pdf', { 
                detail: { 
                  title: 'Global Organizational Audit', 
                  content: [
                    'Network Health: Optimal (99.9%)',
                    'Total Revenue across 18 institutions: $2.4M',
                    'Total User Base: 45.2k',
                    '',
                    'Infrastructure Audit:',
                    institutions.map(inst => `- ${inst.name}: ${inst.health}% Health, ${inst.status} status (${inst.students} students)`).join('\n'),
                    '',
                    'Bottleneck Identification:',
                    'Neural engine flagged North Academy fee collection as low efficiency (85%). Recommendations have been dispatched to local admins.'
                  ] 
                } 
              }))}
              className="bg-brand hover:bg-brand-accent text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
                Generate Global Audit
                <ArrowUpRight size={18} />
            </button>
            <p className="text-[10px] text-center text-text-secondary font-bold uppercase tracking-widest">Live Analysis Active</p>
          </div>
        </div>
      </section>

      {/* Institution Manager */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold font-headline text-text-primary">Institution Health</h3>
          <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Manage All Institutions', content: 'Opening global centralized dashboard for modifying branch-level permissions and allocations.' }}))} className="text-brand text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
            Manage All <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {institutions.map((inst, idx) => (
            <div key={idx} className="bg-bg-secondary p-6 rounded-2xl border border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-bg-card transition-colors group shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand/5 flex items-center justify-center text-brand font-black text-xl border border-border-subtle group-hover:scale-110 transition-transform">
                  {inst.name[0]}
                </div>
                <div>
                  <h4 className="font-bold font-headline text-text-primary">{inst.name}</h4>
                  <p className="text-xs text-text-secondary mt-0.5">{inst.students} students • {inst.growth} growth</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Health Score</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${inst.health > 90 ? 'bg-green-500' : inst.health > 80 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${inst.health}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-text-secondary">{inst.health}%</span>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${inst.status === 'Optimal' ? 'bg-green-500/10 text-green-500' : inst.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-brand/10 text-brand'}`}>
                  {inst.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
