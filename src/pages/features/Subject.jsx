// import React, { useState, useEffect } from "react";
// import { useAuth } from "../auth/AuthProvider";
// import { api } from "../../config/axios";

// const Subject = () => {
//   const { user } = useAuth();
//   const isTeacher = user?.role === "teacher" || user?.userType === "teacher";
//   const isStudent = user?.role === "parent";

//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingSubject, setEditingSubject] = useState(null);
//   const [selectedStudentId, setSelectedStudentId] = useState("");
//   const [studentIdsInput, setStudentIdsInput] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     teacherId: user?.userId || "",
//     averageScore: 0,
//     assignmentsDone: 0,
//     testsDone: 0,
//     status: "Pending",
//   });

//   useEffect(() => {
//     fetchSubjects();
//   }, [user]);

//   const fetchSubjects = async () => {
//     try {
//       setLoading(true);
//       const endpoint = isTeacher
//         ? `/subjects/teacher/${user.userId}`
//         : isStudent
//         ? `/subjects/student/${user.userId}`
//         : `/subjects`;

//       const response = await api.get(endpoint);

//       if (response.data.success) {
//         setSubjects(response.data.data);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch subjects");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "averageScore" ||
//         name === "assignmentsDone" ||
//         name === "testsDone"
//           ? Number(value)
//           : value,
//     }));
//   };

//   const handleAddSubject = async (e) => {
//     e.preventDefault();

//     if (!formData.name.trim()) {
//       alert("Subject name is required!");
//       return;
//     }

//     if (!user?.userId) {
//       alert("User not authenticated! Please log in again.");
//       return;
//     }

//     const studentIds = studentIdsInput
//       .split(",")
//       .map((id) => id.trim())
//       .filter(Boolean);

//     if (studentIds.length === 0) {
//       alert("Please enter at least one student ID (e.g., STU101, STU102)");
//       return;
//     }

//     try {
//       const subjectData = {
//         ...formData,
//         teacherId: user.userId,
//         studentIds: studentIds,
//       };

//       console.log("📤 Sending subject data:", subjectData);

//       const response = await api.post("/subjects", subjectData);

//       if (response.data.success) {
//         setSubjects((prev) => [...prev, response.data.data]);
//         setShowAddForm(false);
//         resetForm();
//         alert("Subject added successfully!");
//       } else {
//         alert(response.data.message || "Failed to add subject");
//       }
//     } catch (err) {
//       alert(
//         "Failed to add subject: " + (err.response?.data?.message || err.message)
//       );
//       console.error(err);
//     }
//   };

//   const handleUpdateSubject = async (e) => {
//     e.preventDefault();

//     if (!selectedStudentId) {
//       alert("Please select a student to update");
//       return;
//     }

//     try {
//       // Find the student in the subject's students array
//       const studentIndex = editingSubject.students.findIndex(
//         (s) => s.studentId === selectedStudentId
//       );

//       if (studentIndex === -1) {
//         alert("Student not found in this subject");
//         return;
//       }

//       // Update the specific student's data
//       const updatedStudents = [...editingSubject.students];
//       updatedStudents[studentIndex] = {
//         ...updatedStudents[studentIndex],
//         averageScore: formData.averageScore,
//         assignmentsDone: formData.assignmentsDone,
//         testsDone: formData.testsDone,
//         status: formData.status,
//       };

//       const updateData = {
//         name: formData.name,
//         students: updatedStudents,
//       };

//       const response = await api.put(
//         `/subjects/${editingSubject._id}`,
//         updateData
//       );

//       if (response.data.success) {
//         setSubjects((prev) =>
//           prev.map((subj) =>
//             subj._id === editingSubject._id ? response.data.data : subj
//           )
//         );
//         setEditingSubject(null);
//         setSelectedStudentId("");
//         resetForm();
//         alert("Subject updated successfully!");
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert("Failed to update subject: " + err.message);
//       console.error(err);
//     }
//   };

//   const handleDeleteSubject = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this subject?")) {
//       return;
//     }

//     try {
//       const response = await api.delete(`/subjects/${id}`);

//       if (response.data.success) {
//         setSubjects((prev) => prev.filter((subj) => subj._id !== id));
//         alert("Subject deleted successfully!");
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert("Failed to delete subject: " + err.message);
//       console.error(err);
//     }
//   };

