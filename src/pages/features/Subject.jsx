import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider"; 

const Subject = () => {
  const { user } = useAuth(); 
  const isTeacher = user?.role === "teacher"; 

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Mathematics",
      teacher: "Mr. Tennis Right",
      average: 59,
      assignments: 6,
      tests: 2,
      status: "Good",
    },
    {
      id: 2,
      name: "English",
      teacher: "Mrs. Left",
      average: 72,
      assignments: 5,
      tests: 3,
      status: "Excellent",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const handleEdit = (id, currentStatus) => {
    setEditingId(id);
    setEditedStatus(currentStatus);
  };

  const handleSave = (id) => {
    setSubjects((prev) =>
      prev.map((subj) =>
        subj.id === id ? { ...subj, status: editedStatus } : subj
      )
    );
    setEditingId(null);
  };

  return (
    <div className="p-6 min-h-screen text-black font-poppins">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Subjects</h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
        <caption className="caption-bottom text-sm text-green-700 italic mt-2">
          <p>Note: Total Number of Assignments = six(6)</p>
          <p>Total Number of Tests = Three(3)</p>
        </caption>

        <thead className="bg-primaryPurple text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Subject</th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Teacher</th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Average Score(%)</th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Assignments Done</th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Tests Done</th>
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subj) => (
            <tr key={subj.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{subj.name}</td>
              <td className="border border-gray-300 px-4 py-2">{subj.teacher}</td>
              <td className="border border-gray-300 px-4 py-2">{subj.average}</td>
              <td className="border border-gray-300 px-4 py-2">{subj.assignments}</td>
              <td className="border border-gray-300 px-4 py-2">{subj.tests}</td>
              <td className="border border-gray-300 px-4 py-2">
                {isTeacher && editingId === subj.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => handleSave(subj.id)}
                      className="text-green-600"
                    >
                      💾
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{subj.status}</span>
                    {isTeacher && (
                      <button
                        onClick={() => handleEdit(subj.id, subj.status)}
                        className="text-blue-600"
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subject;
