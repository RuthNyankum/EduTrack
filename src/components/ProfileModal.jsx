import React from "react";
import { X } from "lucide-react";
import { useAuth } from "../pages/auth/AuthProvider";
import StudentProfile from "../pages/profiles/StudentProfile";
import TeacherProfile from "../pages/profiles/TeacherProfile";

function ProfileModal({ isOpen, onClose }) {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  // Better role detection
  const userRole = user.role || user.userType;
  const isTeacher = userRole === "teacher";

  console.log(
    "👤 ProfileModal - User role:",
    userRole,
    "isTeacher:",
    isTeacher
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Profile Content */}
        <div className="overflow-y-auto max-h-[90vh] p-6 pt-16">
          {isTeacher ? <TeacherProfile isModal /> : <StudentProfile isModal />}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
