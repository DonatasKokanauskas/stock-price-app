import React from "react";
import { useState, useEffect, useContext } from "react";
import "../style/css/StockList.css";
import finnhub from "../apis/finnhub";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const StockList = () => {
  const [stock, setStock] = useState([]);
  const { list } = useContext(Context);
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
                <th>{stock.symbol ? stock.symbol : "-"}</th>
                <td>{stock.data.c ? stock.data.c : "-"}</td>
                <td style={changeColor(stock.data.d)}>
                  {stock.data.d ? stock.data.d : "-"}{" "}
                  {displayIcon(stock.data.d)}
                </td>
                <td style={changeColor(stock.data.dp)}>
                  {stock.data.dp ? stock.data.dp : "-"}{" "}
                  {displayIcon(stock.data.dp)}
                </td>
                <td>{stock.data.h ? stock.data.h : "-"}</td>
                <td>{stock.data.l ? stock.data.l : "-"}</td>
                <td>{stock.data.o ? stock.data.o : "-"}</td>
                <td>{stock.data.pc ? stock.data.pc : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
