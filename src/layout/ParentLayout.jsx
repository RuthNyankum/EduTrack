import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";
import { MdMenuOpen } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";

const ParentLayout = () => {
  const [isExpand, setIsExpand] = useState(false);
  const toggleMenu = () => setIsExpand((prev) => !prev);

  return (
    <div className="parent-layout bg-[var(--color-primaryPurple)]   min-h-screen ">
      <div className="py-4 flex gap-5 px-5">
        <span className="text-white text-center font-semibold text-lg   ">
          EduTrack
        </span>
        <div className="flex  text-4xl">
      
          <button onClick={toggleMenu} className="text-white  cursor-pointer">
            <span>{isExpand ? <HiOutlineMenu /> : <MdMenuOpen />}</span>


          </button>
        </div>
      </div>
      <hr className="border-t-1  border-white " />

      <div className="main-content flex relative h-screen">
             <Sidebar isExpand={isExpand} />

        {/* Main content */}
       <main
          className={`absolute z-10 top-4 bottom-4 right-4 bg-white
            rounded-2xl p-4 overflow-y-auto transition-all duration-300
            ${isExpand ? "left-[16rem] w-[calc(100vw-17rem-2rem)]" : "left-[5rem] w-[calc(100vw-6rem-2rem)]"}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
