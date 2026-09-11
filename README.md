# 💼 Mini ERP + CRM Operations Portal

> **Full Stack Developer Case Study Submission**  
> A complete, production-ready Mini ERP & CRM system built with **React**, **Node.js**, **Express**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

---

## 📌 Submission Overview & Quick Links

| Requirement | Details / Link |
| :--- | :--- |
| **GitHub Repository** | [https://github.com/Nagaraj212005/mini-erp-crm](https://github.com/Nagaraj212005/mini-erp-crm) |
| **Live Frontend URL** | `http://localhost:5173` *(Render deployment ready via `render.yaml`)* |
| **Live Backend API URL** | `http://localhost:5000/api` |
| **Postman Collection** | Included in repository as [`postman_collection.json`](./postman_collection.json) |

---

## 🔐 Test Login Credentials (Role-Based Access Control)

| Role | Email | Password | Allowed Actions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@mini-erp.com` | `admin123` | Full administrative control: CRM, Inventory, Sales, User management |
| **Sales** | `sales@mini-erp.com` | `sales123` | Customer CRM lead management, generate Sales Challans, view stock |
| **Warehouse** | `warehouse@mini-erp.com` | `wh12345` | Manage product inventory, stock levels, warehouse locations |
| **Accounts** | `accounts@mini-erp.com` | `acc12345` | View financial sales history, revenue metrics, customer accounts |

---

## 🏗️ Architecture & System Design

The application follows a clean **Layered Architecture** adhering to separation of concerns:

```
                  ┌─────────────────────────────────────┐
                  │          React + Vite SPA           │
                  │   (TypeScript, Axios Interceptor)   │
                  └──────────────────┬──────────────────┘
                                     │ REST HTTP (JWT Auth)
                                     ▼
                  ┌─────────────────────────────────────┐
                  │       Node.js / Express API         │
                  │ (TypeScript Controllers & Services) │
                  └──────────────────┬──────────────────┘
                                     │ Prisma ORM Client
                                     ▼
                  ┌─────────────────────────────────────┐
                  │         PostgreSQL Database         │
                  └─────────────────────────────────────┘
```

- **Frontend**: Built with **React 19**, **Vite**, and **TypeScript**. Features dynamic state management, glassmorphism UI design tokens, responsive layout grid, and an Axios request interceptor that auto-injects JWT authorization headers.
- **Backend API**: Built with **Express.js** in **TypeScript**. Uses a Controller-Service pattern for business logic separation and a centralized error handling utility (`handleControllerError`) to capture Prisma constraint exceptions cleanly.
- **Database Layer**: **PostgreSQL** configured with **Prisma ORM** for type-safe database queries, schema migrations, and relational integrity.

---

## 🚀 Key Modules & Features

### 1. 🔑 Authentication & Security
- Role-based authorization (`ADMIN`, `MANAGER`, `EMPLOYEE`).
- Passwords hashed securely using `bcrypt` (10 rounds).
- State-less authentication using Signed JWT tokens (`1d` expiration).

### 2. 👥 Customer CRM Module
- Manage accounts, leads, business names, contact details, customer types (*Retail*, *Wholesale*, *Distributor*).
- Real-time instant search across customer names and emails.

### 3. 📦 Product & Inventory Module
- SKU tracking, category management, pricing, stock levels, minimum stock alert quantity, and warehouse allocation.
- Automatic stock status indicators (**In Stock** vs **Low Stock**).

### 4. 📄 Sales Challan Module
- Generate sales orders linked to customers and inventory items.
- **Atomic Stock Deduction**: Automatically deducts product stock upon sales order confirmation.
- **Negative Stock Prevention**: Returns clean error messages if stock is insufficient.

### 5. 📊 Executive Dashboard
- Real-time KPI summaries: Total Revenue, Total Customers, Low Stock Alerts, Total Sales.
- Recent sales order activity feeds and interactive data views.

---

## ⚙️ Local Development Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally (or a remote database URL)

### Step 1: Clone Repository
```bash
git clone https://github.com/Nagaraj212005/mini-erp-crm.git
cd mini-erp-crm
```

### Step 2: Configure & Start Backend
```bash
cd backend
npm install

# Copy environment template & configure database connection
cp .env.example .env
```
*Sample `.env` file:*
```env
PORT=5000
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/minierp_db"
JWT_SECRET="super-secret-key-12345"
```

```bash
# Push Prisma schema to local database
npx prisma db push

# Seed initial admin user & sample data
npx ts-node --esm prisma/seed.ts

# Run Backend Dev Server
npm run dev
```

### Step 3: Configure & Start Frontend
```bash
# Open a new terminal tab
cd frontend
npm install

# Run Frontend Dev Server
npm run dev
```
Open **`http://localhost:5173`** in your browser and sign in!

---

## ☁️ Cloud Deployment Guide (Render Blueprint)

The repository includes a ready-to-use [`render.yaml`](./render.yaml) blueprint for zero-config one-click cloud deployment.

### Steps to Deploy on Render:
1. Push code to your GitHub repository.
2. Sign in to [Render.com](https://dashboard.render.com/).
3. Click **New** -> **Blueprint**.
4. Connect repository `Nagaraj212005/mini-erp-crm`.
5. Render will automatically provision:
   - **PostgreSQL Database** (`mini-erp-db`)
   - **Node.js Web Service** (`mini-erp-backend`)
6. Add `VITE_API_URL` environment variable pointing to your backend service URL in frontend settings.

---

## 📬 API Documentation & Testing

Import [`postman_collection.json`](./postman_collection.json) into Postman to test all endpoints:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | ❌ |
| `POST` | `/api/auth/register` | Register new user account | ❌ |
| `GET` | `/api/dashboard/summary` | Fetch dashboard KPI statistics | ✅ |
| `GET` | `/api/customers` | Fetch customer list | ✅ |
| `POST` | `/api/customers` | Create new customer account | ✅ |
| `GET` | `/api/products` | Fetch inventory product list | ✅ |
| `POST` | `/api/products` | Create new product item | ✅ |
| `GET` | `/api/sales` | Fetch sales order history | ✅ |
| `POST` | `/api/sales` | Generate sales challan & deduct stock | ✅ |

---

## ⚠️ Known Limitations & Future Enhancements

1. **Multi-Item Challans**: Currently supports single product line items per challan; multi-item array expansion ready in schema.
2. **Invoice PDF Generation**: PDF invoice export component planned for future release.
3. **AWS S3 File Storage**: Product image uploads currently default to SVG/CSS icons.
