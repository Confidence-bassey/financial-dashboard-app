// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Define the type for a single cryptocurrency object
// type Crypto = {
//   id: string;
//   name: string;
//   symbol: string;
//   image: string;
//   current_price: number;
//   market_cap: number;
//   price_change_percentage_24h: number;
// };

// const Crypto = () => {
//   // Explicitly type the state as an array of Crypto objects
//   const [cryptos, setCryptos] = useState<Crypto[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCryptoData = async () => {
//       try {
//         // Fetch data from CoinGecko API
//         const response = await axios.get(
//           "https://api.coingecko.com/api/v3/coins/markets",
//           {
//             params: {
//               vs_currency: "usd", // Display prices in USD
//               order: "market_cap_desc", // Sort by market cap
//               per_page: 10, // Fetch the top 10 cryptocurrencies
//               page: 1,
//               sparkline: false, // Disable sparkline data
//             },
//           }
//         );

//         // Update the state with the fetched data
//         setCryptos(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching cryptocurrency data:", error);
//       }
//     };

//     fetchCryptoData();
//   }, []);

//   return (
//     <div className="p-6 bg-white border border-gray-300 rounded-md shadow-md">
//       <h1 className="text-2xl font-bold mb-2">Cryptocurrencies</h1>
//       <h2 className="text-gray-600 mb-6">Top 10 by Market Cap</h2>

//       {/* Loading Spinner */}
//       {isLoading ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-3 border-b">Name</th>
//               <th className="p-3 border-b">Price</th>
//               <th className="p-3 border-b">Market Cap</th>
//               <th className="p-3 border-b">24h Change</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cryptos.map((crypto, index) => (
//               <tr key={crypto.id} className="hover:bg-gray-100">
//                 <td className="p-3 border-b flex items-center">
//                   <img
//                     src={crypto.image}
//                     alt={crypto.name}
//                     className="w-6 h-6 mr-2"
//                   />
//                   {crypto.name} ({crypto.symbol.toUpperCase()})
//                 </td>
//                 <td className="p-3 border-b">
//                   ${crypto.current_price.toLocaleString()}
//                 </td>
//                 <td className="p-3 border-b">
//                   ${crypto.market_cap.toLocaleString()}
//                 </td>
//                 <td
//                   className={`p-3 border-b ${
//                     crypto.price_change_percentage_24h >= 0
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {crypto.price_change_percentage_24h.toFixed(2)}%
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Crypto;

import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the type for a single cryptocurrency object
type Crypto = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number; // Volume field added here
};

const Crypto = () => {
  // Explicitly type the state as an array of Crypto objects
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Fetch data from CoinGecko API
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd", // Display prices in USD
              order: "market_cap_desc", // Sort by market cap
              per_page: 10, // Fetch the top 10 cryptocurrencies
              page: 1,
              sparkline: false, // Disable sparkline data
            },
          }
        );

        // Update the state with the fetched data
        setCryptos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-2">Cryptocurrencies</h1>
      <h2 className="text-gray-600 mb-6">Top 10 by Market Cap</h2>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">24h Change</th>
              <th className="p-3 border-b">Market Cap</th>
              <th className="p-3 border-b">Volume (24h)</th> {/* Volume column added */}
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id} className="hover:bg-gray-100">
                <td className="p-3 border-b flex items-center">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-6 h-6 mr-2"
                  />
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </td>
                <td className="p-3 border-b">
                  ${crypto.current_price.toLocaleString()}
                </td>
                <td
                  className={`p-3 border-b ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-3 border-b">
                  ${crypto.market_cap.toLocaleString()}
                </td>
                
                <td className="p-3 border-b">
                  ${crypto.total_volume.toLocaleString()} {/* Displaying volume */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Crypto;

