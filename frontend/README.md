# Electronics E-commerce Frontend

React frontend application for the electronics e-commerce platform.

## 🚀 Quick Start

```bash
npm install
npm start
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CategoryFilter.js
│   ├── LoadingSpinner.js
│   ├── Navbar.js
│   ├── ProductCard.js
│   ├── ProtectedRoute.js
│   └── SearchBar.js
├── context/            # React Context for state management
│   ├── AuthContext.js
│   └── CartContext.js
├── pages/              # Page components
│   ├── Cart.js
│   ├── Home.js
│   ├── Login.js
│   ├── ProductDetail.js
│   ├── Products.js
│   └── Signup.js
├── services/           # API service functions
│   ├── api.js
│   └── productService.js
├── App.js              # Main app component
├── index.js            # React entry point
└── index.css           # Global styles with Tailwind
```

## ✅ Features

- **Responsive Design** with Tailwind CSS
- **React Router** for navigation
- **Context API** for global state management
- **JWT Authentication** with persistent login
- **Shopping Cart** with local storage backup
- **Product Search & Filtering**
- **Modern UI Components** with loading states

## 📋 Prerequisites

- Node.js 16 or higher
- npm or yarn

## 🔧 Configuration

The frontend connects to the backend at `http://localhost:8080`. Update `src/services/api.js` if needed.