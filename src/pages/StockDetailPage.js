import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import finnhub from "../apis/finnhub";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";
import { useNavigate } from "react-router-dom";

const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  const formatData = (data) => {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: Math.floor(data.c[index]),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneMonth = currentTime - 30 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnhub.get("stock/candle", {
            params: {
              symbol: symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnhub.get("stock/candle", {
            params: {
              symbol: symbol,
              from: oneMonth,
              to: currentTime,
              resolution: "D",
            },
          }),
          finnhub.get("stock/candle", {
            params: {
              symbol: symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);

        setChartData({
          day: formatData(responses[0].data),
          month: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [symbol]);

  const returnToHome = () => {
    navigate(`/`);
  };

  return (
    <div>
      {chartData && (
        <div className="stock-detail-page">
          <button
            className="selected-button"
            onClick={returnToHome}
            style={{ marginTop: "5px", marginLeft: "10px" }}
          >
            Return
          </button>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </div>
  );
};

export default StockDetailPage;
