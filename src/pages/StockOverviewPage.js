import React from "react";
import "../style/css/StockOverviewPage.css";
import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";
import StockImage from "../images/stock-image.png";

const StockOverviewPage = () => {
  return (
    <div className="stock-overview-page">
      <img src={StockImage} alt="stock image" />
      <SearchBar />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
