import React, { useContext } from "react";
import { TeacherContext } from "../context/TeacherContext";

function ClassDetails({ classId, onBack }) {
  const { teacher } = useContext(TeacherContext);

  // Match class either by its id or name
  const selectedClass = teacher.classes.find(
    (cls) => cls.id === classId || cls.className === classId
  );

  if (!selectedClass) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="mt-10 text-red-500 font-medium">Class not found.</p>
        <button
          onClick={onBack}
          className="mt-4 bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Class: {selectedClass.className}
      </h1>
      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Students:</strong> {selectedClass.students}
        </p>
        <p>
          <strong>Assessment:</strong> {selectedClass.assessment}
        </p>
        <p>
          <strong>Average Score:</strong> {selectedClass.averageScore}
        </p>
        <p>
          <strong>Attendance:</strong> {selectedClass.attendance}
        </p>
      </div>
    </div>
  );
}

export default ClassDetails;
