import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <main style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 24px" }}>
        {/* Header Section */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>
            Overview Dashboard
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            Manage your Enterprise Customers, Inventory, and Sales Challans seamlessly.
          </p>
        </div>

        {/* Action Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "40px"
        }}>
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <div className="glass-card" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(59, 130, 246, 0.15)",
                color: "#60a5fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
              }}>
                👥
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Customers CRM</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Add, manage, track, and update client relationship accounts.
              </p>
              <div style={{ color: "#60a5fa", fontWeight: "600", fontSize: "14px", marginTop: "8px" }}>
                Manage Customers →
              </div>
            </div>
          </Link>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <div className="glass-card" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
              }}>
                📦
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Products & Stock</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Track inventory levels, warehouses, pricing, and low stock alerts.
              </p>
              <div style={{ color: "#34d399", fontWeight: "600", fontSize: "14px", marginTop: "8px" }}>
                View Inventory →
              </div>
            </div>
          </Link>

          <Link to="/sales" style={{ textDecoration: "none" }}>
            <div className="glass-card" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.15)",
                color: "#fbbf24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
              }}>
                💰
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Sales Challans</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Create sales orders, automate totals, and auto-deduct inventory.
              </p>
              <div style={{ color: "#fbbf24", fontWeight: "600", fontSize: "14px", marginTop: "8px" }}>
                Create Sales Order →
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}