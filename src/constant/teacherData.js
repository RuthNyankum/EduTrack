const teacherData = {
  id: 1,
  name: "Mr. Tennis Right",
  title: "Senior Mathematics Teacher",
  email: "tennis.right@school.edu",
  phone: "1234567890",
  profileImage: null, // Will use default image
  subjects: ["Mathematics", "Algebra", "Geometry"],
  classesAssigned: ["Grade 10A", "Grade 10B", "Advanced Math"], // Added this property
  totalStudents: 66, // Added this property (25 + 23 + 18)
  classes: [
    {
      id: "class-1",
      className: "Math Grade 10A",
      students: 25,
      assessment: "Algebra Test",
      averageScore: "78%",
      attendance: "92%"
    },
    {
      id: "class-2", 
      className: "Math Grade 10B",
      students: 23,
      assessment: "Geometry Quiz",
      averageScore: "85%",
      attendance: "88%"
    },
    {
      id: "class-3",
      className: "Advanced Math",
      students: 18,
      assessment: "Calculus Exam",
      averageScore: "91%", 
      attendance: "95%"
    }
  ]
};

export default teacherData;