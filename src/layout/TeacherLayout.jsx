import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';

const TeacherLayout = () => {
  return (
    <div className="teacher-layout">
      <div className="main-content">
        {/* Sidebar for teacher navigation */}
        <Sidebar userType="teacher" />

        {/* This is where the nested route components will render */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
