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
          <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mt-0.5">Admin Office • Front Desk</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Campus Security Feed' } }))}
            className="flex items-center justify-center gap-2 bg-bg-secondary hover:bg-bg-card text-brand-accent px-4 py-3 rounded-xl border border-border-subtle text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Feed
          </button>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-accent transition-colors" size={16} />
            <input className="bg-bg-secondary border border-border-subtle rounded-xl py-3 pl-10 pr-4 text-xs w-full md:w-64 focus:ring-1 focus:ring-brand-accent outline-none transition-all" placeholder="Search records, files..." />
          </div>
          <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'New Entry', content: 'Create a new staff ledger entry, register a visitor, or log incoming physical mail/packages.' }}))} className="bg-brand-accent text-white p-3 rounded-xl shadow-lg transition-all active:scale-95">
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
          <div key={idx} onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: item.label, content: `Opening tools for: ${item.label}. Status: ${item.count}` }}))} className={`${item.bg} p-6 rounded-3xl border border-border-subtle hover:border-text-secondary/20 transition-all cursor-pointer group`}>
            <div className={`w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <p className="text-xs font-bold font-headline mb-1">{item.label}</p>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{item.count}</p>
          </div>
        ))}
      </section>

      {/* Visitor Tracking */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2">
            <Timer className="text-brand-accent" size={20} />
            Live Visitor Log
            </h3>
            <span onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Visitor Log Archive', content: 'Detailed historical ledger of all campus visitors, including check-in/out times and scanned IDs.' }}))} className="text-xs text-brand-accent font-bold uppercase tracking-widest hover:underline cursor-pointer">View All Activity</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visitors.map((visitor, idx) => (
            <div key={idx} className="bg-bg-secondary p-6 rounded-2xl border border-border-subtle flex flex-col justify-between hover:bg-bg-card transition-colors group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${visitor.color}`}>
                    {visitor.status}
                  </span>
                  <span className="text-[10px] text-text-secondary font-bold">{visitor.time}</span>
                </div>
                <h4 className="font-bold font-headline mb-1 text-text-primary">{visitor.name}</h4>
                <p className="text-xs text-text-secondary mb-4">{visitor.purpose}</p>
              </div>
              <div className="pt-4 border-t border-border-subtle flex justify-between items-center">
                <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Visitor Details', content: `Identity verification and contact logs for ${visitor.name}.` }}))} className="text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:text-text-primary transition-colors">Details</button>
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-bg-secondary border border-bg-secondary"></div>
                    <div className="w-6 h-6 rounded-full bg-bg-secondary border border-bg-secondary"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
