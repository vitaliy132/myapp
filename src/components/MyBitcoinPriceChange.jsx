import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "c7792603-9a9a-4a59-8bd6-e3335c2fd98f";

const MyBitcoinPriceChange = ({ btcBalance = 1 }) => {
  const [todayPrice, setTodayPrice] = useState(null);
  const [yesterdayPrice, setYesterdayPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setError(null);

        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

        // Fetch today's BTC price
        const todayResponse = await axios.get(
          `https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=${API_KEY}`,
        );

        // Fetch yesterday's BTC price
        const historyResponse = await axios.get(
          `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1DAY&time_start=${yesterday}T00:00:00&apikey=${API_KEY}`,
        );

        console.log("History API Response:", historyResponse.data); // Debugging

        const todayRate = todayResponse.data?.rate ?? null;
        const yesterdayRate = historyResponse.data?.rates?.[0]?.rate ?? null;

        if (!todayRate || !yesterdayRate) throw new Error("Incomplete data received.");

        setTodayPrice(todayRate);
        setYesterdayPrice(yesterdayRate);
      } catch (err) {
        if (err.response?.status === 429) {
          setError("Rate limit exceeded. Please wait before trying again.");
        } else {
          setError("Failed to fetch Bitcoin price data. Please try again.");
        }
        console.error("Error fetching BTC prices:", err);
      }
    };

    fetchPrices();
  }, []);

  const calculateChange = () => {
    if (!todayPrice || !yesterdayPrice) return { percent: "N/A", amount: "N/A" };

    const change = todayPrice - yesterdayPrice;
    const percentChange = ((change / yesterdayPrice) * 100).toFixed(2);
    const amountChange = (change * btcBalance).toFixed(2);

    return { percent: percentChange, amount: amountChange };
  };

  const { percent, amount } = calculateChange();

  return (
    <div>
      <h5>Daily BTC Change</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : todayPrice && yesterdayPrice ? (
        <div>
          <p>
            BTC Balance: <strong>{btcBalance} BTC</strong>
          </p>
          <p>
            Yesterday's Price:{" "}
            <strong>{yesterdayPrice ? `$${Number(yesterdayPrice).toFixed(2)}` : "N/A"}</strong>
          </p>
          <p>
            Today's Price:{" "}
            <strong>{todayPrice ? `$${Number(todayPrice).toFixed(2)}` : "N/A"}</strong>
          </p>
          <p>
            <strong>
              Change: {amount !== "N/A" ? `$${amount}` : "N/A"} (
              {percent !== "N/A" ? `${percent}%` : "N/A"})
            </strong>{" "}
            {percent !== "N/A" &&
              (percent >= 0 ? (
                <span className="text-success">📈 Profit</span>
              ) : (
                <span className="text-danger">📉 Loss</span>
              ))}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyBitcoinPriceChange;
