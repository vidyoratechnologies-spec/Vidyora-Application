import { Bell, Menu, Search, Filter } from 'lucide-react'; 
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserRole } from '../types.ts';
import StudentAcademic from '../components/academic/StudentAcademic.tsx';
import FacultyAcademic from '../components/academic/FacultyAcademic.tsx';
import AdminAcademic from '../components/academic/AdminAcademic.tsx';
import AccountantAcademic from '../components/academic/AccountantAcademic.tsx';
import ParentAcademic from '../components/academic/ParentAcademic.tsx';

interface AcademicScreenProps {
  navigate: (screen: Screen) => void;
  userRole?: UserRole;
}

export default function AcademicScreen({ navigate, userRole }: AcademicScreenProps) {
  const renderRoleAcademic = () => {
    switch (userRole) {
      case 'student':
        return <StudentAcademic />;
      case 'faculty':
        return <FacultyAcademic />;
      case 'admin':
      case 'super_admin':
        return <AdminAcademic />;
      case 'accountant':
        return <AccountantAcademic />;
      case 'parent':
        return <ParentAcademic />;
      default:
        return <StudentAcademic />;
    }
  };

  return (
    <div className="bg-[#0f131e] text-[#dfe2f2] min-h-screen selection:bg-[#0a66c2]/30 pb-40">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0f131e]/90 backdrop-blur-2xl ring-1 ring-white/5 flex justify-between items-center px-6 h-18">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0a66c2] to-[#4da3ff] flex items-center justify-center text-white shadow-lg shadow-blue-900/40 border border-white/10">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white font-headline leading-none">Academics</h1>
            <p className="text-[10px] text-[#8b919e] font-bold uppercase tracking-widest mt-1">Vidyora ERP v4</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Search size={18} className="text-[#8b919e]" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Bell size={18} className="text-[#8b919e]" />
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
            {renderRoleAcademic()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
