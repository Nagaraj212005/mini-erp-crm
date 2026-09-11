import { useEffect, useState } from "react";
import axios from "axios";

export default function Sales() {
  const [sales, setSales] = useState<any[]>([]);

  const [form, setForm] = useState({
    customerId: "",
    productId: "",
    quantity: "",
    status: "Draft",
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/sales",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSales(res.data);
  };

  const createSale = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/sales",
        {
          customerId: Number(form.customerId),
          items: [
            {
              productId: Number(form.productId),
              quantity: Number(form.quantity),
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Sales Challan Created Successfully");

      fetchSales();
    } catch {
      alert("Failed to Create Sale");
    }
  };

  return (
    <div
      style={{
        padding: 30,
        background: "#f4f6f9",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#ea580c" }}>💰 Sales Challan</h1>

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,.15)",
          marginBottom: 25,
        }}
      >
        <h3>Create Sales Challan</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <input
            placeholder="Customer ID"
            onChange={(e) =>
              setForm({ ...form, customerId: e.target.value })
            }
          />

          <input
            placeholder="Product ID"
            onChange={(e) =>
              setForm({ ...form, productId: e.target.value })
            }
          />

          <input
            placeholder="Quantity"
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option>Draft</option>
            <option>Confirmed</option>
          </select>
        </div>

        <br />

        <button
          style={{
            background: "#ea580c",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={createSale}
        >
          📄 Generate Challan
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,.15)",
        }}
      >
        <thead style={{ background: "#ea580c", color: "white" }}>
          <tr>
            <th>Challan No.</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale: any) => (
            <tr key={sale.id} style={{ textAlign: "center" }}>
              <td>CH-{sale.id}</td>
              <td>{sale.customerId}</td>
              <td>₹ {sale.totalAmount}</td>
              <td>
                <span
                  style={{
                    background: "#22c55e",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                  }}
                >
                  Confirmed
                </span>
              </td>
              <td>{sale.createdById}</td>
              <td>{new Date(sale.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}