import React from "react";

const Assessment = () => {
  const assessments = [
    {
      subject: "Mathematics",
      type: "Assignment",
      startDate: "2025-08-01",
      endDate: "2025-08-05",
      status: "Submitted",
    },
    {
      subject: "English",
      type: "Test",
      startDate: "2025-08-10",
      endDate: "2025-08-12",
      status: "Pending",
    },
    {
      subject: "Science",
      type: "Assignment",
      startDate: "2025-08-15",
      endDate: "2025-08-20",
      status: "Missed",
    },
  ];

  return (
    <div className="p-6 min-h-screen text-black font-poppins">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Assessments</h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <caption className="caption-bottom text-sm text-green-700 italic mt-2">
          <p>Note: Assessment records are updated regularly</p>
        </caption>

        {/* Table Header */}
        <thead className="bg-primaryPurple text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Subject
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Type
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Start Date
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              End Date
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
              Status
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {assessments.length > 0 ? (
            assessments.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {item.subject}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.startDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.endDate}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-medium ${
                    item.status === "Submitted"
                      ? "text-green-600"
                      : item.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border border-gray-300 px-4 py-6 text-center text-gray-500 italic"
              >
                No assessment records available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Assessment;

// import React, { useState } from "react";
// import { useAuth } from "../auth/AuthProvider";

// const Attendance = () => {
//   const { user } = useAuth();
//   const userType = user?.role || "parent";

//   // Mock data
//   const mockAttendanceTeacher = [
//     {
//       id: 1,
//       subject: "English",
//       sessions: 20,
//       present: 4,
//       absent: 16,
//       attendance: 20,
//       remarks: "Very Poor",
//     },
//     {
//       id: 2,
//       subject: "Mathematics",
//       sessions: 30,
//       present: 30,
//       absent: 0,
//       attendance: 100,
//       remarks: "Excellent",
//     },
//     {
//       id: 3,
//       subject: "Science",
//       sessions: 20,
//       present: 16,
//       absent: 4,
//       attendance: 80,
//       remarks: "Good",
//     },
//     {
//       id: 4,
//       subject: "History",
//       sessions: 10,
//       present: 6,
//       absent: 4,
//       attendance: 60,
//       remarks: "Average",
//     },
//   ];

//   const mockAttendanceParent = [
//     {
//       id: 1,
//       subject: "English",
//       sessions: 20,
//       present: 4,
//       absent: 16,
//       attendance: 20,
//       remarks: "Very Poor",
//     },
//     {
//       id: 2,
//       subject: "Mathematics",
//       sessions: 30,
//       present: 30,
//       absent: 0,
//       attendance: 100,
//       remarks: "Excellent",
//     },
//     {
//       id: 3,
//       subject: "Science",
//       sessions: 20,
//       present: 16,
//       absent: 4,
//       attendance: 80,
//       remarks: "Good",
//     },
//     {
//       id: 4,
//       subject: "History",
//       sessions: 10,
//       present: 6,
//       absent: 4,
//       attendance: 60,
//       remarks: "Average",
//     },
//   ];

//   const [attendance, setAttendance] = useState(
//     userType === "teacher" ? mockAttendanceTeacher : mockAttendanceParent
//   );

//   const getRowColor = (percent) => {
//     if (percent < 50) return "bg-red-400";
//     if (percent >= 50 && percent < 80) return "bg-yellow-400";
//     return "bg-green-400";
//   };

//   // Handle input changes for teacher
//   const handleChange = (id, field, value) => {
//     setAttendance((prev) =>
//       prev.map((record) =>
//         record.id === id ? { ...record, [field]: value } : record
//       )
//     );
//   };

//   return (
//     <div className="p-6 min-h-screen text-black">
//       <h1 className="text-2xl font-bold mb-6 text-slate-800">Attendance</h1>

//       <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
//         <thead className="bg-primaryPurple text-white">
//           <tr>
//             <th>Subject</th>
//             <th>Sessions</th>
//             <th>Present</th>
//             <th>Absent</th>
//             <th>Attendance (%)</th>
//             <th>Remarks</th>
//             {userType === "teacher" && <th>Action</th>}
//           </tr>
//         </thead>

//         <tbody>
//           {attendance.map((record) => (
//             <tr
//               key={record.id}
//               className={`hover:bg-gray-50 ${getRowColor(record.attendance)}`}
//             >
//               <td>{record.subject}</td>
//               <td>{record.sessions}</td>
//               <td>
//                 {userType === "teacher" ? (
//                   <input
//                     type="number"
//                     value={record.present}
//                     onChange={(e) =>
//                       handleChange(record.id, "present", Number(e.target.value))
//                     }
//                     className="border px-2 rounded w-16"
//                   />
//                 ) : (
//                   record.present
//                 )}
//               </td>
//               <td>
//                 {userType === "teacher" ? (
//                   <input
//                     type="number"
//                     value={record.absent}
//                     onChange={(e) =>
//                       handleChange(record.id, "absent", Number(e.target.value))
//                     }
//                     className="border px-2 rounded w-16"
//                   />
//                 ) : (
//                   record.absent
//                 )}
//               </td>
//               <td>{record.attendance}%</td>
//               <td>
//                 {userType === "teacher" ? (
//                   <input
//                     type="text"
//                     value={record.remarks}
//                     onChange={(e) =>
//                       handleChange(record.id, "remarks", e.target.value)
//                     }
//                     className="border px-2 rounded w-full"
//                   />
//                 ) : (
//                   record.remarks
//                 )}
//               </td>
//               {userType === "teacher" && <td>Edit</td>}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Attendance;
