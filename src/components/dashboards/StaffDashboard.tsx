import { ClipboardList, Users2, CalendarDays, Inbox, Search, Plus, Filter, ArrowRight, UserCheck, Timer, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../../types.ts';

interface StaffDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function StaffDashboard({ navigate }: StaffDashboardProps) {
  const visitors = [
    { name: 'David Smith', purpose: 'Admissions Inquiry', time: '10:15 AM', status: 'Checked In', color: 'bg-blue-500/10 text-blue-400' },
    { name: 'Linda Chen', purpose: 'Document Verification', time: '11:30 AM', status: 'Waiting', color: 'bg-orange-500/10 text-orange-400' },
    { name: 'Robert Fox', purpose: 'Vendor Delivery', time: '12:00 PM', status: 'Upcoming', color: 'bg-purple-500/10 text-purple-400' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome & Search Bar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tighter">Support Terminal</h2>
          <p className="text-xs text-[#8b919e] font-bold uppercase tracking-widest mt-0.5">Admin Office • Front Desk</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Campus Security Feed' } }))}
            className="flex items-center justify-center gap-2 bg-[#171b27] hover:bg-[#1b1f2b] text-[#a8c8ff] px-4 py-3 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Feed
          </button>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b919e] group-focus-within:text-[#a8c8ff] transition-colors" size={16} />
            <input className="bg-[#171b27] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs w-full md:w-64 focus:ring-1 focus:ring-[#a8c8ff] outline-none transition-all" placeholder="Search records, files..." />
          </div>
          <button className="bg-[#a8c8ff] text-[#001b3d] p-3 rounded-xl shadow-lg transition-all active:scale-95">
            <Plus size={20} />
          </button>
        </div>
      </section>

      {/* Quick Action Bento */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Register Visitor', icon: <Users2 size={20} />, count: '12 Today', color: 'text-blue-400', bg: 'bg-blue-500/5' },
          { label: 'Incoming Mail', icon: <Inbox size={20} />, count: '4 Pending', color: 'text-indigo-400', bg: 'bg-indigo-500/5' },
          { label: 'Certificates', icon: <FileText size={20} />, count: '28 Ready', color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
          { label: 'Lost & Found', icon: <ClipboardList size={20} />, count: '2 New', color: 'text-orange-400', bg: 'bg-orange-500/5' },
        ].map((item, idx) => (
          <div key={idx} className={`${item.bg} p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group`}>
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <p className="text-xs font-bold font-headline mb-1">{item.label}</p>
            <p className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest">{item.count}</p>
          </div>
        ))}
      </section>

      {/* Visitor Tracking */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2">
            <Timer className="text-[#a8c8ff]" size={20} />
            Live Visitor Log
            </h3>
            <span className="text-xs text-blue-400 font-bold uppercase tracking-widest hover:underline cursor-pointer">View All Activity</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visitors.map((visitor, idx) => (
            <div key={idx} className="bg-[#171b27] p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:bg-[#1b1f2b] transition-colors group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${visitor.color}`}>
                    {visitor.status}
                  </span>
                  <span className="text-[10px] text-[#8b919e] font-bold">{visitor.time}</span>
                </div>
                <h4 className="font-bold font-headline mb-1">{visitor.name}</h4>
                <p className="text-xs text-[#94a3b8] mb-4">{visitor.purpose}</p>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#a8c8ff] hover:text-white transition-colors">Details</button>
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-[#171b27]"></div>
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-[#171b27]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistance Section */}
      <section className="bg-gradient-to-br from-[#1b1f2b] to-[#0f131e] p-8 rounded-3xl border border-[#a8c8ff]/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <span className="material-symbols-outlined text-8xl text-[#a8c8ff]">psychology</span>
        </div>
        <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-[#a8c8ff] text-[10px] font-bold uppercase tracking-[0.2em] font-headline">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                AI Support Engine
            </div>
            <h2 className="text-2xl font-black font-headline max-w-lg leading-tight">Need help drafts for inquiry responses or document summaries?</h2>
            <p className="text-[#94a3b8] text-sm max-w-md">Our AI component can help you draft enrollment replies and summarize lengthy application documents in seconds.</p>
            <div className="flex flex-wrap gap-2 pt-4">
                <button className="bg-[#a8c8ff]/10 hover:bg-[#a8c8ff]/20 text-[#a8c8ff] font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all active:scale-95 border border-[#a8c8ff]/20">
                    Draft Response
                </button>
                <button className="bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all active:scale-95 border border-white/5">
                    Summarize Docs
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}
