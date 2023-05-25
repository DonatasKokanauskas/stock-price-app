import React from "react";
import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
  return (
    <div>
      <SearchBar />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
