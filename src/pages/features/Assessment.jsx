import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider"; 
import { Pencil, Save } from "lucide-react";

const Assessment = () => {
  const { user } = useAuth();
  const role = user?.role; 

  const [assessments, setAssessments] = useState([
    {
      id: 1,
      subject: "Mathematics",
      type: "Assignment",
      startDate: "2025-08-01",
      endDate: "2025-08-05",
      status: "Submitted",
      isEditing: false,
    },
    {
      id: 2,
      subject: "English",
      type: "Test",
      startDate: "2025-08-10",
      endDate: "2025-08-12",
      status: "Pending",
      isEditing: false,
    },
    {
      id: 3,
      subject: "Science",
      type: "Assignment",
      startDate: "2025-08-15",
      endDate: "2025-08-20",
      status: "Missed",
      isEditing: false,
    },
  ]);

  const toggleEdit = (id) => {
    setAssessments((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, isEditing: !rec.isEditing } : rec
      )
    );
  };

  const handleChange = (id, field, value) => {
    setAssessments((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, [field]: value } : rec))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "text-green-600 font-semibold";
      case "Pending":
        return "text-yellow-600 font-semibold";
      case "Missed":
        return "text-red-600 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 min-h-screen text-black font-poppins">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Assessments</h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <caption className="caption-bottom text-sm text-green-700 italic mt-2">
          <p>Note: Assessment records are updated regularly</p>
        </caption>

        <thead>
          <tr className="bg-[#5C0080] text-white text-left text-sm">
            <th className="p-3">Subject</th>
            <th className="p-3">Type</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">End Date</th>
            <th className="p-3">Status</th>
            {role === "teacher" && <th className="p-3">Action</th>}
          </tr>
        </thead>

        <tbody>
          {assessments.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-3">{a.subject}</td>

              {/* Editable Type Dropdown */}
              <td className="p-3">
                {a.isEditing && role === "teacher" ? (
                  <select
                    value={a.type}
                    onChange={(e) => handleChange(a.id, "type", e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option>Assignment</option>
                    <option>Test</option>
                  </select>
                ) : (
                  a.type
                )}
              </td>

              <td className="p-3">
                {a.isEditing ? (
                  <input
                    type="date"
                    value={a.startDate}
                    onChange={(e) =>
                      handleChange(a.id, "startDate", e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  />
                ) : (
                  a.startDate
                )}
              </td>

              <td className="p-3">
                {a.isEditing ? (
                  <input
                    type="date"
                    value={a.endDate}
                    onChange={(e) =>
                      handleChange(a.id, "endDate", e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  />
                ) : (
                  a.endDate
                )}
              </td>

              <td className="p-3">
                {a.isEditing ? (
                  <select
                    value={a.status}
                    onChange={(e) =>
                      handleChange(a.id, "status", e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option>Submitted</option>
                    <option>Pending</option>
                    <option>Missed</option>
                  </select>
                ) : (
                  <span className={getStatusColor(a.status)}>{a.status}</span>
                )}
              </td>

              {role === "teacher" && (
                <td className="p-3">
                  <button
                    onClick={() => toggleEdit(a.id)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  >
                    {a.isEditing ? (
                      <Save className="w-4 h-4 text-green-600" />
                    ) : (
                      <Pencil className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assessment;
