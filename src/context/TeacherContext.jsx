import React, { createContext, useState } from "react";

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teacher, setTeacher] = useState({
    // Profile Information
    id: 1,
    name: "Elizabeth Brown",
    title: "5th Grade Mathematics Teacher",
    email: "elizabeth.brown@school.edu",
    phone: "+233 500 000 000",
    profileImage: "", // Default empty, fallback will be used in UI
    subjects: ["Mathematics", "Science", "English Language"],

    // Dashboard Data
    classesAssigned: ["Grade 5A", "Grade 5B"],
    totalStudents: 48,
    classes: [
      {
        id: "class-1",
        className: "Grade 5A",
        students: 25,
        assessment: "Math Test",
        averageScore: "84%",
        attendance: "95%",
      },
      {
        id: "class-2",
        className: "Grade 5B",
        students: 23,
        assessment: "Science Quiz",
        averageScore: "88%",
        attendance: "93%",
      },
    ],
  });

  const updateTeacherProfile = (updatedData) => {
    setTeacher((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <TeacherContext.Provider value={{ teacher, updateTeacherProfile }}>
      {children}
    </TeacherContext.Provider>
  );
};
