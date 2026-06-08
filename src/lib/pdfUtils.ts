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

const drawVidyoraSeal = (doc: jsPDF, x: number, y: number, r: number = 15) => {
  doc.setDrawColor(10, 102, 194);
  doc.setLineWidth(0.8);
  doc.circle(x, y, r, "S");
  doc.setLineWidth(0.3);
  doc.circle(x, y, r - 2, "S");
  
  // Outer spikes (star-like) - simple simulation
  for (let i = 0; i < 36; i++) {
     const angle = (i * 10) * Math.PI / 180;
     const x1 = x + Math.cos(angle) * r;
     const y1 = y + Math.sin(angle) * r;
     const x2 = x + Math.cos(angle) * (r + 2);
     const y2 = y + Math.sin(angle) * (r + 2);
     doc.line(x1, y1, x2, y2);
  }

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(10, 102, 194);
  doc.text("VIDYORA", x, y - 2, { align: "center" });
  
  doc.setFontSize(6);
  doc.text("EXCELLENCE", x, y + 2, { align: "center" });
  doc.text("IN EDUCATION", x, y + 5, { align: "center" });
  
  doc.setTextColor(0, 0, 0); // reset color
  doc.setDrawColor(0, 0, 0); // reset color
};

export const generateInstitutionalPDF = (docType: string, studentDetails: any) => {
  const isLandscape = docType === 'bonafide' || docType === 'tc';
  const doc = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const date = new Date().toLocaleDateString();

  // Draw borders
  if (docType !== 'fee') {
    doc.setLineWidth(1);
    doc.rect(10, 10, width - 20, height - 20);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, width - 24, height - 24);
  }

  doc.setTextColor(0, 0, 0);

  if (docType === 'bonafide') {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("BONAFIDE CERTIFICATE", width / 2, 40, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    
    const textLines = [
      `This is to certify that Mr./Ms. ${studentDetails.name}, S/O or D/O of`,
      `Mr./Ms. ${studentDetails.parent} bearing roll number ${studentDetails.rollNo} is a student of`,
      `${studentDetails.year} ${studentDetails.course} for the academic year ${studentDetails.admissionYear}.`,
      `He/She is a bonafide student of Vidyora University.`
    ];

    let currentY = 80;
    textLines.forEach(line => {
      doc.text(line, width / 2, currentY, { align: "center" });
      currentY += 15;
    });

    drawVidyoraSeal(doc, width / 2, height - 60, 16);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SIGNATURE REGISTRAR/\nPRINCIPAL/DEAN", 30, height - 30);
    doc.text("UNIVERSITY/COLLEGE/SCHOOL\nNAME AND ADDRESS\n(OFFICIAL SEAL)", width / 2, height - 30, { align: "center" });
    doc.text("DATE", width - 40, height - 30, { align: "center" });
    doc.text(date, width - 40, height - 24, { align: "center" });

  } else if (docType === 'study') {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("STUDY CERTIFICATE", width / 2, 30, { align: "center" });
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");

    doc.text(`Admission No: ${studentDetails.rollNo}`, 20, 60);
    doc.text(`Date: ${date}`, width - 70, 60);

    doc.text(`This is to Certify that Sri/Smt/Kum ${studentDetails.name}`, 20, 80);
    doc.text(`was a bonafide student of this institution / College during the year from ${studentDetails.admissionYear}`, 20, 95);
    doc.text(`To Present.`, 20, 110);
    
    doc.text(`Studying from ${studentDetails.year} To Present`, 20, 125);
    doc.text(`During this studying period his/her Character was found Good/Satisfactory.`, 20, 140);
    
    doc.text(`His/Her Date of Birth is ${studentDetails.dob} and Religion is ________ Caste is ________`, 20, 155);
    doc.text(`As per his/her Admission Register No ${studentDetails.rollNo}`, 20, 170);

    doc.text(`Date: ${date}`, 20, 190);
    doc.text(`Place: Campus`, 20, 205);

    drawVidyoraSeal(doc, width / 2, 215, 14);

    doc.setFont("helvetica", "bold");
    doc.text(`Head Master / principal`, width - 70, 230);

  } else if (docType === 'tc') { // Using Migration layout for TC based on images
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    
    drawVidyoraSeal(doc, width / 2, 35, 14);
    
    doc.text("MIGRATION CERTIFICATE", width / 2, 65, { align: "center" });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    
    const textLines = [
      `This is to certify that Mr./Ms. ${studentDetails.name} son/daughter of`,
      `${studentDetails.parent} has passed in the discipline of`,
      `${studentDetails.course} in the examination held in ${studentDetails.admissionYear} under`,
      `${studentDetails.rollNo} (Registration number) as a student of`,
      `Vidyora University.`,
      '',
      `The University/College has 'No Objection', whatsoever, to his/her`,
      `migration/admission to pursue further studies.`
    ];

    let currentY = 95;
    textLines.forEach(line => {
      doc.text(line, width / 2, currentY, { align: "center" });
      currentY += 12;
    });

    doc.setFontSize(14);
    doc.text("________________", 40, height - 40);
    doc.text("Checked by", 55, height - 30);
    
    doc.text("________________", width - 80, height - 40);
    doc.text("Officer incharge", width - 70, height - 30);

  } else if (docType === 'fee') {
    doc.setFillColor(255, 255, 200); // Light yellow like image
    doc.rect(0, 0, width, height, "F");

    doc.setFontSize(14);
    doc.text("Receipt", width / 2, 20, { align: "center" });
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Vidyora Institute of Technology", width / 2, 30, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Address: Vidyora Campus, Tech City", 20, 40);
    doc.text("Phone: +1 234 567 8900", width - 70, 40);

    const recNo = `rec_${Math.floor(Math.random() * 100000)}`;
    doc.text(`Receipt No: ${recNo}`, 20, 60);
    doc.line(10, 65, width - 10, 65);

    doc.text(`Name of Student: ${studentDetails.name}`, 20, 75);
    doc.text(`Course: ${studentDetails.course}`, 120, 75);
    
    doc.text(`Courses Duration: 4 Years`, 20, 90);
    doc.text(`Date of payment: ${date}`, 120, 90);

    // Table Header
    doc.line(10, 100, width - 10, 100);
    doc.setFont("helvetica", "bold");
    doc.text("Sr. No.", 20, 108);
    doc.text("Particulars", 60, 108);
    doc.text("Amount", 160, 108);
    doc.line(10, 115, width - 10, 115);

    doc.setFont("helvetica", "normal");
    doc.text("1", 25, 125);
    doc.text("Tuition Fee for Semester", 60, 125);
    doc.text("35000", 160, 125);

    doc.line(10, 160, width - 10, 160);
    doc.setFont("helvetica", "bold");
    doc.text("Total", 130, 168);
    doc.text("35000/-", 160, 168);
    doc.line(10, 175, width - 10, 175);

    doc.setFont("helvetica", "normal");
    doc.text("Paid By: Online/Bank Transfer", 20, 190);
    doc.text("Balance if any... Course Fee: 35000 - 35000 = 0/-", 100, 190);

    doc.text("Signature of Centre Head", 20, 220);
    doc.text("Signature of Student", 140, 220);

    doc.line(10, 230, width - 10, 230);
    doc.text("All above mentioned Amount once paid are non refundable in any case whatsoever.", width / 2, 240, { align: "center" });
  }

  doc.save(`${docType}_${studentDetails.rollNo}.pdf`);
};
