import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';

const ParentLayout = () => {
  return (
    <div className="parent-layout   ">
      <div className="main-content flex flex-row  ">
        {/* Sidebar for parent navigation */}
        <Sidebar userType="parent" />

        {/* This is where the nested route components will render */}
        <main className="content-area bg-white my-20 mx-5 w-[80vw] rounded-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
