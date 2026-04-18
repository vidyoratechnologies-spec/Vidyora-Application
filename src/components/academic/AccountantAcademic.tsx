import { IndianRupee, FileText, Download, Filter, TrendingDown, Clock, Search, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AccountantAcademic() {
  const reports = [
    { title: 'Semester II Tuition Fee', status: '85% Collected', amount: '₹18.4L / ₹22.0L', trend: 'down' },
    { title: 'Transport Quarterly', status: '62% Collected', amount: '₹4.2L / ₹6.8L', trend: 'stable' },
    { title: 'Library & Misc', status: '94% Collected', amount: '₹1.1L / ₹1.2L', trend: 'up' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
        <h2 className="text-3xl font-black font-headline tracking-tighter mb-2">Financial Records</h2>
        <p className="text-[#94a3b8] text-sm font-medium">Fee structures, collection reports, and aging receivables.</p>
      </section>

      {/* Ledger Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-[#171b27] p-6 rounded-3xl border border-white/5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <FileText size={20} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${report.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-orange-400 bg-orange-400/10'}`}>
                {report.status}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-headline">{report.title}</h3>
              <p className="text-2xl font-black font-headline mt-1">{report.amount}</p>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('export-pdf', { 
                detail: { 
                  title: `Financial Ledger: ${report.title}`, 
                  content: [
                    `Report: ${report.title}`,
                    `Current Status: ${report.status}`,
                    `Amount Tracked: ${report.amount}`,
                    `Collection Trend: ${report.trend.toUpperCase()}`,
                    '',
                    'Notes: This report covers the fiscal collection cycle for the specified category.',
                    'Authorized by: Finance Department, Vidyora Inst.'
                  ] 
                } 
              }))}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-emerald-400 rounded-xl transition-all border border-emerald-500/10 flex items-center justify-center gap-2"
            >
                Download Ledger <Download size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Fee Structure Management */}
      <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} className="text-emerald-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                <IndianRupee size={16} />
                Structure Management
            </div>
            <h2 className="text-2xl font-black font-headline leading-tight">Revise Academic Fee 2026?</h2>
            <p className="text-[#94a3b8] max-w-sm">Current models suggest a 5% index increase to cover infrastructure expansions in Lab Area B.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center gap-2 text-sm whitespace-nowrap">
              Review Proposed Structure
              <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Defaulter Tracking */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2">
                <AlertCircle className="text-red-500" size={20} />
                Critical Defaulters
            </h3>
            <span className="text-xs text-[#8b919e] font-bold cursor-pointer hover:underline">View All List</span>
        </div>
        <div className="bg-[#171b27] rounded-2xl border border-white/5 divide-y divide-white/5">
            {[
                { name: 'John Doe', roll: 'BT-2022-012', pending: '₹45,000', days: '60+ days', color: 'text-red-500' },
                { name: 'Sarah Miller', roll: 'BT-2022-045', pending: '₹12,400', days: '15 days', color: 'text-orange-400' },
            ].map((def, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold font-headline group-hover:scale-110 transition-transform">
                            {def.name[0]}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold">{def.name}</h4>
                            <p className="text-[10px] text-[#8b919e] font-bold uppercase tracking-widest mt-0.5">{def.roll}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-sm font-black font-headline ${def.color}`}>{def.pending}</p>
                        <p className="text-[10px] text-[#8b919e] font-bold uppercase tracking-widest">{def.days} overdue</p>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}
