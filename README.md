# Vidyora AI ERP & LMS
**The Next-Generation Institutional Management & Learning Platform**

Vidyora is a comprehensive platform built to supercharge educational institutions. With integrated AI, seamless administrative dashboards, and personalized learning tools, Vidyora adapts dynamically to students, faculty, parents, and administrative staff.

## 🚀 Key Features

*   **Role-Based Access:** Dedicated tailored dashboards for Students, Faculty, Admins, Super Admins, Parents, and Accountants.
*   **AI Engine (GenAI + RAG Ready):** Actionable insights, automated content generation, risk prediction, and more.
*   **Institutional Capabilities:** Live syncing, attendance tracking, automated evaluation, financial ledgers, auto document generation (Bonafide, TC, Study, Fees). 

## 🧠 LLM / RAG & GenAI Integration Plan

The platform is designed with a future-proof AI architecture. While basic generation uses Gemini models via prompting, here is our roadmap for deploying advanced Retrieval-Augmented Generation (RAG) and Agentic features:

### 1. Vector Knowledge Base (RAG)
*   **Document Embedding:** We will integrate institutional handbooks, syllabus copies, and policy documents using `text-embedding-004` (Google).
*   **Vector Database:** Utilize Pinecone or Qdrant for storing chunks.
*   **Contextual Q&A:** When students ask doubts (e.g., via the `StudentAIAssistant`), the agent will first retrieve relevant local syllabus modules to ground the LLM's response, preventing hallucinations.

### 2. Multi-Agent Workflows
*   **Evaluation Agent:** The current OCR-based answer sheet evaluation will be powered by a chained pipeline.
    *   **Agent 1 (Vision):** Extract handwritten text using `gemini-2.5-pro` vision capabilities.
    *   **Agent 2 (Grader):** Compare extracted text strictly against the generated rubric (RAG) and assign marks.
    *   **Agent 3 (Reviewer):** Final pass for anomalies before saving.

### 3. Predictive Analytics Models
*   **Dropout & Anomaly Detection:** Instead of static heuristic rules, LLMs will analyze long-term behavioral logs (attendance trends, financial delays, low-engagement in LMS) to alert admins.
*   **Dynamic Timetable Optimization:** LLMs will assist constraint-satisfaction algorithms to balance scheduling.

## 🛠 Tech Stack
*   **Framework:** React 18
*   **Styling:** Tailwind CSS
*   **Animations:** Motion (Framer Motion)
*   **Icons:** Lucide React, Google Material Symbols
*   **Build Tool:** Vite

## 📄 Running Locally
```bash
npm install
npm run dev
```
