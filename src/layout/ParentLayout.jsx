import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';

const ParentLayout = () => {
  return (
    <div className="parent-layout">
      <div className="main-content flex flex-row  ">
        {/* Sidebar for parent navigation */}
        <Sidebar userType="parent" />

        {/* This is where the nested route components will render */}
        <main className="content-area ml-[13rem] mr-10 bg-white my-8 absolute z-10  h-[90vh] w-[80vw] rounded-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
