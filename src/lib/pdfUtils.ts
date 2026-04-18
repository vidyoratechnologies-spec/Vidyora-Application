import { jsPDF } from "jspdf";

export const exportToPDF = (title: string, content: string | string[]) => {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(10, 102, 194); // Vidyora blue
  
  doc.text("Vidyora - AI ERP & LMS", 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(title, 20, 40);
  
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  
  let y = 60;
  const lines = Array.isArray(content) ? content : [content];
  
  lines.forEach(line => {
    // Check if we need a new page
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    // Split text to fit width
    const splitText = doc.splitTextToSize(line, 170);
    doc.text(splitText, 20, y);
    y += (splitText.length * 7);
  });
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated on ${new Date().toLocaleString()} by Vidyora AI`, 20, 285);
  
  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
};
