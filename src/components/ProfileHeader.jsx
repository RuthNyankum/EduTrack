import React, { useState, useEffect } from "react";
import { useAuth } from "../pages/auth/AuthProvider";
import defaultProfile from "../assets/images/profileImg.png";
import ProfileModal from "./ProfileModal";
import { api } from "../config/axios";

function ProfileHeader() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const res = await api.get("/auth/profile");
        setProfile(res.data.user); // Assuming backend returns user object
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return null;

  const handleProfileClick = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  // Use backend initials or generate if missing
  const initials =
    profile.initials ||
    `${profile.firstName?.[0].toUpperCase() || ""}${
      profile.lastName?.[0].toUpperCase() || ""
    }`;

  return (
    <>
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors font-poppins"
        onClick={handleProfileClick}
      >
        {profile.profileImage ? (
          <img
            src={profile.profileImage || defaultProfile}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/30">
            {initials || "?"}
          </div>
        )}
        <span className="text-white font-semibold uppercase">
          {profile.firstName} {profile.lastName}
        </span>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
    </>
  );
}

export default ProfileHeader;
