import { useState, useEffect } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import ForecastChart from "./components/ForecastChart";
import { getWeather, getForecast } from "./services/weatherApi";
import "./index.css";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");

    if (!city || city.trim() === "") {
      setError("❌ Введіть назву міста!");
      setLoading(false);
      return;
    }

    const weather = await getWeather(city);
    const forecast = await getForecast(city);

    if (weather && forecast) {
      setWeatherData(weather);
      setForecastData(forecast);
      localStorage.setItem("lastCity", city);
    } else {
      setError("❌ Місто не знайдено!");
      setWeatherData(null);
      setForecastData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) handleSearch(lastCity);
  }, []);

  return (
    <div className="app_container">
      <h1>🌤️ Погода</h1>
      <Search onSearch={handleSearch} />
      {loading && <p>⏳ Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && forecastData ? (
        <>
          <Weather weather={weatherData} forecast={forecastData} />
          <ForecastChart forecast={forecastData} />
        </>
      ) : (
        <p className="error">❌ Дані не завантажені.</p>
      )}
    </div>
  );
}
