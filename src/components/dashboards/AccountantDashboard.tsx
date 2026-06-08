import { IndianRupee, PieChart, TrendingUp, Filter, Search, Plus, Calendar, Download, Zap, ArrowUpRight, ArrowDownLeft, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../../types.ts';

interface AccountantDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function AccountantDashboard({ navigate }: AccountantDashboardProps) {
  const transactions = [
    { id: 'TXN-9021', user: 'Harshith (CSE)', type: 'Tuition Fee', amount: '₹14,500', date: 'Today, 2:40 PM', status: 'Success' },
    { id: 'TXN-9020', user: 'Sarah M (ME)', type: 'Library Fine', amount: '₹250', date: 'Today, 11:15 AM', status: 'Pending' },
    { id: 'TXN-9019', user: 'Kevin Z (CE)', type: 'Transport', amount: '₹4,000', date: 'Yesterday', status: 'Success' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Finance Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-bg-card p-8 rounded-3xl border border-border-subtle relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} className="text-emerald-400" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <IndianRupee size={16} />
                Financial Overview
              </div>
              <h2 className="text-4xl font-black font-headline leading-tight tracking-tighter">Total Collected: ₹24.8L</h2>
              <div className="flex items-center gap-4 text-emerald-500 font-bold text-sm">
                <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                  <ArrowUpRight size={14} /> +12.5%
                </div>
                <span className="text-text-secondary font-medium">Expected this month: ₹32.0L</span>
              </div>
            </div>
            <div className="w-full md:w-32 h-32 flex items-center justify-center">
              {/* Simplistic Donut Chart Illusion */}
              <div className="w-24 h-24 rounded-full border-[10px] border-border-subtle border-t-emerald-500 border-r-emerald-500/50 flex items-center justify-center relative">
                 <span className="text-[10px] font-bold text-text-secondary">75% PAID</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-bg-secondary p-8 rounded-3xl border border-border-subtle flex flex-col justify-between">
           <div className="space-y-1">
             <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Outstanding Fees</p>
             <h3 className="text-3xl font-black font-headline text-orange-400">₹7.2L</h3>
           </div>
           <p className="text-xs text-text-secondary leading-relaxed">142 students currently have pending dues exceeding 30 days.</p>
           <div className="space-y-2 mt-6">
             <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Bulk Reminders', content: 'Sending out SMS and Email reminders for overdue fees.' }}))} className="w-full py-4 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all border border-orange-500/20 active:scale-95">
               Send Bulk Reminders
             </button>
             <button 
               onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: 'Accounts Support Line' } }))}
               className="w-full py-3 bg-bg-secondary hover:bg-black/10 text-text-secondary text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-border-subtle flex items-center justify-center gap-2"
             >
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Live Support Channel
             </button>
           </div>
        </div>
      </section>

      {/* AI Revenue Forecast */}
      <section className="bg-bg-card p-6 rounded-3xl border border-emerald-500/20 relative overflow-hidden group">
        <div className="absolute top-4 right-6 text-emerald-400 opacity-20 group-hover:opacity-40 transition-opacity">
            <Zap size={24} />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <span className="material-symbols-outlined text-2xl">auto_awesome</span>
             </div>
             <div>
                <h3 className="text-lg font-bold font-headline tracking-tighter">AI Cash Flow Forecast</h3>
                <p className="text-xs text-text-secondary font-medium italic mt-0.5">"Predicted revenue for November is ₹38.4L based on historical enrollment & early payments."</p>
             </div>
          </div>
          <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Trend Analysis', content: 'Opening AI forecasting details and parameters.' }}))} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
              Analyze Trends
          </button>
        </div>
      </section>

      {/* Recent Activity Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-headline">Recent Activity</h3>
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('export-pdf', { 
                    detail: { 
                      title: 'Financial Transaction Activity', 
                      content: transactions.map(t => `${t.id} - ${t.user} - ${t.type} - ${t.amount} - ${t.status}`) 
                    } 
                  }))}
                  className="p-2 bg-bg-secondary hover:bg-black/10 rounded-xl text-text-secondary border border-border-subtle"
                >
                    <Download size={18} />
                </button>
                <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Filter', content: 'Filter transaction by date, type or status.' }}))} className="p-2 bg-bg-secondary hover:bg-black/10 rounded-xl text-text-secondary border border-border-subtle">
                    <Filter size={18} />
                </button>
                <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'New Entry', content: 'Opening form to manually log new payments or fines.' }}))} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Plus size={16} /> New Entry
                </button>
            </div>
        </div>
        <div className="bg-bg-secondary rounded-3xl border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border-subtle bg-white/2 pb-4">
                            <th className="p-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Transaction ID</th>
                            <th className="p-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Name / Section</th>
                            <th className="p-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Type</th>
                            <th className="p-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Amount</th>
                            <th className="p-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {transactions.map((txn, idx) => (
                            <tr key={idx} onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Transaction Details', content: `View complete details and generate receipt for ${txn.id}.` }}))} className="hover:bg-bg-card transition-colors group cursor-pointer">
                                <td className="p-5 text-xs font-mono text-brand-accent">{txn.id}</td>
                                <td className="p-5">
                                    <span className="text-xs font-bold block">{txn.user}</span>
                                    <span className="text-[10px] text-text-secondary mt-0.5">{txn.date}</span>
                                </td>
                                <td className="p-5 text-xs text-text-primary/80">{txn.type}</td>
                                <td className="p-5 text-xs font-bold text-text-primary">{txn.amount}</td>
                                <td className="p-5 text-right">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${txn.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                        {txn.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </section>
    </div>
  );
}
