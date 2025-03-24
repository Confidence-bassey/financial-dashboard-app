// utils/api.js
import axios from 'axios';

// CoinGecko API (for cryptocurrencies)
export const fetchCryptoData = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets';
  const params = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 10,
    page: 1,
    sparkline: false,
  };
  const response = await axios.get(url, { params });
  return response.data;
};

// Alpha Vantage API (for stocks)
export const fetchStockData = async (symbol) => {
  const url = `https://www.alphavantage.co/query`;
  const params = {
    function: 'TIME_SERIES_INTRADAY',
    symbol,
    interval: '5min',
    apikey: 'YOUR_API_KEY', // Replace with your API key
  };
  const response = await axios.get(url, { params });
  return response.data;
};
