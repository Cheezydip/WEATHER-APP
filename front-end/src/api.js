export const fetchWeatherData = async (city) => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${apiBaseUrl}/api/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return response.json();
}