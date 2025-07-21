// src/pages/auth/ResetPassword.jsx
import React, { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";

const ResetPassword = () => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Password reset:", form.newPassword);
  };

  return (
    <div className="bg-white h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-purple-800">EduTrack</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* New Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              <IoKeyOutline className="text-gray-500 text-xl" />
              <input
                id="newPassword"
                name="newPassword"
                type={newPasswordVisible ? "text" : "password"}
                required
                placeholder="Enter your new password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="flex-1 outline-none text-sm"
              />
              <div
                className="text-gray-500 text-xl cursor-pointer"
                onClick={() => setNewPasswordVisible((prev) => !prev)}
              >
                {newPasswordVisible ? <RxEyeOpen /> : <GoEyeClosed />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              <IoKeyOutline className="text-gray-500 text-xl" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                required
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="flex-1 outline-none text-sm"
              />
              <div
                className="text-gray-500 text-xl cursor-pointer"
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
              >
                {confirmPasswordVisible ? <RxEyeOpen /> : <GoEyeClosed />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-purple-800 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-900 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
