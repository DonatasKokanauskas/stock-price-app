import React, { useEffect, useState, useContext } from "react";
import "../style/css/SearchBar.css";
import finnhub from "../apis/finnhub";
import { Context } from "../context/Context";

const SearchBar = () => {
  const [inputLabel, setInputLabel] = useState();
  const [dropDownMenu, setDropDownMenu] = useState();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock, deleteStock } = useContext(Context);

  useEffect(() => {
    setInputLabel(document.getElementById("input-label"));
    setDropDownMenu(document.getElementById("dropdown-menu"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await finnhub.get("/search", {
          params: {
            q: search,
          },
        });
        setResults(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (search) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [search]);

  const handleKeyUp = (e) => {
    inputLabel.style.top = "3px";
    inputLabel.style.fontSize = "0.6rem";
    inputLabel.style.color = "#cccccc";

    if (e.target.value === "") {
      inputLabel.style.top = "13px";
      inputLabel.style.fontSize = "0.7rem";
      inputLabel.style.color = "#757575";
    }
  };

  const showDropdown = () => {
    if (search) {
      dropDownMenu.style.display = "block";
    } else {
      if (dropDownMenu) {
        dropDownMenu.style.display = "none";
      }
    }
  };
  showDropdown();

  return (
    <div className="search-container">
      <div className="search">
        <label id="input-label" htmlFor="search-bar">
          FIND A SYMBOL
        </label>
        <input
          type="text"
          id="search-bar"
          onKeyUp={handleKeyUp}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul id="dropdown-menu">
          {results.map((obj) => {
            return (
              <li
                key={obj.symbol}
                onClick={() => {
                  addStock(obj.symbol);
                  setSearch("");
                }}
              >
                {obj.description} ({obj.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
