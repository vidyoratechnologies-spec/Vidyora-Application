import { Users, GraduationCap, Calendar, AlertCircle, FileText, Search, Plus, Filter, MessageSquare, TrendingDown, ArrowRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../../types.ts';

interface AdminDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function AdminDashboard({ navigate }: AdminDashboardProps) {
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
          <div className="w-14 h-14 rounded-2xl bg-[#a8c8ff]/10 flex items-center justify-center text-[#a8c8ff]">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <div>
            <h2 className="text-2xl font-black font-headline">Institution Control</h2>
            <p className="text-xs text-[#8b919e] font-bold uppercase tracking-widest mt-0.5">Campus: Vidyora Main</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
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
          <div key={idx} className="bg-[#171b27] p-5 rounded-2xl border border-white/5 hover:bg-[#1b1f2b] transition-colors group cursor-pointer">
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-2xl font-black font-headline mt-1">{stat.value}</h4>
          </div>
        ))}
      </section>

      {/* AI Predictive Alerts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-400 text-sm fill-1">auto_awesome</span>
            AI Predictive Engine
            </h3>
            <Filter size={18} className="text-[#8b919e] cursor-pointer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between h-full group ${alert.type === 'critical' ? 'bg-red-500/5 border-red-500/20' : alert.type === 'warning' ? 'bg-orange-500/5 border-orange-500/20' : 'bg-blue-500/5 border-blue-500/20'}`}>
              <div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-4 ${alert.type === 'critical' ? 'bg-red-500 text-white' : alert.type === 'warning' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>
                    <AlertCircle size={16} />
                </div>
                <h4 className="font-bold font-headline mb-2">{alert.title}</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{alert.detail}</p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#dfe2f2]/60 hover:text-white transition-colors group">
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
        <div className="bg-[#171b27] rounded-3xl p-6 border border-white/5 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-headline tracking-tight">Institutional Attendance</h3>
                <span className="text-xs text-[#8b919e] font-bold">This Week</span>
            </div>
            <div className="flex items-end gap-2 h-40">
                {[45, 80, 60, 90, 70, 85, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group overflow-hidden">
                        <div className={`absolute bottom-0 left-0 w-full rounded-t-lg bg-gradient-to-t transition-all duration-1000 ${i === 3 ? 'from-blue-600 to-blue-400' : 'from-[#313441] to-[#414752]'}`} style={{ height: `${h}%` }}></div>
                        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold text-white">{h}%</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={`${d}-${i}`} className="text-[10px] font-bold text-[#8b919e]">{d}</span>)}
            </div>
        </div>

        {/* Recent Communication */}
        <div className="bg-[#171b27] rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-lg font-bold font-headline tracking-tight">Staff & Faculty Sync</h3>
            <div className="space-y-4">
                {[
                    { user: 'Prof. Sarah', msg: 'Syllabus revised for Unit 3. Please review.', time: '10m ago' },
                    { user: 'Mark (Accounts)', msg: 'Fee reconciliation for March complete.', time: '1h ago' },
                    { user: 'Dean Gupta', msg: 'Annual symposium dates finalized.', time: '3h ago' },
                ].map((chat, idx) => (
                    <div key={idx} className="flex gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex flex-shrink-0 items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                            {chat.user[0]}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <span className="text-xs font-bold font-headline">{chat.user}</span>
                                <span className="text-[10px] text-[#8b919e]">{chat.time}</span>
                            </div>
                            <p className="text-xs text-[#94a3b8] mt-1 line-clamp-1">{chat.msg}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-[#a8c8ff] rounded-xl transition-colors">
                View All Announcements
            </button>
        </div>
      </section>
    </div>
  );
}
