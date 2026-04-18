export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'faculty'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'staff';

export type Screen = 
  | 'login' 
  | 'dashboard'
  | 'academic' 
  | 'feed' 
  | 'tutor' 
  | 'profile'
  | 'management'
  | 'finance'
  | 'tools';

export interface NavigationProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  userRole?: UserRole;
}
