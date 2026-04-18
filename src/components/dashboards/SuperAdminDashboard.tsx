import { Building2, Users, CreditCard, Activity, TrendingUp, ArrowUpRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../../types.ts';

interface SuperAdminDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function SuperAdminDashboard({ navigate }: SuperAdminDashboardProps) {
  const institutions = [
    { name: 'Vidyora University - Main', students: '12.4k', growth: '+5.2%', health: 98, status: 'Optimal' },
    { name: 'Vityora Academy - North', students: '4.1k', growth: '+12.8%', health: 85, status: 'Warning' },
    { name: 'Technical Wing - East', students: '2.8k', growth: '-1.4%', health: 92, status: 'Stable' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Institutions', value: '18', icon: <Building2 className="text-blue-400" />, trend: '+2 this year' },
          { label: 'Total Enrollments', value: '45.2k', icon: <Users className="text-purple-400" />, trend: '+8% vs LY' },
          { label: 'Total Revenue', value: '$2.4M', icon: <CreditCard className="text-green-400" />, trend: '+14% growth' },
          { label: 'System Uptime', value: '99.9%', icon: <Activity className="text-orange-400" />, trend: 'Healthy' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#171b27] p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black font-headline mt-1">{stat.value}</h3>
            <p className="text-[9px] font-bold text-blue-400/70 mt-1 uppercase tracking-wider">{stat.trend}</p>
          </div>
        ))}
      </section>

      {/* AI Health Pulse */}
      <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-8 relative overflow-hidden border border-blue-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap size={120} className="text-blue-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={16} />
              AI Organizational Health Pulse
            </div>
            <h2 className="text-3xl font-black font-headline leading-tight">Your organization is at <span className="text-blue-400">94.2%</span> efficiency.</h2>
            <p className="text-[#94a3b8] max-w-md">Our neural engine has identified a bottleneck in "North Academy" fee collection workflows. Recommendation: Deploy automated reminders.</p>
          </div>
          <div className="flex flex-col gap-2">
            <button 
               onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Global Campus Broadcast' } }))}
               className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/10"
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
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
                Generate Global Audit
                <ArrowUpRight size={18} />
            </button>
            <p className="text-[10px] text-center text-[#8b919e] font-bold uppercase tracking-widest">Live Analysis Active</p>
          </div>
        </div>
      </section>

      {/* Institution Manager */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold font-headline">Institution Health</h3>
          <button className="text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
            Manage All <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {institutions.map((inst, idx) => (
            <div key={idx} className="bg-[#171b27] p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1b1f2b] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#313441] to-[#171b27] flex items-center justify-center text-blue-400 font-black text-xl border border-white/5 group-hover:scale-110 transition-transform">
                  {inst.name[0]}
                </div>
                <div>
                  <h4 className="font-bold font-headline">{inst.name}</h4>
                  <p className="text-xs text-[#8b919e] mt-0.5">{inst.students} students • {inst.growth} growth</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest mb-1">Health Score</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${inst.health > 90 ? 'bg-green-500' : inst.health > 80 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${inst.health}%` }}></div>
                    </div>
                    <span className="text-xs font-bold">{inst.health}%</span>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${inst.status === 'Optimal' ? 'bg-green-500/10 text-green-500' : inst.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
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
