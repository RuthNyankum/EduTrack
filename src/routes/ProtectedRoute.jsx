import { Outlet } from 'react-router';

const ProtectedRoute = ({ allowedRoles }) => {
  // Development mode - bypass authentication
  if (import.meta.env.DEV) {
    console.log(
      'Development mode: Bypassing authentication for roles:',
      allowedRoles
    );
    return <Outlet />;
  }

  // Your actual authentication logic would go here
  // const user = useAuth(); // or however you get user data
  // const hasPermission = user && allowedRoles.includes(user.role);

  // if (!hasPermission) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
