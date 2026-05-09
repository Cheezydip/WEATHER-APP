import { getWeatherIconComponent, getWeatherPicture } from '../weatherVisuals';

const WeeklyForecast = ({ data }) => {
	if (!Array.isArray(data) || data.length === 0) return null;

	const threeDayForecast = data.slice(0, 3);

	return (
		<section className="weekly-forecast">
			<h3>3-Day Forecast</h3>
			<div className="weekly-list">
				{threeDayForecast.map((day) => {
					const conditionText = day.day?.condition?.text || 'Weather';
					const WeatherIcon = getWeatherIconComponent(conditionText, true);
					const weatherPicture = getWeatherPicture(conditionText, true);

					return (
						<article key={day.date_epoch} className="weekly-item">
							<div className="weekly-picture-wrap">
								<img className="weekly-picture" src={weatherPicture} alt={`${conditionText} illustration`} />
							</div>
							<p className="weekly-date">{day.date}</p>
							<div className="weekly-icon" aria-hidden="true">
								<WeatherIcon />
							</div>
							<p>{conditionText}</p>
							<p>
								{Math.round(day.day?.mintemp_c)}°C / {Math.round(day.day?.maxtemp_c)}°C
							</p>
						</article>
					);
				})}
			</div>
		</section>
	);
};
export default WeeklyForecast;
