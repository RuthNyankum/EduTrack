import { Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles }) => {
  // TEMPORARILY DISABLE AUTH CHECK (for frontend development)
  return <Outlet />;

  // --- Original code for later ---
  // const user = useAuth();
  // const hasPermission = user && allowedRoles.includes(user.role);

  // if (!hasPermission) {
  //   return <Navigate to="/login" replace />;
  // }

  // return <Outlet />;
};

export default ProtectedRoute;
