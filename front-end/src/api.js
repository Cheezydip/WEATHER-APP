export const fetchWeatherData = async (city) => {
    const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return response.json();
}