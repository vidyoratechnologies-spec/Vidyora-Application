import { Building, GraduationCap, Users, LayoutDashboard, Globe, ArrowUpRight, ShieldCheck, Map, Activity, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminAcademic() {
  const departments = [
    { name: 'Computer Science', head: 'Prof. R. Sinha', students: 1240, faculty: 45, score: 92 },
    { name: 'Mechanical Eng.', head: 'Dr. V. Gupta', students: 850, faculty: 32, score: 85 },
    { name: 'Electrical Eng.', head: 'Prof. A. Rao', students: 780, faculty: 28, score: 88 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
        <h2 className="text-3xl font-black font-headline tracking-tighter mb-2">Institutional Management</h2>
        <p className="text-[#94a3b8] text-sm font-medium">Global oversight of departments, curriculum, and staffing.</p>
      </section>

      {/* Admin Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Faculty', value: '142', icon: <Users size={18} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Overall GPA Avg', value: '7.82', icon: <GraduationCap size={18} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Active Labs', value: '24', icon: <Building size={18} />, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'System Health', value: '99.9%', icon: <Activity size={18} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#171b27] p-5 rounded-3xl border border-white/5 group hover:bg-[#1b1f2b] transition-all">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-2xl font-black font-headline mt-1">{stat.value}</h4>
          </div>
        ))}
      </section>

      {/* Department Scoreboard */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold font-headline">Departmental Performance</h3>
          <button className="text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
            Manage All <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {departments.map((dept, idx) => (
            <div key={idx} className="bg-[#171b27] p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1d2230] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#313441] flex items-center justify-center text-blue-400 font-black text-xl border border-white/5">
                  {dept.name[0]}
                </div>
                <div>
                  <h4 className="font-bold font-headline">{dept.name}</h4>
                  <p className="text-xs text-[#8b919e] mt-0.5">Head: {dept.head} • {dept.students} students</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest mb-1">Academic Score</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dept.score}%` }}></div>
                    </div>
                    <span className="text-xs font-bold">{dept.score}%</span>
                  </div>
                </div>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                    <Mail size={16} className="text-[#8b919e]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
