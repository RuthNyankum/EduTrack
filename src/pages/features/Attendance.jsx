import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Pencil, Save } from "lucide-react";

const Attendance = () => {
  const { user } = useAuth();
  const role = user?.role;

  const [attendance, setAttendance] = useState([
    {
      id: 1,
      subject: "English",
      sessions: 20,
      present: 4,
      absent: 16,
      attendance: 20,
      remarks: "Very Poor",
      isEditing: false,
    },
    {
      id: 2,
      subject: "Mathematics",
      sessions: 30,
      present: 30,
      absent: 0,
      attendance: 100,
      remarks: "Excellent",
      isEditing: false,
    },
    {
      id: 3,
      subject: "Science",
      sessions: 20,
      present: 16,
      absent: 4,
      attendance: 80,
      remarks: "Good",
      isEditing: false,
    },
    {
      id: 4,
      subject: "History",
      sessions: 10,
      present: 6,
      absent: 4,
      attendance: 60,
      remarks: "Average",
      isEditing: false,
    },
  ]);

  // helper function to pick bg color
  const getRowColor = (percent) => {
    if (percent < 50) return "bg-red-400";
    if (percent >= 50 && percent < 80) return "bg-yellow-400";
    return "bg-green-400";
  };

  // helper function for remarks
  const getRemarks = (percent) => {
    if (percent < 50) return "Very Poor";
    if (percent >= 50 && percent < 70) return "Average";
    if (percent >= 70 && percent < 90) return "Good";
    return "Excellent";
  };

  // when teacher edits present
  const handleChange = (id, value) => {
    setAttendance((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          const present = Math.min(value, rec.sessions); // don’t exceed sessions
          const absent = rec.sessions - present;
          const percent = Math.round((present / rec.sessions) * 100);
          return {
            ...rec,
            present,
            absent,
            attendance: percent,
            remarks: getRemarks(percent),
          };
        }
        return rec;
      })
    );
  };

  const toggleEdit = (id) => {
    setAttendance((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, isEditing: !rec.isEditing } : rec
      )
    );
  };

  return (
    <div className="p-6 min-h-screen text-black font-poppins">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Attendance</h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <caption className="caption-bottom text-sm text-primaryPurple italic mt-2">
          <div className="flex items-center gap-4 my-8">
            <div className="flex items-center gap-1">
              <span className="w-5 h-5 bg-red-800 rounded"></span>
              <span>At Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-5 h-5 bg-yellow-500 rounded"></span>
              <span>Average</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-5 h-5 bg-green-800 rounded"></span>
              <span>Excellent</span>
            </div>
          </div>
          <p>Note: Attendance records are updated per subject</p>
        </caption>

        <thead className="bg-primaryPurple text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Subject
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Sessions
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Present
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Absent
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Attendance (%)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Remarks
            </th>
            {role === "teacher" && (
              <th className="border border-gray-300 px-4 py-2">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {attendance.length > 0 ? (
            attendance.map((record) => (
              <tr
                key={record.id}
                className={`hover:bg-gray-50 ${getRowColor(record.attendance)}`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {record.subject}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {record.sessions}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {role === "teacher" && record.isEditing ? (
                    <input
                      type="number"
                      value={record.present}
                      onChange={(e) =>
                        handleChange(record.id, +e.target.value)
                      }
                      className="w-16 border rounded px-2"
                    />
                  ) : (
                    record.present
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {record.absent}
                </td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  {record.attendance}%
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {record.remarks}
                </td>
                {role === "teacher" && (
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => toggleEdit(record.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {record.isEditing ? <Save size={20} /> : <Pencil size={20} />}
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={role === "teacher" ? 7 : 6}
                className="border border-gray-300 px-4 py-6 text-center text-gray-500 italic"
              >
                No attendance records yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
