<<<<<<< HEAD
# ElectroShop Frontend

A modern React-based e-commerce frontend for electronics store.

## Features

- 🏠 Home page with product categories
- 📱 Products listing page
- 🛒 Shopping cart functionality
- 🔐 User authentication
- 📱 Responsive design
- 🚀 Optimized for production deployment

## Tech Stack

- React 18.2.0
- React Router DOM 6.8.1
- Custom CSS utilities (Tailwind-like)
- React Scripts 5.0.1

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend-final
```

2. Install dependencies
```bash
yarn install
```

3. Start development server
```bash
yarn start
```

4. Build for production
```bash
yarn build
```

## Deployment

This app is configured for deployment on:
- Vercel (recommended)
- Netlify

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set build command: `yarn build`
3. Set output directory: `build`
4. Deploy

### Environment Variables

- `REACT_APP_API_BASE_URL`: Backend API endpoint

## Project Structure

```
src/
├── App.js          # Main app component with routing
├── App.css         # App-specific styles
├── index.js        # React app entry point
└── index.css       # Global styles and utilities
```

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests
- `yarn eject` - Eject from Create React App

## License

MIT License
=======
<<<<<<< HEAD
# Welcome to your Wowdevai project

## Project info

**URL**: https://wowdev.ai/chat/689a22f27ee95cdf1e7c2b59

## How can I edit this code?

There are several ways of editing your application.

**Use Wowdevai**

Simply visit the [Wowdevai Project](https://wowdev.ai/chat/689a22f27ee95cdf1e7c2b59) and start prompting.

Changes made via Wowdevai will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Wowdevai.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- JavaScript
- React
- Tailwind CSS

## How can I deploy this project?

Simply open [Wowdevai](https://wowdev.ai/chat/689a22f27ee95cdf1e7c2b59) and click on Share -> Publish.

## Can I connect a custom domain to my Wowdevai project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.wowdevai.dev/tips-tricks/custom-domain#step-by-step-guide)
=======
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
>>>>>>> 40c22a5e4f33a6701bc4b81a494e4d93abd6aa3e
>>>>>>> dcad0ac4e8acf6c16e0dc951f9e92a36ea388908
