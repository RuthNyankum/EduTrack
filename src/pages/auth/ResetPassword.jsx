import React from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";

const ResetPassword = () => {
  return  <div className="bg-white h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md p-6  flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center text-purple-800">
            EduTrack
          </h2>
  
          <form className="w-full flex flex-col gap-5">
           
  
            {/*New  Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
                <IoKeyOutline className="text-gray-500 text-xl" />
                <input
                  id="newPassword"
                  type="password"
                  required
                  placeholder="Enter your Password"
                  className="flex-1 outline-none text-sm"
                />
                <GoEyeClosed className="text-gray-500 text-xl cursor-pointer" />
              </div>
            </div>
            
  
             {/* confirm Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPasswordd"
                className="text-sm font-medium text-gray-700"
              >
                confirm Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
                <IoKeyOutline className="text-gray-500 text-xl" />
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="confirm password"
                  className="flex-1 outline-none text-sm"
                />
                <GoEyeClosed className="text-gray-500 text-xl cursor-pointer" />
              </div>
            </div> 
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-purple-800 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-900 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>;
};

export default ResetPassword;
