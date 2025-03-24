import React from "react";

const Watchlist = () => {
  // Sample watchlist data (replace with dynamic API data later)
  const assets = [
    { name: "Apple Inc.", ticker: "AAPL", price: "$197.57", change: "+0.63%", changeType: "positive" },
    { name: "Tesla, Inc.", ticker: "TSLA", price: "$238.83", change: "-1.55%", changeType: "negative" },
    { name: "Bitcoin", ticker: "BTC", price: "$42,637.30", change: "+2.14%", changeType: "positive" },
    { name: "Ethereum", ticker: "ETH", price: "$2,274.16", change: "+1.87%", changeType: "positive" },
    { name: "Amazon.com, Inc.", ticker: "AMZN", price: "$153.42", change: "+1.53%", changeType: "positive" },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
      <p className="text-gray-600 mb-6">Track your favorite assets</p>
      <ul className="space-y-4">
        {assets.map((asset, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-white"
          >
            <div>
              <h3 className="text-lg font-bold">{asset.name}</h3>
              <p className="text-sm text-gray-600">{asset.ticker}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{asset.price}</p>
              <p
                className={`text-sm font-medium ${
                  asset.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {asset.change}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded">
        + Add to Watchlist
      </button>
    </div>
  );
};

export default Watchlist;
