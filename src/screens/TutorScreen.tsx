import { Sparkles, Menu, Settings } from 'lucide-react'; 
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserRole } from '../types.ts';
import StudentAIAssistant from '../components/ai/StudentAIAssistant.tsx';
import FacultyAITools from '../components/ai/FacultyAITools.tsx';
import AdminAITools from '../components/ai/AdminAITools.tsx';
import SuperAdminAITools from '../components/ai/SuperAdminAITools.tsx';
import AccountantAITools from '../components/ai/AccountantAITools.tsx';
import ParentAITools from '../components/ai/ParentAITools.tsx';
import StaffAITools from '../components/ai/StaffAITools.tsx';

interface TutorScreenProps {
  navigate: (screen: Screen) => void;
  userRole?: UserRole;
}

export default function TutorScreen({ navigate, userRole }: TutorScreenProps) {
  const renderRoleAIAssistant = () => {
    switch (userRole) {
      case 'student':
        return <StudentAIAssistant />;
      case 'faculty':
        return <FacultyAITools />;
      case 'admin':
        return <AdminAITools />;
      case 'super_admin':
        return <SuperAdminAITools />;
      case 'accountant':
        return <AccountantAITools />;
      case 'parent':
        return <ParentAITools />;
      case 'staff':
        return <StaffAITools />;
      default:
        return <StudentAIAssistant />;
    }
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen selection:bg-brand/30 pb-40 transition-colors">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-bg-primary/90 backdrop-blur-2xl border-b border-border-subtle flex justify-between items-center px-6 h-18">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-brand/10 flex items-center justify-center text-brand border border-brand/20">
            <Sparkles size={20} className="fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-text-primary font-headline leading-none">AI Intelligence</h1>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-1 italic">World-Class Predictive Systems</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center hover:bg-brand-accent/5 transition-colors">
                <Settings size={18} className="text-text-secondary" />
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
            {renderRoleAIAssistant()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
