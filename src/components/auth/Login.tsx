import React, { useState } from "react";
import { login } from "../../redux/features/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";

const LoginScreen = () => {
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCredentialChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "email" | "password"
  ) => {
    setLoginCredentials((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
    try {
      await dispatch(
        login({
          email: loginCredentials.email,
          password: loginCredentials.password,
        })
      ); // Assuming login is a function that handles authentication
      navigate("/dashboard"); // Navigate to protected route on success
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (show error message to user, etc.)
    }
  };

  return (
    <div className="login-screen">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={loginCredentials.email}
          onChange={(event) => handleCredentialChange(event, "email")}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={loginCredentials.password}
          onChange={(event) => handleCredentialChange(event, "password")}
        />
        <button type="submit">Login</button>
      </form>
      <a href="#">Forgot password?</a>
      <button
        onClick={() => {
          /* Handle Google login */
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginScreen;
