import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TeacherProvider } from "./context/TeacherContext.jsx";
// import AuthProvider from "./pages/auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <TeacherProvider>
      <App />
    </TeacherProvider>
    {/* </AuthProvider> */}
  </StrictMode>
);