//   const startEdit = (subject) => {
//     setEditingSubject(subject);
//     setFormData({
//       name: subject.name,
//       teacherId: subject.teacherId,
//       averageScore: 0,
//       assignmentsDone: 0,
//       testsDone: 0,
//       status: "Pending",
//     });
//     setSelectedStudentId("");
//   };

//   const handleStudentSelect = (studentId) => {
//     setSelectedStudentId(studentId);

//     // Find the selected student's data
//     const student = editingSubject.students.find(
//       (s) => s.studentId === studentId
//     );

//     if (student) {
//       setFormData({
//         ...formData,
//         averageScore: student.averageScore || 0,
//         assignmentsDone: student.assignmentsDone || 0,
//         testsDone: student.testsDone || 0,
//         status: student.status || "Pending",
//       });
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       teacherId: user?.userId || "",
//       averageScore: 0,
//       assignmentsDone: 0,
//       testsDone: 0,
//       status: "Pending",
//     });
//     setStudentIdsInput("");
//     setSelectedStudentId("");
//   };

//   const cancelEdit = () => {
//     setEditingSubject(null);
//     setShowAddForm(false);
//     resetForm();
//   };

//   if (loading) {
//     return <div className="p-6 text-center">Loading subjects...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div className="p-6 min-h-screen text-black font-poppins">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-slate-800">
//           {isStudent ? "My Subjects" : "Subjects"}
//         </h1>

//         {isTeacher && (
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="bg-primaryPurple text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
//           >
//             {showAddForm ? "✕ Cancel" : "+ Add Subject"}
//           </button>
//         )}
//       </div>

//       {/* Add/Edit Form - Teachers Only */}
//       {isTeacher && (showAddForm || editingSubject) && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
//           <h2 className="text-xl font-semibold mb-4">
//             {editingSubject ? "Edit Subject" : "Add New Subject"}
//           </h2>

//           <form
//             onSubmit={editingSubject ? handleUpdateSubject : handleAddSubject}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Subject Name */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium mb-1">
//                   Subject Name*
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
//                   placeholder="e.g., Mathematics"
//                 />
//               </div>

//               {/* Student IDs - Only for new subjects */}
//               {!editingSubject && (
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium mb-1">
//                     Student IDs* (comma-separated)
//                   </label>
//                   <input
//                     type="text"
//                     value={studentIdsInput}
//                     onChange={(e) => setStudentIdsInput(e.target.value)}
//                     placeholder="e.g., STU101, STU102, STU103"
//                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Enter student user IDs separated by commas. The system will
//                     validate if these students exist.
//                   </p>
//                 </div>
//               )}

//               {/* Student Selector - Only when editing */}
//               {editingSubject && (
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium mb-1">
//                     Select Student to Update*
//                   </label>
//                   <select
//                     value={selectedStudentId}
//                     onChange={(e) => handleStudentSelect(e.target.value)}
//                     required
//                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
//                   >
//                     <option value="">-- Select a student --</option>
//                     {editingSubject.students?.map((student) => (
//                       <option key={student.studentId} value={student.studentId}>
//                         {student.studentName} ({student.studentId})
//                       </option>
//                     ))}
//                   </select>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Select a student to update their performance data
//                   </p>
//                 </div>
//               )}

//               {/* Performance Fields - Show when student is selected or adding new */}
//               {(!editingSubject || selectedStudentId) && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Average Score (%)
//                     </label>
//                     <input
//                       type="number"
//                       name="averageScore"
//                       value={formData.averageScore}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="100"
//                       className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
//                       placeholder="0-100"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Assignments Done (out of 6)
//                     </label>
//                     <input
//                       type="number"
//                       name="assignmentsDone"
//                       value={formData.assignmentsDone}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="6"
//                       className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
//                       placeholder="0-6"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Tests Done (out of 3)
//                     </label>
//                     <input
//                       type="number"
//                       name="testsDone"
//                       value={formData.testsDone}
//                       onChange={handleInputChange}
//                       min="0"
//                       max="3"
//                       className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
//                       placeholder="0-3"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Status
//                     </label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Excellent">Excellent</option>
//                       <option value="Good">Good</option>
//                       <option value="Average">Average</option>
//                       <option value="Poor">Poor</option>
//                       <option value="Needs Improvement">
//                         Needs Improvement
//                       </option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {/* Buttons */}
//               <div className="flex gap-2 items-end md:col-span-2">
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//                 >
//                   {editingSubject ? "Update" : "Add"} Subject
//                 </button>
//                 <button
//                   type="button"
//                   onClick={cancelEdit}
//                   className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Subjects Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="w-full border-collapse">
//           <caption className="caption-bottom text-sm text-green-700 italic mt-2 pb-2">
//             <p>Note: Total Number of Assignments = six(6)</p>
//             <p>Total Number of Tests = Three(3)</p>
//           </caption>

