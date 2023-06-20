import React, { useEffect, useState } from "react";
import "../style/css/StockData.css";
import finnhub from "../apis/finnhub";

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await finnhub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        setStockData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [symbol]);
  return (
    <div className="stock-data">
      {stockData && (
        <div className="stock-data__container">
          <div>
            <div className="stock-data__container__span-div">
              <span>Name: </span>
              {stockData.name}
            </div>
            <div className="stock-data__container__span-div">
              <span>Country: </span>
              {stockData.country}
            </div>
            <div className="stock-data__container__span-div">
              <span>Ticker: </span>
              {stockData.ticker}
            </div>
          </div>

          <div>
            <div className="stock-data__container__span-div">
              <span>Exchange: </span>
              {stockData.exchange}
            </div>
            <div className="stock-data__container__span-div">
              <span>Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div className="stock-data__container__span-div">
              <span>IPO: </span>
              {stockData.ipo}
            </div>
          </div>

          <div>
            <div className="stock-data__container__span-div">
              <span>MarketCap: </span>
              {stockData.marketCapitalization}
            </div>
            <div className="stock-data__container__span-div">
              <span>Shares Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div className="stock-data__container__span-div">
              <span>URL: </span>
              <a href={stockData.weburl}>{stockData.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
