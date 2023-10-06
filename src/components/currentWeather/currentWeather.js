import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/weatherApi";
import "./currentWeather.css";
import config from "../../config.json";
import feelImg from "../../assets/icons/hot.png";
import precipImg from "../../assets/icons/puddle.png";
import windSpdImg from "../../assets/icons/windmill.png";
import WindDirImg from "../../assets/icons/windsock.png";
import humImg from "../../assets/icons/humidity.png";
import pressImg from "../../assets/icons/pressure.png";
import Moment from "moment";
import { GrFormRefresh } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CurrentWeather = ({ city }) => {
  const { t, i18n } = useTranslation();
  const [icon, setIcon] = useState(null);
  const [temp, setTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [weather, setWeather] = useState(null);
  const [precip, setPrecip] = useState(null);
  const [windSpd, setWindSpd] = useState(null);
  const [windDir, setWindDir] = useState(null);
  const [pression, setPression] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [resreshAlert, setRefreshAlert] = useState(false);

  const getCurrWeather = useCallback(async () => {
    try {
      const response = await api.get(
        `/current.json?key=${config.API_KEY}&q=${city}&lang=${i18n.resolvedLanguage}`
      );
      if (response.data.current) {
        const data = response.data.current;
        setIcon(data.condition.icon);
        setWeather(data.condition.text);
        setTemp(data.temp_c);
        setFeelsLike(data.feelslike_c);
        setPrecip(data.precip_mm);
        setWindSpd(data.wind_kph);
        setWindDir(data.wind_dir);
        setPression(data.pressure_mb);
        setHumidity(data.humidity);
        setLastUpdate(data.last_updated);
      }
    } catch (error) {
      console.log(error);
    }
  }, [city, i18n.resolvedLanguage]);

  const handleAlertSuccess = () => {
    setRefreshAlert(true);
    setTimeout(() => {
      setRefreshAlert(false);
    }, 3000);
  };

  useEffect(() => {
    getCurrWeather();
  }, [getCurrWeather]);

  return (
    <div className="weather-today">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="currentWeather_sec col-md-auto col-lg-3 mx-lg-2">
            <p className="m-0 fw-bold text-decoration-underline">
              {t("currentWeather")} {Moment().format("hh:mm A")}
            </p>
            <h2 className="text-left city_name m-0">
              {city}
              <i
                onClick={() => {
                  getCurrWeather();
                  handleAlertSuccess();
                }}
              >
                <GrFormRefresh
                  className={`refresh ${resreshAlert ? "rotating" : ""}`}
                />
              </i>
            </h2>
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <div className="d-flex justify-content-center align-items-center">
                <img className="mainWeatherIcon" src={icon} alt={weather} />
                <p className="curr_temp m-0">
                  {temp}
                  {t("c")}
                </p>
              </div>
              <div>
                <p className="weather m-0">{weather}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center">
              <p className="lastUpdate">
                {t("lastUpd")} : {Moment(lastUpdate).format("LLLL")}
              </p>
              {/*success refresh alert */}
              {resreshAlert && (
                <Alert
                  variant="filled"
                  severity="success"
                  iconMapping={{
                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                  }}
                  style={{
                    backgroundColor: "#1976D2",
                    color: "white",
                    width: "fit-content",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {t("dataRefreshed")}
                </Alert>
              )}
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
              <div className="statis_card d-flex flex-column justify-content-center align-items-center mx-2">
                <img
                  className="currWeatherIcon"
                  src={feelImg}
                  alt={t("feels")}
                />
                <p className="weather_data">
                  {feelsLike}
                  {t("c")}
                </p>
                <h6 className="detail_title">{t("feels")}</h6>
              </div>
              <div className="statis_card d-flex flex-column justify-content-center align-items-center mx-2">
                <img
                  className="currWeatherIcon"
                  src={precipImg}
                  alt={t("precip")}
                />
                <p className="weather_data">
                  {precip}
                  {t("mm")}
                </p>
                <h6 className="detail_title">{t("precip")}</h6>
              </div>
              <div className="statis_card d-flex flex-column justify-content-center align-items-center mx-2">
                <img
                  className="currWeatherIcon"
                  src={windSpdImg}
                  alt={t("windSpd")}
                />
                <p className="weather_data">
                  {windSpd}
                  {t("kph")}
                </p>
                <h6 className="detail_title">{t("windSpd")}</h6>
              </div>
              <div className="statis_card d-flex flex-column justify-content-center align-items-center mx-2">
                <img
                  className="currWeatherIcon"
                  src={WindDirImg}
                  alt={t("windDrc")}
                />
                <p className="weather_data">{windDir}</p>
                <h6 className="detail_title">{t("windDrc")}</h6>
              </div>
              <div className="statis_card d-flex flex-column justify-content-center align-items-center mx-2">
                <img
                  className="currWeatherIcon"
                  src={pressImg}
                  alt={t("press")}
                />
                <p className="weather_data">
                  {pression}
                  {t("mb")}
                </p>
                <h6 className="detail_title">{t("press")}</h6>
              </div>
              <div className="statis_card d-flex flex-column justify-content-center align-items-center mx-2">
                <img className="currWeatherIcon" src={humImg} alt={t("humd")} />
                <p className="weather_data">{humidity}%</p>
                <h6 className="detail_title">{t("humd")}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
