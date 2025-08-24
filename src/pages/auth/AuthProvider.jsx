import { createContext, useContext, useState } from "react";

export const AuthContext =  createContext();

const AuthProvider = ({children})=>{
      const [user, setUser] = useState(null);

       const login = (email, password) => {
    console.log("Logged in with:", email, password);
    setUser({ email });
  };
   const logout = () => {
    setUser(null);
  };

return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = ()=> {
    return useContext (AuthContext)
};
