import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          Mini ERP CRM
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: "40px",
          }}
        >
          Enterprise Resource Planning & Customer Relationship Management
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "20px",
          }}
        >
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#2563eb",
                color: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              👥
              <br />
              Customers
            </div>
          </Link>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#16a34a",
                color: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              📦
              <br />
              Products
            </div>
          </Link>

          <Link to="/sales" style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#ea580c",
                color: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              💰
              <br />
              Sales
            </div>
          </Link>

          <div
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            style={{
              background: "#dc2626",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            🚪
            <br />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}