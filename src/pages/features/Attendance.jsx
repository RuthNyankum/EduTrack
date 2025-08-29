import React from "react";

const Attendance = () => {
  const attendance = [
    {
      id: 1,
      subject: "English",
      sessions: 20,
      present: 4,
      absent: 16,
      attendance: 20,
      remarks: "Very Poor",
    },
    {
      id: 2,
      subject: "Mathematics",
      sessions: 30,
      present: 30,
      absent: 0,
      attendance: 100,
      remarks: "Excellent",
    },
    {
      id: 3,
      subject: "Science",
      sessions: 20,
      present: 16,
      absent: 4,
      attendance: 80,
      remarks: "Good",
    },
    {
      id: 4,
      subject: "History",
      sessions: 10,
      present: 6,
      absent: 4,
      attendance: 60,
      remarks: "Average",
    },
  ];

  // helper function to pick bg color
  const getRowColor = (percent) => {
    if (percent < 50) return "bg-red-400";
    if (percent >= 50 && percent < 80) return "bg-yellow-400";
    return "bg-green-400";
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
                  {record.present}
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
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
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
