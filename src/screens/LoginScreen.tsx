import { Mail, Lock, UserSearch, ArrowRight, Fingerprint, ShieldCheck, Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types.ts';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  isDarkMode: boolean;
}

export default function LoginScreen({ onLogin, isDarkMode }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSocialLogin = (platform: string) => {
    setIsLoggingIn(true);
    // Simulate social auth delay
    setTimeout(() => {
      onLogin(selectedRole);
    }, 1500);
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen flex flex-col selection:bg-brand/30">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoggingIn && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <Loader2 className="w-12 h-12 text-brand animate-spin" />
              <div className="absolute inset-0 bg-brand/20 blur-xl animate-pulse"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold font-headline tracking-tight text-text-primary">Vidyora Secure Auth</h3>
              <p className="text-sm text-text-secondary font-medium">Communicating with SSO provider...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-bg-primary/80 backdrop-blur-xl flex items-center justify-center px-6 py-8 border-b border-border-subtle">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-black tracking-tighter text-brand leading-none">VIDYORA</h1>
          <p className="text-xs font-['Inter'] uppercase tracking-[0.2em] text-text-secondary font-semibold">AI-powered ERP & LMS</p>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-12 relative overflow-hidden">
        {/* BG Mesh Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,rgba(10,102,194,0.1)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(255,182,142,0.05)_0px,transparent_50%)]"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Login Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bg-secondary rounded-3xl p-8 shadow-2xl border border-border-subtle relative overflow-hidden group"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold text-text-primary mb-2 font-['Manrope'] tracking-tight">Welcome Back</h2>
                <p className="text-text-secondary text-sm font-medium">Please enter your credentials to access the portal</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(selectedRole); }}>
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-text-secondary px-1">Institutional Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand transition-colors" size={20} />
                    <input 
                      className="w-full bg-bg-primary border-none rounded-xl py-4 pl-12 pr-4 text-text-primary placeholder:text-text-secondary/50 ring-1 ring-border-subtle focus:ring-2 focus:ring-brand transition-all outline-none text-sm font-medium" 
                      placeholder="name@institution.edu" 
                      type="email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end px-1">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-text-secondary">Password Key</label>
                    <a className="text-[10px] font-bold text-brand uppercase tracking-wider hover:text-brand-accent transition-colors" href="#">Forgot Credentials?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand transition-colors" size={20} />
                    <input 
                      className="w-full bg-bg-primary border-none rounded-xl py-4 pl-12 pr-12 text-text-primary placeholder:text-text-secondary/50 ring-1 ring-border-subtle focus:ring-2 focus:ring-brand transition-all outline-none text-sm font-medium" 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-brand transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-text-secondary px-1">System Access Level</label>
                  <div className="relative group">
                    <UserSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand transition-colors" size={20} />
                    <select 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        className="w-full bg-bg-primary border-none rounded-xl py-4 pl-12 pr-10 text-text-primary appearance-none ring-1 ring-border-subtle focus:ring-2 focus:ring-brand transition-all outline-none text-sm font-bold"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Institutional Admin</option>
                      <option value="faculty">Faculty Member</option>
                      <option value="student">Student Account</option>
                      <option value="parent">Parent Portal</option>
                      <option value="accountant">Financial Accountant</option>
                      <option value="staff">Administrative Staff</option>
                    </select>
                  </div>
                </div>

                {/* Login Button */}
                <button 
                  className="w-full bg-gradient-to-r from-brand to-brand-accent text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4 flex items-center justify-center gap-2 group tracking-widest text-xs" 
                  type="submit"
                >
                  <span>SIGN IN TO PORTAL</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </form>

              {/* Social Logins */}
              <div className="mt-8 pt-6 border-t border-border-subtle space-y-4">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Identity Provider Auth</p>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-bg-primary border border-border-subtle hover:bg-bg-card transition-all font-bold text-[10px] uppercase tracking-widest active:scale-95 text-text-primary"
                  >
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 h-4" alt="Google" />
                    Google
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleSocialLogin('apple')}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-bg-primary border border-border-subtle hover:bg-bg-card transition-all font-bold text-[10px] uppercase tracking-widest active:scale-95 text-text-primary"
                  >
                    <img src={isDarkMode ? "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"} 
                         className={`w-4 h-4 ${isDarkMode ? 'invert' : ''}`} alt="Apple" />
                    Apple ID
                  </button>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-xs text-text-secondary font-medium">
                  Enrollment query? 
                  <a className="text-brand font-bold hover:underline decoration-2 underline-offset-4 ml-1" href="#">Support Desk</a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Background Decoration */}
          <div className="mt-12 flex justify-center items-center gap-8 opacity-40">
            <div className="flex items-center gap-2 text-text-primary">
              <ShieldCheck size={18} className="text-brand" />
              <span className="text-[10px] font-bold uppercase tracking-widest">TLS 1.3 Secure</span>
            </div>
            <div className="flex items-center gap-2 text-text-primary">
              <Sparkles size={18} className="text-purple-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Neural Sync</span>
            </div>
          </div>
        </div>
      </main>

      {/* Illustrative Background Element */}
      <div className="fixed bottom-0 left-0 w-full h-[353px] pointer-events-none z-0 opacity-[0.03] text-brand">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-current blur-3xl"></div>
      </div>
    </div>
  );
}
