import { GoogleGenAI } from "@google/genai";

export type AIAction = 
  | 'benchmarking' | 'forecasting' | 'insights' | 'anomaly' | 'recommendations'
  | 'timetable' | 'allocation' | 'attendance_pred' | 'dropout_pred' | 'dashboard_insights'
  | 'seating' | 'optimization'
  | 'question_gen' | 'notes_gen' | 'assignment_gen' | 'evaluation'
  | 'summarizer' | 'planner' | 'simplifier' | 'flashcards'
  | 'progress_summary' | 'alert_pred' | 'behavior_pred'
  | 'expense_opt' | 'payment_behavior';

interface AIRequest {
  action: AIAction;
  context: string;
}

export const aiService = {
  async generate(req: AIRequest): Promise<string> {
    const { action, context } = req;
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    if (!apiKey) {
      return "Vidyora AI is currently offline (API Key not configured).";
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
    const prompts: Record<AIAction, string> = {
      benchmarking: `Compare performance metrics and rank institutions based on: ${context}`,
      forecasting: `Predict financial revenue and growth trends for the next quarter based on: ${context}`,
      insights: `Provide strategic institutional growth insights and risk alerts for: ${context}`,
      anomaly: `Analyze data for unusual drops in performance or revenue: ${context}`,
      recommendations: `Suggest strategic expansion or improvement areas for: ${context}`,
      timetable: `Generate a clash-free academic timetable for: ${context}`,
      allocation: `Create student batch allocations based on learning levels: ${context}`,
      attendance_pred: `Predict potential attendance shortages for the next month: ${context}`,
      dropout_pred: `Identify students at risk of dropping out based on: ${context}`,
      dashboard_insights: `Provide auto-insights on weak academic subjects and faculty load: ${context}`,
      seating: `Generate an anti-cheating exam seating arrangement for: ${context}`,
      optimization: `Balance faculty load and optimize resource allocation for: ${context}`,
      question_gen: `Generate difficulty-balanced academic questions for: ${context}`,
      notes_gen: `Convert this syllabus/topic into comprehensive student notes: ${context}`,
      assignment_gen: `Create engaging academic assignments for: ${context}`,
      evaluation: `Evaluate this student answer and suggest marks and feedback: ${context}`,
      summarizer: `Summarize this content into short, digestible notes: ${context}`,
      planner: `Create a personalized daily/weekly study schedule for: ${context}`,
      simplifier: `Simplify this complex topic into easy-to-understand explanations: ${context}`,
      flashcards: `Generate active-recall flashcards for: ${context}`,
      progress_summary: `Provide a simple summary of a child's progress for parents: ${context}`,
      alert_pred: `Predict academic or behavior alerts for: ${context}`,
      behavior_pred: `Analyze student behavior and predict potential performance shifts: ${context}`,
      expense_opt: `Analyze institutional expenses and suggest cost-cutting optimizations: ${context}`,
      payment_behavior: `Analyze fee payment patterns and identify potential delays: ${context}`
    };

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompts[action] + "\n\nOutput requirements: Use clear, beautifully written English. Avoid markdown symbols like ***. Use bullet points and clear headers.",
        config: {
          systemInstruction: "You are Vidyora AI, a world-class institutional intelligence system. Your outputs must be professional, elegant, and highly accurate. Do not use decorative symbols or excessive markdown. Focus on clarity and readability.",
        }
      });
      return response.text || "AI failed to generate a response.";
    } catch (error) {
      console.error("AI Generation Error:", error);
      return "An error occurred while communicating with Vidyora AI.";
    }
  }
};
