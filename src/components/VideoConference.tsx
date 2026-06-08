import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Users, MessageSquare, Shield, Settings, Maximize2, MoreVertical, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoConferenceProps {
  isOpen: boolean;
  onClose: () => void;
  classNameLabel?: string;
}

export default function VideoConference({ isOpen, onClose, classNameLabel = "Physics 101" }: VideoConferenceProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState(12);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isOpen) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between p-4 md:p-8"
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between max-w-6xl overflow-visible">
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 p-2 px-3 rounded-xl bg-bg-secondary hover:bg-black/10 text-white/90 transition-all active:scale-95 border border-border-subtle group mr-4"
                title="Back to Dashboard"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Go Back</span>
              </button>
              <div className="bg-red-500 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                LIVE
              </div>
              <h1 className="text-white font-bold text-lg">{classNameLabel}</h1>
              <span className="text-white/40 text-sm font-mono">{formatTime(timer)}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-white/60 bg-bg-secondary px-3 py-1.5 rounded-full text-xs font-medium border border-border-subtle">
                <Users size={14} />
                {participants}
              </div>
              <button className="text-white/60 hover:text-white">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>

          {/* Main Content (Grid) */}
          <div className="flex-1 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="md:col-span-2 relative bg-zinc-900 rounded-2xl overflow-hidden border border-border-subtle group shadow-2xl">
              {!isVideoOff ? (
                <img 
                  src={`https://picsum.photos/seed/faculty1/1280/720`} 
                  className="w-full h-full object-cover" 
                  alt="Faculty" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center flex-col gap-4 text-white/20">
                    <div className="w-24 h-24 rounded-full bg-bg-secondary flex items-center justify-center">
                        <VideoOff size={48} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Video is Off</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-bold border border-border-subtle">
                Prof. Sharma
              </div>
            </div>

            <div className="grid grid-rows-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-border-subtle group shadow-lg">
                  <img 
                    src={`https://picsum.photos/seed/student${i+10}/400/300`} 
                    className="w-full h-full object-cover opacity-80" 
                    alt="Student" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-[10px] font-bold border border-border-subtle">
                    Student {i+10}
                  </div>
                  {i === 2 && (
                    <div className="absolute top-2 right-2 flex gap-1">
                         <MicOff size={14} className="text-red-500 drop-shadow-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="w-full max-w-6xl flex items-center justify-between pb-4">
            <div className="flex items-center gap-2 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto">
               <button className="p-3 rounded-full hover:bg-bg-card text-white/70 transition-colors">
                <Shield size={22} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all active:scale-90 ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full transition-all active:scale-90 ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {isVideoOff ? <VideoOff size={24} /> : <VideoIcon size={24} />}
              </button>

              <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90 hidden sm:flex">
                <MessageSquare size={24} />
              </button>

              <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90 hidden sm:flex">
                <Settings size={24} />
              </button>

              <button 
                onClick={onClose}
                className="p-4 px-8 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold transition-all active:scale-90 flex items-center gap-2 shadow-2xl"
              >
                <PhoneOff size={24} />
                <span className="hidden sm:inline">End Call</span>
              </button>
            </div>

            <div className="flex items-center gap-2 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto">
               <button className="p-3 rounded-full hover:bg-bg-card text-white/70 transition-colors">
                <MoreVertical size={22} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
