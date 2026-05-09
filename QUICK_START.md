# Quick Start Guide for GitHub Upload

## Prerequisites
- Git installed and configured
- GitHub account created
- Weather API key from weatherapi.com

## One-Time Setup

### 1. Check if git is configured
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@github.com"
```

### 2. Create repository on GitHub
- Go to https://github.com/new
- Name it: `weather-app`
- Keep other defaults
- Click "Create repository"

### 3. Connect local repo to GitHub
```bash
cd "c:\Users\Rupayan Saha\Desktop\Web Dev\WEATHER APP"
git remote add origin https://github.com/YOUR_USERNAME/weather-app.git
git branch -M main
git push -u origin main
```

## After Each Update

When you make changes and want to upload:

```bash
cd "c:\Users\Rupayan Saha\Desktop\Web Dev\WEATHER APP"
git add .
git commit -m "Describe your changes here"
git push origin main
```

## Deploy Frontend (Choose One)

### Vercel (Easiest - Recommended)
1. Visit https://vercel.com
2. Sign up with GitHub
3. Click "Import Project" → Select weather-app
4. Click "Deploy"
5. Done! Frontend automatically live

### Netlify
1. Visit https://netlify.com
2. Click "Connect" → Choose weather-app repo
3. Build command: `cd front-end && npm run build`
4. Publish: `front-end/dist`
5. Click "Deploy"

## Deploy Backend (Choose One)

### Railway (Easiest - Recommended)
1. Visit https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select weather-app
4. Add env var: `API_KEY=your_weatherapi_key`
5. Done! Auto-deployed

### Render
1. Visit https://render.com
2. Create new Web Service
3. Select weather-app repository
4. Build: `npm install`
5. Start: `cd server && npm start`
6. Add env var: `API_KEY=your_weatherapi_key`
7. Deploy

## Connect Frontend to Backend

After deploying backend, update frontend:

### Edit front-end/.env.production
```
VITE_API_URL=https://your-railway-backend-url
```

### Or in your API code
```javascript
const API_URL = 'https://your-deployed-backend-url';
```

Then redeploy frontend.

## Verify Everything Works
1. Visit your deployed frontend URL
2. Search for a city
3. Check weather data loads correctly
4. Test all features

Done! Your weather app is now online! 🎉
