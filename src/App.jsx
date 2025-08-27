import { createBrowserRouter, RouterProvider } from "react-router"; // FIX: use react-router-dom
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import ParentLayout from "./layout/ParentLayout";
import ParentDashboard from "./pages/dashboard/ParentDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Subject from "./pages/features/Subject";
import Assessment from "./pages/features/Assessment";
import TermReport from "./pages/features/TermReport";
import Attendance from "./pages/features/Attendance";
import Chat from "./pages/features/Chat";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import TeacherLayout from "./layout/TeacherLayout";
import ParentProfile from "./pages/profiles/ParentProfile";
import TeacherProfile from "./pages/profiles/TeacherProfile";
import AuthProvider from "./pages/auth/AuthProvider";
import { TeacherProvider } from "./context/TeacherContext";
import { ParentProvider } from "./context/ParentContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },

      // Parent Routes - wrapped with ParentProvider
      {
        path: "parent",
        element: (
          <ParentProvider>
            <ProtectedRoute allowedRoles={["parent"]} />
          </ParentProvider>
        ),
        children: [
          {
            path: "",
            element: <ParentLayout />,
            children: [
              { path: "dashboard", element: <ParentDashboard /> },
              { path: "parent-profile", element: <ParentProfile /> },
              { path: "subject", element: <Subject /> },
              { path: "assessment", element: <Assessment /> },
              { path: "term-report", element: <TermReport /> },
              { path: "attendance", element: <Attendance /> },
              { path: "chat", element: <Chat /> },
            ],
          },
        ],
      },

      // Teacher Routes - wrapped with TeacherProvider
      {
        path: "teacher",
        element: (
          <TeacherProvider>
            <ProtectedRoute allowedRoles={["teacher"]} />
          </TeacherProvider>
        ),
        children: [
          {
            path: "",
            element: <TeacherLayout />,
            children: [
              { path: "dashboard", element: <TeacherDashboard /> },
              { path: "teacher-profile", element: <TeacherProfile /> },
              { path: "subject", element: <Subject /> },
              { path: "assessment", element: <Assessment /> },
              { path: "term-report", element: <TermReport /> },
              { path: "attendance", element: <Attendance /> },
              { path: "chat", element: <Chat /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
