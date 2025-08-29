import React, { useContext, useState } from "react";
import { TeacherContext } from "../../context/TeacherContext";
import ClassDetails from "../../components/ClassDetail";
import ClassCard from "../../components/ClassCard";

function TeacherDashboard() {
  const { teacher } = useContext(TeacherContext);
  const [selectedClassId, setSelectedClassId] = useState(null);

  if (selectedClassId) {
    return (
      <ClassDetails
        classId={selectedClassId}
        onBack={() => setSelectedClassId(null)}
      />
    );
  }

  return (
    <div className=" mx-auto p-6 font-poppins">
      {/* <TeacherProfileHeader /> */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome Teacher {teacher.name}
      </h1>

      <div className="flex flex-wrap gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-4 flex-1 min-w-[200px]">
          <p className="text-gray-500 text-sm">Subject</p>
          <p className="text-lg font-semibold">{teacher.subjects[0]}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 flex-1 min-w-[200px]">
          <p className="text-gray-500 text-sm">Classes Assigned</p>
          <p className="text-lg font-semibold">
            {teacher.classesAssigned.join(", ")}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 flex-1 min-w-[200px]">
          <p className="text-gray-500 text-sm">Total Students</p>
          <p className="text-lg font-semibold">{teacher.totalStudents}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacher.classes.map((cls, index) => (
          <ClassCard
            key={index}
            className={cls.className}
            students={cls.students}
            assessment={cls.assessment}
            averageScore={cls.averageScore}
            attendance={cls.attendance}
            onView={() => setSelectedClassId(cls.id || cls.className)} // <-- trigger details
          />
        ))}
      </div>
    </div>
  );
}

export default TeacherDashboard;
