# EverMart - MERN E-commerce Application

EverMart is a full-stack **MERN (MongoDB, Express, React, Node.js)** e-commerce application. It allows users to browse products, add them to the cart, and purchase items using **Stripe payments**. The project is designed to demonstrate modern React practices, state management with Redux, backend API integration, and secure authentication.

---

## 🔗 Live Demo
[Try EverMart Online](https://SangarDev.github.io/EverMart/)

---

## 🛠 Features

### Frontend:
- Built with **React 18** using functional components and hooks.
- Routing handled with **React Router v7**.
- State management with **Redux Toolkit**.
- Responsive design compatible with mobile and desktop.
- User authentication and protected routes.
- Product search, category-wise filtering, and cart management.
- Notifications using **React Toastify**.
- Smooth UI interactions and dynamic product displays.

### Backend:
- Built with **Node.js** and **Express.js**.
- RESTful API endpoints for users, products, cart, and orders.
- MongoDB used for persistent storage.
- Secure password hashing with **bcryptjs**.
- JSON Web Token (JWT) based authentication.
- File uploads handled with **Multer**.
- Stripe payment integration for checkout.

### Admin Panel:
- Add, edit, and delete products.
- Manage banners and featured products.
- View all users and orders.

---

## ⚡ Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9
- MongoDB Atlas account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SangarDev/EverMart.git

### Install backend dependencies:

cd backend
npm install
### Install frontend dependencies:

cd ../frontend
npm install
Configuration

### Create a .env file in the backend folder with the following keys:

MONGODB_URI=<Your MongoDB Connection String>
TOKEN_SECRET_KEY=<JWT Secret Key>
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=<Your Stripe Secret Key>
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY=<Stripe Webhook Secret>
Running Locally
Backend:

cd backend
npm run dev
Frontend:

cd frontend
npm start
The app will be available at http://localhost:3000.


