import React, { useState } from "react";


const useAuth = () => {
  return { user: { role: "teacher" } };
};

const TermReport = () => {
  const { user } = useAuth();
  const userType = user?.role || "parent";

  const [reports, setReports] = useState([
    {
      id: 1,
      subject: "Mathematics",
      testAvg: 75,
      assignmentAvg: 80,
      exams: 78,
      overall: 78,
      grade: "2",
      remarks: "Good performance. Keep practicing.",
    },
    {
      id: 2,
      subject: "English",
      testAvg: 68,
      assignmentAvg: 70,
      exams: 72,
      overall: 70,
      grade: "2",
      remarks: "Improved reading skills, excellent progress.",
    },
    {
      id: 3,
      subject: "Science",
      testAvg: 50,
      assignmentAvg: 58,
      exams: 52,
      overall: 54,
      grade: "4",
      remarks: "Needs more focus and revision.",
    },
  ]);

  const [editingRow, setEditingRow] = useState(null);

  const handleChange = (id, field, value) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleToggleEdit = (id) => {
    if (editingRow === id) {
      // Save
      console.log("Saved row:", reports.find((r) => r.id === id));
      setEditingRow(null);
    } else {
      setEditingRow(id);
    }
  };

  const handleDownload = () => {
    alert("PDF download triggered!");
  };

  return (
    <div className="p-6 min-h-screen text-black font-poppins">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Term Report</h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-primaryPurple text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Subject
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Test Avg
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Assignment Avg
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Exams
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Overall Score
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Grade
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Teacher's Remarks
            </th>
            {userType === "teacher" && (
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {reports.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {item.subject}
              </td>

              {/* Test Avg */}
              <td className="border border-gray-300 px-4 py-2">
                {editingRow === item.id && userType === "teacher" ? (
                  <input
                    type="number"
                    value={item.testAvg}
                    onChange={(e) =>
                      handleChange(item.id, "testAvg", Number(e.target.value))
                    }
                    className="border rounded px-2 w-16"
                  />
                ) : (
                  `${item.testAvg}%`
                )}
              </td>

              {/* Assignment Avg */}
              <td className="border border-gray-300 px-4 py-2">
                {editingRow === item.id && userType === "teacher" ? (
                  <input
                    type="number"
                    value={item.assignmentAvg}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        "assignmentAvg",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded px-2 w-16"
                  />
                ) : (
                  `${item.assignmentAvg}%`
                )}
              </td>

              {/* Exams */}
              <td className="border border-gray-300 px-4 py-2">
                {editingRow === item.id && userType === "teacher" ? (
                  <input
                    type="number"
                    value={item.exams}
                    onChange={(e) =>
                      handleChange(item.id, "exams", Number(e.target.value))
                    }
                    className="border rounded px-2 w-16"
                  />
                ) : (
                  `${item.exams}%`
                )}
              </td>

              {/* Overall */}
              <td className="border border-gray-300 px-4 py-2">
                {item.overall}%
              </td>

              {/* Grade */}
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {editingRow === item.id && userType === "teacher" ? (
                  <select
                    value={item.grade}
                    onChange={(e) => handleChange(item.id, "grade", e.target.value)}
                    className="border rounded px-2"
                  >
                    <option value="1">1 - Excellent</option>
                    <option value="2">2 - Good</option>
                    <option value="3">3 - Fair</option>
                    <option value="4">4 - Poor</option>
                  </select>
                ) : (
                  item.grade
                )}
              </td>

              {/* Remarks */}
              <td className="border border-gray-300 px-4 py-2 italic">
                {editingRow === item.id && userType === "teacher" ? (
                  <input
                    type="text"
                    value={item.remarks}
                    onChange={(e) =>
                      handleChange(item.id, "remarks", e.target.value)
                    }
                    className="border rounded px-2 w-full"
                  />
                ) : (
                  item.remarks
                )}
              </td>

              {/* Action (Teacher only) */}
              {userType === "teacher" && (
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleToggleEdit(item.id)}
                    className="text-blue-600 hover:underline"
                  >
                    {editingRow === item.id ? "💾 Save" : "✏️ Edit"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>

        <caption className="caption-bottom mt-4">
          <div className="flex justify-between items-start">
            <div className="text-left border-1 border-primaryPurple space-y-1 bg-green-300 p-4 rounded-lg shadow-md">
              <p className="font-semibold text-primaryPurple">Grade Legend</p>
              <p>1 - Excellent (85% and above)</p>
              <p>2 - Good (70% - 84%)</p>
              <p>3 - Fair (55% - 69%)</p>
              <p>4 - Poor (Below 55%)</p>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-300 text-primaryPurple px-4 py-2 rounded-lg shadow hover:bg-purple-700 hover:text-white transition"
            >
              <span>📥</span>
              Download as PDF
            </button>
          </div>
        </caption>
      </table>
    </div>
  );
};

export default TermReport;
