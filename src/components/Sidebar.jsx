import {
  LayoutList,
  BookMarked,
  ChartSpline,
  Sheet,
  Bell,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import SIDEBAR from "./reusableSideBar";

const Sidebar = ({ isExpand }) => {
  
  return (
   <div
      className={` text-white h-full transition-all duration-300 
      fixed md:relative top-[5.5rem] md:top-0 left-0 z-40 
      ${isExpand ? "w-64" : "w-20"} rounded-b-xl md:rounded-none`}
    >

<div>
  <ul className="menu font-[var(--font-poppins)] text-white rounded-box w-full p-4">
    {SIDEBAR.map((item, index) => (
      <li key={index}>
        <NavLink
          to={item.link}
          className={({ isActive }) =>
            `flex items-center w-52 h-[2.5rem] gap-4 rounded-full px-2 mt-10 ${
              isActive
                ? "bg-white text-[var(--color-primary)]"
                : "hover:bg-white hover:text-[var(--color-primary)]"
            }`
          }
       >
        <span className="text-xl font-extrabold">{item.icon}</span>
                {/* <Icon className="text-xl" /> */}
                {isExpand && <span className="whitespace-nowrap ">{item.name}</span>}
              </NavLink>
      </li>
    ))}
  </ul>
</div>


    </div>
  );
};

export default Sidebar;
