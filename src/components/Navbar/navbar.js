import React from "react";
import "./navbar.css";
import logo from "../../assets/images/logo.png";
import SearchBar from "./SearchBar/searchBar";
import LanguageToggler from "./LanguageToggler/languageToggler";

function Navbar({ city, searchCity }) {


  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid nav_container">
        <img src={logo} className="logo" alt="Rainy forecast" />

          <SearchBar
            city={city}
            searchCity={searchCity}
          />
          <LanguageToggler />
      </div>
    </nav>
  );
}

export default Navbar;
