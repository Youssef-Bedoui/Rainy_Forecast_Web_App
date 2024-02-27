import React, { useRef, useEffect } from "react";
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
  const forecastRef = useRef(null);

  const handleClick = () => {
    onClick(index);
    const clickedDay = document.querySelector(".clicked-day");
    if (clickedDay) {
      clickedDay.classList.remove("clicked-day");
    }

    forecastRef.current.classList.add("clicked-day");
  };

  useEffect(() => {
    if (index === 0 && forecastRef.current) {
      forecastRef.current.classList.add("clicked-day");
    }
  }, []);

  return (
    <div
      ref={forecastRef}
      onClick={handleClick}
      className="forecast_card col-md-2 pt-1 text-center"
    >
      <h3 className="day">{day}</h3>
      <div className="weather-info">
        <img src={icon} alt={weather} />
        <div className="temperature">
          <span className="min_temp">
            {minTemp} {t("c")}
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
