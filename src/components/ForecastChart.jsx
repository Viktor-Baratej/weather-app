import s from "./ForecastChart.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ForecastChart({ forecast }) {
  if (!forecast) return null;

  // Отримуємо прогноз на 5 днів (кожен 8-й запис)
  const dailyData = forecast.list.filter((_, index) => index % 8 === 0);

  const labels = dailyData.map((item) =>
    new Date(item.dt * 1000).toLocaleDateString("uk-UA", { weekday: "short" })
  );

  const temperatures = dailyData.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Температура (°C)",
        data: temperatures,
        backgroundColor: temperatures.map((temp) =>
          temp >= 20
            ? "rgba(255, 99, 132, 0.6)"
            : temp >= 10
            ? "rgba(255, 206, 86, 0.6)"
            : "rgba(54, 162, 235, 0.6)"
        ),
        borderColor: temperatures.map((temp) =>
          temp >= 20
            ? "rgba(255, 99, 132, 1)"
            : temp >= 10
            ? "rgba(255, 206, 86, 1)"
            : "rgba(54, 162, 235, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.raw}°C`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { callback: (value) => `${value}°C` },
      },
    },
    animation: {
      duration: 800,
      easing: "easeInOutQuart",
    },
  };

  return (
    <div className={s.chartContainer}>
      <h3 className={s.chartTitle}>Прогноз на 5 днів</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
