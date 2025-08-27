import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Auto-detect user role based on current route and set dummy data
  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.includes("/parent")) {
      setUser({
        email: "vida.amoah@example.com",
        role: "parent",
        name: "Vida Amoah",
        userType: "parent",
        canEdit: false, // Key change: disable editing for route-based detection
      });
    } else if (currentPath.includes("/teacher")) {
      setUser({
        email: "elizabeth.brown@school.edu",
        role: "teacher",
        name: "Elizabeth Brown",
        userType: "teacher",
        title: "5th Grade Mathematics Teacher",
        canEdit: false, // Key change: disable editing for route-based detection
      });
    } else if (currentPath === "/" || currentPath === "/login") {
      setUser(null);
    }
  }, [location.pathname]);

  const login = (email, password, role = "teacher") => {
    console.log("Login attempt:", { email, password, role });

    // When explicitly logging in, allow editing
    if (role === "teacher") {
      setUser({
        email: "elizabeth.brown@school.edu",
        role: "teacher",
        name: "Elizabeth Brown",
        userType: "teacher",
        title: "5th Grade Mathematics Teacher",
        canEdit: true, // Allow editing for logged-in users
      });
    } else {
      setUser({
        email: "vida.amoah@example.com",
        role: "parent",
        name: "Vida Amoah",
        userType: "parent",
        canEdit: true, // Allow editing for logged-in users
      });
    }
  };

  const logout = () => {
    console.log("User logged out");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
