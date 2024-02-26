import React, { useState } from "react";
import "./weatherForeact.css";
import { useTranslation } from "react-i18next";

const WeatherForecast = ({
  onClick,
  index,
  day,
  icon,
  minTemp,
  maxTemp,
  weather,
}) => {
  const { t } = useTranslation();

  // State to track the index of the currently clicked day
  const [clickedIndex, setClickedIndex] = useState(0);

  const handleClick = () => {
    onClick(index);

    // Check if the clicked day is the same as the previously clicked day
    if (index === clickedIndex) {
      // If it's the same, unselect it by setting clickedIndex to null
      setClickedIndex(null);
    } else {
      // If it's different, update clickedIndex with the new index
      setClickedIndex(index);
    }
  };

  // Define the CSS classes based on the clicked state
  const forecastCardClasses = `forecast_card col-md-2 pt-1 text-center ${
    index === clickedIndex ? "clicked-day" : ""
  }`;

  return (
    <div onClick={handleClick} className={forecastCardClasses}>
      <h3 className="day">{day}</h3>
      <div className="weather-info">
        <img src={icon} alt={weather} />
        <div className="temperature">
          <span className="min_temp">
            {minTemp}
            {t("c")}
          </span>{" "}
          <span className="max_temp">
            / {maxTemp} {t("c")}
          </span>
        </div>
      </div>
      <p className="weather_desc">{weather}</p>
    </div>
  );
};

export default WeatherForecast;
