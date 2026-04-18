import { Bell } from 'lucide-react';
import { UserRole, Screen } from '../types.ts';
import StudentDashboard from '../components/dashboards/StudentDashboard.tsx';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard.tsx';
import AdminDashboard from '../components/dashboards/AdminDashboard.tsx';
import FacultyDashboard from '../components/dashboards/FacultyDashboard.tsx';
import ParentDashboard from '../components/dashboards/ParentDashboard.tsx';
import AccountantDashboard from '../components/dashboards/AccountantDashboard.tsx';
import StaffDashboard from '../components/dashboards/StaffDashboard.tsx';

interface DashboardScreenProps {
  navigate: (screen: Screen) => void;
  userRole: UserRole;
}

export default function DashboardScreen({ navigate, userRole }: DashboardScreenProps) {
  const getDashboard = () => {
    switch (userRole) {
      case 'super_admin': return <SuperAdminDashboard navigate={navigate} />;
      case 'admin': return <AdminDashboard navigate={navigate} />;
      case 'faculty': return <FacultyDashboard navigate={navigate} />;
      case 'student': return <StudentDashboard navigate={navigate} />;
      case 'parent': return <ParentDashboard navigate={navigate} />;
      case 'accountant': return <AccountantDashboard navigate={navigate} />;
      case 'staff': return <StaffDashboard navigate={navigate} />;
      default: return <StudentDashboard navigate={navigate} />;
    }
  };

  const dashboardTitles: Record<UserRole, string> = {
    super_admin: 'Organization Hub',
    admin: 'Institution Portal',
    faculty: 'Academic Dashboard',
    student: 'Student Feed',
    parent: 'Parent Portal',
    accountant: 'Financial Terminal',
    staff: 'Office Hub'
  };

  return (
    <div className="bg-[#0f131e] text-[#dfe2f2] min-h-screen font-body selection:bg-[#0a66c2]/30 pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0f131e]/80 backdrop-blur-xl flex justify-between items-center px-6 h-16 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a66c2] to-[#4da3ff] flex items-center justify-center">
            <span className="font-headline font-black text-white text-xs">V</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#a8c8ff] font-headline leading-none">Vidyora</h1>
            <p className="text-[10px] text-[#8b919e] font-bold uppercase tracking-widest mt-0.5">{dashboardTitles[userRole]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1b1f2b] text-[#a8c8ff] hover:bg-[#262a36] transition-colors border border-white/5 relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1b1f2b]"></span>
          </button>
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#0a66c2]/30">
            <img 
              src={`https://picsum.photos/seed/${userRole}/100/100`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-4xl mx-auto">
        {getDashboard()}
      </main>
    </div>
  );
}
