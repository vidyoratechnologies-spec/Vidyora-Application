import { Search, Plus, Bell } from 'lucide-react'; 
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserRole } from '../types.ts';
import StudentFeed from '../components/feed/StudentFeed.tsx';
import AdminFeed from '../components/feed/AdminFeed.tsx';

interface FeedScreenProps {
  navigate: (screen: Screen) => void;
  userRole?: UserRole;
}

export default function FeedScreen({ navigate, userRole }: FeedScreenProps) {
  const renderRoleFeed = () => {
    switch (userRole) {
      case 'student':
        return <StudentFeed />;
      case 'admin':
      case 'super_admin':
      case 'faculty':
      case 'accountant':
      case 'staff':
        return <AdminFeed />;
      default:
        return <StudentFeed />;
    }
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen selection:bg-brand/30 pb-40">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-bg-primary/90 backdrop-blur-2xl border-b border-border-subtle flex justify-between items-center px-6 h-18">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-brand/10 flex items-center justify-center text-brand border border-brand/20 shadow-[0_0_15px_rgba(10,102,194,0.1)]">
            <span className="material-symbols-outlined text-xl">rss_feed</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-text-primary font-headline leading-none">Vidyora Feed</h1>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-1">Institutional Pulse</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-accent text-white flex items-center justify-center shadow-lg shadow-blue-900/40 active:scale-95 transition-transform">
                <Plus size={20} />
            </button>
        </div>
      </header>

      <main className="pt-28 px-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={userRole || 'default'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderRoleFeed()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
