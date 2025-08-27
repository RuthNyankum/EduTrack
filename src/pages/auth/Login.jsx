// import React from "react";
// import { useState } from "react";
// import { AiOutlineMail } from "react-icons/ai";
// import { GoEyeClosed } from "react-icons/go";
// import { IoKeyOutline } from "react-icons/io5";
// import { RxEyeOpen } from "react-icons/rx";
// import {useAuth} from "./AuthProvider";

// const Login = () => {
//   const [passwordVisible, setPasswordVisible] = useState (false);
//   const [loginForm, setLoginForm] = useState({email: "", password:""})
//   const [submitData, setSubmitData] = useState(null);
//   const {login}= useAuth();

//   const handleSubmit = (e) => {
//     const {email,password} = loginForm;
//     setSubmitData({email,password})
//     login(email, password);
//     console.log('password submited', password);
//     console.log('email submited', email);
//     e.preventDefault();

//   };

//   const togglePasswordVisible =() =>{
//     setPasswordVisible(!passwordVisible)
//   };
//   return (
//     <div className="bg-white h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md p-6  flex flex-col gap-6">
//         <h2 className="text-3xl font-bold text-center text-purple-800">
//           EduTrack
//         </h2>

//         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
//           {/* Email */}
//           <div className="flex flex-col gap-1">
//             <label
//               htmlFor="email"
//               className="text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
//               <AiOutlineMail className="text-gray-500 text-xl" />
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 placeholder="mail@site.com"
//                 // value={email}
//                 onChange={(e)=>setLoginForm({...loginForm,email:e.target.value})}
//                 className="flex-1 outline-none text-sm"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="flex flex-col gap-1">
//             <label
//               htmlFor="Password"
//               className="text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
//               <IoKeyOutline className="text-gray-500 text-xl" />
//               <input
//                 id="Password"
//                 type={passwordVisible ? 'text':'password'}
//                 required
//                 placeholder="Enter your Password"
//                 onChange={(e)=>setLoginForm({...loginForm,password:e.target.value})}

//                 className="flex-1 outline-none text-sm"
//               />
//               <div onClick={togglePasswordVisible}
//               className="text-gray-500 text-xl cursor-pointer">
//                 {passwordVisible ? <RxEyeOpen/> :  <GoEyeClosed/> }

//               </div>

//             </div>
//           </div>

//           <button
//             type="submit"

//             className="w-full mt-4 bg-purple-800 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-900 transition duration-200"
//           >
//             Login
//           </button>
//           </form>
//       </div>
//     </div>
//   );

// export default Login;

import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    login(email, password);
    console.log("email submitted", email);
    console.log("password submitted", password);
  };

  const togglePasswordVisible = () => setPasswordVisible((prev) => !prev);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-purple-800">
          EduTrack
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
              <AiOutlineMail className="text-gray-500 text-xl" />
              <input
                id="email"
                type="email"
                required
                placeholder="mail@site.com"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="flex-1 outline-none text-sm"
                autoComplete="email"
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
              <IoKeyOutline className="text-gray-500 text-xl" />
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
                className="flex-1 outline-none text-sm"
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
            className="w-full mt-4 bg-purple-800 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-900 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
