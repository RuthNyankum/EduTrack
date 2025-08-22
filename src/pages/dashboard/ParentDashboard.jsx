import React from "react";
import studentOverview from "./OverviewData";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22C55E", "#e7d637ff", "#3B82F6", "#F97316", "#EC4899"];

const ParentDashboard = () => {
  return (
    <div className="p-6 min-h-screen ">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Student Overview</h1>

      {studentOverview.map((data, index) => (
        <div key={index} className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Student Info Card */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md rounded-2xl p-4 flex items-center gap-4 text-white">
            <img
              className="w-20 h-20 rounded-full object-cover border-4 border-white"
              src={data.studentInfo.profileImage}
              alt="profile"
            />
            <div>
              <p className="font-semibold text-lg">{data.studentInfo.name}</p>
              <p className="text-sm opacity-90">{data.studentInfo.class}</p>
            </div>
          </div>

          {/* Performance Overview with Bar Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6 col-span-2 border border-purple-100">
            <h2 className="text-sm font-semibold text-purple-700 mb-3">Subject Scores</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.subjects.all}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="score" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance with Line Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-purple-100">
            <h2 className="text-sm font-semibold text-purple-700 mb-3">Attendance Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.attendance.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#22C55E" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activities Pie Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-purple-100">
            <h2 className="text-sm font-semibold text-purple-700 mb-3">Activity Status</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.recentActivity}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {data.recentActivity.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts & Reminders */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-purple-100">
            <p className="text-sm font-semibold text-red-700 mb-3">Alerts & Reminders</p>
            {data.alertsAndReminders?.length > 0 ? (
              <ul className="text-sm  text-red-700 space-y-2">
                {data.alertsAndReminders.map((alert, idx) => (
                  <li key={idx}>{alert.message}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">No alerts or reminders.</p>
            )}
          </div>

          {/* Teacher Feedback */}
          <div className="bg-white shadow-lg rounded-2xl p-6 col-span-2 border border-purple-100">
            <p className="text-sm font-semibold text-purple-700 mb-3">Teacher Feedback</p>
            {data.teacherFeedback?.length > 0 ? (
              <ul className="space-y-2">
                {data.teacherFeedback.map((feedback, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-sm text-slate-700"
                  >
                    {feedback.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">No feedback available.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};


export default ParentDashboard;
