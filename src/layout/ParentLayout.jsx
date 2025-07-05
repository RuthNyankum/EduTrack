import { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const ParentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="parent-layout         bg-[#5C0080]   min-h-screen">
      {/* Hamburger Menu - only visible on small screens */}
        {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center px-4 pt-4">
        <span className="text-white font-semibold text-lg">EduTrack</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-[var(--color-primary)] text-white p-2 rounded"
        >
          <Menu />
        </button>
      </div>

      <div className="main-content flex relative h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main content */}
        <main
          className={`
            content-area 
            absolute 
            z-10 
            top-8 
            left-4 
            right-4 
            bottom-4 
            bg-white 
            rounded-2xl 
            p-4 
            overflow-y-auto 
            transition-all 
            duration-300 
            w-[calc(100vw-2rem)]
            md:left-[14rem] 
            md:w-[calc(100vw-15rem-2rem)]
            lg:left-[16rem] 
            lg:w-[calc(100vw-17rem-2rem)]
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
