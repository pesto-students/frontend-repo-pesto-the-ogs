import React, { useState } from "react";

const LoginScreen = () => {
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleCredentialChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "email" | "password"
  ) => {
    setLoginCredentials((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
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

// const App = () => {
//   const [isLoginView, setIsLoginView] = useState(true);

//   return (
//     <div className="app">
//       {isLoginView ? <LoginScreen /> : <SignupScreen />}
//       <button onClick={() => setIsLoginView(!isLoginView)}>
//         {isLoginView ? 'Switch to Signup' : 'Switch to Login'}
//       </button>
//     </div>
//   );
// };

export default LoginScreen;
