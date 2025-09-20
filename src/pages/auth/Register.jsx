import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { api } from "../../config/axios";
import { AiOutlineMail } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const [RegisterForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userId: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, email, userId } = RegisterForm;
    // console.log(RegisterForm);
    if (!firstName || !lastName || !phoneNumber || !userId) {
      return toast.error("All fields are required");
    }
    try {
      const response = await api.post("/auth/adminRegister", {
        firstName,
        lastName,
        email,
        phoneNumber,
        userId,
      });
      if (response.data.success) {
        toast.success("Registers Login Credentials sent via email");
        duration: 120000, navigate("/login");

        setRegisterForm({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          userId: "",
        });
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
 
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-purple-800">
          EduTrack
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* firstName */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              firstName
            </label>
            <div className="flex text-gray-600 items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              <input
                id="firstName"
                type="text"
                required
                placeholder="Enter your firstName"
                value={RegisterForm.firstName}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="flex-1 outline-none text-sm"
                autoComplete="current-firstName"
              />
            </div>
          </div>

          {/* lastName */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              lastName
            </label>
            <div className="flex text-gray-600 items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              {/* <IoKeyOutline className="text-gray-500 text-xl" /> */}
              <input
                id="lastName"
                type="text"
                required
                placeholder="Enter your lastName"
                value={RegisterForm.lastName}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="flex-1 outline-none text-sm"
                autoComplete="current-lastName"
              />
            </div>
          </div>

          {/* phoneNumber */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              phoneNumber
            </label>
            <div className="flex text-gray-600 items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              {/* <IoKeyOutline className="text-gray-500 text-xl" /> */}
              <input
                id="phoneNumber"
                type="number"
                required
                placeholder="Enter your phone Number"
                value={RegisterForm.phoneNumber}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                className="flex-1 outline-none text-sm"
                autoComplete="current-phoneNumber"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex text-gray-600 items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              <AiOutlineMail className="text-gray-500 text-xl" />
              <input
                id="email"
                type="email"
                required
                placeholder="mail@site.com"
                value={RegisterForm.email}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="flex-1 outline-none text-sm"
                autoComplete="email"
              />
            </div>
          </div>

          {/*ID  */}
          <div className="flex flex-col gap-1">
            <label htmlFor="ID" className="text-sm font-medium text-gray-700">
              ID
            </label>
            <div className="flex text-gray-600 items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              {/* <IoKeyOutline className="text-gray-500 text-xl" /> */}
              <input
                id="ID"
                type="text"
                required
                placeholder="Enter  ID"
                value={RegisterForm.userId}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    userId: e.target.value,
                  }))
                }
                className="flex-1 outline-none text-sm"
                autoComplete="current-studentsID"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-purple-800 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-900 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
