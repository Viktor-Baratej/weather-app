import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const FORECAST_URL = import.meta.env.VITE_FORECAST_URL;

export const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { q: city, units: "metric", lang: "ua", appid: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Помилка отримання погоди:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getForecast = async (city) => {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: { q: city, units: "metric", lang: "ua", appid: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Помилка отримання прогнозу:",
      error.response?.data || error.message
    );
    return null;
  }
};
