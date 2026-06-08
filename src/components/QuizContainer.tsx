import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Brain, Trophy, AlertCircle, RefreshCcw } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizContainerProps {
  isOpen: boolean;
  onClose: () => void;
  grade?: string; // "10th" or "12th"
}

export default function QuizContainer({ isOpen, onClose, grade = "12th" }: QuizContainerProps) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate 5 multiple-choice questions for ${grade} grade students on various topics like Physics, Chemistry, or Math. 
        Each question should have exactly 4 options and one clear correct answer.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.NUMBER },
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["id", "question", "options", "correctAnswer", "explanation"]
            }
          }
        }
      });

      const data = JSON.parse(response.text);
      setQuestions(data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
      setCurrentStep(0);
      setScore(0);
      setShowResult(false);
      setIsAnswered(false);
      setSelectedOption(null);
    }
  }, [isOpen]);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const isCorrect = option === questions[currentStep].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
        setFeedback(null);
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    fetchQuestions();
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-bg-primary/95 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-2xl bg-bg-secondary rounded-3xl border border-border-subtle shadow-3xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 p-2 px-3 rounded-xl bg-bg-secondary hover:bg-black/10 text-white/90 transition-all active:scale-95 border border-border-subtle group mr-2"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Back</span>
              </button>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Brain size={20} />
              </div>
              <h2 className="text-xl font-bold font-headline">Knowledge Check</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-bg-card text-text-secondary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-text-secondary font-medium animate-pulse">Generating your personalized test...</p>
              </div>
            ) : showResult ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                  <Trophy size={48} />
                </div>
                <h3 className="text-3xl font-black font-headline mb-2">Quiz Completed!</h3>
                <p className="text-text-secondary mb-8">You scored <span className="text-text-primary font-bold">{score} out of {questions.length}</span></p>
                
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                    <button 
                        onClick={resetQuiz}
                        className="flex-1 py-4 bg-bg-secondary hover:bg-black/10 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw size={16} /> Retake
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-blue-900/30"
                    >
                        Done
                    </button>
                </div>
              </motion.div>
            ) : questions.length > 0 ? (
              <div className="space-y-8">
                {/* Progress */}
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-secondary">
                    <span>Question {currentStep + 1} of {questions.length}</span>
                    <span className="text-blue-400">Time: {grade} Prep</span>
                </div>
                <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        className="h-full bg-blue-500"
                    ></motion.div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold font-headline leading-tight text-text-primary">
                  {questions[currentStep].question}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 gap-3">
                  {questions[currentStep].options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = isAnswered && option === questions[currentStep].correctAnswer;
                    const isWrong = isAnswered && isSelected && option !== questions[currentStep].correctAnswer;

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group
                          ${isAnswered ? 'cursor-default' : 'hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer'}
                          ${isSelected ? 'border-blue-500 bg-blue-500/10' : 'border-border-subtle bg-bg-primary'}
                          ${isCorrect ? 'border-green-500 bg-green-500/10' : ''}
                          ${isWrong ? 'border-red-500 bg-red-500/10' : ''}
                        `}
                      >
                        <span className={`font-medium ${isCorrect ? 'text-green-500' : isWrong ? 'text-red-500' : 'text-text-primary'}`}>
                          {option}
                        </span>
                        {isCorrect && <Check size={18} className="text-green-500" />}
                        {isWrong && <X size={18} className="text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"
                        >
                            <p className="text-xs text-text-secondary italic">
                                <span className="font-bold text-blue-400 not-italic mr-1">Explanation:</span> 
                                {questions[currentStep].explanation}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-4">
                  <button
                    disabled={!isAnswered}
                    onClick={nextQuestion}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-900/30"
                  >
                    {currentStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ) : (
                <div className="text-center py-20 flex flex-col items-center gap-4">
                    <AlertCircle size={40} className="text-orange-400" />
                    <p className="text-text-secondary">Failed to load questions. Please try again.</p>
                    <button onClick={fetchQuestions} className="text-blue-400 font-bold underline">Retry</button>
                </div>
            )}
          </div>
        </motion.div>

        {/* Feedback Animations Overlay */}
        <AnimatePresence>
            {feedback === 'correct' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 2 }}
                    className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center"
                >
                    <div className="relative">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.5, 1] }}
                            className="bg-green-500/20 p-8 rounded-full border-4 border-green-500"
                        >
                            <Check size={80} className="text-green-500" strokeWidth={4} />
                        </motion.div>
                        {/* Confetti effect using simple motion divs */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{ 
                                    x: (Math.random() - 0.5) * 400, 
                                    y: (Math.random() - 0.5) * 400,
                                    rotate: Math.random() * 360,
                                    opacity: 0
                                }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm"
                                style={{ backgroundColor: ['#10B981', '#4DA3FF', '#F59E0B', '#EF4444'][i % 4] }}
                            ></motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {feedback === 'wrong' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 2 }}
                    className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center"
                >
                    <motion.div 
                        initial={{ x: [-10, 10, -10, 10, 0] }}
                        animate={{ x: 0 }}
                        className="bg-red-500/20 p-8 rounded-full border-4 border-red-500"
                    >
                        <X size={80} className="text-red-500" strokeWidth={4} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
