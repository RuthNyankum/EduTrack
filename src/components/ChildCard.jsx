import React from "react";
import defaultImg from "../assets/images/profileImg.png";
const ChildCard = ({ name, classLevel, profileImage, onViewDashboard }) => {
  return (
    <div className="bg-gray-100 rounded-2xl shadow p-4 w-full max-w-xs text-center mx-auto">
      {/* Profile Image */}
      <div className="flex justify-center mb-3">
        <img
          src={profileImage || defaultImg}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-600"
        />
      </div>

      <h2 className="font-semibold text-lg text-purple-700">{name}</h2>

      <div className="text-sm text-gray-700 mt-1">
        <span className="font-medium">Class</span>: {classLevel}
      </div>

      <button
        onClick={onViewDashboard}
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition"
      >
        View Dashboard
      </button>
    </div>
  );
};

export default ChildCard;
