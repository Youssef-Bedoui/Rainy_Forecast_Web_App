import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          enterCity: "Enter city",
          search: "Search",
          feels: "Feels Like",
          precip: "Precipitation",
          windSpd: "Wind Speed",
          windDrc: "Wind Dir.",
          press: "Pressure",
          humd: "Humidity",
          c: "°C",
          mm: "mm",
          kph: "Kph",
          mb: "mb",
          lastUpd: "Last update",
          dataRefreshed: "Weather refreshed",
          poweredBy: "Powered by Weather API",
          rightsReserved: "All rights reserved for Rainy Forecast",
          codedAndDesignedBy: "Coded and designed by Youssef Bedoui",
          currentWeather: "Current Weather",
          dataError: "Refresh Error !",
        },
      },
      ar: {
        translation: {
          enterCity: "أدخل المدينة",
          search: "بحث",
          feels: "الإحساس ",
          precip: "الهطول",
          windSpd: "سرعة الرياح",
          windDrc: "اتجاه الرياح",
          press: "الضغط",
          humd: "الرطوبة",
          c: "°م",
          mm: "مم",
          kph: "كم/س",
          mb: "مليبار",
          lastUpd: "أخر تحديث",
          dataRefreshed: "تم تحديث الطقس",
          poweredBy: "بتقديم من API الطقس",
          rightsReserved: "جميع الحقوق محفوظة لـ Rainy Forecast",
          codedAndDesignedBy: "تصميم وتنفيذ: يوسف البدوي",
          currentWeather: "الطقس حاليا",
          dataError : "تعذر التحديث"
        },
      },
    },
  });
