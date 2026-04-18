import { ShieldAlert, Info, Bell, FileText, ChevronRight, Bookmark } from 'lucide-react';

export default function AdminFeed() {
  const notices = [
    { title: 'HR Policy Update', dept: 'Administration', date: 'Oct 15', type: 'Policy', priority: 'High' },
    { title: 'New Lab Equipment Procurement', dept: 'Facilities', date: 'Oct 12', type: 'Procurement', priority: 'Medium' },
    { title: 'Annual Audit Schedule', dept: 'Finance / ERP', date: 'Oct 10', type: 'Audit', priority: 'High' },
    { title: 'Staff Welfare Initiative', dept: 'HR', date: 'Oct 05', type: 'Event', priority: 'Low' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2">Notice Board</h2>
          <p className="text-[#94a3b8] text-sm font-medium">Institutional governance and official communication feed.</p>
      </section>

      {/* Critical Alert Banner */}
      <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-3xl flex items-start gap-4 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
        <div className="w-10 h-10 rounded-2xl bg-red-500 flex items-center justify-center text-white shrink-0">
            <ShieldAlert size={20} />
        </div>
        <div className="space-y-1">
            <h4 className="text-sm font-bold text-red-500 font-headline">Security Protocol Upgrade</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">All staff are required to update their 2FA credentials by Oct 20th to comply with new ERP safety standards.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
            <h3 className="text-lg font-bold font-headline">Recent Circulars</h3>
            <span className="text-xs text-blue-400 font-bold uppercase tracking-widest cursor-pointer hover:underline">Download All</span>
        </div>
        
        {notices.map((notice, idx) => (
          <div key={idx} className="bg-[#171b27] p-5 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-[#1b1f2b] transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-[#313441] text-[#8b919e] group-hover:bg-[#0a66c2]/20 group-hover:text-[#4da3ff] transition-all`}>
                    <FileText size={20} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${notice.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'}`}>
                            {notice.priority}
                        </span>
                        <span className="text-[10px] text-[#8b919e] font-bold uppercase tracking-widest">{notice.type}</span>
                    </div>
                    <h4 className="text-sm font-bold leading-tight decoration-blue-500/30 group-hover:underline underline-offset-4">{notice.title}</h4>
                    <p className="text-[10px] text-[#8b919e] font-bold mt-1 uppercase tracking-widest">{notice.dept} • {notice.date}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Bookmark size={16} className="text-[#8b919e] opacity-40 hover:opacity-100 transition-opacity" />
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0a66c2] group-hover:text-white transition-all">
                    <ChevronRight size={16} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
