import React, { useEffect, useState, useRef } from "react";
import "./hourlyForecast.css";
import Moment from "moment";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import precip_icon from "../../assets/icons/icons8-heavy-rain-50.png";
import time from "../../assets/icons/time.png";
import cond from "../../assets/icons/cond.png";
import temp from "../../assets/icons/temp.png";
import wind from "../../assets/icons/wind.png";
import precip from "../../assets/icons/rain.png";
import press from "../../assets/icons/press.png";

function HourlyForecast({ hourlyData, dayIndex }) {
  const [filteredData, setFilteredData] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0); // Track scroll position
  const currentHourRef = useRef(null);
  const hourlyContainerRef = useRef(null); // Create a ref for the hourly container

  useEffect(() => {
    // Filter the hourly data for the current day
    const filteredData = hourlyData.filter((hour) => {
      const hourValue = Moment(hour.time).format("HH");
      return dayIndex === 0 || hourValue >= "00"; // Include all hours if it's the current day
    });

    setFilteredData(filteredData);
  }, [hourlyData, dayIndex]);

  const isCurrentHour = (hour) => {
    const currentHour = Moment().format("HH");
    const currentDay = Moment().format("ddd");
    return (
      Moment(hour.time).format("HH") === currentHour &&
      Moment(hour.time).format("ddd") === currentDay
    );
  };

  useEffect(() => {
    if (currentHourRef.current) {
      currentHourRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [filteredData]);

  return (
    <div className="position-relative">
      <div className="hourly_header flex-row d-flex justify-content-around align-items-center text-center">
        <div className="header_item">
          <img className="header_icon" src={time} alt="Time" />
        </div>
        <div className="header_item">
          <img className="header_icon" src={cond} alt="Condition" />
        </div>
        <div className="header_item">
          <img className="header_icon" src={temp} alt="Temperature" />
        </div>
        <div className="header_item">
          <img className="header_icon" src={wind} alt="Wind" />
        </div>
        <div className="header_item">
          <img className="header_icon" src={precip} alt="Precipitations" />
        </div>
        <div className="header_item">
          <img className="header_icon" src={press} alt="Pressure" />
        </div>
      </div>
      <div
        className="hourly_container flex-column d-flex justify-content-start align-items-start"
        ref={hourlyContainerRef} // Attach the ref to the hourly container
      >
        {filteredData?.map((hour, index) => (
          <div
            className={`hour_card d-flex justify-content-around align-items-center mx-3 ${
              isCurrentHour(hour) && "current_hour"
            }`}
            ref={isCurrentHour(hour) ? currentHourRef : null}
            key={index}
          >
            <h6 className="hour_time">{Moment(hour.time).format("HH:mm")}</h6>
            <img
              className="hour_icon"
              src={hour.condition.icon}
              alt={hour.condition.text}
            />
            <h6 className="hour_temp">{hour.temp_c} °C</h6>
            <h6 className="hour_temp">
              {hour.wind_kph} {hour.wind_dir}
            </h6>
            <h6 className="precip">
              {" "}
              {hour.will_it_rain && (
                <img className="precip_icon" alt="rain" src={precip_icon} />
              )}
              {hour.chance_of_rain} %
            </h6>
            <h6>{hour.pressure_mb} mb</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
