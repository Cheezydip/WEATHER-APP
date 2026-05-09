import { getWeatherIconComponent, getWeatherPicture } from '../weatherVisuals';

const CurrentWeather = ({ data, location }) => {
	if (!data || !location) return null;

	const conditionText = data.condition?.text || 'Weather';
	const isDay = data.is_day === 1;
	const WeatherIcon = getWeatherIconComponent(conditionText, isDay);
	const weatherPicture = getWeatherPicture(conditionText, isDay);

	return (
		<section className="current-weather">
			<div className="weather-picture-wrap">
				<img className="weather-picture" src={weatherPicture} alt={`${conditionText} illustration`} />
			</div>
			<h2>
				{location.name}, {location.country}
			</h2>
			<p className="local-time">{location.localtime}</p>
			<div className="current-main">
				<div className="current-icon" aria-hidden="true">
					<WeatherIcon />
				</div>
				<h1>{Math.round(data.temp_c)}°C</h1>
			</div>
			<p>{conditionText}</p>
			<p>
				Min: {Math.round(data.mintemp_c)}°C | Max: {Math.round(data.maxtemp_c)}°C
			</p>
			<p>Humidity: {data.humidity}% | Wind: {data.wind_kph} kph</p>
		</section>
	);
};
export default CurrentWeather;
