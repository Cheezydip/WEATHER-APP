
import { useEffect, useState } from 'react';
import './App.css'
import { fetchWeatherData } from './api';
import SearchBar from './components/searchbar';
import CurrentWeather from './components/currentweather';
import WeeklyForecast from './components/weeklyforecast';
import HourlyForecast from './components/hourlyforecast';

function App() {
  const [city, setCity] = useState('kolkata');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = weatherData?.current?.is_day === 1 ? 'day' : 'night';

  const handleSearch = (searchedCity) => {
    const normalizedCity = searchedCity?.trim();
    if (!normalizedCity) return;
    setCity(normalizedCity);
  };

  useEffect(() => {
    const fetchweather = async () => {
      setLoading(true);
      setError('');
      setWeatherData(null);
      try {
        const data = await fetchWeatherData(city);
        const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day;
        setWeatherData({
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(0, 3),
          location: data.location,
        });
      } catch (err) {
        setError(err?.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchweather();
  }, [city]);

  return (
    <div className={`app theme-${theme}`}>
      <div className="container">
        <div className="bento-panel bento-search">
          <SearchBar onSearch={handleSearch} currentCity={city} />
        </div>

        {loading && <p className="status loading">Loading...</p>}
        {error && <p className="status error">{error}</p>}

        {weatherData && (
          <div className="weather-bento">
            <div className="bento-panel bento-current">
              <CurrentWeather data={weatherData.current} location={weatherData.location} />
            </div>

            <div className="bento-panel bento-hourly">
              <HourlyForecast data={weatherData.hourly} theme={theme} />
            </div>

            <div className="bento-panel bento-weekly">
              <WeeklyForecast data={weatherData.weekly} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
