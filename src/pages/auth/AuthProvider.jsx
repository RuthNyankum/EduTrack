import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../config/axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new: track loading state

  // ✅ Fetch logged-in user when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/profile"); // backend should use JWT cookie
        setUser(res.data.user);
      } catch (err) {
        console.log("No active session:", err.response?.data?.message || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Login function (handles redirection based on userId)
const login = async (userId, password) => {
  try {
    const res = await api.post("/auth/login", { userId, password });
    const user = res.data.user;
    setUser(user);

    // ✅ Redirect user based on userId prefix
    if (user.userId.toLowerCase().startsWith("tch")) {
      console.log("Teacher logged in");
      navigate("/teacher/dashboard");
    } else if (user.userId.toLowerCase().startsWith("stu")) {
      console.log("Parent logged in");
      navigate("/parent/dashboard");
    } else {
      console.log("Unknown user type");
      navigate("/");
    }
  } catch (err) {
    console.error("Login failed:", err.response?.data?.message || err.message);
    throw err;
  }
};


  // ✅ Logout (clears cookie on backend + context)
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
