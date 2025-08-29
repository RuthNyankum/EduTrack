import { useState } from "react";
import { NavLink } from "react-router";
import { PARENT_SIDEBAR, TEACHER_SIDEBAR } from "./sidebars";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = ({ isExpand, userType }) => {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = () => setShowModal(true);

  const SIDEBAR = userType === "teacher" ? TEACHER_SIDEBAR : PARENT_SIDEBAR;

  return (
    <div
      className={`text-white h-full fixed md:relative top-[5.5rem] md:top-0 left-0 z-30 ${
        isExpand ? "w-64" : "w-20"
      } rounded-b-xl md:rounded-none`}
    >
      <ul className="menu font-[var(--font-poppins)] text-white w-full pb-0">
        {SIDEBAR.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={index} className="flex justify-start mt-8">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `group inline-flex items-center h-[2.5rem] gap-2 rounded-full px-3 w-full transition-colors ${
                    isActive
                      ? "bg-white relative text-[var(--color-primary)]"
                      : "hover:bg-white hover:text-[var(--color-primaryPurple)]"
                  }`
                }
              >
                <Icon className="text-xl font-extrabold" />
                <span
                  className={`whitespace-nowrap transition-all duration-300 ease-in-out group-hover:text-[0.8rem] ${
                    isExpand
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </NavLink>
            </li>
          );
        })}
        <NavLink
          to="/Login"
          onClick={handleItemClick}
          className="group mt-10 cursor-pointer flex items-center w-52 h-[2.5rem] rounded-full px-2 gap-2 text-white hover:bg-white hover:text-[var(--color-primaryPurple)]"
        >
          <RiLogoutCircleLine className="text-xl font-extrabold" />
          <span
            className={`whitespace-nowrap transition-all duration-300 ease-in-out group-hover:text-[0.8rem] ${
              isExpand ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            Logout
          </span>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
