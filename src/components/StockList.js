import React from "react";
import { useState, useEffect, useContext } from "react";
import "../style/css/StockList.css";
import finnhub from "../apis/finnhub";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const StockList = () => {
  const [stock, setStock] = useState([]);
  const { list, deleteStock } = useContext(Context);
  const navigate = useNavigate();

  const changeColor = (change) => {
    return change > 0 ? { color: "green" } : { color: "red" };
  };

  const displayIcon = (change) => {
    return change > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          list.map((stock) => {
            return finnhub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        setStock(
          responses.map((obj) => {
            return { symbol: obj.config.params.symbol, data: obj.data };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [list]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  return (
    <div className="stock-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last</th>
            <th>Chg</th>
            <th>Chg%</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stock) => {
            return (
              <tr
                key={stock.symbol}
                onClick={() => handleStockSelect(stock.symbol)}
              >
                <th data-name="Name">{stock.symbol ? stock.symbol : "-"}</th>
                <td data-name="Last">{stock.data.c ? stock.data.c : "-"}</td>
                <td data-name="Chg" style={changeColor(stock.data.d)}>
                  {stock.data.d ? stock.data.d : "-"}{" "}
                  {displayIcon(stock.data.d)}
                </td>
                <td data-name="Chg%" style={changeColor(stock.data.dp)}>
                  {stock.data.dp ? stock.data.dp : "-"}{" "}
                  {displayIcon(stock.data.dp)}
                </td>
                <td data-name="High">{stock.data.h ? stock.data.h : "-"}</td>
                <td data-name="Low">{stock.data.l ? stock.data.l : "-"}</td>
                <td data-name="Open">{stock.data.o ? stock.data.o : "-"}</td>
                <td data-name="Pclose">
                  {stock.data.pc ? stock.data.pc : "-"}{" "}
                </td>
                <td>
                  <button
                    className="remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStock(stock.symbol);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
