import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
localStorage.setItem("user", JSON.stringify(data.user));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      console.log(data);

      // Save JWT token
      localStorage.setItem("token", data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}