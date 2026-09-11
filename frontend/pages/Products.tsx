import { useEffect, useState } from "react";
import api from "../api/axio";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
    warehouse: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/products",
        {
          name: form.name,
          description: form.description,
          sku: form.sku,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          minStock: Number(form.minStock),
          warehouse: form.warehouse,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Product Added Successfully!");
      setForm({
        name: "",
        description: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
        minStock: "",
        warehouse: "",
      });
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  const filtered = products.filter((p: any) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <main style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "4px" }}>📦 Product & Inventory</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Track product stock, pricing, and warehouse details.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-card" style={{ padding: "28px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>➕ Add New Product</h2>
          <form onSubmit={addProduct}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <input
                placeholder="Product Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                placeholder="SKU Code"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price (₹) *"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Initial Stock *"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Min Stock Alert Level"
                value={form.minStock}
                onChange={(e) => setForm({ ...form, minStock: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success" style={{ marginTop: "20px" }}>
              Save Product Item
            </button>
          </form>
        </div>

        {/* Filter & Search */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input
            placeholder="🔍 Search products by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "360px" }}
          />
          <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Total Items: <strong>{filtered.length}</strong>
          </span>
        </div>

        {/* Table */}
        <div className="glass-card" style={{ overflow: "hidden" }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      Loading inventory...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                      No products found. Add products using the form above!
                    </td>
                  </tr>
                ) : (
                  filtered.map((p: any) => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td style={{ fontWeight: "600" }}>{p.name}</td>
                      <td style={{ color: "var(--text-muted)" }}>{p.sku || "N/A"}</td>
                      <td>{p.category || "General"}</td>
                      <td style={{ fontWeight: "700", color: "#34d399" }}>₹ {p.price}</td>
                      <td>
                        {p.stock <= (p.minStock || 5) ? (
                          <span className="badge badge-warning">Low Stock ({p.stock})</span>
                        ) : (
                          <span className="badge badge-success">In Stock ({p.stock})</span>
                        )}
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