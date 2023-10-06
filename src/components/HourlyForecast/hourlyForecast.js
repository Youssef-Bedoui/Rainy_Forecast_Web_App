import React, { useEffect, useState, useRef } from "react";
import "./hourlyForecast.css";
import Moment from "moment";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

function HourlyForecast({ hourlyData, dayIndex }) {
  const [filteredData, setFilteredData] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0); // Track scroll position
  const currentHourRef = useRef(null);

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

const handleScrollLeft = () => {
  const container = document.querySelector(".hourly_container");
  if (container) {
    container.scrollTo({
      left: container.scrollLeft - 100, // Scroll left by 100px
      behavior: "smooth", // Add smooth scrolling behavior
    });
    setScrollLeft(container.scrollLeft);
  }
};

const handleScrollRight = () => {
  const container = document.querySelector(".hourly_container");
  if (container) {
    container.scrollTo({
      left: container.scrollLeft + 100, // Scroll right by 100px
      behavior: "smooth", // Add smooth scrolling behavior
    });
    setScrollLeft(container.scrollLeft);
  }
};


  return (
    <div className="position-relative">
      <ArrowCircleLeftOutlinedIcon
        className="leftArrow"
        onClick={handleScrollLeft}
      />
      <div className="hourly_container d-flex justify-content-center align-items-center overflow-scroll">
        {filteredData?.map((hour, index) => (
          <div
            className={`hour_card d-flex flex-column justify-content-center align-items-center mx-3 ${
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
            <h6 className="hour_temp">{hour.temp_c}</h6>
          </div>
        ))}
      </div>
      <ArrowCircleRightOutlinedIcon
        className="rightArrow"
        onClick={handleScrollRight}
      />
    </div>
  );
}

export default HourlyForecast;
