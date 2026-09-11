import { useEffect, useState } from "react";
import api from "../api/axio";
import Navbar from "../components/Navbar";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    gst: "",
    customerType: "Retail",
    address: "",
    status: "Active",
    followUpDate: "",
    notes: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/customers",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Customer Added Successfully!");
      fetchCustomers();
      setForm({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        gst: "",
        customerType: "Retail",
        address: "",
        status: "Active",
        followUpDate: "",
        notes: "",
      });
    } catch (err: any) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Failed to add customer");
    }
  };

  const filtered = customers.filter((c: any) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <main style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "4px" }}>👥 Customer CRM</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Manage customer accounts, leads, and contact information.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-card" style={{ padding: "28px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>➕ Add New Customer</h2>
          <form onSubmit={addCustomer}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <input
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Business Name"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }}>
              Add Customer Account
            </button>
          </form>
        </div>

        {/* Filter & Search */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input
            placeholder="🔍 Search customers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "360px" }}
          />
          <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Total Customers: <strong>{filtered.length}</strong>
          </span>
        </div>

        {/* Table */}
        <div className="glass-card" style={{ overflow: "hidden" }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      Loading customers...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      No customers found. Add your first customer above!
                    </td>
                  </tr>
                ) : (
                  filtered.map((c: any) => (
                    <tr key={c.id}>
                      <td>#{c.id}</td>
                      <td style={{ fontWeight: "600" }}>{c.name}</td>
                      <td style={{ color: "var(--text-muted)" }}>{c.email}</td>
                      <td>{c.phone || "—"}</td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}