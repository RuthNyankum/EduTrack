import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import RootLayout from './layout/RootLayout';
// import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import ParentLayout from './layout/ParentLayout';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Subject from './pages/features/Subject';
import Assessment from './pages/features/Assessment';
import TermReport from './pages/features/TermReport';
import Attendance from './pages/features/Attendance';
import Chat from './pages/features/Chat';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import TeacherLayout from './layout/TeacherLayout';
import ParentProfile from './pages/profiles/ParentProfile';
import TeacherProfile from './pages/profiles/TeacherProfile';
import AuthProvider from './pages/auth/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    // errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: 'parent',
        element: <ProtectedRoute allowedRoles={['parent']} />,
        children: [
          {
            path: '',
            Component: ParentLayout,
            children: [
              {
                path: 'dashboard',
                Component: ParentDashboard,
              },
              {
                path: 'parent-profile',
                Component: ParentProfile,
              },
              {
                path: 'subject',
                Component: Subject,
              },
              {
                path: 'assessment',
                Component: Assessment,
              },
              {
                path: 'term-report',
                Component: TermReport,
              },
              {
                path: 'attendance',
                Component: Attendance,
              },
              {
                path: 'chat',
                Component: Chat,
              },
            ],
          },
        ],
      },
      {
        path: 'teacher',
        element: <ProtectedRoute allowedRoles={['teacher']} />,
        children: [
          {
            path: '',
            Component: TeacherLayout,
            children: [
              {
                path: 'dashboard',
                Component: TeacherDashboard,
              },
              {
                path: 'teacher-profile',
                Component: TeacherProfile,
              },
              {
                path: 'subject',
                Component: Subject,
              },
              {
                path: 'assessment',
                Component: Assessment,
              },
              {
                path: 'term-report',
                Component: TermReport,
              },
              {
                path: 'attendance',
                Component: Attendance,
              },
              {
                path: 'chat',
                Component: Chat,
              },
            ],
          },
        ],
      },
      // Catch-all route for unmatched paths
      // {
      //   path: '*',
      //   Component: NotFoundPage,
      // },
    ],
  },
]);
function App() {
  return (
  <AuthProvider>
<RouterProvider router={router} />;
  </AuthProvider>
  );
}

export default App;
