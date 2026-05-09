import { useState } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { getWeatherIconComponent, getWeatherPicture } from '../weatherVisuals';

const formatHour = (timestamp = '') => timestamp.split(' ')[1]?.slice(0, 5) || '--:--';

const getGradientStops = (points) => {
	if (!points.length) return [];

	const peakIndex = points.reduce((bestIndex, point, index, array) => (point.temp > array[bestIndex].temp ? index : bestIndex), 0);
	const dawnIndex = Math.min(5, Math.max(1, Math.floor(points.length * 0.2)));
	const peakOffset = peakIndex / Math.max(points.length - 1, 1);

	return [
		{ offset: '0%', color: '#4f89ff' },
		{ offset: `${Math.round((dawnIndex / Math.max(points.length - 1, 1)) * 100)}%`, color: '#ffe56b' },
		{ offset: `${Math.round(peakOffset * 100)}%`, color: '#ff9a3d' },
		{ offset: '100%', color: '#2e62e6' },
	];
};

const WeeklyHourlyChart = ({ hourData, dayData, theme = 'night' }) => {
	if (!Array.isArray(hourData) || hourData.length === 0) return null;

	const points = hourData.slice(0, 24).map((hour) => ({
		time: formatHour(hour.time),
		temp: Math.round(hour.temp_c),
	}));

	const chartThemes = {
		day: { grid: 'rgba(16, 33, 51, 0.12)', tick: 'rgba(16, 33, 51, 0.82)', tooltipBg: 'rgba(238, 232, 232, 0.8)' },
		night: { grid: 'rgba(255,255,255,0.14)', tick: 'rgba(238,246,255,0.85)', tooltipBg: 'rgba(0, 0, 0, 0.8)' },
	};

	const colors = chartThemes[theme] || chartThemes.night;
	const gradientId = `weeklyGradient-${dayData?.date_epoch || 'default'}`;

	return (
		<div className="weekly-hover-content">
			<div className="weekly-hourly-chart">
				<ResponsiveContainer width="100%" height={120}>
					<LineChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
						<defs>
							<linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
								{getGradientStops(points).map((stop) => (
									<stop key={`${gradientId}-${stop.offset}`} offset={stop.offset} stopColor={stop.color} />
								))}
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
						<XAxis dataKey="time" tick={{ fontSize: 10, fill: colors.tick }} interval={3} />
						<YAxis
							tick={{ fontSize: 10, fill: colors.tick }}
							width={28}
							domain={['dataMin - 2', 'dataMax + 2']}
							allowDecimals={false}
						/>
						<Tooltip
							contentStyle={{ backgroundColor: colors.tooltipBg, border: `1px solid ${colors.grid}`, borderRadius: '6px', fontSize: '12px' }}
							labelStyle={{ color: colors.tick }}
							formatter={(value) => `${value}°C`}
						/>
						<Line type="monotone" dataKey="temp" stroke={`url(#${gradientId})`} dot={false} strokeWidth={2.5} />
					</LineChart>
				</ResponsiveContainer>
			</div>
			{dayData && (
				<div className="weekly-day-details">
					<div className="detail-row">
						<span className="detail-label">Temp:</span>
						<span className="detail-value">{Math.round(dayData.day?.mintemp_c)}°C - {Math.round(dayData.day?.maxtemp_c)}°C</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">Wind:</span>
						<span className="detail-value">{dayData.day?.maxwind_kph.toFixed(1)} kph</span>
					</div>
					<div className="detail-row">
						<span className="detail-label">Pressure:</span>
						<span className="detail-value">{dayData.day?.avgvis_km.toFixed(1)} km</span>
					</div>
				</div>
			)}
		</div>
	);
};

const WeeklyForecast = ({ data, theme = 'night' }) => {
	const [hoveredDay, setHoveredDay] = useState(null);

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
					const isHovered = hoveredDay === day.date_epoch;

					return (
						<article
							key={day.date_epoch}
							className="weekly-item"
							onMouseEnter={() => setHoveredDay(day.date_epoch)}
							onMouseLeave={() => setHoveredDay(null)}
						>
							{isHovered && day.hour ? (
								<WeeklyHourlyChart hourData={day.hour} dayData={day} theme={theme} />
							) : (
								<>
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
								</>
							)}
						</article>
					);
				})}
			</div>
		</section>
	);
};
export default WeeklyForecast;
