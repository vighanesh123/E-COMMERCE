# AWS Deployment Guide for E-commerce Project

## Prerequisites
- AWS Account with billing enabled
- AWS CLI installed and configured
- MongoDB Atlas account (free tier available)

## Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier
   - Create a new cluster

2. **Configure Database**
   - Cluster Name: `electronics-ecommerce`
   - Region: Choose closest to your users
   - Tier: M0 Sandbox (Free)

3. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

## Step 2: Backend Deployment (AWS Elastic Beanstalk)

1. **Build the Application**
   ```bash
   cd backend
   mvn clean package -DskipTests
   ```

2. **Create Elastic Beanstalk Application**
   - Go to AWS Elastic Beanstalk console
   - Click "Create Application"
   - Application name: `electronics-ecommerce-backend`
   - Platform: Java 21 (Corretto)
   - Upload your JAR file from `target/` folder

3. **Configure Environment Variables**
   - In EB console, go to Configuration → Software
   - Add environment properties:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string (64+ characters)
     - `CORS_ORIGINS`: Your frontend domain

4. **Deploy**
   - Click "Create Environment"
   - Wait for deployment (5-10 minutes)
   - Note the environment URL (e.g., `http://your-app.elasticbeanstalk.com`)

## Step 3: Frontend Deployment (AWS S3 + CloudFront)

1. **Update Environment Variables**
   - Edit `frontend/.env.production`
   - Set `REACT_APP_API_BASE_URL` to your backend URL

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Create S3 Bucket**
   - Go to AWS S3 console
   - Create bucket: `your-app-frontend` (must be globally unique)
   - Enable static website hosting
   - Set index document: `index.html`
   - Set error document: `index.html`

4. **Upload Files**
   - Upload all files from `build/` folder to S3 bucket
   - Make bucket public for website hosting

5. **Create CloudFront Distribution**
   - Go to CloudFront console
   - Create distribution
   - Origin: Your S3 bucket website endpoint
   - Default root object: `index.html`
   - Custom error pages: 404 → `/index.html` (for React routing)

## Step 4: Configure CORS and Security

1. **Update Backend CORS**
   - Add your CloudFront domain to `CORS_ORIGINS` environment variable
   - Redeploy backend if needed

2. **Security Headers**
   - Configure CloudFront to add security headers
   - Enable HTTPS only

## Step 5: Testing

1. **Test Backend**
   - Visit `https://your-backend.elasticbeanstalk.com/api/products`
   - Should return JSON response

2. **Test Frontend**
   - Visit your CloudFront domain
   - Test login, add to cart, place order
   - Check browser console for any API errors

## Cost Estimation (Monthly)

- **MongoDB Atlas**: Free (M0 tier)
- **Elastic Beanstalk**: ~$15-25 (t3.micro instance)
- **S3**: ~$1-3 (depending on traffic)
- **CloudFront**: ~$1-5 (first 1TB free)
- **Total**: ~$17-33/month

## Scaling Options

- **Auto Scaling**: Configure EB to scale based on CPU/memory
- **Load Balancer**: Automatically included with EB
- **CDN**: CloudFront provides global caching
- **Database**: Upgrade MongoDB Atlas tier as needed

## Monitoring

- **CloudWatch**: Monitor application logs and metrics
- **Elastic Beanstalk Health**: Built-in health monitoring
- **MongoDB Atlas**: Database performance monitoring

## Backup Strategy

- **Database**: MongoDB Atlas automatic backups
- **Code**: Git repository
- **Static Assets**: S3 versioning enabled
