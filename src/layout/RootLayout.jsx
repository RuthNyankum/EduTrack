// import React from 'react';
// import { Outlet } from 'react-router';
// import Footer from '../components/Footer';

// const RootLayout = () => {
//   return (
//     <>
//       <Outlet />
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default RootLayout;

///////MINESSSS
import { Outlet } from "react-router";
import ProfileHeader from "../components/ProfileHeader";
import { useAuth } from "../pages/auth/AuthProvider";

const RootLayout = () => {
  const { user } = useAuth();

  // Only show ProfileHeader if user is logged in
  const showProfileHeader = user && ["parent", "teacher"].includes(user.role);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
    //   {showProfileHeader && <ProfileHeader />}
    //   <Outlet />
    // </div>
    <>
      <Outlet  />
    </>
  );
};

export default RootLayout;
