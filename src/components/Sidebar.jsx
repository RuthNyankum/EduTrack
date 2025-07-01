import { LayoutList, BookMarked, ChartSpline, Sheet, Bell, LogOut} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router';

const Sidebar = () => {
  return <div>
    <ul className="menu font-[var(--font-poppins)] text-white rounded-box w-56 ml-5 ">
     <li className="menu-title my-7 text-gray-400">EduTrack</li>
    <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
    <NavLink to="/parent/dashboard">
      <LayoutList/>
     
      Overview
    </NavLink>
  </li>
    <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
    <NavLink to="/parent/subject">
     <BookMarked/>
      Subjects
    </NavLink>
  </li>
    <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
    <NavLink to="/parent/attendance">
      <BookMarked/>
      Attendance
    </NavLink>
  </li>
    <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
    <NavLink to="/parent/assessment">
      <ChartSpline/>
      Assessment
    </NavLink>
  </li>
    <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
    <NavLink to="/parent/term-report">
      <Sheet/>
      Term Report 
    </NavLink>
  </li>
    <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
    <NavLink to="/parent/chat">
      <Bell/>
      Notification 
    </NavLink>
  </li>
    <li className="my-10 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
    <NavLink to="/login">
      <LogOut/>
      Logout 
    </NavLink>
  </li>
</ul>

</div>;
};

export default Sidebar;
