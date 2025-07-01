import {
  LayoutList,
  BookMarked,
  ChartSpline,
  Sheet,
  Bell,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="hidden md:block">
  <ul className="relative menu font-[var(--font-poppins)] text-white rounded-box w-48 md:w-56 lg:w-64 ml-4 md:ml-6 lg:ml-10">
        <li className="menu-title my-7 text-gray-400">EduTrack</li>
        <li className="mb-7 rounded-full">
          <NavLink to="/parent/dashboard">
            {({ isActive }) => (
              <span
                className={`flex items-center w-52 h-[2.5rem] gap-1 rounded-full px-3 ${
                  isActive
                    ? "bg-white text-[var(--color-primary)]"
                    : " hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
                <LayoutList className="mr-2" />
                Overview
              </span>
            )}
          </NavLink>
        </li>


        <li className="mb-7 rounded-full">
          <NavLink to="/parent/subject">
            {({ isActive }) => (
              <span
                className={`flex items-center w-52 h-[2.5rem] gap-1 rounded-full px-3 ${
                  isActive
                    ? "bg-white text-[var(--color-primary)]"
                    : " hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
                <BookMarked className="mr-2" />
                Subjects
              </span>
            )}
          </NavLink>
        </li>


        <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
          <NavLink to="/parent/attendance">
           {({ isActive }) => (
              <span
                className={`flex items-center w-52 h-[2.5rem] gap-1 rounded-full px-3 ${
                  isActive
                    ? "bg-white text-[var(--color-primary)]"
                    : " hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
            <BookMarked />
            Attendance
            </span>
           )}
          </NavLink>
        </li>
        <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
          <NavLink to="/parent/assessment">
        {({ isActive }) => (
              <span
                className={`flex items-center w-52 h-[2.5rem] gap-1 rounded-full px-3 ${
                  isActive
                    ? "bg-white text-[var(--color-primary)]"
                    : " hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
            <ChartSpline />
            Assessment
            </span>
        )}
          </NavLink>
        </li>
        <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
          <NavLink to="/parent/term-report">
           {({ isActive }) => (
              <span
                className={`flex items-center w-52 h-[2.5rem] gap-1 rounded-full px-3 ${
                  isActive
                    ? "bg-white text-[var(--color-primary)]"
                    : " hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
            <Sheet />
            Term Report
            </span>
           )}
          </NavLink>
        </li>

        <li className="mb-7 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
          <NavLink to="/parent/chat">
           {({ isActive }) => (
              <span
                className={`flex items-center w-52 h-[2.5rem] gap-1 rounded-full px-3 ${
                  isActive
                    ? "bg-white text-[var(--color-primary)]"
                    : " hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
            <Bell />
            Notification
            </span>
              )}
          </NavLink>
        </li>
        <li className="my-10 hover:bg-white hover:text-[var(--color-primary)] rounded-full">
          <NavLink to="/login">
           {({ isActive }) => (
              <span
                className={`flex items-center w-52 h-[2.5rem] gap-1 rounded-full px-3 ${
                  isActive
                    ? "bg-white text-[var(--color-primary)]"
                    : " hover:bg-white hover:text-[var(--color-primary)]"
                }`}
              >
            <LogOut />
            Logout
            </span>
           )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
