import React from "react";
import MarketOverview from "./MarketOverview";
import Watchlist from "./Watchlist";
import PriceChart from "./PriceChart";

const Findash = () => {
  return (
    <div style={gridStyle}>

      <div style={marketOverviewStyle}>
        <MarketOverview />
      </div>

      <div style={watchlistStyle}>
        <Watchlist />
      </div>

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
  height: "100%", 
  padding: "20px",
  marginBottom: "20px",
};

const marketOverviewStyle: React.CSSProperties = {
  gridColumn: "1 / 2", 
  gridRow: "1", 
};

const watchlistStyle: React.CSSProperties = {
  gridColumn: "2", 
  gridRow: "1 / 3", 
};

const priceChartStyle: React.CSSProperties = {
  gridColumn: "1", 
  gridRow: "2", 
};

export default Findash;
