import { Users, GraduationCap, Calendar, AlertCircle, FileText, Search, Plus, Filter, MessageSquare, TrendingDown, ArrowRight, Download, CreditCard, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Screen } from '../../types.ts';

interface AdminDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function AdminDashboard({ navigate }: AdminDashboardProps) {
  const [isEditFeesOpen, setIsEditFeesOpen] = useState(false);

  const alerts = [
    { title: 'Potential Dropout Risk', detail: 'James Wilson (CSE-B) attendance below 65%', type: 'critical' },
    { title: 'Faculty Variance', detail: 'Physics Dept. syllabus 15% behind schedule', type: 'warning' },
    { title: 'Infrastructure Alert', detail: 'Lab C network down for 45 minutes', type: 'info' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Quick Ops Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <div>
            <h2 className="text-2xl font-black font-headline">Institution Control</h2>
            <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mt-0.5">Campus: Vidyora Main</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditFeesOpen(true)}
            className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 px-4 py-2.5 rounded-xl border border-emerald-500/20 text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Edit3 size={16} />
            Fee Management
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Campus Faculty Briefing' } }))}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2.5 rounded-xl border border-red-500/20 text-xs font-bold uppercase tracking-widest transition-all animate-pulse"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Live Sync
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('export-pdf', { 
              detail: { 
                title: 'Campus Operational Overview', 
                content: [
                  'Institutional Statistics:',
                  'Total Students: 4,284',
                  'Active Faculty: 142',
                  'Daily Attendance: 89%',
                  'Critical Pending Tasks: 7',
                  '',
                  'AI Predictive Engine Analysis:',
                  '- Dropout Risk flagged for 12 students.',
                  '- Syllabus variance identified in 2 departments.',
                  '- Infrastructure health: 98.4%'
                ] 
              } 
            }))}
            className="flex items-center gap-2 bg-[#171b27] hover:bg-[#1b1f2b] text-[#a8c8ff] px-4 py-2.5 rounded-xl border border-white/5 text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Download size={16} /> Export
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b919e]" size={16} />
            <input className="bg-[#171b27] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm w-full md:w-64 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Search students, faculty..." />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl shadow-lg transition-all active:scale-95">
            <Plus size={20} />
          </button>
        </div>
      </section>

      {/* Admin Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '4,284', icon: <Users size={18} />, color: 'bg-blue-500/10 text-blue-400' },
          { label: 'Active Faculty', value: '142', icon: <GraduationCap size={18} />, color: 'bg-purple-500/10 text-purple-400' },
          { label: 'Daily Attendance', value: '89%', icon: <Calendar size={18} />, color: 'bg-green-500/10 text-green-500' },
          { label: 'Critical Tasks', value: '7', icon: <AlertCircle size={18} />, color: 'bg-red-500/10 text-red-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-bg-secondary p-5 rounded-2xl border border-border-subtle hover:bg-bg-card transition-colors group cursor-pointer shadow-sm">
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-2xl font-black font-headline mt-1 text-text-primary">{stat.value}</h4>
          </div>
        ))}
      </section>

      {/* AI Predictive Alerts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2 text-text-primary">
            <span className="material-symbols-outlined text-orange-400 text-sm fill-1">auto_awesome</span>
            AI Predictive Engine
            </h3>
            <Filter size={18} className="text-text-secondary cursor-pointer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between h-full group shadow-sm ${alert.type === 'critical' ? 'bg-red-500/5 border-red-500/20' : alert.type === 'warning' ? 'bg-orange-500/5 border-orange-500/20' : 'bg-brand/5 border-brand/20'}`}>
              <div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-4 ${alert.type === 'critical' ? 'bg-red-500 text-white' : alert.type === 'warning' ? 'bg-orange-500 text-white' : 'bg-brand text-white'}`}>
                    <AlertCircle size={16} />
                </div>
                <h4 className="font-bold font-headline mb-2 text-text-primary">{alert.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{alert.detail}</p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors group">
                Take Action
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Monitoring & Operations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Monitoring */}
        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-subtle space-y-6 shadow-sm">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-headline tracking-tight text-text-primary">Institutional Attendance</h3>
                <span className="text-xs text-text-secondary font-bold">This Week</span>
            </div>
            <div className="flex items-end gap-2 h-40">
                {[45, 80, 60, 90, 70, 85, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-bg-primary rounded-t-lg relative group overflow-hidden">
                        <div className={`absolute bottom-0 left-0 w-full rounded-t-lg bg-gradient-to-t transition-all duration-1000 ${i === 3 ? 'from-brand to-brand-accent' : 'from-gray-400 to-gray-300'}`} style={{ height: `${h}%` }}></div>
                        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold text-text-primary">{h}%</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={`${d}-${i}`} className="text-[10px] font-bold text-text-secondary">{d}</span>)}
            </div>
        </div>

        {/* Recent Communication */}
        <div className="bg-bg-secondary rounded-3xl p-6 border border-border-subtle space-y-6 shadow-sm">
            <h3 className="text-lg font-bold font-headline tracking-tight text-text-primary">Staff & Faculty Sync</h3>
            <div className="space-y-4">
                {[
                    { user: 'Prof. Sarah', msg: 'Syllabus revised for Unit 3. Please review.', time: '10m ago' },
                    { user: 'Mark (Accounts)', msg: 'Fee reconciliation for March complete.', time: '1h ago' },
                    { user: 'Dean Gupta', msg: 'Annual symposium dates finalized.', time: '3h ago' },
                ].map((chat, idx) => (
                    <div key={idx} className="flex gap-4 p-3 hover:bg-bg-primary rounded-xl transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-brand/10 flex flex-shrink-0 items-center justify-center text-brand font-bold border border-brand/20">
                            {chat.user[0]}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <span className="text-xs font-bold font-headline text-text-primary">{chat.user}</span>
                                <span className="text-[10px] text-text-secondary">{chat.time}</span>
                            </div>
                            <p className="text-xs text-text-secondary mt-1 line-clamp-1">{chat.msg}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full py-3 bg-bg-primary hover:bg-bg-card text-xs font-bold uppercase tracking-widest text-brand-accent rounded-xl transition-colors border border-border-subtle">
                View All Announcements
            </button>
        </div>
      </section>

      {/* Fee Edit Modal */}
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
              <h3 className="text-2xl font-black font-headline mb-6 tracking-tighter">Campus Fee Structure</h3>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-secondary px-1">Class/Grade</label>
                    <select className="w-full bg-bg-primary border-none rounded-xl py-4 px-4 text-sm font-medium outline-none ring-1 ring-border-subtle focus:ring-brand transition-all">
                      <option>X Grade - State</option>
                      <option>XII Grade - CBSE</option>
                      <option>B.Tech CSE - R22</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-secondary px-1">Quarterly Installment (₹)</label>
                    <input type="text" defaultValue="35,000" className="w-full bg-bg-primary border-none rounded-xl py-4 px-4 text-sm font-medium outline-none ring-1 ring-border-subtle focus:ring-brand transition-all" />
                 </div>
                 <button onClick={() => setIsEditFeesOpen(false)} className="w-full bg-brand text-white font-black py-4 rounded-xl mt-6 uppercase tracking-widest text-xs hover:bg-brand/90 transition-all">
                    Update Fees
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
