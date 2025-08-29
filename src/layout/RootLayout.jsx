import { Outlet } from "react-router";
import ProfileHeader from "../components/ProfileHeader";
import { useAuth } from "../pages/auth/AuthProvider";

const RootLayout = () => {
  const { user } = useAuth();

  // Only show ProfileHeader if user is logged in
  const showProfileHeader = user && ["parent", "teacher"].includes(user.role);

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
