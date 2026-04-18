import { Home, School, Rss, Brain, User, Shield, Briefcase, Calculator, Users } from 'lucide-react';
import { Screen, NavigationProps, UserRole } from '../types.ts';
import { motion } from 'motion/react';

export default function BottomNav({ currentScreen, navigate, userRole }: NavigationProps) {
  const getNavItems = (role?: UserRole) => {
    const items: { id: Screen, label: string, icon: any }[] = [
      { id: 'dashboard' as Screen, label: role === 'student' ? 'Home' : 'Insight', icon: Home },
      { id: 'academic' as Screen, label: role === 'parent' ? 'Ward' : 'Scope', icon: School },
      { id: 'tutor' as Screen, label: role === 'student' ? 'Tutor' : 'Engine', icon: Brain },
      { id: 'feed' as Screen, label: 'Social', icon: Rss },
      { id: 'profile' as Screen, label: 'Me', icon: User },
    ];
    return items;
  };

  const navItems = getNavItems(userRole);

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-6 pt-3">
      <div className="max-w-md mx-auto bg-bg-secondary/90 backdrop-blur-3xl border border-border-subtle rounded-[2.5rem] shadow-2xl flex justify-around items-center p-2 ring-1 ring-inset ring-brand/5">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-95 duration-300 ease-out py-2 px-3 relative
                ${isActive 
                  ? 'text-white' 
                  : 'text-text-secondary hover:text-brand-accent'
                }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-glow"
                  className="absolute inset-0 bg-brand rounded-full shadow-lg shadow-brand/40"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`relative z-10 ${isActive ? 'fill-current' : ''}`} size={20} />
              <span className={`relative z-10 font-body text-[9px] uppercase tracking-[0.1em] font-black ${isActive ? 'text-white' : 'text-text-secondary'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
