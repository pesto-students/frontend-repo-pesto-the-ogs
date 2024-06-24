import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/auth/Login";
import SignupScreen from "./components/auth/SignupScreen";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route element={<ProtectedRoute />}>
          {/* All protected routes go here as child routes of ProtectedRoute */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* More protected routes can be added here */}
        </Route>
        {/* Redirects to login if no other routes match and user is not authenticated */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
