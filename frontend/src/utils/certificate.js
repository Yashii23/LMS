import jsPDF from "jspdf";

export const downloadCertificate = (
  studentName,
  courseName
) => {

  const doc = new jsPDF();

  doc.setFillColor(79,70,229);

  doc.rect(0,0,210,30,"F");

  doc.setFontSize(26);

  doc.setTextColor(255,255,255);

  doc.text(
    "Certificate of Completion",
    48,
    20
  );

  doc.setTextColor(0,0,0);

  doc.setFontSize(18);

  doc.text(
    "This Certificate is proudly presented to",
    45,
    60
  );

  doc.setFontSize(24);

  doc.setTextColor(79,70,229);

  doc.text(
    studentName,
    70,
    80
  );

  doc.setTextColor(0,0,0);

  doc.setFontSize(18);

  doc.text(
    "for successfully completing",
    55,
    100
  );

  doc.setFontSize(22);

  doc.text(
    courseName,
    60,
    118
  );

  doc.setFontSize(14);

  doc.text(
    `Date : ${new Date().toLocaleDateString()}`,
    20,
    170
  );

  doc.line(20,220,70,220);

  doc.text(
    "Instructor",
    28,
    228
  );

  doc.line(140,220,190,220);

  doc.text(
    "LMS Platform",
    150,
    228
  );

  doc.save(
    `${courseName}-Certificate.pdf`
  );

};