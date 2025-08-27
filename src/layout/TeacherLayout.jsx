import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const TeacherLayout = () => {
  const [isExpand, setIsExpand] = useState(false);
  const toggleMenu = () => setIsExpand((prev) => !prev);

  return (
    <div className="teacher-layout bg-[var(--color-primaryPurple)] min-h-screen">
      {/* Header Component */}
      <Header isExpand={isExpand} toggleMenu={toggleMenu} />

      <hr className="border-t-1 border-white" />

      <div className="main-content flex relative h-screen">
        {/* Sidebar */}
        <Sidebar isExpand={isExpand} userType="teacher" />

        {/* Main content area */}
        <main
          className={`absolute z-10 top-4 bottom-4 right-4 ml-10 bg-white
            rounded-2xl p-4 overflow-y-auto transition-all duration-300
            ${
              isExpand
                ? "left-[16rem] w-[calc(100vw-17rem-2rem)]"
                : "left-[5rem] w-[calc(100vw-6rem-2rem)]"
            }`}
        >
          {/* This Outlet should render the specific route content (Subject, TeacherProfile, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
