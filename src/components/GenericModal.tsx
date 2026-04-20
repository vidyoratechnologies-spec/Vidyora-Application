import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function GenericModal({ isOpen, onClose, title, content }: GenericModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-bg-secondary w-full max-w-sm rounded-3xl p-6 border border-border-subtle shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Soft decorative glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className="text-xl font-bold font-headline text-text-primary pr-8 leading-tight">{title}</h3>
              <button onClick={onClose} className="p-2 -mr-2 -mt-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-black/5 transition-all">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 relative z-10 font-medium">
              <p className="text-sm text-text-secondary leading-relaxed">{content}</p>
              
              <button onClick={onClose} className="w-full mt-6 bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-accent transition-all active:scale-95 shadow-sm">
                 Acknowledge
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
