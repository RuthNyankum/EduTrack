import React, { useState, useContext } from "react";
import { TeacherContext } from "../../context/TeacherContext";
import { useAuth } from "../auth/AuthProvider";
import defaultImg from "../../assets/images/profileImg.png";

function TeacherProfile({ isModal = false }) {
  const { user } = useAuth();
  const { teacher, updateTeacherProfile } = useContext(TeacherContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    phone: teacher.phone,
    profileImage: teacher.profileImage,
    subjectsInput: teacher.subjects.join(", "),
  });

  // Allow editing for teachers regardless of how they accessed the page
  const canEdit = user?.role === "teacher" || user?.userType === "teacher";

  const handleSave = () => {
    const subjectsArray = (formData.subjectsInput || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    updateTeacherProfile({
      phone: formData.phone,
      profileImage: formData.profileImage,
      subjects: subjectsArray,
    });

    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const containerClass = isModal
    ? "w-full bg-white p-6"
    : "w-full min-h-screen bg-gray-50 p-4 flex justify-center items-start";

  const cardClass = isModal
    ? "bg-white w-full rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-8"
    : "bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-8";

  return (
    <div className={containerClass}>
      <div className={cardClass}>
        {/* Profile Image */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <img
            src={formData.profileImage || teacher.profileImage || defaultImg}
            alt="Profile"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-purple-600 object-cover shadow"
          />
          {editMode && canEdit && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 text-sm"
            />
          )}
        </div>

        {/* Profile Details */}
        <div className="w-full flex flex-col gap-4 text-center md:text-left">
          <div>
            <h1 className="text-2xl font-bold text-purple-700">
              {teacher.name}
            </h1>
            <p className="text-gray-600 text-lg">{teacher.title}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email Address
            </label>
            <p className="text-base break-words">📧 {teacher.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Phone Number
            </label>
            {editMode && canEdit ? (
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="border px-3 py-2 rounded w-full"
              />
            ) : (
              <p className="text-base">📱 {teacher.phone}</p>
            )}
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Subjects Taught
            </label>
            {editMode && canEdit ? (
              <input
                type="text"
                value={formData.subjectsInput}
                onChange={(e) =>
                  setFormData({ ...formData, subjectsInput: e.target.value })
                }
                placeholder="e.g. English, Math"
                className="w-full border rounded px-3 py-2"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject, i) => (
                  <span
                    key={i}
                    className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Button */}
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
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            ) : canEdit ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-purple-100 text-purple-700 px-6 py-2 rounded-lg border border-purple-300 hover:bg-purple-200 transition"
              >
                Edit Profile
              </button>
            ) : (
              <p className="text-gray-500 text-sm italic">
                Profile editing not available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
