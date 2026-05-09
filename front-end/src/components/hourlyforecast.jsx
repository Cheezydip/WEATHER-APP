import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { getWeatherIconComponent } from '../weatherVisuals';

const conditionSymbol = (conditionText = '') => {
	const condition = conditionText.toLowerCase();
	if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) return '❄️';
	if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) return '🌧️';
	if (condition.includes('cloud') || condition.includes('mist') || condition.includes('fog') || condition.includes('overcast')) return '☁️';
	if (condition.includes('clear') || condition.includes('sunny')) return '☀️';
	return '⛅';
};

const formatHour = (timestamp = '') => timestamp.split(' ')[1]?.slice(0, 5) || '--:--';

const chartThemes = {
	day: {
		grid: 'rgba(16, 33, 51, 0.12)',
		tick: 'rgba(16, 33, 51, 0.82)',
		line: 'url(#hourlyGradientDay)',
		dotFill: '#ffffff',
		dotStroke: '#ffffff',
		tooltipStroke: 'rgba(47, 118, 201, 0.24)',
		tooltipFill: '#0f2036',
	},
	night: {
		grid: 'rgba(255,255,255,0.14)',
		tick: 'rgba(238,246,255,0.85)',
		line: 'url(#hourlyGradientNight)',
		dotFill: '#ffffff',
		dotStroke: '#ffffff',
		tooltipStroke: 'rgba(159, 228, 255, 0.58)',
		tooltipFill: '#eef6ff',
	},
};

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

const HourlyDot = ({ cx, cy, payload, themeColors }) => {
	if (cx == null || cy == null) return null;

	const WeatherIcon = getWeatherIconComponent(payload.conditionText, payload.isDay);

	return <g transform={`translate(${cx - 15}, ${cy - 34})`} pointerEvents="none"><WeatherIcon size={30} color="#ffffff" /></g>;
};

const HourlyTooltip = ({ active, payload, themeColors }) => {
	if (!active || !payload || payload.length === 0) return null;

	const point = payload[0].payload;
	const WeatherIcon = getWeatherIconComponent(point.conditionText, point.isDay);

	return (
		<div className="hourly-tooltip">
			<p className="tooltip-time">{point.time}</p>
			<div className="tooltip-main">
				<WeatherIcon size={26} color={themeColors.line} />
				<span>{point.temp}°C</span>
			</div>
			<p className="tooltip-condition">{point.conditionText}</p>
		</div>
	);
};

const HourlyForecast = ({ data, theme = 'night' }) => {
	if (!Array.isArray(data) || data.length === 0) return null;

	const themeColors = chartThemes[theme] || chartThemes.night;
	const gradientId = theme === 'day' ? 'hourlyGradientDay' : 'hourlyGradientNight';

	const points = data.slice(0, 24).map((hour) => ({
		time: formatHour(hour.time),
		temp: Math.round(hour.temp_c),
		conditionText: hour.condition?.text || 'Weather',
		conditionIcon: conditionSymbol(hour.condition?.text || ''),
		isDay: hour.is_day === 1,
	}));

	return (
		<section className="hourly-forecast">
			<h3>Hourly Forecast</h3>
			<div className="hourly-chart-wrap">
				<ResponsiveContainer width="100%" height={360}>
					<LineChart data={points} margin={{ top: 46, right: 18, left: 10, bottom: 10 }}>
						<defs>
							<linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
								{getGradientStops(points).map((stop) => (
									<stop key={`${gradientId}-${stop.offset}`} offset={stop.offset} stopColor={stop.color} />
								))}
							</linearGradient>
						</defs>
						<CartesianGrid stroke={themeColors.grid} strokeDasharray="4 4" />
						<XAxis
							dataKey="time"
							tick={{ fill: themeColors.tick, fontSize: 11 }}
							tickLine={false}
							axisLine={false}
							interval={2}
						/>
						<YAxis
							tick={{ fill: themeColors.tick, fontSize: 11 }}
							tickLine={false}
							axisLine={false}
							unit="°"
							width={46}
							padding={{ top: 10, bottom: 8 }}
							allowDecimals={false}
						/>
						<Tooltip
							content={<HourlyTooltip themeColors={themeColors} />}
							cursor={{ stroke: themeColors.tooltipStroke, strokeWidth: 1 }}
						/>
						<Line
							type="monotone"
							dataKey="temp"
							stroke={themeColors.line}
							strokeWidth={3.5}
							dot={<HourlyDot themeColors={themeColors} />}
							activeDot={{ r: 7, fill: themeColors.dotFill, stroke: themeColors.dotStroke, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</section>
	);
};

export default HourlyForecast;
