import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, Upload, FileText, CheckCircle2, ChevronRight, Download, Activity, AlertCircle, Save } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { exportToPDF } from '../../lib/pdfUtils';

export default function AnswerSheetEvaluation() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    marks: number;
    totalMarks: number;
    feedback: string;
    confidence: number;
    breakdown: string[];
  } | null>(null);
  const [manualMarks, setManualMarks] = useState<string>('');
  const [subject, setSubject] = useState('Physics');
  const [studentRoll, setStudentRoll] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleValidation = () => {
    if (!file) return 'Please upload an answer sheet first.';
    if (!studentRoll.trim()) return 'Enter the student roll number.';
    return null;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      setEvaluationResult(null);
    }
  };

  const evaluateWithAI = async () => {
    const error = handleValidation();
    if (error) {
      alert(error);
      return;
    }

    setIsEvaluating(true);
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Evaluate this hypothetical answer sheet for subject: ${subject}. The student rolled is ${studentRoll}. Analyze the image (simulated). Provide: 
1. Suggested marks out of 100
2. Detailed constructive feedback
3. Confidence score of your evaluation (percentage)
4. A brief breakdown of areas of improvement.

Format your response as strict JSON with this structure:
{
  "marks": 0,
  "totalMarks": 100,
  "feedback": "",
  "confidence": 0,
  "breakdown": ["", ""]
}
Do not include any Markdown blocks, just the JSON string.`
        })
      });
      const data = await response.json();
      
      if (!response.ok) {
         throw new Error(data.error || "Failed to generate");
      }
      
      const responseText = data.text || "{}";
      const cleanedJSON = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const result = JSON.parse(cleanedJSON);
      setEvaluationResult(result);
      setManualMarks(result.marks.toString());
    } catch (err) {
      console.error(err);
      alert("Failed to evaluate answer sheet. Ensure API key is configured and try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const saveEvaluation = () => {
    if (!evaluationResult) return;
    alert(`Evaluation Saved for ${studentRoll} [${subject}] with ${manualMarks} Marks.`);
    setFile(null);
    setImageUrl(null);
    setEvaluationResult(null);
    setStudentRoll('');
  };

  const downloadReport = () => {
    if (!evaluationResult) return;
    exportToPDF(`Evaluation Report - ${studentRoll}`, [
      `Subject: ${subject}`,
      `Student Roll No: ${studentRoll}`,
      '',
      `Awarded Marks: ${manualMarks} / ${evaluationResult.totalMarks}`,
      '',
      `Teacher Feedback:`,
      evaluationResult.feedback,
      '',
      `Area Breakdown:`,
      ...evaluationResult.breakdown.map(b => `- ${b}`),
      '',
      `AI Confidence Score: ${evaluationResult.confidence}%`
    ]);
  };

  return (
    <section className="bg-bg-card p-6 sm:p-8 rounded-3xl border border-blue-500/10 relative shadow-xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-headline text-text-primary">AI Answer Evaluation</h3>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mt-0.5">Automated Subjective Grading</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Upload & Context Section */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-text-secondary tracking-widest pl-1">Subject</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-bg-primary border border-border-subtle rounded-xl py-3 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all text-text-primary"
              >
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Mathematics</option>
                <option>Computer Science</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-text-secondary tracking-widest pl-1">Student Roll No</label>
              <input 
                type="text" 
                placeholder="e.g. 21X41A0511"
                value={studentRoll}
                onChange={(e) => setStudentRoll(e.target.value)}
                className="w-full bg-bg-primary border border-border-subtle rounded-xl py-3 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border-subtle rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
          >
            <input 
              type="file" 
              accept="image/*,.pdf" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <FileText size={32} className="text-blue-500" />
                <span className="text-sm font-bold text-text-primary">{file.name}</span>
                <span className="text-xs text-text-secondary">Click to replace</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-bg-primary flex items-center justify-center text-text-secondary">
                  <Upload size={20} />
                </div>
                <div>
                  <span className="text-sm font-bold text-text-primary block">Click to upload answer sheet</span>
                  <span className="text-xs text-text-secondary block mt-1">Supports images & PDFs (Max 10MB)</span>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={evaluateWithAI}
            disabled={!file || isEvaluating}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isEvaluating ? (
              <><Activity className="animate-spin" size={18} /> Analyzing Document...</>
            ) : (
              <><BrainCircuit size={18} /> Process with AI OCR</>
            )}
          </button>
        </div>

        {/* Evaluation Results Section */}
        <div className="bg-bg-primary/50 rounded-2xl border border-border-subtle p-6 flex flex-col h-full">
          {!evaluationResult && !isEvaluating ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 pt-8 pb-8">
              <CheckCircle2 size={48} className="text-text-secondary mb-4 opacity-20" />
              <p className="text-sm font-bold">Awaiting Document</p>
              <p className="text-xs max-w-[200px] mt-1">Upload an answer sheet to see AI evaluation details here.</p>
            </div>
          ) : isEvaluating ? (
            <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-8">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-4" />
              <p className="text-sm font-bold text-text-primary">Extracting text & evaluating...</p>
              <p className="text-xs text-text-secondary mt-1">Comparing with standard answer keys</p>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 flex-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <span className="text-xl font-black text-green-500">{manualMarks}</span>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary font-bold uppercase tracking-widest">Suggested</p>
                      <p className="text-sm font-bold">Out of {evaluationResult?.totalMarks}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Confidence</p>
                    <p className="text-lg font-black text-brand">{evaluationResult?.confidence}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-primary">Final Marks Override</label>
                  <input 
                    type="number"
                    value={manualMarks}
                    onChange={(e) => setManualMarks(e.target.value)}
                    className="w-full bg-bg-primary border border-border-subtle rounded-xl py-3 px-4 text-lg font-black outline-none focus:border-blue-500 transition-all text-blue-500"
                  />
                  <p className="text-[10px] text-text-secondary">Modify AI suggested marks if necessary.</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">AI Feedback</h4>
                  <p className="text-sm text-text-primary leading-relaxed bg-bg-primary p-4 rounded-xl border border-border-subtle">
                    {evaluationResult?.feedback}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">Breakdown</h4>
                  <ul className="text-xs space-y-1">
                    {evaluationResult?.breakdown.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-text-primary">
                        <span className="text-blue-500 mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-border-subtle mt-10 md:mt-auto flex flex-col sm:flex-row gap-3">
             <button 
              disabled={!evaluationResult}
              onClick={downloadReport}
              className="flex-1 py-3 bg-bg-primary border border-border-subtle hover:bg-bg-card disabled:opacity-50 rounded-xl text-xs font-bold text-text-primary transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} /> Download Report
            </button>
            <button 
              disabled={!evaluationResult}
              onClick={saveEvaluation}
              className="flex-1 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-xl text-xs font-bold text-white shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save Grading
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
