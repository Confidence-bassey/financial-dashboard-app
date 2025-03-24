import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

type StockInfo = {
  symbol: string;
  price: string; // Updated to avoid 'null'
  change: string;
  percentChange: string;
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }[];
};

const PriceChart = () => {
  // State to store stock information
  const [stockInfo, setStockInfo] = useState<StockInfo>({
    symbol: "AAPL",
    price: "0.00", // Default value
    change: "0.00", // Default value
    percentChange: "0.00", // Default value
  });

  // State to store chart data
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: "TIME_SERIES_MONTHLY",
            symbol: stockInfo.symbol,
            apikey: API_KEY,
          },
        });

        console.log(response.data); // Debugging step

        // Check for errors in the response
        if (response.data["Error Message"] || response.data["Note"]) {
          console.error("API Error:", response.data["Error Message"] || response.data["Note"]);
          return;
        }

        const timeSeries = response.data["Monthly Time Series"];
        if (!timeSeries) {
          console.error("Monthly Time Series data is missing or invalid");
          return;
        }

        const labels = Object.keys(timeSeries).slice(0, 12).reverse(); // Get last 12 months
        const dataPoints = labels.map((date) => parseFloat(timeSeries[date]["4. close"]));

        const latestPrice = dataPoints[0];
        const previousPrice = dataPoints[1];
        const priceChange = latestPrice - previousPrice;
        const percentChange = (priceChange / previousPrice) * 100;

        setStockInfo({
          ...stockInfo,
          price: latestPrice.toFixed(2),
          change: priceChange.toFixed(2),
          percentChange: percentChange.toFixed(2),
        });

        setChartData({
          labels: labels, // X-axis labels
          datasets: [
            {
              label: `${stockInfo.symbol} Stock Price`,
              data: dataPoints, // Y-axis data points
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchPriceData();
  }, [stockInfo.symbol]); // Refetch data when stock symbol changes

  const changeStockSymbol = (symbol: string) => {
    setStockInfo({ ...stockInfo, symbol });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-md shadow-md">
      {/* Stock Information */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{stockInfo.symbol} Stock Price</h1>
        <p className="text-lg">
          ${stockInfo.price}{" "}
          <span
            className={
              parseFloat(stockInfo.change) >= 0 ? "text-green-600" : "text-red-600"
            }
          >
            {parseFloat(stockInfo.change) >= 0
              ? `+${stockInfo.change}`
              : stockInfo.change}{" "}
            ({stockInfo.percentChange}%)
          </span>
        </p>
      </div>

      {/* Stock Selection Buttons */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => changeStockSymbol("AAPL")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          AAPL
        </button>
        <button
          onClick={() => changeStockSymbol("MSFT")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          MSFT
        </button>
        <button
          onClick={() => changeStockSymbol("GOOGL")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          GOOGL
        </button>
      </div>

      {/* Chart */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;
