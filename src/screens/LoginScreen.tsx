import { Mail, Lock, UserSearch, ArrowRight, Fingerprint, ShieldCheck, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types.ts';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  return (
    <div className="bg-[#0f131e] text-[#dfe2f2] min-h-screen flex flex-col selection:bg-primary/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0f131e]/80 backdrop-blur-xl flex items-center justify-center px-6 py-8">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-black tracking-tighter text-[#a8c8ff] leading-none">VIDYORA</h1>
          <p className="text-xs font-['Inter'] uppercase tracking-[0.2em] text-[#8b919e] font-semibold">AI-powered ERP & LMS</p>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
        {/* BG Mesh Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,rgba(10,102,194,0.15)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(255,182,142,0.05)_0px,transparent_50%)]"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Login Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#171b27] rounded-3xl p-8 shadow-[0_24px_48px_rgba(0,0,0,0.4)] border border-[#414752]/10 relative overflow-hidden group"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#a8c8ff]/10 rounded-full blur-3xl group-hover:bg-[#a8c8ff]/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold text-[#dfe2f2] mb-2 font-['Manrope']">Welcome Back</h2>
                <p className="text-[#c1c6d4] text-sm">Please enter your details to continue</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(selectedRole); }}>
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#8b919e] px-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b919e] group-focus-within:text-[#a8c8ff] transition-colors" size={20} />
                    <input 
                      className="w-full bg-[#313441] border-none rounded-xl py-4 pl-12 pr-4 text-[#dfe2f2] placeholder:text-[#8b919e]/50 focus:ring-2 focus:ring-[#3994ef] transition-all outline-none" 
                      placeholder="name@institution.edu" 
                      type="email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end px-1">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#8b919e]">Password</label>
                    <a className="text-[10px] font-bold text-[#a8c8ff] uppercase tracking-wider hover:text-[#a2c9ff] transition-colors" href="#">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b919e] group-focus-within:text-[#a8c8ff] transition-colors" size={20} />
                    <input 
                      className="w-full bg-[#313441] border-none rounded-xl py-4 pl-12 pr-12 text-[#dfe2f2] placeholder:text-[#8b919e]/50 focus:ring-2 focus:ring-[#3994ef] transition-all outline-none" 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b919e] hover:text-[#dfe2f2] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#8b919e] px-1">Access Role</label>
                  <div className="relative group">
                    <UserSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b919e] group-focus-within:text-[#a8c8ff] transition-colors" size={20} />
                    <select 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        className="w-full bg-[#313441] border-none rounded-xl py-4 pl-12 pr-10 text-[#dfe2f2] appearance-none focus:ring-2 focus:ring-[#3994ef] transition-all outline-none"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="faculty">Faculty</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="accountant">Accountant</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                </div>

                {/* Login Button */}
                <button 
                  className="w-full bg-gradient-to-r from-[#0A66C2] to-[#4DA3FF] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-[#a8c8ff]/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4 flex items-center justify-center gap-2 group" 
                  type="submit"
                >
                  <span>SIGN IN TO PORTAL</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-10 text-center space-y-4">
                <p className="text-sm text-[#c1c6d4]">
                  Don't have an account? 
                  <a className="text-[#a8c8ff] font-semibold hover:underline decoration-2 underline-offset-4 ml-1" href="#">Contact Admin</a>
                </p>
                {/* Biometric Fallback */}
                <div className="pt-6 flex flex-col items-center gap-3">
                  <button className="p-4 rounded-full bg-[#1b1f2b] hover:bg-[#262a36] transition-colors text-[#a8c8ff] border border-[#414752]/20">
                    <Fingerprint size={32} />
                  </button>
                  <span className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest">Use Biometric Login</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Background Decoration */}
          <div className="mt-12 flex justify-center items-center gap-8 opacity-40">
            <div className="flex items-center gap-2 text-[#dfe2f2]">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Cloud</span>
            </div>
            <div className="flex items-center gap-2 text-[#dfe2f2]">
              <Sparkles size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">AI Enhanced</span>
            </div>
          </div>
        </div>
      </main>

      {/* Illustrative Background Element */}
      <div className="fixed bottom-0 left-0 w-full h-[353px] pointer-events-none z-0 opacity-30">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-[#a8c8ff]/20 to-transparent blur-3xl"></div>
      </div>
    </div>
  );
}
