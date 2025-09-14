# Deployment Instructions

## Backend Deployment (Render)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for deployment"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Render**:
   - Go to https://render.com and sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory
   - Render will automatically detect the `render.yaml` file
   - Set these environment variables in Render dashboard:
     - `MONGODB_URI`: mongodb+srv://vighneshdabare2004:2JdbEcZ1QHDfX399@cluster0.t11fhsz.mongodb.net/electronics_ecommerce?retryWrites=true&w=majority&appName=Cluster0
     - `JWT_SECRET`: mySuperSecretKeyThatIsLongEnoughForJWT256BitsSecurityRequirements
     - `JWT_EXPIRATION`: 86400
     - `SPRING_PROFILES_ACTIVE`: prod
   - Deploy!

3. **Note your Render URL** (e.g., `https://your-app-name.onrender.com`)

## Frontend Deployment (Vercel)

1. **Update the API URL**:
   - Replace `https://your-render-app.onrender.com/api` in `.env.production` with your actual Render URL

2. **Deploy to Vercel**:
   - Go to https://vercel.com and sign up/login
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory
   - Set these environment variables in Vercel:
     - `REACT_APP_API_URL`: https://your-actual-render-url.onrender.com/api
   - Deploy!

## Post-Deployment

1. **Update CORS** (if needed):
   - If you get CORS errors, update the backend CORS configuration to include your Vercel domain

2. **Test the application**:
   - Visit your Vercel URL
   - Test user registration, login, product browsing, and cart functionality

## Important Notes

- The backend uses MongoDB Atlas (already configured)
- JWT authentication is set up for production
- CORS is configured to allow all origins initially
- Both services are configured for free tiers
- Make sure to update the API URL in frontend after getting the Render URL
