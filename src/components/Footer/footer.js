import React from "react";
import "./footer.css";
import logo from "../../assets/images/logo.png";
import weatherApiLogo from "../../assets/images/weatherapi_logo.webp";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer mt-5">
      <div className="container-fluid">
        <div className="row">
          <img className="footer_logo col-md-2" src={logo} alt="footer logo" />
          <img
            className="footer_logo col-md-2"
            src={weatherApiLogo}
            alt="footer logo"
          />
          <div className="col mx-auto d-flex flex-column justify-content-center align-items-center">
            <div>
              <h4 className="fw-bold">
                <span>{t("poweredBy")}</span> &copy; 2023 -{" "}
                {t("rightsReserved")}
              </h4>
            </div>
            <h4>{t("codedAndDesignedBy")}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
