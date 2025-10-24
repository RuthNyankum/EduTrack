import React, { useState, useEffect } from "react";
import { useAuth } from "../pages/auth/AuthProvider";
import defaultProfile from "../assets/images/profileImg.png";
import ProfileModal from "./ProfileModal";
import { api } from "../config/axios";

function ProfileHeader() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now()); // ✅ Force refresh key

  // Helper function to construct image URL consistently
  const constructImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http") || imagePath.startsWith("blob:")) {
      return imagePath;
    }
    const cleanPath = imagePath.replace(/^\/+/, "");
    return `http://localhost:8000/${cleanPath}`;
  };

  // Fetch profile from backend - Add user dependency to refetch when user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        console.log("🔄 Fetching profile for user:", user.userId, user.role);
        const res = await api.get("/profile");
        const profileData =
          res.data.teacher || res.data.parent || res.data.user;
        console.log(
          "✅ Profile fetched:",
          profileData.userType,
          profileData.firstName
        );
        setProfile(profileData);
        setImageError(false);
        setImageKey(Date.now()); // Force new image timestamp
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [user]); // Refetch when user changes

  // Refetch profile when modal closes
  const closeProfile = () => {
    setIsProfileOpen(false);
    // Refetch to get any updates
    const refetchProfile = async () => {
      if (!user) return;
      try {
        const res = await api.get("/profile");
        const profileData =
          res.data.teacher || res.data.parent || res.data.user;
        setProfile(profileData);
        setImageKey(Date.now());
        setImageError(false);
      } catch (err) {
        console.error("Failed to refetch profile:", err);
      }
    };
    refetchProfile();
  };

  if (!profile) return null;

  const handleProfileClick = () => setIsProfileOpen(true);

  // Use backend initials or generate if missing
  const initials =
    profile.initials ||
    `${profile.firstName?.[0]?.toUpperCase() || ""}${
      profile.lastName?.[0]?.toUpperCase() || ""
    }`;

  // Construct full image URL with cache-busting key
  const profileImageUrl = profile.profileImage
    ? `${constructImageUrl(profile.profileImage)}?t=${imageKey}`
    : null;

  const handleImageError = () => {
    console.error("Failed to load header profile image:", profileImageUrl);
    setImageError(true);
  };

  return (
    <>
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors font-poppins"
        onClick={handleProfileClick}
      >
        {profileImageUrl && !imageError ? (
          <img
            key={imageKey} //  Force re-render when key changes
            src={profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
            onError={handleImageError}
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
