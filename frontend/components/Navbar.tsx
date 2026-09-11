import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        ✨ Mini ERP CRM
      </Link>

      <nav className="nav-links">
        <Link
          to="/dashboard"
          className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          📊 Dashboard
        </Link>
        <Link
          to="/customers"
          className={`nav-link ${location.pathname === "/customers" ? "active" : ""}`}
        >
          👥 Customers
        </Link>
        <Link
          to="/products"
          className={`nav-link ${location.pathname === "/products" ? "active" : ""}`}
        >
          📦 Products
        </Link>
        <Link
          to="/sales"
          className={`nav-link ${location.pathname === "/sales" ? "active" : ""}`}
        >
          💰 Sales
        </Link>
      </nav>

      <button className="btn btn-danger" style={{ padding: "8px 14px", fontSize: "13px" }} onClick={handleLogout}>
        🚪 Logout
      </button>
    </header>
  );
}
