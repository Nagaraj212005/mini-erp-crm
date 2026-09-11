import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding database...");

  // Create test users for all roles
  const usersToSeed = [
    { name: "Admin User", email: "admin@mini-erp.com", password: "admin123", role: "ADMIN" as const },
    { name: "Sales Executive", email: "sales@mini-erp.com", password: "sales123", role: "EMPLOYEE" as const },
    { name: "Warehouse Manager", email: "warehouse@mini-erp.com", password: "wh12345", role: "MANAGER" as const },
    { name: "Accounts Manager", email: "accounts@mini-erp.com", password: "acc12345", role: "EMPLOYEE" as const },
  ];

  for (const u of usersToSeed) {
    const existingUser = await prisma.user.findUnique({
      where: { email: u.email },
    });

    if (!existingUser) {
      const hashed = await bcrypt.hash(u.password, 10);
      const created = await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          password: hashed,
          role: u.role,
        },
      });
      console.log(`✅ User created [${u.role}]:`, created.email);
    } else {
      console.log(`ℹ️  User already exists [${u.role}]:`, existingUser.email);
    }
  }

  // Create sample customers
  const customers = [
    { name: "Rajesh Kumar", email: "rajesh@example.com", phone: "9876543210", businessName: "Kumar Traders" },
    { name: "Priya Sharma", email: "priya@example.com", phone: "9876543211", businessName: "Sharma Enterprises" },
  ];

  for (const c of customers) {
    const exists = await prisma.customer.findUnique({ where: { email: c.email } });
    if (!exists) {
      await prisma.customer.create({ data: c });
      console.log("✅ Customer created:", c.name);
    }
  }

  // Create sample products
  const products = [
    { name: "Laptop Pro 15\"", sku: "LAP-001", category: "Electronics", price: 75000, stock: 20, minStock: 5 },
    { name: "Wireless Mouse", sku: "MOU-002", category: "Accessories", price: 850, stock: 100, minStock: 20 },
    { name: "USB-C Hub", sku: "HUB-003", category: "Accessories", price: 1200, stock: 50, minStock: 10 },
  ];

  for (const p of products) {
    const exists = await prisma.product.findFirst({ where: { sku: p.sku } });
    if (!exists) {
      await prisma.product.create({ data: p });
      console.log("✅ Product created:", p.name);
    }
  }

  console.log("\n🎉 Seeding complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔐 Login credentials:");
  console.log("   Email   : admin@mini-erp.com");
  console.log("   Password: admin123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
