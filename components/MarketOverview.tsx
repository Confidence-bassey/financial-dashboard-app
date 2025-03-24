import React from "react";

const MarketOverview = () => {
  // Sample market data (replace with API data in the future)
  const marketData = [
    { name: "S&P 500", value: "4,587.64", change: "+0.63%", changeType: "positive" },
    { name: "Dow Jones", value: "37,306.02", change: "+0.86%", changeType: "positive" },
    { name: "Nasdaq", value: "14,403.97", change: "-0.23%", changeType: "negative" },
    { name: "Bitcoin", value: "$42,637.30", change: "+2.14%", changeType: "positive" },
    { name: "Ethereum", value: "$2,274.16", change: "+1.87%", changeType: "positive" },
    { name: "Gold", value: "$2,032.30", change: "-0.12%", changeType: "negative" },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-md">
      <h1 className="text-2xl font-bold mb-2">Market Overview</h1>
      <p className="text-gray-600 mb-6">Live market indices and commodities</p>
      <div className="grid grid-cols-6 gap-2">
        {marketData.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white text-center"
          >
            <h2 className="text-gray-600">{item.name}</h2>
            <p className="text-xl font-semibold">{item.value}</p>
            <p
              className={`text-sm font-medium ${
                item.changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;

// import React, { useEffect, useState } from 'react';
// import { fetchCryptoData } from '../utils/api';

// const MarketOverview = () => {
//   const [cryptoData, setCryptoData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchCryptoData();
//       setCryptoData(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 bg-white border border-gray-300 rounded-md">
//       <h1 className="text-2xl font-bold mb-4">Market Overview</h1>
//       <p className="text-gray-600 mb-6">Live cryptocurrency prices</p>
//       <div className="grid grid-cols-2 gap-6">
//         {cryptoData.map((crypto, index) => (
//           <div key={index} className="p-4 bg-gray-100 rounded shadow text-center">
//             <h2 className="text-lg font-bold">{crypto.name}</h2>
//             <p className="text-xl font-semibold">${crypto.current_price.toLocaleString()}</p>
//             <p
//               className={`text-sm font-medium ${
//                 crypto.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
//               }`}
//             >
//               {crypto.price_change_percentage_24h.toFixed(2)}%
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MarketOverview;

