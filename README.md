# Weather App

A modern, responsive weather application built with React and Vite, featuring real-time weather forecasts and interactive hourly charts.

## Features

- **Real-time Weather Data**: Current weather conditions with temperature, humidity, and wind speed
- **3-Day Forecast**: Extended forecast with daily weather predictions
- **Hourly Forecast**: Detailed hourly weather breakdown for today
- **Interactive Charts**: Hover over forecast cards to view gradient-based hourly temperature charts
- **Theme Support**: Automatic day/night theme switching based on local conditions
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Dynamic Weather Icons**: Icons that change based on actual weather conditions (sunny, cloudy, rainy, snow)

## Tech Stack

### Frontend
- **React** 18+ with Hooks
- **Vite** - Fast build tool and dev server
- **Recharts** - Interactive chart library for data visualization
- **CSS** - Theme system with CSS custom properties

### Backend
- **Node.js** with Express
- **Weather API** - Third-party weather data provider
- **CORS** - Cross-Origin Resource Sharing for secure API access
- **dotenv** - Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Weather API key from [weatherapi.com](https://www.weatherapi.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Add your Weather API key:

```env
API_KEY=your_api_key_from_weatherapi_com
PORT=5000
```

### 3. Setup Frontend

```bash
cd ../front-end
npm install
```

## Development

### Start Backend Server

```bash
cd server
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server

In a new terminal:

```bash
cd front-end
npm run dev
```

The frontend will run on `http://localhost:5173`

Visit `http://localhost:5173` in your browser to use the app.

## Production Build

### Build Frontend

```bash
cd front-end
npm run build
```

The optimized build will be created in the `front-end/dist` directory.

### Build Backend

The backend is ready to run as-is:

```bash
cd server
npm start
```

## Deployment

### Frontend Deployment Options

#### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and select your repository
4. Vercel will auto-detect Vite settings
5. Deploy with one click

#### Option 2: Netlify
1. Push your code to GitHub
2. Visit [netlify.com](https://www.netlify.com) and sign up
3. Click "New site from Git" and select your repository
4. Set build command: `cd front-end && npm run build`
5. Set publish directory: `front-end/dist`

#### Option 3: GitHub Pages
1. Update `vite.config.js` base to `/weather-app/`
2. Run `npm run build`
3. Push the `dist` folder to GitHub Pages

### Backend Deployment Options

#### Option 1: Railway
1. Push your code to GitHub
2. Visit [railway.app](https://railway.app) and sign up
3. Create a new project and connect your GitHub repo
4. Add environment variables (API_KEY)
5. Deploy

#### Option 2: Render
1. Visit [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variable API_KEY
7. Deploy

#### Option 3: Heroku
1. Install Heroku CLI
2. Run `heroku login`
3. Create Procfile in server directory
4. Push to Heroku

## Environment Variables

### Backend (.env)
```env
API_KEY=your_weatherapi_com_key
PORT=5000
```

### Frontend (if needed)
Create `.env.local` in `front-end` directory:
```env
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
weather-app/
├── front-end/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.js          # API integration
│   │   ├── weatherVisuals.js # Weather utilities
│   │   └── App.jsx         # Main component
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend server
│   ├── index.js            # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── README.md
```

## API Integration

The app uses Weather API (weatherapi.com) for weather data. The backend acts as a proxy server to:
- Keep API keys secure
- Handle CORS requests
- Cache data if needed

## Performance

- Frontend optimizations with Vite and React code splitting
- Lazy loading of components
- CSS-in-JS with efficient theme system
- Memoized chart calculations for performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Key Errors
- Verify your API key is valid at weatherapi.com
- Check that `.env` file is in the server directory
- Ensure server is running on `http://localhost:5000`

### CORS Errors
- Backend CORS is configured to accept frontend requests
- Ensure backend is running before starting frontend

### Weather Data Not Loading
- Check browser console for errors
- Verify internet connection
- Check that city name is valid

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: your-email@example.com

## Acknowledgments

- Weather data provided by [weatherapi.com](https://www.weatherapi.com/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Charts powered by [Recharts](https://recharts.org/)
