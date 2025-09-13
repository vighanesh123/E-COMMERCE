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
