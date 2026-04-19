import { Settings, LogOut, Edit3 } from 'lucide-react'; 
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserRole } from '../types.ts';
import StudentProfile from '../components/profile/StudentProfile.tsx';
import FacultyProfile from '../components/profile/FacultyProfile.tsx';
import AdminProfile from '../components/profile/AdminProfile.tsx';

interface ProfileScreenProps {
  navigate: (screen: Screen) => void;
  userRole?: UserRole;
  onLogout: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export default function ProfileScreen({ navigate, userRole, onLogout, toggleTheme, isDarkMode }: ProfileScreenProps) {
  const renderRoleProfile = () => {
    switch (userRole) {
      case 'student':
        return <StudentProfile onLogout={onLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      case 'faculty':
        return <FacultyProfile onLogout={onLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      case 'admin':
      case 'super_admin':
        return <AdminProfile onLogout={onLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      case 'accountant':
      case 'staff':
      case 'parent':
        return <StudentProfile onLogout={onLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />; 
      default:
        return <StudentProfile onLogout={onLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen selection:bg-brand/30 pb-40">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-bg-primary/90 backdrop-blur-2xl border-b border-border-subtle flex justify-between items-center px-6 h-18">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-bg-secondary flex items-center justify-center text-text-secondary border border-border-subtle">
            <span className="material-symbols-outlined text-xl">account_circle</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-text-primary font-headline leading-none">Profile</h1>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-1">Personal Identifier</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center hover:bg-bg-card transition-colors">
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
            {renderRoleProfile()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
