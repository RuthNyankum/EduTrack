import React, { useState } from "react";
import { useAuth } from "../pages/auth/AuthProvider";
import defaultProfile from "../assets/images/profileImg.png";
import ProfileModal from "./ProfileModal";

function ProfileHeader() {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user) return null;

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors font-poppins"
        onClick={handleProfileClick}
      >
        <img
          src={user.profileImage || defaultProfile}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
        />
        <span className="text-white font-semibold uppercase">{user.name}</span>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
    </>
  );
}

export default ProfileHeader;
