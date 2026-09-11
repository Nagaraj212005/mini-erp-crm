import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(res.data);
  };

  const addProduct = async () => {
  try {
    console.log("Sending:", form);

    await axios.post(
      "http://localhost:5000/api/products",
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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("✅ Product Added");

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
    console.log(err);

    if (err.response) {
      console.log(err.response.data);
      alert(err.response.data.message || "Failed to add product");
    } else {
      alert("Server not responding");
    }
  }
};

  const filtered = products.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: 30,
        background: "#f4f6f9",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#2563eb" }}>📦 Product & Inventory</h1>

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,.15)",
          marginBottom: 25,
        }}
      >
        <h3>Add Product</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <input
            placeholder="Product Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="SKU"
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
          />

          <input
            placeholder="Category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Current Stock"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <input
            placeholder="Minimum Stock"
            onChange={(e) => setForm({ ...form, minStock: e.target.value })}
          />

          <input
            placeholder="Warehouse"
            onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
          />
        </div>

        <br />

        <button
          style={{
            background: "#16a34a",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={addProduct}
        >
          ➕ Add Product
        </button>
      </div>

      <input
        placeholder="🔍 Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: 320,
          borderRadius: 6,
          border: "1px solid gray",
          marginBottom: 20,
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,.15)",
        }}
      >
        <thead style={{ background: "#16a34a", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Min Stock</th>
            <th>Warehouse</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p: any) => (
            <tr key={p.id} style={{ textAlign: "center" }}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td>₹ {p.price}</td>
              <td>{p.stock}</td>
              <td>{p.minStock}</td>
              <td>{p.warehouse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}