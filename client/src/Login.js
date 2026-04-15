import React, { useState } from "react";
import API from "./api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Login
  const handleLogin = () => {
  if (email && password) {
    localStorage.setItem("token", "dummy-token");
    window.location.href = "/";
  } else {
    alert("Enter email and password");
  }
};

  // 🆕 Signup
  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        name: "chaithanya",
        email: "chaithanya@gmail.com",
        password: "123456"
      });
      alert("Signup successful! Now login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <input
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      <button onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

export default Login;