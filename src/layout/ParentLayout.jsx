import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';

const ParentLayout = () => {
  return (
    <div className="parent-layout">
      <div className="main-content">
        {/* Sidebar for parent navigation */}
        <Sidebar userType="parent" />

        {/* This is where the nested route components will render */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
