import { useState, useEffect } from "react";
import axios from "axios";

const ConvertPage = () => {
  const [cryptoList, setCryptoList] = useState<{ name: string; symbol: string; price: number }[]>([]);
  const [fiatRates, setFiatRates] = useState<{ [key: string]: number }>({});
  const [crypto, setCrypto] = useState("BTC");
  const [fiat, setFiat] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    // Fetch list of top cryptocurrencies
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get("https://api.coinpaprika.com/v1/tickers");
        const data = response.data.slice(0, 50).map((coin: any) => ({
          name: coin.name,
          symbol: coin.symbol,
          price: coin.quotes.USD.price,
        }));
        setCryptoList(data);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    // Fetch fiat exchange rates (Base: USD)
    const fetchFiatRates = async () => {
      try {
        const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
        setFiatRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchCryptoPrices();
    fetchFiatRates();
  }, []);

  useEffect(() => {
    if (cryptoList.length > 0 && fiatRates[fiat]) {
      const cryptoPriceUSD = cryptoList.find((c) => c.symbol === crypto)?.price || 1;
      const exchangeRate = fiatRates[fiat] || 1;
      setConvertedAmount(amount * cryptoPriceUSD * exchangeRate);
    }
  }, [crypto, fiat, amount, cryptoList, fiatRates]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">Crypto Currency Converter</h2>
      
      <div className="mb-4">
        <label className="block font-medium">Amount</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Crypto</label>
        <select
          className="w-full border rounded p-2"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
        >
          {cryptoList.map((coin) => (
            <option key={coin.symbol} value={coin.symbol}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Fiat Currency</label>
        <select
          className="w-full border rounded p-2"
          value={fiat}
          onChange={(e) => setFiat(e.target.value)}
        >
          {Object.keys(fiatRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="text-lg font-semibold">
        Converted Amount: {convertedAmount.toFixed(2)} {fiat}
      </div>
    </div>
  );
};

export default ConvertPage;