//           <thead className="bg-primaryPurple text-white">
//             <tr>
//               <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                 Subject
//               </th>
//               {!isStudent && (
//                 <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                   Students Enrolled
//                 </th>
//               )}
//               {isStudent && (
//                 <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                   Teacher
//                 </th>
//               )}
//               <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                 Average Score(%)
//               </th>
//               <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                 Assignments Done
//               </th>
//               <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                 Tests Done
//               </th>
//               <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                 Status
//               </th>
//               {isTeacher && (
//                 <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>

//           <tbody>
//             {subjects.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={isTeacher ? 7 : 6}
//                   className="text-center py-8 text-gray-500"
//                 >
//                   {isStudent
//                     ? "No subjects assigned yet."
//                     : "No subjects found. Click 'Add Subject' to create one."}
//                 </td>
//               </tr>
//             ) : (
//               subjects.map((subj) => (
//                 <tr key={subj._id} className="hover:bg-gray-50 transition">
//                   {/* Subject name */}
//                   <td className="border border-gray-300 px-4 py-3">
//                     {subj.name}
//                   </td>

//                   {/* Students Enrolled (teacher view only) */}
//                   {!isStudent && (
//                     <td className="border border-gray-300 px-4 py-3">
//                       <div className="flex flex-col gap-1">
//                         {subj.students?.map((student) => (
//                           <span
//                             key={student.studentId}
//                             className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
//                           >
//                             {student.studentId}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                   )}

//                   {/* Teacher ID (student view only) */}
//                   {isStudent && (
//                     <td className="border border-gray-300 px-4 py-3">
//                       {subj.teacherId}
//                     </td>
//                   )}

//                   {/* Average Score */}
//                   <td className="border border-gray-300 px-4 py-3">
//                     {subj.averageScore ?? 0}%
//                   </td>

//                   {/* Assignments Done */}
//                   <td className="border border-gray-300 px-4 py-3">
//                     {subj.assignmentsDone ?? 0}/{subj.totalAssignments || 6}
//                   </td>

//                   {/* Tests Done */}
//                   <td className="border border-gray-300 px-4 py-3">
//                     {subj.testsDone ?? 0}/{subj.totalTests || 3}
//                   </td>

//                   {/* Status */}
//                   <td className="border border-gray-300 px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-sm ${
//                         subj.status === "Excellent"
//                           ? "bg-green-100 text-green-800"
//                           : subj.status === "Good"
//                           ? "bg-blue-100 text-blue-800"
//                           : subj.status === "Needs Improvement" ||
//                             subj.status === "Poor"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {subj.status || "Pending"}
//                     </span>
//                   </td>

//                   {/* Actions (teacher only) */}
//                   {isTeacher && (
//                     <td className="border border-gray-300 px-4 py-3">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => startEdit(subj)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
//                           title="Edit"
//                         >
//                           ✏️ Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteSubject(subj._id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
//                           title="Delete"
//                         >
//                           🗑️ Delete
//                         </button>
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Subject;

import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { api } from "../../config/axios";

