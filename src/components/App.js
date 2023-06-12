import "../style/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockOverviewPage from "../pages/StockOverviewPage";
import StockDetailPage from "../pages/StockDetailPage";
import { ContextProvider } from "../context/Context";

function App() {
  return (
    <main>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </main>
  );
}

export default App;
