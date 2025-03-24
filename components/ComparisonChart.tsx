import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { FiPlus, FiTrash } from "react-icons/fi";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartSeries = {
  name: string;
  data: number[];
};

type ChartOptions = {
  chart: { type: "line"; height: number };
  xaxis: { categories: string[] };
  tooltip: { x: { format: string } };
};

const ComparisonChart = () => {
  const [assets, setAssets] = useState<string[]>([]);
  const [newAsset, setNewAsset] = useState("");
  const [chartData, setChartData] = useState<{
    series: ChartSeries[];
    options: ChartOptions;
  }>({
    series: [],
    options: {
      chart: { type: "line", height: 350 },
      xaxis: { categories: [] },
      tooltip: { x: { format: "dd MMM" } },
    },
  });

  const fetchAssetData = async (symbol: string) => {
    try {
      const response = await axios.get(`/api/data?symbol=${symbol}`);
      const prices: number[] = response.data.prices;
      const dates: string[] = response.data.dates;

      setChartData((prev) => ({
        ...prev,
        series: [...prev.series, { name: symbol, data: prices }],
        options: {
          ...prev.options,
          xaxis: { categories: dates },
        },
      }));
    } catch (error) {
      console.error("Error fetching asset data", error);
    }
  };

  const addAsset = () => {
    if (newAsset.trim() !== "" && !assets.includes(newAsset)) {
      setAssets([...assets, newAsset]);
      fetchAssetData(newAsset);
      setNewAsset("");
    }
  };

  const removeAsset = (symbol: string) => {
    setAssets(assets.filter((asset) => asset !== symbol));
    setChartData((prev) => ({
      ...prev,
      series: prev.series.filter((series) => series.name !== symbol),
    }));
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Compare Stocks & Cryptos</h2>
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />

      <div className="mt-4 flex">
        <input
          type="text"
          value={newAsset}
          onChange={(e) => setNewAsset(e.target.value)}
          className="border p-2 flex-grow rounded-l-lg"
          placeholder="Enter asset symbol (AAPL, BTC, ETH, etc.)"
        />
        <button onClick={addAsset} className="bg-blue-500 text-white p-2 rounded-r-lg">
          <FiPlus />
        </button>
      </div>

      <ul className="mt-4">
        {assets.map((asset) => (
          <li key={asset} className="flex justify-between items-center py-2 border-b">
            <span>{asset}</span>
            <button onClick={() => removeAsset(asset)} className="text-red-500">
              <FiTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonChart;
