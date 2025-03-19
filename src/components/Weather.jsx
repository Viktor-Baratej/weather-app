import s from "./Weather.module.css";
import Skycons from "react-skycons";

// Функція для конвертації OpenWeatherMap кодів у Skycons
const getSkyconType = (weatherCode) => {
  const weatherMap = {
    "01d": "CLEAR_DAY",
    "01n": "CLEAR_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "03d": "CLOUDY",
    "03n": "CLOUDY",
    "04d": "CLOUDY",
    "04n": "CLOUDY",
    "09d": "RAIN",
    "09n": "RAIN",
    "10d": "RAIN",
    "10n": "RAIN",
    "11d": "SLEET",
    "11n": "SLEET",
    "13d": "SNOW",
    "13n": "SNOW",
    "50d": "FOG",
    "50n": "FOG",
  };
  return weatherMap[weatherCode] || "CLEAR_DAY";
};

export default function Weather({ weather, forecast }) {
  if (!weather || !forecast) {
    return <p className={s.error}>❌ Помилка: Дані не завантажені.</p>;
  }

  // Основні дані погоди
  const temp = Math.round(weather.main?.temp);
  const tempMax = Math.round(weather.main?.temp_max);
  const tempMin = Math.round(weather.main?.temp_min);
  const city = weather.name;
  const country = weather.sys?.country;
  const weatherCode = weather.weather?.[0]?.icon || "01d";
  const skyconType = getSkyconType(weatherCode);

  // Форматування дати
  const days = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const today = new Date();
  const formattedDate = `${days[today.getDay()]}, ${today.toLocaleDateString(
    "uk-UA",
    { day: "numeric", month: "long" }
  )}`;

  // Прогноз на 6 днів
  const dailyForecast = forecast.list
    .filter((_, index) => index % 8 === 0)
    .slice(1, 7) // Пропускаємо поточний день
    .map((item) => ({
      day: days[new Date(item.dt * 1000).getDay()],
      temp_max: Math.round(item.main.temp_max),
      temp_min: Math.round(item.main.temp_min),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      skyconType: getSkyconType(item.weather[0].icon),
    }));

  return (
    <div className={`${s.weatherWidget} ${s.fadeIn}`}>
      {/* Блок поточної погоди */}
      <div className={s.currentWeather}>
        <div className={s.mainInfo}>
          <Skycons color="white" type={skyconType} animate={true} size={80} />

          <div>
            <h1>{temp}°C</h1>
            <p>
              H: {tempMax}° / L: {tempMin}°
            </p>
          </div>
        </div>
        <h2 className={s.city_title}>
          {city}, {country}
        </h2>
        <p className={s.date}>{formattedDate}</p>
      </div>

      {/* Прогноз на тиждень */}
      <div className={s.forecast}>
        {dailyForecast.map((day, index) => (
          <div key={index} className={s.forecastItem}>
            <span>{day.day}</span>
            <Skycons
              color="white"
              type={day.skyconType}
              animate={true}
              size={48}
            />
            <img src={day.icon} alt="Погода" className={s.forecastIcon} />
            <span>
              {day.temp_max}° / {day.temp_min}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
