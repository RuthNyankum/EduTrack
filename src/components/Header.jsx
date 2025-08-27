// Header.jsx
import React from "react";
import { MdMenuOpen } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import ProfileHeader from "./ProfileHeader";

const Header = ({ isExpand, toggleMenu }) => {
  return (
    <div className="py-4 flex justify-between items-center px-5">
      <div className="flex items-center gap-5">
        <span className="text-white font-semibold text-lg">EduTrack</span>
        <div className="flex text-4xl">
          <button onClick={toggleMenu} className="text-white cursor-pointer">
            {isExpand ? <HiOutlineMenu /> : <MdMenuOpen />}
          </button>
        </div>
      </div>

      {/* Only here */}
      <ProfileHeader />
    </div>
  );
};

export default Header;
