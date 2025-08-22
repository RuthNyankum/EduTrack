import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const TermReport = () => {
  const reports = [
    {
      subject: "Mathematics",
      testAvg: 75,
      assignmentAvg: 80,
      exams: 78,
      overall: 78,
      grade: "2",
      remarks: "Good performance. Keep practicing.",
    },
    {
      subject: "English",
      testAvg: 68,
      assignmentAvg: 70,
      exams: 72,
      overall: 70,
      grade: "2",
      remarks: "Improved reading skills, excellent progress.",
    },
    {
      subject: "Science",
      testAvg: 50,
      assignmentAvg: 58,
      exams: 52,
      overall: 54,
      grade: "4",
      remarks: "Needs more focus and revision.",
    },
  ];

  const handleDownload = () => {
    // Here you can use jsPDF or pdfmake
    alert("PDF download triggered!");
  };

  return (
    <div className="p-6 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Term Report</h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        {/* Table Header */}
        <thead className="bg-primaryPurple text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Test Avg</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Assignment Avg</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Exams</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Overall Score</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Teacher’s Remarks</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {reports.length > 0 ? (
            reports.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
                <td className="border border-gray-300 px-4 py-2">{item.testAvg}%</td>
                <td className="border border-gray-300 px-4 py-2">{item.assignmentAvg}%</td>
                <td className="border border-gray-300 px-4 py-2">{item.exams}%</td>
                <td className="border border-gray-300 px-4 py-2">{item.overall}%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  {item.grade}
                </td>
                <td className="border border-gray-300 px-4 py-2 italic">{item.remarks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="border border-gray-300 px-4 py-6 text-center text-gray-500 italic"
              >
                No report available
              </td>
            </tr>
          )}
        </tbody>

        {/* Caption with Legend + Download */}
        <caption className="caption-bottom mt-4">
          <div className="flex justify-between items-start  " >
            {/* Grade Legend */}
            <div className="text-left border-1 border-primaryPurple space-y-1 bg-green-300  p-4  rounded-lg shadow-md">
              <p className="font-semibold  text-primaryPurple">Grade Legend</p>
              <p>1 - Excellent (85% and above)</p>
              <p>2 - Good (70% - 84%)</p>
              <p>3 - Fair (55% - 69%)</p>
              <p>4 - Poor (Below 55%)</p>
            </div>


  <button
  onClick={handleDownload}
  className="flex items-center gap-2 bg-green-300 text-primaryPurple px-4 py-2 rounded-lg shadow hover:bg-purple-700 hover:text-white transition"
>
  <motion.div
    whileHover={{ y: -3 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <FaDownload className="w-5 h-5" />
  </motion.div>
  Download as PDF
</button>
          </div>
        </caption>
      </table>
    </div>
  );
};

export default TermReport;
