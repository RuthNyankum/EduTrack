import { useState } from "react";
import { NavLink } from "react-router";
import SIDEBAR from "./reusableSideBar";
import ConfirmationModal from "./confirmationModal";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = ({ isExpand }) => {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = () => {
    setShowModal(true);
  };
  return (
    <div
      className={` text-white h-full transition-all duration-300 
      fixed md:relative top-[5.5rem] md:top-0 left-0 z-40  
      ${isExpand ? "w-64" : "w-20"} rounded-b-xl md:rounded-none`}
    >
      <div>
        <ul className="menu font-[var(--font-poppins)] text-white rounded-box w-full  pb-0">
          {SIDEBAR.map((item, index) => (
            <li key={index} className="flex justify-start">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `group relative inline-flex w-32 items-center h-[2.5rem] gap-3 rounded-full px-3 mt-8 transition-colors ${
                    isActive
                      ? "bg-white text-[var(--color-primary)]"
                      : "hover:bg-white hover:text-[var(--color-primaryPurple)]"
                  }`
                }
              >
                <span className="text-xl font-extrabold">{item.icon}</span>

                {isExpand ? (
                  <span className="whitespace-nowrap ">{item.name}</span>
                ) : (
                  <span
                    className={`whitespace-nowrap text-[0.8rem] transition-opacity duration-300 ${
                      isExpand
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}

          <button
            onClick={handleItemClick}
            className="group mt-10 cursor-pointer flex items-center w-52 h-[2.5rem] rounded-full px-2 gap-4 text-white hover:bg-white hover:text-[var(--color-primaryPurple)]"
          >
            <RiLogoutCircleLine className="text-xl font-extrabold" />

            <span
              className={`whitespace-nowrap text-sm transition-opacity duration-300 ${
                isExpand ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              Logout
            </span>
          </button>
        </ul>
      </div>

      <ConfirmationModal
        className=" "
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default Sidebar;
