import { useEffect, useState } from "react";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/api/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCustomers(res.data);
  };

 const addCustomer = async () => {
  try {
    console.log(form);

    await axios.post(
      "http://localhost:5000/api/customers",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Customer Added");

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
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Failed");
  }
};

  const updateCustomer = async (id: number) => {
  try {
    await axios.put(
      `http://localhost:5000/api/customers/${id}`,
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Customer Updated");
    fetchCustomers();
  } catch (err: any) {
    console.log(err.response?.data);
    alert("Update Failed");
  }
};

  const filtered = customers.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
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
      <h1 style={{ color: "#1e3a8a" }}>👥 Customer CRM</h1>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,.2)",
          marginBottom: 25,
        }}
      >
        <h3>Add / Edit Customer</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input placeholder="Name"
            onChange={(e)=>setForm({...form,name:e.target.value})} />

          <input placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})} />

          <input placeholder="Phone"
            onChange={(e)=>setForm({...form,phone:e.target.value})} />

          <input placeholder="Business Name"
            onChange={(e)=>setForm({...form,businessName:e.target.value})} />

          <input placeholder="GST"
            onChange={(e)=>setForm({...form,gst:e.target.value})} />

          <input placeholder="Address"
            onChange={(e)=>setForm({...form,address:e.target.value})} />

          <textarea
            placeholder="Notes"
            style={{ gridColumn: "1 / span 2", height: 70 }}
            onChange={(e)=>setForm({...form,notes:e.target.value})}
          />
        </div>

        <br />

        <button
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={addCustomer}
        >
          ➕ Add Customer
        </button>
      </div>

      <input
        placeholder="🔍 Search Customer..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          padding: 10,
          width: 300,
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
          boxShadow: "0 2px 8px rgba(0,0,0,.2)",
        }}
      >
        <thead style={{ background: "#2563eb", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Business</th>
            <th>Status</th>
            <th>View</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((customer: any) => (
            <tr key={customer.id} style={{ textAlign: "center" }}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.businessName}</td>
              <td>{customer.status}</td>

              <td>
                <button
                  onClick={() => alert(JSON.stringify(customer, null, 2))}
                >
                  View
                </button>
              </td>

              <td>
                <button
                  onClick={() => {
                    setForm(customer);
                    updateCustomer(customer.id);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}