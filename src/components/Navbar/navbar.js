import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/images/logo.png";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SearchBar from "./SearchBar/searchBar";
import LanguageToggler from "./LanguageToggler/languageToggler";

function Navbar({ city, searchCity }) {
  const iconStyle = {
    color: "#ffffff",
    fontSize: "36px",
  };
  const [isSearch, setIsSearch] = useState(false);

  const showSearch = () => {
    isSearch ? setIsSearch(false) : setIsSearch(true);
  };

  // Add an effect to check the screen size and set isSearch accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSearch(false);
      } else {
        setIsSearch(true);
      }
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for screen size changes
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <img src={logo} className="logo" alt="Rainy forecast" />

        <div
          onClick={() => showSearch()}
          className="searchIcon d-sm-flex d-md-none"
        >
          <TravelExploreIcon style={iconStyle} />
        </div>

        {isSearch && (
          <div className="mx-auto position-fixed top-90">
            <SearchBar city={city} searchCity={searchCity} isSearch={isSearch} setIsSearch={setIsSearch} />
          </div>
        )}

        <div className="langToggler nav-item">
          <LanguageToggler />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