const Subject = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher" || user?.userType === "teacher";
  const isStudent = user?.role === "parent";

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentIdsInput, setStudentIdsInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    teacherId: user?.userId || "",
    averageScore: 0,
    assignmentsDone: 0,
    testsDone: 0,
    status: "Pending",
  });

  useEffect(() => {
    fetchSubjects();
  }, [user]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const endpoint = isTeacher
        ? `/subjects/teacher/${user.userId}`
        : isStudent
        ? `/subjects/student/${user.userId}`
        : `/subjects`;

      const response = await api.get(endpoint);

      if (response.data.success) {
        setSubjects(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch subjects");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "averageScore" ||
        name === "assignmentsDone" ||
        name === "testsDone"
          ? Number(value)
          : value,
    }));
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Subject name is required!");
      return;
    }

    if (!user?.userId) {
      alert("User not authenticated! Please log in again.");
      return;
    }

    const studentIds = studentIdsInput
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (studentIds.length === 0) {
      alert("Please enter at least one student ID (e.g., STU101, STU102)");
      return;
    }

    try {
      const subjectData = {
        ...formData,
        teacherId: user.userId,
        studentIds: studentIds,
      };

      console.log("📤 Sending subject data:", subjectData);

      const response = await api.post("/subjects", subjectData);

      if (response.data.success) {
        setSubjects((prev) => [...prev, response.data.data]);
        setShowAddForm(false);
        resetForm();
        alert("Subject added successfully!");
      } else {
        alert(response.data.message || "Failed to add subject");
      }
    } catch (err) {
      alert(
        "Failed to add subject: " + (err.response?.data?.message || err.message)
      );
      console.error(err);
    }
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();

    if (!selectedStudentId) {
      alert("Please select a student to update");
      return;
    }

    try {
      // Find the student in the subject's students array
      const studentIndex = editingSubject.students.findIndex(
        (s) => s.studentId === selectedStudentId
      );

      if (studentIndex === -1) {
        alert("Student not found in this subject");
        return;
      }

      // Update the specific student's data
      const updatedStudents = [...editingSubject.students];
      updatedStudents[studentIndex] = {
        ...updatedStudents[studentIndex],
        averageScore: formData.averageScore,
        assignmentsDone: formData.assignmentsDone,
        testsDone: formData.testsDone,
        status: formData.status,
      };

      const updateData = {
        name: formData.name,
        students: updatedStudents,
      };

      const response = await api.put(
        `/subjects/${editingSubject._id}`,
        updateData
      );

      if (response.data.success) {
        setSubjects((prev) =>
          prev.map((subj) =>
            subj._id === editingSubject._id ? response.data.data : subj
          )
        );
        setEditingSubject(null);
        setSelectedStudentId("");
        resetForm();
        alert("Subject updated successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Failed to update subject: " + err.message);
      console.error(err);
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    try {
      const response = await api.delete(`/subjects/${id}`);

      if (response.data.success) {
        setSubjects((prev) => prev.filter((subj) => subj._id !== id));
        alert("Subject deleted successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Failed to delete subject: " + err.message);
      console.error(err);
    }
  };

  const startEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      teacherId: subject.teacherId,
      averageScore: 0,
      assignmentsDone: 0,
      testsDone: 0,
      status: "Pending",
    });
    setSelectedStudentId("");
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudentId(studentId);

    // ✅ FIX: Find the selected student's data and populate the form
    const student = editingSubject.students.find(
      (s) => s.studentId === studentId
    );

    if (student) {
      setFormData((prev) => ({
        ...prev,
        averageScore: student.averageScore || 0,
        assignmentsDone: student.assignmentsDone || 0,
        testsDone: student.testsDone || 0,
        status: student.status || "Pending",
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      teacherId: user?.userId || "",
      averageScore: 0,
      assignmentsDone: 0,
      testsDone: 0,
      status: "Pending",
    });
    setStudentIdsInput("");
    setSelectedStudentId("");
  };

  const cancelEdit = () => {
    setEditingSubject(null);
    setShowAddForm(false);
    resetForm();
  };

  if (loading) {
    return <div className="p-6 text-center">Loading subjects...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen text-black font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {isStudent ? "My Subjects" : "Subjects"}
        </h1>

        {isTeacher && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primaryPurple text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {showAddForm ? "✕ Cancel" : "+ Add Subject"}
          </button>
        )}
      </div>

      {/* Add/Edit Form - Teachers Only */}
      {isTeacher && (showAddForm || editingSubject) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingSubject ? "Edit Subject" : "Add New Subject"}
          </h2>

          <form
            onSubmit={editingSubject ? handleUpdateSubject : handleAddSubject}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Subject Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
                  placeholder="e.g., Mathematics"
                />
              </div>

              {/* Student IDs - Only for new subjects */}
              {!editingSubject && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Student IDs* (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={studentIdsInput}
                    onChange={(e) => setStudentIdsInput(e.target.value)}
                    placeholder="e.g., STU101, STU102, STU103"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter student user IDs separated by commas. The system will
                    validate if these students exist.
                  </p>
                </div>
              )}

              {/* Student Selector - Only when editing */}
              {editingSubject && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Select Student to Update*
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
                  >
                    <option value="">-- Select a student --</option>
                    {editingSubject.students?.map((student) => (
                      <option key={student.studentId} value={student.studentId}>
                        {student.studentName} ({student.studentId})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select a student to update their performance data
                  </p>
                </div>
              )}

              {/* Performance Fields - Show when student is selected or adding new */}
              {(!editingSubject || selectedStudentId) && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Average Score (%)
                    </label>
                    <input
                      type="number"
                      name="averageScore"
                      value={formData.averageScore}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
                      placeholder="0-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Assignments Done (out of 6)
                    </label>
                    <input
                      type="number"
                      name="assignmentsDone"
                      value={formData.assignmentsDone}
                      onChange={handleInputChange}
                      min="0"
                      max="6"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
                      placeholder="0-6"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Tests Done (out of 3)
                    </label>
                    <input
                      type="number"
                      name="testsDone"
                      value={formData.testsDone}
                      onChange={handleInputChange}
                      min="0"
                      max="3"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
                      placeholder="0-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryPurple"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                      <option value="Poor">Poor</option>
                      <option value="Needs Improvement">
                        Needs Improvement
                      </option>
                    </select>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex gap-2 items-end md:col-span-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  {editingSubject ? "Update" : "Add"} Subject
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Subjects Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <caption className="caption-bottom text-sm text-green-700 italic mt-2 pb-2">
            <p>Note: Total Number of Assignments = six(6)</p>
            <p>Total Number of Tests = Three(3)</p>
          </caption>

          <thead className="bg-primaryPurple text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Subject
              </th>
              {!isStudent && (
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Students Enrolled
                </th>
              )}
              {isStudent && (
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Teacher
                </th>
              )}
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Average Score(%)
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Assignments Done
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Tests Done
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Status
              </th>
              {isTeacher && (
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td
                  colSpan={isTeacher ? 7 : 6}
                  className="text-center py-8 text-gray-500"
                >
                  {isStudent
                    ? "No subjects assigned yet."
                    : "No subjects found. Click 'Add Subject' to create one."}
                </td>
              </tr>
            ) : (
              subjects.map((subj) => (
                <tr key={subj._id} className="hover:bg-gray-50 transition">
                  {/* Subject name */}
                  <td className="border border-gray-300 px-4 py-3">
                    {subj.name}
                  </td>

                  {/* Students Enrolled (teacher view only) */}
                  {!isStudent && (
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {subj.students?.map((student) => (
                          <span
                            key={student.studentId}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {student.studentId}
                          </span>
                        ))}
                      </div>
                    </td>
                  )}

                  {/* Teacher ID (student view only) */}
                  {isStudent && (
                    <td className="border border-gray-300 px-4 py-3">
                      {subj.teacherId}
                    </td>
                  )}

                  {/* Average Score */}
                  <td className="border border-gray-300 px-4 py-3">
                    {subj.averageScore ?? 0}%
                  </td>

                  {/* Assignments Done */}
                  <td className="border border-gray-300 px-4 py-3">
                    {subj.assignmentsDone ?? 0}/{subj.totalAssignments || 6}
                  </td>

                  {/* Tests Done */}
                  <td className="border border-gray-300 px-4 py-3">
                    {subj.testsDone ?? 0}/{subj.totalTests || 3}
                  </td>

                  {/* Status */}
                  <td className="border border-gray-300 px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        subj.status === "Excellent"
                          ? "bg-green-100 text-green-800"
                          : subj.status === "Good"
                          ? "bg-blue-100 text-blue-800"
                          : subj.status === "Needs Improvement" ||
                            subj.status === "Poor"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {subj.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions (teacher only) */}
                  {isTeacher && (
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(subj)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                          title="Edit"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subj._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                          title="Delete"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subject;
