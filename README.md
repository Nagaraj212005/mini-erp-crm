# Mini ERP CRM System

## Overview

Mini ERP CRM is a full-stack web application developed to manage customers, products, inventory, and sales challans. The system provides secure user authentication, customer relationship management, inventory management, and sales processing through a clean REST API and responsive frontend interface.

The application follows a layered architecture using React for the frontend, Express.js for the backend, Prisma ORM for database operations, and PostgreSQL as the database.

---

## Features

### Authentication

- JWT-based Login
- Role-Based Access Control
- Secure Password Hashing
- Protected REST APIs

### Dashboard

- Total Customers
- Total Products
- Total Sales
- Revenue Summary
- Recent Sales
- Low Stock Products

### Customer Management

- Add Customer
- View Customers
- Update Customer
- Delete Customer
- Search Customers

### Product & Inventory

- Add Products
- View Products
- Update Products
- Delete Products
- Inventory Stock Management
- Low Stock Monitoring

### Sales Challan

- Create Sales Challan
- Automatic Total Calculation
- Stock Deduction
- Sales History

---

## Technology Stack

### Frontend

- React
- TypeScript
- Axios
- React Router

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- bcrypt

### Database

- PostgreSQL

---

## Project Structure

```
MiniERP

├── frontend
│   ├── pages
│   ├── components
│   ├── routes
│   └── App.tsx

├── backend
│   ├── controllers
│   ├── services
│   ├── routes
│   ├── middleware
│   ├── prisma
│   └── app.ts
```

---

## Implemented Modules

✔ Authentication

✔ Dashboard

✔ Customer CRM

✔ Product Inventory

✔ Sales Challan

✔ REST APIs

✔ PostgreSQL Database

✔ JWT Authorization

---

## API Modules

- Authentication
- Customers
- Products
- Sales
- Dashboard

---

## Future Improvements

- Advanced Dashboard Analytics
- Product Images
- Multiple Product Challans
- PDF Invoice Generation
- Email Notifications
- Pagination
- Advanced Search
- Export Reports

---

## Developed Using

React + Express + Prisma + PostgreSQL
