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
import axios from "axios";

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
  const [isError, setIsError] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connecProb, setIsConnecProb] = useState(navigator.onLine);

  const searchCity = useCallback(
    async (city) => {
      try {
        setLoading(true);
        setIsError(false);

        const response = await api.get(
          `forecast.json?&key=${config.API_KEY}&q=${city}&days=3&lang=${i18n.resolvedLanguage}`
        );
        const responseData = response.data;

        if (responseData) {
          setLoading(false);
          setData(responseData.forecast.forecastday);
          setHourlyData(
            responseData.forecast.forecastday.map((day) => day.hour)
          );
          setSelectedHourlyData(responseData.forecast.forecastday[0]?.hour);
          setTemp(responseData.current.temp_c);
          setError(null);
          setCity(responseData.location.name);
          localStorage.setItem("lastCity", responseData.location.name);
        } else {
          setLoading(false);
          setData([]);
          setTemp([]);
          setError("error");
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setIsError(true);
        setIsConnecProb(true);
      }
    },
    [i18n.resolvedLanguage]
  );

  const fetchUserCity = useCallback(async () => {
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
          setLoading(false);
        }
      } else if (savedCity) {
        setCity(savedCity);
        searchCity(savedCity);
        setLoading(false);
      } else {
        axios
          .get("https://ipinfo.io/json")
          .then((response) => {
            const { city } = response.data;
            setCity(city);
            localStorage.setItem("lastCity", city);
          })
          .catch((error) => {
            console.error("Error fetching city based on IP:", error);
          });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user city:", error);
      setError("Error fetching user city !");
      setIsError(true);
      setLoading(false);
    }
  }, [searchCity]);
useEffect(() => {
  Moment.locale("en");

  fetchUserCity();
}, [fetchUserCity, i18n.resolvedLanguage, searchCity]);

useEffect(() => {
  function onlineHandler() {
    setIsOnline(true);
    setLoading(false);
    setIsError(false);
    setError(null);
    setIsConnecProb(false);
    fetchUserCity();
  }

  function offlineHandler() {
    setIsOnline(false);
    setLoading(false);
    setIsError(true);
    setError("No Connection");
    setIsConnecProb(true);
  }

  window.addEventListener("online", onlineHandler);
  window.addEventListener("offline", offlineHandler);

  return () => {
    window.removeEventListener("online", onlineHandler);
    window.removeEventListener("offline", offlineHandler);
  };
}, [data.length, fetchUserCity, isError]);

  useEffect(() => {
    if (city) {
      searchCity(city);
    }
  }, [city, searchCity]);

  const date = data.map((el) =>
    Moment(el.date)
      .locale(
        moment.locale(
          localStorage.getItem("i18nextLng") === "ar" ? "ar-tn" : "en"
        )
      )
      .format("dddd DD")
  );
  const weather = data.map((el) => el.day.condition.text);
  const minTemp = data.map((el) => parseInt(el.day.mintemp_c));
  const maxTemp = data.map((el) => parseInt(el.day.maxtemp_c));
  const icon = data.map((el) => el.day.condition.icon);

  const getHourlyForecast = (index) => {
    setDayIndex(index);
    setSelectedHourlyData(hourlyData[index]);
  };

  return (
    <div className="App">
      <Navbar city={city} searchCity={searchCity} />
      { loading ? (
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
            <div className="container-fluid">
              <div className="row m-0">
                <div className="day_forecast d-flex justify-content-around align-items-center">
                  {date.map((day, index) => (
                    <WeatherForecast
                      onClick={getHourlyForecast}
                      index={index}
                      day={day}
                      icon={icon[index]}
                      minTemp={minTemp[index]}
                      maxTemp={maxTemp[index]}
                      weather={weather[index]}
                      key={index}
                    />
                  ))}
                </div>
              </div>
              <div className="row">
                {data.length ? (
                  <HourlyForecast
                    hourlyData={selectedHourlyData}
                    dayIndex={dayIndex}
                  />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress size={30} color="info" />
                  </Box>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
