import { useState } from "react";
import s from "./Search.module.css";

export default function Search({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className={s.searchContainer}>
      <input
        className={s.searchInput}
        type="text"
        placeholder="Введіть місто..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className={s.searchButton} onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
}
