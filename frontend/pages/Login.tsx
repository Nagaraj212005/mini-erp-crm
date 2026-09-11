import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      // Save JWT token
      if (data.token) {
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <div className="glass-card" style={{
        width: "100%",
        maxWidth: "420px",
        padding: "40px 32px",
        textAlign: "center"
      }}>
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          marginBottom: "16px",
          boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)"
        }}>
          💼
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "8px" }}>
          Welcome Back
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "28px" }}>
          Sign in to access your Mini ERP CRM dashboard
        </p>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fca5a5",
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "13px",
            marginBottom: "20px",
            textAlign: "left"
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "6px", display: "block" }}>
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: "12px" }}
          >
            {loading ? "Signing in..." : "Sign In to Dashboard →"}
          </button>
        </form>

        <div style={{
          marginTop: "24px",
          paddingTop: "20px",
          borderTop: "1px solid var(--border-color)",
          fontSize: "12px",
          color: "var(--text-muted)"
        }}>
          Protected by JWT Role-Based Authentication
        </div>
      </div>
    </div>
  );
}