
import { useEffect, useState } from 'react';
import './App.css'
import { fetchWeatherData } from './api';

function App() {
  const[city, setCity] = useState('kolkata');
  const[weatherData, setWeatherData] = useState(null);
  const[loading,setloading]= useState(false);
  const[error,setError] = useState('');

 useEffect(()=>{
  const fetchweather=async()=>{
    setloading(true);
    setError('');
    try {
      //fetch weather data from API
      const data= fetchWeatherData(city);
      
      const{mintemp_c, maxtemp_c}= data.forecast.forecastday[0].day;
      setWeatherData(
        {
          current:{...data.current, mintemp_c, maxtemp_c},
          hourly:data.forecast.forecastday[0].day,//from current day array
          weekly:data.forecast.forecastday.slice(1),//from next day array
          location:data.location
        }
      );
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setloading(false);
    }
  };
  fetchweather();
 },[city])
  return(
    <div className={app}>
      <div className="container">
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData&&(
          <>
            <CurrentWeather  data={weatherData.current}  
            location={weatherData.location} />
            <HourlyForecast  data={weatherData.hourly} />
            <WeeklyForecast  data={weatherData.weekly} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
