import profileImg from "../../assets";


const studentOverview = [

  {
    studentInfo: {
      name: "Miel Greg",
      class: "Grade 6",
    profileImage: profileImg,
    },
    subjects: {
      best: { name: "Math", score: 95 },
      lowest: { name: "History", score: 60 },
      all: [
        { name: "Math", score: 95 },
        { name: "English", score: 88 },
        { name: "Science", score: 75 },
        { name: "History", score: 60 },
        { name: "Art", score: 80 },
      ],
    },
    averageScore: 80,
    attendance: {
      percentage: "92%",
      trend: [
        { month: "Jan", percentage: 90 },
        { month: "Feb", percentage: 92 },
        { month: "Mar", percentage: 95 },
        { month: "Apr", percentage: 88 },
      ],
    },
    recentActivity: [
      { activity: "Homework 1", status: "Completed", dueDate: "2025-08-15", count: 5 },
      { activity: "Project", status: "Pending", dueDate: "2025-08-25", count: 2 },
    ],
    alertsAndReminders: [{ message: "Parent meeting on Friday" }],
    teacherFeedback: [{ comment: "Very good progress in Math." }],
  },
];

export default studentOverview;
