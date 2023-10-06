import React, { useEffect } from "react";
import "./languageToggler.css";
import { IoLanguageSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import moment from "moment";
import fr from "moment/moment";

moment.locale("fr");
function LanguageToggler() {
  // i18next
  const { i18n } = useTranslation();
  const languages = {
    en: { name: "English" },
    ar: { name: "العربية" },
  };

  const handleLanguageToggle = (lang) => {
    console.log(moment.locales(), "locallll");
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    moment.locale("fr-ca",fr);
  }, []);

  return (
    <div className="languageToggler">
      <i className="fs-2">
        <IoLanguageSharp />
      </i>
      {Object.keys(languages).map((lang) => (
        <button
          type="submit"
          key={lang}
          className={
            i18n.resolvedLanguage === lang
              ? "disabledToggler px-2"
              : "languageTogglerText px-2"
          }
          disabled={i18n.resolvedLanguage === lang}
          onClick={() => handleLanguageToggle(lang)}
        >
          {languages[lang].name}
        </button>
      ))}
    </div>
  );
}

export default LanguageToggler;
