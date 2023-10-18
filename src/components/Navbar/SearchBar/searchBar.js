import React, { useState } from "react";
import "./searchBar.css";
import { useTranslation } from "react-i18next";

function SearchBar({ searchCity }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchCity(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    localStorage.setItem("lastCity", e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        className="searchInput"
        type="text"
        placeholder={t("enterCity")}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="search_btn"
        type="submit"
        onClick={() => handleSearch()}
      >
        {t("search")}
      </button>
    </div>
  );
}

export default SearchBar;
