import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, X, Download, AlertCircle, FileType2 } from 'lucide-react';
import { exportToPDF, generateInstitutionalPDF } from '../../lib/pdfUtils';

interface DocumentGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentGenerationModal({ isOpen, onClose }: DocumentGenerationModalProps) {
  const [rollNo, setRollNo] = useState('');
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [docType, setDocType] = useState('bonafide');
  const [error, setError] = useState('');

  const handleFetchStudent = () => {
    if (!rollNo.trim()) {
      setError('Please enter a valid Roll Number.');
      return;
    }
    setError('');
    setLoading(true);
    
    // Simulate DB fetch
    setTimeout(() => {
      setLoading(false);
      if (rollNo.length > 3) {
        setStudentDetails({
          name: 'James Wilson',
          parent: 'Robert Wilson',
          rollNo: rollNo.toUpperCase(),
          course: 'B.Tech Computer Science',
          year: '3rd Year',
          admissionYear: '2023',
          dob: '15-08-2003',
          address: '42, Vidya Nagar, Tech City',
        });
      } else {
        setError('Student not found. Try entering a longer Roll Number.');
      }
    }, 1000);
  };

  const generateDocument = () => {
    if (!studentDetails) return;

    generateInstitutionalPDF(docType, studentDetails);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-bg-secondary w-full max-w-2xl rounded-3xl overflow-hidden border border-border-subtle shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border-subtle bg-bg-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline text-text-primary">Legal & Academic Documents</h3>
                  <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mt-0.5">Automated Generation</p>
                </div>
              </div>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors p-2 bg-bg-secondary rounded-lg border border-border-subtle">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto w-full">
              {!studentDetails ? (
                <div className="space-y-6">
                  <div className="bg-brand/5 border border-brand/20 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="text-brand flex-shrink-0" size={20} />
                    <p className="text-sm text-text-secondary">Enter a student's Roll Number to fetch their academic details from the database. Once verified, you can generate official requested documents.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-text-secondary px-1 tracking-widest">Student Roll Number</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="e.g. 21X41A05A1"
                        className="flex-1 bg-bg-primary border-none rounded-xl py-3 px-4 text-sm font-medium outline-none ring-1 ring-border-subtle focus:ring-brand transition-all" 
                      />
                      <button 
                        onClick={handleFetchStudent}
                        disabled={loading}
                        className="bg-brand hover:bg-brand-accent text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all disabled:opacity-50 sm:w-auto w-full"
                      >
                        {loading ? 'Fetching...' : 'Verify & Fetch'}
                      </button>
                    </div>
                    {error && <p className="text-red-500 text-xs mt-2 px-1 font-medium">{error}</p>}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Student Card */}
                  <div className="bg-bg-primary border border-border-subtle rounded-2xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-border-subtle overflow-hidden">
                      <img src="https://picsum.photos/seed/student_doc/100/100" alt="Student" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <h4 className="text-lg font-bold font-headline text-text-primary">{studentDetails.name}</h4>
                        <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Verified</span>
                      </div>
                      <p className="text-sm font-medium text-text-secondary">{studentDetails.rollNo} • {studentDetails.course}</p>
                      <p className="text-xs text-text-secondary mt-1">D/o, S/o: {studentDetails.parent} | Batch: {studentDetails.admissionYear}</p>
                    </div>
                    <button onClick={() => setStudentDetails(null)} className="text-xs font-bold text-brand hover:underline mt-2 sm:mt-0">Change Student</button>
                  </div>

                  {/* Document Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-text-secondary px-1 tracking-widest">Select Document Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'bonafide', name: 'Bonafide Certificate', desc: 'Standard identity & enrollment proof' },
                        { id: 'study', name: 'Study Certificate', desc: 'Full academic duration proof' },
                        { id: 'tc', name: 'Transfer Certificate', desc: 'Official institutional leaving doc' },
                        { id: 'fee', name: 'Fee Receipt', desc: 'Latest semester payment proof' }
                      ].map((doc) => (
                        <div 
                          key={doc.id}
                          onClick={() => setDocType(doc.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${docType === doc.id ? 'bg-brand/10 border-brand' : 'bg-bg-primary border-border-subtle hover:border-gray-400'}`}
                        >
                          <div className="flex items-center gap-3 mb-1">
                            <FileType2 size={16} className={docType === doc.id ? 'text-brand' : 'text-text-secondary'} />
                            <h5 className={`font-bold text-sm ${docType === doc.id ? 'text-brand' : 'text-text-primary'}`}>{doc.name}</h5>
                          </div>
                          <p className="text-xs text-text-secondary">{doc.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border-subtle flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-3 rounded-xl border border-border-subtle hover:bg-bg-primary text-text-primary font-bold text-sm transition-all">
                      Cancel
                    </button>
                    <button onClick={generateDocument} className="flex items-center gap-2 bg-brand hover:bg-brand-accent text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-brand/20">
                      <Download size={18} />
                      Generate & Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
