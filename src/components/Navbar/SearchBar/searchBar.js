import React, { useState } from "react";
import "./searchBar.css";
import { useTranslation } from "react-i18next";

function SearchBar({ searchCity, isSearch, setIsSearch }) {
  const {t}= useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (window.innerWidth <= 768) {
      setIsSearch(false);
    }

    if (searchTerm.trim() !== "") {
      searchCity(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="searchBar" onSubmit={handleSearch}>
      <input
        className="searchInput"
        type="text"
        placeholder={t("enterCity")}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="search_btn" type="submit">
        {t("search")}
      </button>
    </form>
  );
}

export default SearchBar;
