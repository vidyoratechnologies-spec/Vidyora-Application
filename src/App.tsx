import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserRole } from './types.ts';
import LoginScreen from './screens/LoginScreen.tsx';
import DashboardScreen from './screens/DashboardScreen.tsx';
import AcademicScreen from './screens/AcademicScreen.tsx';
import FeedScreen from './screens/FeedScreen.tsx';
import TutorScreen from './screens/TutorScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import BottomNav from './components/BottomNav.tsx';
import VideoConference from './components/VideoConference.tsx';
import QuizContainer from './components/QuizContainer.tsx';
import GenericModal from './components/GenericModal.tsx';
import { exportToPDF } from './lib/pdfUtils.ts';

// Detailed Screens
import AttendanceDetail from './components/academic/detailed/AttendanceDetail.tsx';
import ExamDetail from './components/academic/detailed/ExamDetail.tsx';
import ScheduleDetail from './components/academic/detailed/ScheduleDetail.tsx';
import SubjectSelector from './components/academic/detailed/SubjectSelector.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [videoCallLabel, setVideoCallLabel] = useState('Course Session');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizGrade, setQuizGrade] = useState<'10th' | '12th'>('12th');
  const [genericModal, setGenericModal] = useState({ isOpen: false, title: '', content: '' });

  useEffect(() => {
    const handlePdfExport = (e: any) => {
      exportToPDF(e.detail.title, e.detail.content);
    };

    const handleVideoCall = (e: any) => {
      setVideoCallLabel(e.detail.label || 'Course Session');
      setIsVideoCallOpen(true);
    };

    const handleStartQuiz = (e: any) => {
      setQuizGrade(e.detail.grade || '12th');
      setIsQuizOpen(true);
    };

    const handleShowModal = (e: any) => {
      setGenericModal({ isOpen: true, title: e.detail.title, content: e.detail.content });
    };

    window.addEventListener('export-pdf', handlePdfExport);
    window.addEventListener('start-video-call', handleVideoCall);
    window.addEventListener('start-quiz', handleStartQuiz);
    window.addEventListener('show-modal', handleShowModal);

    return () => {
      window.removeEventListener('export-pdf', handlePdfExport);
      window.removeEventListener('start-video-call', handleVideoCall);
      window.removeEventListener('start-quiz', handleStartQuiz);
      window.removeEventListener('show-modal', handleShowModal);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} isDarkMode={isDarkMode} />;
      case 'dashboard':
        return <DashboardScreen navigate={navigate} userRole={userRole!} />;
      case 'academic':
        return <AcademicScreen navigate={navigate} userRole={userRole} />;
      case 'feed':
        return <FeedScreen navigate={navigate} userRole={userRole} />;
      case 'tutor':
        return <TutorScreen navigate={navigate} userRole={userRole} />;
      case 'profile':
        return <ProfileScreen navigate={navigate} userRole={userRole} onLogout={() => navigate('login')} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      case 'attendance_detail':
        return <AttendanceDetail onBack={() => userRole === 'parent' ? navigate('dashboard') : navigate('academic')} />;
      case 'exams_detail':
        return <ExamDetail onBack={() => navigate('academic')} />;
      case 'schedule_detail':
        return <ScheduleDetail onBack={() => navigate('dashboard')} />;
      case 'marks_detail':
        return <AttendanceDetail onBack={() => navigate('dashboard')} />; 
      case 'rank_detail':
        return <AttendanceDetail onBack={() => navigate('dashboard')} />;
      case 'notes_selector':
        return <SubjectSelector onBack={() => navigate('academic')} mode="notes" />;
      case 'test_selector':
        return <SubjectSelector onBack={() => navigate('academic')} mode="test" />;
      default:
        return <LoginScreen onLogin={handleLogin} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentScreen}-${userRole}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {currentScreen !== 'login' && (
        <BottomNav currentScreen={currentScreen} navigate={navigate} userRole={userRole} />
      )}

      <VideoConference 
        isOpen={isVideoCallOpen} 
        onClose={() => setIsVideoCallOpen(false)} 
        classNameLabel={videoCallLabel}
      />

      <QuizContainer 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        grade={quizGrade}
      />

      <GenericModal 
        isOpen={genericModal.isOpen} 
        onClose={() => setGenericModal(prev => ({ ...prev, isOpen: false }))} 
        title={genericModal.title} 
        content={genericModal.content} 
      />
    </div>
  );
}
