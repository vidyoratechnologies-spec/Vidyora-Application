import { BookOpen, FileSpreadsheet, PlusCircle, Users, Activity, ListChecks, ArrowRight, BrainCircuit, PenTool, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from '../../types.ts';
import { GoogleGenAI } from "@google/genai";
import { useState } from 'react';

interface FacultyDashboardProps {
  navigate: (screen: Screen) => void;
}

export default function FacultyDashboard({ navigate }: FacultyDashboardProps) {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const generateQuestions = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 5 high-quality academic questions for the topic: "${topic}". Format each question as a new line starting with a number.`
      });
      const text = response.text || "";
      setQuestions(text.split('\n').filter(q => q.trim().length > 0));
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentClasses = [
    { subject: 'Advanced Thermodynamics', code: 'ME-402', students: 48, attendance: '92%', time: '10:00 AM', status: 'In Progress' },
    { subject: 'Applied Mathematics', code: 'MA-201', students: 56, attendance: '88%', time: '01:30 PM', status: 'Next' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#1e1e2e] to-[#0f131e] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen size={120} className="text-orange-400 rotate-12" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black font-headline tracking-tighter">Good morning, Prof. Sharma</h2>
            <p className="text-[#94a3b8] text-sm font-medium">You have <span className="text-orange-400 font-bold underline underline-offset-4">3 classes</span> scheduled for today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Mark Attendance', content: 'Quickly record proxy attendance or invoke biometric scanners for the current live class.' }}))} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2">
                <PlusCircle size={18} />
                Mark Attendance
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Attendance Ledger', content: 'View detailed log of past attendance records for all your classes.' }}))} className="bg-white/5 hover:bg-white/10 text-white px-2 py-3 rounded-xl border border-white/5 transition-colors">
                <ListChecks size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Classroom Status */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold font-headline flex items-center gap-2">
            <Activity className="text-orange-400" size={20} />
            Classroom Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentClasses.map((cls, idx) => (
            <div key={idx} className="bg-[#171b27] p-6 rounded-2xl border border-white/5 hover:border-orange-500/20 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${cls.status === 'In Progress' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-400'}`}>
                    {cls.status}
                  </div>
                  <span className="text-xs text-[#8b919e] font-bold">{cls.time}</span>
                </div>
                <h4 className="text-xl font-bold font-headline mb-1 group-hover:text-orange-400 transition-colors">{cls.subject}</h4>
                <p className="text-xs text-[#8b919e] font-bold uppercase tracking-widest mb-6">{cls.code} • {cls.students} Students enrolled</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#94a3b8]">Avg Attendance</span>
                  <span className="text-sm font-bold text-[#dfe2f2]">{cls.attendance}</span>
                </div>
                <div className="flex items-center gap-2">
                  {cls.status === 'In Progress' && (
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('start-video-call', { detail: { label: cls.subject } }))}
                      className="bg-orange-500 hover:bg-orange-400 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all"
                    >
                      Take Class
                    </button>
                  )}
                  <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Class Details', content: 'View detailed student list, historical attendance, and continuous evaluation records for this batch.' }}))} className="text-[#a8c8ff] text-xs font-bold uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Detail <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Tool: Question Generator */}
      <section className="bg-[#1b1f2b] p-8 rounded-3xl border border-orange-500/10 relative shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/[0.03] to-transparent pointer-events-none"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
            <BrainCircuit size={20} />
          </div>
          <h3 className="text-xl font-bold font-headline">AI Question Paper Generator</h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-[#94a3b8] mb-4">Instantly generate exam or quiz questions based on specific topics or syllabus units.</p>
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-[#0f131e] border border-white/10 rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all" 
              placeholder="Enter topic (e.g., Quantum Entanglement, French Revolution...)" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button 
                onClick={generateQuestions}
                disabled={isGenerating}
                className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
                {isGenerating ? <Activity className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generate
            </button>
          </div>

          <AnimatePresence>
            {questions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 space-y-3 pt-6 border-t border-white/5"
              >
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-[#8b919e] uppercase tracking-widest">AI Generated Content</span>
                    <button onClick={() => setQuestions([])} className="text-[10px] text-red-500 font-bold uppercase hover:underline">Clear</button>
                </div>
                {questions.map((q, i) => (
                  <div key={i} className="bg-[#0f131e] p-4 rounded-xl border border-white/5 text-sm text-[#dfe2f2]/90 leading-relaxed hover:bg-[#262a36] transition-colors cursor-pointer group">
                    {q}
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                    <button onClick={() => window.dispatchEvent(new CustomEvent('show-modal', { detail: { title: 'Edit Questions', content: 'Opening question editor interface for manual refinement.' }}))} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-[#a8c8ff] transition-colors flex items-center justify-center gap-2">
                        <PenTool size={14} /> Edit Questions
                    </button>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('export-pdf', { detail: { title: `Questions: ${topic}`, content: questions } }))}
                      className="flex-1 py-3 bg-orange-500/10 hover:bg-orange-500/20 rounded-xl text-xs font-bold uppercase tracking-widest text-orange-400 transition-colors flex items-center justify-center gap-2"
                    >
                        <FileSpreadsheet size={14} /> Export to PDF
                    </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
