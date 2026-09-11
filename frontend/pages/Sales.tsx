import { useEffect, useState } from "react";
import api from "../api/axio";
import Navbar from "../components/Navbar";

export default function Sales() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerId: "",
    productId: "",
    quantity: "",
    status: "Confirmed",
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
    } finally {
      setLoading(false);
    }
  };

  const createSale = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/sales",
        {
          customerId: Number(form.customerId),
          items: [
            {
              productId: Number(form.productId),
              quantity: Number(form.quantity),
            },
          ],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Sales Challan Created Successfully!");
      setForm({
        customerId: "",
        productId: "",
        quantity: "",
        status: "Confirmed",
      });
      fetchSales();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to Create Sale");
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <main style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "4px" }}>💰 Sales Challans</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Issue sales challans, deduct inventory, and manage order history.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-card" style={{ padding: "28px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>📄 Generate Sales Order</h2>
          <form onSubmit={createSale}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>
                  CUSTOMER ID *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1"
                  value={form.customerId}
                  onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>
                  PRODUCT ID *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1"
                  value={form.productId}
                  onChange={(e) => setForm({ ...form, productId: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px", display: "block" }}>
                  QUANTITY *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: "20px", background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}>
              Generate Sales Order
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="glass-card" style={{ overflow: "hidden" }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Challan No.</th>
                  <th>Customer ID</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      Loading sales history...
                    </td>
                  </tr>
                ) : sales.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      No sales orders generated yet.
                    </td>
                  </tr>
                ) : (
                  sales.map((sale: any) => (
                    <tr key={sale.id}>
                      <td style={{ fontWeight: "700" }}>CH-{sale.id}</td>
                      <td>Customer #{sale.customerId}</td>
                      <td style={{ fontWeight: "700", color: "#fbbf24" }}>₹ {sale.totalAmount}</td>
                      <td>
                        <span className="badge badge-success">Confirmed</span>
                      </td>
                      <td style={{ color: "var(--text-muted)" }}>
                        {new Date(sale.createdAt).toLocaleString()}
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