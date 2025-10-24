import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { api } from "../../config/axios";

function StudentProfile({ isModal = false }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    profileImage: "",
    profileFile: null,
  });

  const constructImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http") || imagePath.startsWith("blob:")) {
      return imagePath;
    }
    const cleanPath = imagePath.replace(/^\/+/, "");
    return `http://localhost:8000/${cleanPath}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔄 StudentProfile - Fetching for:", user?.userId);
        const res = await api.get("/profile");
        const profileData =
          res.data.student || res.data.parent || res.data.teacher;

        console.log("✅ StudentProfile - Received:", {
          userType: profileData.userType,
          title: profileData.title,
          name: `${profileData.firstName} ${profileData.lastName}`,
        });

        const imageUrl = constructImageUrl(profileData.profileImage);

        setProfile(profileData);
        setFormData({
          phone: profileData.phoneNumber || profileData.phone || "",
          profileImage: imageUrl,
          profileFile: null,
        });
        setImageError(false);
      } catch (err) {
        console.error("Failed to load student profile:", err);
      }
    };

    fetchProfile();
  }, [user?.userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl, profileFile: file });
      setImageError(false);
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("phone", formData.phone);
      if (formData.profileFile) {
        form.append("profileImage", formData.profileFile);
      }

      const res = await api.patch("/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedProfile = res.data.parent || res.data.teacher;
      const imageUrl = updatedProfile.profileImage
        ? `${constructImageUrl(updatedProfile.profileImage)}?t=${Date.now()}`
        : "";

      setProfile(updatedProfile);
      setFormData({
        phone: updatedProfile.phoneNumber || updatedProfile.phone || "",
        profileImage: imageUrl,
        profileFile: null,
      });
      setEditMode(false);
      setImageError(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update student profile:", err);
      alert(
        `Failed to update profile: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  const handleImageError = () => {
    console.error("Failed to load image:", formData.profileImage);
    setImageError(true);
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  const initials = `${profile.firstName?.charAt(0).toUpperCase() || ""}${
    profile.lastName?.charAt(0).toUpperCase() || ""
  }`;

  const shouldShowImage = formData.profileImage && !imageError;

  const containerClass = isModal
    ? "w-full bg-white"
    : "w-full min-h-screen bg-gray-50 p-4 flex justify-center items-center";

  const cardClass = isModal
    ? "bg-white w-full rounded-xl flex flex-col md:flex-row h-full"
    : "bg-white w-full max-w-6xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden";

  return (
    <div className={containerClass}>
      <div className={cardClass}>
        {/* Left Side - Profile Image (50%) */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 p-8 md:p-12 font-poppins">
          {shouldShowImage ? (
            <img
              src={formData.profileImage}
              alt="Profile"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-8 border-white object-cover shadow-2xl"
              onError={handleImageError}
            />
          ) : (
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-8 border-white bg-purple-900 flex items-center justify-center text-white text-8xl font-bold shadow-2xl">
              {initials || "?"}
            </div>
          )}

          {editMode && (
            <div className="mt-6">
              <label className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-purple-50 transition shadow-lg">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                📷 Change Photo
              </label>
            </div>
          )}
        </div>

        {/* Right Side - Profile Details (50%) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center font-poppins">
          <div className="space-y-6">
            {/* Name & Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-gray-600 text-xl font-medium">Student</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">
                Email Address (Guardian)
              </label>
              <p className="text-lg text-gray-700 break-words flex items-center gap-2">
                <span className="text-2xl">📧</span> {profile.email}
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">
                Phone Number (Guardian)
              </label>
              {editMode ? (
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={(e) => {
                    const numbersOnly = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, phone: numbersOnly });
                  }}
                  className="border-2 border-gray-300 px-4 text-gray-700 py-3 rounded-lg w-full focus:border-purple-500 focus:outline-none text-lg"
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-lg text-gray-700 flex items-center gap-2">
                  <span className="text-2xl">📱</span>{" "}
                  {profile.phoneNumber || profile.phone || "Not provided"}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6">
              {editMode ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold text-lg shadow-lg"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition font-semibold text-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold text-lg shadow-lg"
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
