import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LoginScreen from "./components/auth/Login";
import SignupScreen from "./components/auth/SignupScreen";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Dashboard from "./pages/dashboard";
import AddIncomeAndExpense from "./pages/addIncomeAndExpense";
import SessionHandler from "./components/auth/SessionHandler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SessionHandler />}>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route element={<ProtectedRoute />}>
            {/* All protected routes go here as child routes of ProtectedRoute */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/income-and-expense/add"
              element={<AddIncomeAndExpense />}
            />
            {/* More protected routes can be added here */}
          </Route>
          {/* Redirects to login if no other routes match and user is not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
