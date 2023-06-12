import React from "react";
import "../style/css/StockChart.css";
import Chart from "react-apexcharts";

const StockChart = ({ chartData, symbol }) => {
  const { day, week, year } = chartData;

  const options = {
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
      data: day,
    },
  ];
  return (
    <div className="stock-chart">
      <Chart options={options} series={series} type="area" width="100%" />
    </div>
  );
};

export default StockChart;
