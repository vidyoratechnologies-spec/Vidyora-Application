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
  | 'tools'
  | 'attendance_detail'
  | 'exams_detail'
  | 'schedule_detail'
  | 'marks_detail'
  | 'rank_detail'
  | 'notes_selector'
  | 'test_selector';

export interface NavigationProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  userRole?: UserRole;
}
