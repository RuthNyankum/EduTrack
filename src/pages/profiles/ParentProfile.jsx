import React, { useState, useEffect } from "react";
import defaultImg from "../../assets/images/profileImg.png";
import { api } from "../../config/axios";
import { useAuth } from "../auth/AuthProvider";

function ParentProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    profileImage: "",
    profileFile: null,
  });

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        console.log("✅ PROFILE RESPONSE:", res.data);

        const userData = res.data.user;
        setProfile(userData);
        setFormData({
          phone: userData.phoneNumber || "",
          profileImage: userData.profileImage || "",
          profileFile: null,
        });
      } catch (err) {
        if (err.response) {
          console.error("❌ Failed to fetch profile:", err.response.status, err.response.data);
        } else if (err.request) {
          console.error("❌ No response from server:", err.request);
        } else {
          console.error("❌ Request setup error:", err.message);
        }
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl, profileFile: file });
    }
  };

  // ✅ Save profile using FormData
  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("phone", formData.phone);
      if (formData.profileFile) {
        form.append("profileImage", formData.profileFile);
      }

      const res = await api.patch("/auth/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data.parent || res.data.teacher);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update parent profile:", err);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  // ✅ Generate initials if no image
  const initials = `${profile.firstName?.charAt(0).toUpperCase() || ""}${
    profile.lastName?.charAt(0).toUpperCase() || ""
  }`;

  return (
    <div className="space-y-8 font-poppins">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
        {/* Profile Image or Initials */}
        <div className="flex flex-col items-center">
          {formData.profileImage ||
          profile.profileImage ? (
            <img
              src={
                formData.profileImage ||
                `http://localhost:8000/${profile.profileImage}`
              }
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-purple-600 object-cover shadow"
            />
          ) : (
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-purple-600 bg-purple-700 flex items-center justify-center text-white text-5xl font-bold shadow">
              {initials || "?"}
            </div>
          )}

          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 text-sm"
            />
          )}
        </div>

        {/* Profile Details */}
        <div>
          <h1 className="text-2xl font-bold text-purple-700">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-gray-900 text-lg uppercase">Parent</p>
          <p className="text-sm mt-2">📧 {profile.email}</p>

          {/* Phone */}
          <div className="mt-2">
            <label className="block text-sm font-semibold mb-1">
              Phone Number
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
                className="border px-3 py-2 rounded w-full max-w-xs"
              />
            ) : (
              <p className="text-base">📱 {profile.phoneNumber || "N/A"}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            {editMode ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg border border-purple-300 hover:bg-purple-200 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Children Section */}
      <div>
        <h2 className="text-xl font-bold text-purple-700 mb-4 text-center md:text-left">
          Children
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profile.children?.length > 0 ? (
            profile.children.map((child) => {
              const childInitials = `${child.firstName?.charAt(0).toUpperCase() || ""}${
                child.lastName?.charAt(0).toUpperCase() || ""
              }`;
              return (
                <div
                  key={child._id}
                  className="bg-purple-100 p-4 rounded-lg text-center"
                >
                  {child.profileImage ? (
                    <img
                      src={`http://localhost:8000/${child.profileImage}`}
                      alt={child.name}
                      className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-purple-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-purple-600 text-white mx-auto mb-2 flex items-center justify-center font-bold text-lg border-2 border-purple-300">
                      {childInitials || "?"}
                    </div>
                  )}
                  <h3 className="font-semibold text-purple-800">{child.name}</h3>
                  <p className="text-purple-600 text-sm">{child.classLevel}</p>
                  <button
                    onClick={() => alert(`Navigate to dashboard for ${child.name}`)}
                    className="mt-2 bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition"
                  >
                    View Dashboard
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 italic">No children added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParentProfile;
