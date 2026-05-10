# GitHub Upload & Deployment Guide

## Step 1: Prepare Your Local Repository

### 1.1 Clean Up Sensitive Files

First, make sure your `.env` file is NOT committed:

```bash
cd "c:\Users\Rupayan Saha\Desktop\Web Dev\WEATHER APP"
git status
```

You should see `.env` is untracked (not in git). If it was previously committed, remove it:

```bash
git rm --cached server/.env
git commit -m "Remove .env file from tracking"
```

### 1.2 Verify .gitignore Files

Both `.gitignore` files are now in place:
- Root `.gitignore` - ignores node_modules, build artifacts
- `server/.gitignore` - ignores .env and sensitive files

## Step 2: Create GitHub Repository

### 2.1 Create Repository on GitHub

1. Go to [github.com](https://github.com) and log in
2. Click **"+"** → **"New repository"**
3. Configure settings:
   - **Repository name**: `weather-app` (or your preferred name)
   - **Description**: `A modern weather application with React, Vite, and interactive charts`
   - **Public/Private**: Choose based on your preference
   - **Initialize repository**: Leave unchecked (we have local repo)
   - **Add .gitignore**: Already done locally
   - **Choose a license**: MIT (or your preference)

4. Click **"Create repository"**

### 2.2 Add Remote and Push Code

After creating the repository, GitHub will show commands. Follow these:

```bash
# Navigate to your project
cd "c:\Users\Rupayan Saha\Desktop\Web Dev\WEATHER APP"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/weather-app.git

# Verify remote is added
git remote -v

# Push code to GitHub (first time)
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your GitHub username.

### 2.3 Verify on GitHub

Visit `https://github.com/YOUR_USERNAME/weather-app` to verify all files are uploaded:
- ✅ `front-end/` directory
- ✅ `server/` directory  
- ✅ `README.md`
- ✅ `LICENSE`
- ✅ `.gitignore` (root and server)
- ✅ ❌ `.env` should NOT be visible (good!)
- ✅ ❌ `node_modules/` should NOT be visible (good!)

## Step 3: Deploy Frontend

### Option A: Vercel (Recommended - Easiest)

**Pros**: Seamless React/Vite support, auto-deployment on push, free tier generous

1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"New Project"**
4. Select your `weather-app` repository
5. Vercel auto-detects Vite settings (no config needed)
6. Click **"Deploy"**
7. Your frontend will be live at: `https://weather-app.vercel.app`

**Auto-Redeployment**: Every push to `main` branch automatically redeploys

### Option B: Netlify

**Pros**: Generous free tier, easy setup, good serverless functions support

1. Visit [netlify.com](https://www.netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your repository
5. Configure build:
   - **Build command**: `cd front-end && npm run build`
   - **Publish directory**: `front-end/dist`
6. Click **"Deploy site"**
7. Your frontend will be live at: `https://your-site.netlify.app`

### Option C: GitHub Pages

**Pros**: Free, hosted directly on GitHub, no extra account needed

1. Update `front-end/vite.config.js`:

```javascript
export default {
  base: '/weather-app/',
  plugins: [react()],
}
```

2. Build the project:

```bash
cd front-end
npm run build
```

3. In GitHub, go to **Settings** → **Pages**
4. Select **"Deploy from a branch"**
5. Select **"main"** branch and **`/root`** folder
6. Push the `dist` folder to GitHub
7. Your app will be available at: `https://YOUR_USERNAME.github.io/weather-app/`

## Step 4: Deploy Backend

Choose based on your needs and budget:

### Option A: Railway (Recommended - Simple)

**Pros**: Easy setup, free tier includes $5 monthly credit, great for Node.js

1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Select your `weather-app` repository
6. Railway auto-detects `server/package.json`
7. **Set Environment Variables**:
   - Click **"Add Variable"**
   - Name: `API_KEY`
   - Value: `your_weatherapi_com_key`
   - Click "Add"

8. Railway automatically deploys
9. Your backend URL: Check deployment logs (example: `https://weather-app.railway.app`)

**Configure Frontend**: Update frontend to point to Railway backend:

```javascript
// In front-end/src/api.js or wherever you make API calls
const API_URL = import.meta.env.VITE_API_URL || 'https://your-railway-url';
```

### Option B: Render

**Pros**: Free tier with spinning down after 15 mins of inactivity (acceptable), good Node.js support

1. Visit [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account and select repository
5. Configure:
   - **Name**: `weather-app-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `cd server && npm start`
   - **Branch**: main

6. Add Environment Variables:
   - Click **"Add Environment Variable"**
   - Key: `API_KEY`
   - Value: `your_weatherapi_com_key`

7. Click **"Create Web Service"**
8. Your backend URL will be provided in deployment logs

### Option C: Heroku

**Pros**: Historically popular, good for Node.js, but paid tier required now

**Note**: Heroku free tier was discontinued. Paid tier starts at $7/month.

If you want to use Heroku anyway:

1. Create `Procfile` in `server/` directory:

```
web: npm start
```

2. Push to Heroku:

```bash
heroku create weather-app-backend
heroku config:set API_KEY=your_weatherapi_com_key
git push heroku main
```

## Step 5: Connect Frontend to Backend

After deploying the backend, update your frontend to use the deployed backend URL:

### Frontend Configuration (front-end/src/api.js or main.jsx)

```javascript
// Use environment variable or fallback to local
const API_URL = import.meta.env.VITE_API_URL || 'https://your-deployed-backend-url';

async function fetchWeather(city) {
  const response = await fetch(`${API_URL}/api/weather?city=${city}`);
  return response.json();
}
```

### For Vite - Create `.env.production` in front-end/:

```env
VITE_API_URL=https://your-deployed-backend-url
```

### Update Frontend Deploy with New API URL

If using Vercel:
1. Go to your Vercel project settings
2. Go to **Environment Variables**
3. Add `VITE_API_URL` with your backend URL
4. Redeploy

If using Netlify:
1. Go to Site settings → **Build & Deploy** → **Environment**
2. Add `VITE_API_URL` with your backend URL
3. Redeploy

## Step 6: Testing

### Test Backend Deployment

```bash
curl "https://your-backend-url/api/weather?city=London"
```

Should return JSON weather data.

### Test Frontend Deployment

1. Visit your frontend URL
2. Search for a city
3. Verify weather data loads
4. Test all features (3-day forecast, hourly details, theme switching)

## Step 7: Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Vercel project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### Netlify Custom Domain

1. Go to Site settings
2. Click **"Domain settings"**
3. Add custom domain
4. Update DNS records

## Security Best Practices

✅ **Already Done**:
- `.env` file excluded via `.gitignore`
- API key stored in environment variables
- Backend validates requests
- CORS properly configured

✅ **Recommended**:
- Enable GitHub branch protection (require PR reviews)
- Set up CI/CD pipeline for tests (GitHub Actions)
- Monitor API usage and rate limits
- Use strong GitHub authentication (2FA)
- Keep dependencies updated (`npm audit`, `npm update`)

## Monitoring & Maintenance

### Update Dependencies

```bash
# Check for updates
cd front-end
npm outdated

# Update packages
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

### Monitor Deployment

- **Vercel**: Dashboard shows deployment status
- **Railway**: Dashboard shows logs and health
- **Netlify**: Shows build logs and deployment history

### Rollback Previous Deployment

- **Vercel/Netlify**: Click previous deployment and redeploy
- **Railway**: Select previous version in deployments

## Troubleshooting

### "remote rejected"
```bash
# Make sure all files are tracked
git add .
git commit -m "Add project files"
git push origin main
```

### Backend not connecting from frontend
- Verify backend URL is correct
- Check CORS settings in backend
- Verify API key is set in environment variables
- Check browser console for errors

### Environment variables not working
- Redeploy after adding env vars
- Clear browser cache
- Verify variable names match (case-sensitive)

## Useful Commands

```bash
# Check git status
git status

# View remote
git remote -v

# Pull latest from GitHub
git pull origin main

# Push latest changes
git add .
git commit -m "Your message"
git push origin main

# View deployment logs
# Vercel: Console tab in dashboard
# Railway: Logs section in project
# Netlify: Deploys tab
```

## Quick Reference

| Component | Local | Deployed |
|-----------|-------|----------|
| Frontend Dev | http://localhost:5173 | https://weather-app.vercel.app |
| Backend Dev | http://localhost:5000 | https://weather-app.railway.app |
| GitHub Repo | N/A | https://github.com/YOUR_USERNAME/weather-app |

---

**Congratulations! Your weather app is now public and deployed!** 🎉
