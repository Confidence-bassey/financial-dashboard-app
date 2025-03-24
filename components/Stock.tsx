import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the type for stock objects
type Stock = {
  name: string;
  price: string;
  change: string;
  percentChange: string;
  volume: string;
};

const Stock = () => {
  // Explicitly type the stocks state as an array of Stock objects
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      // Define stock symbols for top-performing stocks
      const stockSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
      const fetchedStocks: Stock[] = []; // Explicitly type fetchedStocks as an array of Stock objects

      for (const symbol of stockSymbols) {
        try {
          // Use the API key stored in .env.local
          const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

          // Fetch data for each stock symbol
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
          );

          const timeSeries = response.data["Time Series (5min)"];
          const latestTime = Object.keys(timeSeries)[0];
          const latestData = timeSeries[latestTime];
          const previousTime = Object.keys(timeSeries)[1];
          const previousData = timeSeries[previousTime];

          // Calculate stock metrics
          const price = parseFloat(latestData["4. close"]);
          const previousPrice = parseFloat(previousData["4. close"]);
          const change = price - previousPrice;
          const percentChange = (change / previousPrice) * 100;
          const volume = parseInt(latestData["5. volume"]);

          // Push data into the fetchedStocks array
          fetchedStocks.push({
            name: symbol,
            price: price.toFixed(2),
            change: change.toFixed(2),
            percentChange: percentChange.toFixed(2),
            volume: volume.toLocaleString(),
          });
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error);
        }
      }

      // Update the stocks state with the fetched stocks
      setStocks(fetchedStocks);
      setIsLoading(false);
    };

    fetchStockData();
  }, []);

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-md shadow-md m-4">
      <h1 className="text-2xl font-bold mb-2">Stocks</h1>
      <h2 className="text-gray-600 mb-6">Top-performing stocks today</h2>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Change</th>
              <th className="p-3 border-b">% Change</th>
              <th className="p-3 border-b">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border-b font-bold">{stock.name}</td>
                <td className="p-3 border-b">${stock.price}</td>
                <td
                  className={`p-3 border-b ${
                    parseFloat(stock.change) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {parseFloat(stock.change) >= 0 ? `+${stock.change}` : stock.change}
                </td>
                <td
                  className={`p-3 border-b ${
                    parseFloat(stock.percentChange) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {parseFloat(stock.percentChange) >= 0
                    ? `+${stock.percentChange}%`
                    : `${stock.percentChange}%`}
                </td>
                <td className="p-3 border-b">{stock.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Stock;
