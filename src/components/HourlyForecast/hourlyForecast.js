import React, { useEffect, useState, useRef } from "react";
import "./hourlyForecast.css";
import Moment from "moment";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

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

  const handleScrollLeft = () => {
    if (hourlyContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        hourlyContainerRef.current;
      const newScrollLeft = scrollLeft - clientWidth;
      hourlyContainerRef.current.scrollTo({
        left: newScrollLeft > 0 ? newScrollLeft : 0, // Ensure scrollLeft is not less than 0
        behavior: "smooth",
      });
      setScrollLeft(newScrollLeft);
    }
  };

  const handleScrollRight = () => {
    if (hourlyContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        hourlyContainerRef.current;
      const newScrollLeft = scrollLeft + clientWidth;
      hourlyContainerRef.current.scrollTo({
        left:
          newScrollLeft < scrollWidth - clientWidth
            ? newScrollLeft
            : scrollWidth - clientWidth, // Ensure scrollLeft is not greater than scrollWidth - clientWidth
        behavior: "smooth",
      });
      setScrollLeft(newScrollLeft);
    }
  };

  return (
    <div className="position-relative">
      <ArrowCircleLeftOutlinedIcon
        className="leftArrow"
        onClick={handleScrollLeft}
      />
      <div
        className="hourly_container d-flex justify-content-center align-items-center overflow-scroll"
        ref={hourlyContainerRef} // Attach the ref to the hourly container
      >
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
