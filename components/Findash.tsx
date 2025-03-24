import React from "react";
import MarketOverview from "./MarketOverview";
import Watchlist from "./Watchlist";
import PriceChart from "./PriceChart";

const Findash = () => {
  return (
    <div style={gridStyle}>
      {/* MarketOverview spans across the top */}
      <div style={marketOverviewStyle}>
        <MarketOverview />
      </div>

      {/* Watchlist spans the full height on the right */}
      <div style={watchlistStyle}>
        <Watchlist />
      </div>

      {/* PriceChart occupies the bottom-left */}
      <div style={priceChartStyle}>
        <PriceChart />
      </div>
    </div>
  );
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr", 
  gridTemplateRows: "auto auto", 
  gap: "20px", 
  height: "100vh", 
  padding: "20px",
  backgroundColor: "#f9f9f9",
};

const marketOverviewStyle: React.CSSProperties = {
  gridColumn: "1 / 2", 
  gridRow: "1", 
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const watchlistStyle: React.CSSProperties = {
  gridColumn: "2", 
  gridRow: "1 / 3", 
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const priceChartStyle: React.CSSProperties = {
  gridColumn: "1", 
  gridRow: "2", 
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export default Findash;
