import React, { useState } from "react";
import "../style/css/StockChart.css";
import Chart from "react-apexcharts";

const StockChart = ({ chartData, symbol }) => {
  const { day, month, year } = chartData;
  const [dateFormat, setDateFormat] = useState("7d");

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "7d":
        return day;
      case "1m":
        return month;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const color = () => {
    const sum =
      determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y;
    if (sum > 0) {
      return "#26C281";
    } else {
      return "#ed3419";
    }
  };

  const options = {
    colors: [determineTimeFormat() ? color() : ""],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animation: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const buttonSelect = (button) => {
    if (button === dateFormat) {
      return "selected-button";
    } else {
      return "unselected-button";
    }
  };

  return (
    <div className="stock-chart">
      <Chart options={options} series={series} type="area" width="100%" />
      <div className="stock-chart__buttons-div">
        <button
          className={buttonSelect("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={buttonSelect("1m")}
          onClick={() => setDateFormat("1m")}
        >
          1m
        </button>
        <button
          className={buttonSelect("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default StockChart;
