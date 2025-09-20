import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../config/axios";
import { AiOutlineMail } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginForm, setLoginForm] = useState({ userId: "", password: "" });
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const { userId, password } = loginForm;

    if (!userId || !password) {
      return toast.error("All fields are required");
    }

    try {
      const response = await api.post("/auth/login", {
        userId,
        password,
      });

      if (response.data.userId) {
        toast.success("Login Successful", { duration: 1200});

        setLoginForm({
          userId: "",
          password: "",
        });

        if (userId.toLowerCase().startsWith("stu")) {
          console.log("Parent has logged in");
          navigate("/parent/dashboard");
        } else if (userId.toLowerCase().startsWith("tch")) {
          console.log("Teacher has logged in");
          navigate("/teacher/dashboard");
        } else {
          console.log("Unknown user type");
          navigate("/");
        }

        // clear after navigation
        // setLoginForm({ userId: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisible = () => setPasswordVisible((prev) => !prev);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-purple-800">
          EduTrack
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* userId */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="userId"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              <AiOutlineMail className="text-gray-700 text-xl" />
              <input
                id="userId"
                type="text"
                required
                // placeholder="mail@site.com"
                value={loginForm.userId}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, userId: e.target.value }))
                }
                className="flex-1 outline-none text-sm text-gray-700"
                autoComplete="userId"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              <IoKeyOutline className="text-gray-700 text-xl" />
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="flex-1 outline-none text-sm text-gray-700"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisible}
                className="text-gray-500 text-xl cursor-pointer"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <RxEyeOpen /> : <GoEyeClosed />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer mt-4 bg-purple-800 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-900 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
