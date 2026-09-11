import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customerRoutes";
import productRoutes from "./routes/productRoutes";
import saleRoutes from "./routes/saleRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mini ERP CRM Backend is Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;