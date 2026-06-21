type WeatherInfo = {
  temperature: string;
  condition: string;
  humidity?: string;
  windSpeed?: string;
};

// Simple mock weather data per destination
const mockWeather: Record<string, WeatherInfo> = {
  paris: { temperature: '18°C', condition: 'Partly Cloudy' },
  dubai: { temperature: '35°C', condition: 'Sunny' },
};

export const getWeatherByDestination = async (destId: string): Promise<WeatherInfo> => {
  // In a real implementation you would call a weather API (e.g., OpenWeatherMap)
  // Here we just return a static mock based on destId
  return mockWeather[destId] || { temperature: 'N/A', condition: 'Unknown' };
};
