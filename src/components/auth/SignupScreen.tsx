import { useState } from "react";

export default function SignupScreen() {
  const [signupInfo, setSignupInfo] = useState<{
    email: string;
    password: string;
    fullName: string;
  }>({ email: "", fullName: "", password: "" });

  const handleCredentialChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "email" | "password" | "fullName"
  ) => {
    setSignupInfo((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  };

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="signup-screen">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter your full name"
          value={signupInfo.fullName}
          onChange={(e) => handleCredentialChange(e, "fullName")}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={signupInfo.email}
          onChange={(e) => handleCredentialChange(e, "email")}
        />
        <input
          type="password"
          placeholder="Create a secure password"
          value={signupInfo.password}
          onChange={(e) => handleCredentialChange(e, "password")}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>or</p>
      <button
        onClick={() => {
          /* Handle Google signup */
        }}
      >
        Sign up with Google
      </button>
    </div>
  );
}
