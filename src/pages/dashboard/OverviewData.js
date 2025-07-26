import profileImg from "../../assets";

const studentOverview= [{
  studentInfo: {
    name: "Miel Greg",
    class: "JHS1",
    profileImage: profileImg,
  },
  attendance: {
    percentage: "90%",
    status: "Present"
  },
  averageScore: "90%",
  subjects: {
    best: {
      name: "Math",
      score: "99%"
    },
    lowest: {
      name: "Science",
      score: "30%"
    }
  },
  recentActivity: [
    {
      activity: "Math Test",
      status: "Pending",
      dueDate: "25th June"
    },
    {
      activity: "English Assignment",
      status: "Submitted"
    }
  ],
  alertsAndReminders: [
    {
      message: "2 assignments pending..."
    }
  ],
  teacherFeedback: [
    {
      comment: "Improve reading"
    }
  ]
}
];

export default  studentOverview;