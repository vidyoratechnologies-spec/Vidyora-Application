import { Heart, Activity, Calendar, Award, AlertTriangle, TrendingUp, Sparkles, MessageSquare, IndianRupee, Bell, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../../types.ts';

interface ParentDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function ParentDashboard({ navigate }: ParentDashboardProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Student Profile Overview */}
      <section className="bg-gradient-to-br from-[#1b1f2b] to-[#0f131e] p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb68e]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#ffb68e]/30 shadow-xl">
             <img src="https://picsum.photos/seed/harshith/200/200" alt="Harshith" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-headline tracking-tighter text-[#dfe2f2]">Harshith's Journey</h2>
            <p className="text-xs text-[#8b919e] font-bold uppercase tracking-widest mt-0.5">CSE • 2nd Year • Sec-B</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 relative z-10 w-full md:w-auto">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Parent-Teacher Meet (PTM)' } }))}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2 rounded-2xl border border-red-500/20 text-xs font-bold uppercase tracking-widest transition-all animate-pulse"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Live Session
          </button>
          <div className="flex gap-4 flex-1 md:flex-none">
            <div onClick={() => navigate('attendance_detail')} className="flex-1 text-center bg-white/5 px-6 py-2 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer active:scale-95">
              <p className="text-[9px] font-bold text-[#8b919e] uppercase tracking-[0.15em] mb-1">Attendance</p>
              <p className="text-xl font-black font-headline text-green-400">92%</p>
            </div>
            <div onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Rank Details', content: 'Harshith holds state rank #12. This rank is calculated based on cumulative GPA across standard assessments.' }}))} className="flex-1 text-center bg-white/5 px-6 py-2 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer active:scale-95">
              <p className="text-[9px] font-bold text-[#8b919e] uppercase tracking-[0.15em] mb-1">Rank</p>
              <p className="text-xl font-black font-headline text-[#a8c8ff]">#12</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Performance Summary */}
      <section className="bg-[#262a36] rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-4 right-4 animate-pulse">
            <Sparkles className="text-[#ffb68e]" size={20} />
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffb68e]/20 flex items-center justify-center text-[#ffb68e]">
                    <Heart size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-headline tracking-tight">AI Academic Summary</h3>
                  <p className="text-[10px] text-[#8b919e] font-bold uppercase tracking-widest">Updated 5m ago</p>
                </div>
            </div>
            <p className="text-[#dfe2f2]/90 font-medium italic leading-relaxed text-sm md:text-base">
                "Harshith is showing exceptional growth in Mathematical Logic. While his attendance remains strong at 92%, his recent Physics lab performance has slightly declined. We suggest a short refresher session on Circuit Analysis this weekend."
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
                <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase border border-green-500/20">Stable Growth</div>
                <div className="px-3 py-1 bg-[#a8c8ff]/10 text-[#a8c8ff] rounded-full text-[10px] font-bold uppercase border border-[#a8c8ff]/20">Active Participant</div>
            </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Exams', icon: <Award className="text-[#a8c8ff]" />, bg: 'bg-[#a8c8ff]/10', color: 'text-[#a8c8ff]', action: () => navigate('exams_detail') },
          { label: 'Attendance', icon: <Calendar className="text-green-500" />, bg: 'bg-green-500/10', color: 'text-green-500', action: () => navigate('attendance_detail') },
          { label: 'Connect Faculty', icon: <MessageSquare className="text-purple-400" />, bg: 'bg-purple-500/10', color: 'text-purple-400', action: () => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Connect Faculty', content: 'Select a faculty member to initiate a direct message or schedule a consultation session.' }})) },
          { label: 'Fees Portal', icon: <IndianRupee className="text-orange-400" />, bg: 'bg-orange-500/10', color: 'text-orange-400', action: () => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Fees Portal', content: 'View detailed fee breakdowns, download receipts, and manage upcoming semester payments securely.' }})) },
        ].map((action, i) => (
          <div key={i} onClick={action.action} className="bg-[#171b27] p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-[#1b1f2b] transition-all group active:scale-95">
            <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
              {action.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b919e] group-hover:text-white transition-colors">{action.label}</span>
          </div>
        ))}
      </section>

      {/* Recent Alerts & Fee Status */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#171b27] rounded-3xl p-6 border border-white/5 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-headline tracking-tighter">Recent Alerts</h3>
                <Bell size={18} className="text-[#8b919e]" />
            </div>
            <div className="space-y-4">
                {[
                    { label: 'New Mark Entry', date: 'Oct 12', desc: 'Semester-I Internal Marks released.', icon: <Award size={14} />, color: 'text-blue-400' },
                    { label: 'Attendance Alert', date: 'Oct 09', desc: 'Absent for Chemistry class today.', icon: <AlertTriangle size={14} />, color: 'text-orange-400' },
                ].map((alert, i) => (
                    <div key={i} onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: alert.label, content: alert.desc }}))} className="flex gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/5 group">
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex flex-shrink-0 items-center justify-center ${alert.color}`}>
                            {alert.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <span className="text-xs font-bold font-headline">{alert.label}</span>
                                <span className="text-[10px] text-[#8b919e]">{alert.date}</span>
                            </div>
                            <p className="text-xs text-[#94a3b8] mt-1">{alert.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-[#171b27] rounded-3xl p-6 border border-white/5 space-y-6">
            <h3 className="text-lg font-bold font-headline tracking-tighter">Financial Status</h3>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#ffb68e]/10 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest mb-1">Due Amount</p>
                    <h4 className="text-3xl font-black font-headline text-white">₹14,500</h4>
                  </div>
                  <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-red-500/20">Pending</span>
                </div>
                <p className="text-xs text-[#94a3b8] mb-6">Semester II Transport & Library Fee due by Oct 25.</p>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Payment Gateway Integration', content: 'Redirecting to secure payment portal (Razorpay/Stripe) to process the due amount of ₹14,500.' }}))}
                  className="w-full py-4 bg-[#ffb68e] hover:bg-[#fca57c] text-[#422006] font-bold rounded-2xl shadow-xl shadow-[#ffb68e]/10 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
                >
                    Pay Now <ChevronRight size={18} />
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}
