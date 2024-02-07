import React, { useState, useEffect, useCallback } from "react";
import Moment from "moment";
import "./App.css";
import api from "./api/weatherApi";
import config from "./config.json";
import Error from "./components/Error/error";
import WeatherForecast from "./components/WeatherForecast/weatherForecast";
import CurrentWeather from "./components/currentWeather/currentWeather";
import Navbar from "./components/Navbar/navbar";
import HourlyForecast from "./components/HourlyForecast/hourlyForecast";
import Footer from "./components/Footer/footer";
import { useTranslation } from "react-i18next";
import "moment/locale/ar-tn";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App() {
  const { i18n } = useTranslation();

  const [data, setData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedHourlyData, setSelectedHourlyData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [city, setCity] = useState(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  const searchCity = useCallback(async (city) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        `forecast.json?&key=${config.API_KEY}&q=${city}&days=3&lang=${i18n.resolvedLanguage}`
      );
      const responseData = response.data;

      if (responseData) {
        setLoading(false);
        setData(responseData.forecast.forecastday);
        setHourlyData(responseData.forecast.forecastday.map((day) => day.hour));
        setSelectedHourlyData(responseData.forecast.forecastday[0]?.hour);
        setTemp(responseData.current.temp_c);
        setCity(responseData.location.name);
        localStorage.setItem("lastCity", responseData.location.name);
      } else {
        setLoading(false);
        setData([]);
        setTemp([]);
        setError("No data found.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Error fetching data.");
    }
  }, [i18n.resolvedLanguage]);

  const fetchUserCity = useCallback(async () => {
    setLoadingTimedOut(false);
    try {
      let savedCity = localStorage.getItem("lastCity");

      if (!savedCity && navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${config.OPEN_WEATHER_APP}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { state } = data[0];
          setCity(state);
          searchCity(state);
        }
      } else if (savedCity) {
        setCity(savedCity);
        searchCity(savedCity);
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error fetching user city:", error);
      setError("Error fetching user city!");
    } finally {
      setLoading(false);
    }
  }, [searchCity]);

  useEffect(() => {
    Moment.locale("en");
    fetchUserCity();
  }, [fetchUserCity]);

  const getHourlyForecast = (index) => {
    setDayIndex(index);
    setSelectedHourlyData(hourlyData[index]);
  };

  return (
    <div className="App">
      <Navbar city={city} searchCity={searchCity} />
      {loadingTimedOut ? (
        <Error error="Loading timed out" />
      ) : loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 90px)"
        >
          <CircularProgress size={60} color="info" />
        </Box>
      ) : (
        <div>
          <CurrentWeather city={city} temp={temp} />
          <div className="forecast_container">
            <div className="day_forecast">
              {data.map((day, index) => (
                <WeatherForecast
                  onClick={getHourlyForecast}
                  index={index}
                  day={Moment(day.date)
                    .locale(moment.locale(localStorage.getItem("i18nextLng") === "ar" ? "ar-tn" : "en"))
                    .format("dddd DD")}
                  icon={day.day.condition.icon}
                  minTemp={parseInt(day.day.mintemp_c)}
                  maxTemp={parseInt(day.day.maxtemp_c)}
                  weather={day.day.condition.text}
                  key={index}
                />
              ))}
            </div>
            <div className="forecast">
              {data.length ? (
                <HourlyForecast hourlyData={selectedHourlyData} dayIndex={dayIndex} />
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress size={30} color="info" />
                </Box>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
