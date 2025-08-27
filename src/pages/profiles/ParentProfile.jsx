import React, { useContext } from "react";
import { ParentContext } from "../../context/ParentContext";
import defaultImg from "../../assets/images/profileImg.png";
function ParentProfile() {
  const parentContext = useContext(ParentContext);
  const { profile, updateParentProfile } = parentContext;
  const [editMode, setEditMode] = React.useState(false);
  const [formData, setFormData] = React.useState({
    phone: profile.phone,
    profileImage: profile.profileImage,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSave = () => {
    updateParentProfile({
      phone: formData.phone,
      profileImage: formData.profileImage,
    });
    setEditMode(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={formData.profileImage || profile.profileImage || defaultImg}
            alt="Profile"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-purple-600 object-cover shadow"
          />
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
          <h1 className="text-2xl font-bold text-purple-700">{profile.name}</h1>
          <p className="text-gray-600 text-lg">PARENT</p>
          <p className="text-sm mt-2">📧 {profile.email}</p>

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
              <p className="text-base">📱 {profile.phone}</p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Save Changes
              </button>
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
          {profile.children.map((child) => (
            <div
              key={child.id}
              className="bg-purple-100 p-4 rounded-lg text-center"
            >
              <img
                src={child.profileImage || defaultImg}
                alt={child.name}
                className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-purple-300"
              />
              <h3 className="font-semibold text-purple-800">{child.name}</h3>
              <p className="text-purple-600 text-sm">{child.classLevel}</p>
              <button
                onClick={() =>
                  alert(`Would navigate to dashboard for ${child.name}`)
                }
                className="mt-2 bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition"
              >
                View Dashboard
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParentProfile;
