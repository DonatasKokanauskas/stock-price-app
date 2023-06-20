import { createContext, useState, useEffect } from "react";

export const Context = createContext();
export const ContextProvider = (props) => {
  const [list, setList] = useState(
    localStorage.getItem("list")
      ? localStorage.getItem("list").split(",")
      : ["GOOGL", "MSFT", "AMZN"]
  );

  useEffect(() => {
    localStorage.setItem("list", list);
  }, [list]);

  const addStock = (stock) => {
    if (list.indexOf(stock) === -1) {
      setList([...list, stock]);
    }
  };

  const deleteStock = (stock) => {
    setList(
      list.filter((element) => {
        return element !== stock;
      })
    );
  };

  return (
    <Context.Provider value={{ list, addStock, deleteStock }}>
      {props.children}
    </Context.Provider>
  );
};
