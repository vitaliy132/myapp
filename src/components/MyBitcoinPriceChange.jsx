import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://bitcoin-backend-pps2.onrender.com";

const MyBitcoinPriceChange = ({ btcBalance = 1 }) => {
  const [data, setData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Bitcoin price change
        const priceChangeResponse = await axios.get(`${API_URL}/api/bitcoin-price-change`);

        // Fetch current Bitcoin price
        const currentPriceResponse = await axios.get(`${API_URL}/api/current-bitcoin-price`);

        if (priceChangeResponse.data.success) {
          setData(priceChangeResponse.data);
        } else {
          throw new Error(priceChangeResponse.data.error || "Price change API error.");
        }

        if (currentPriceResponse.data.success) {
          setCurrentPrice(currentPriceResponse.data.price);
        } else {
          throw new Error(currentPriceResponse.data.error || "Current price API error.");
        }
      } catch (err) {
        setError("Failed to fetch Bitcoin data. Please try again.");
        console.error("Error fetching BTC data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const btcValue = currentPrice ? btcBalance * currentPrice : null;

  return (
    <div>
      <h5>Daily BTC Change</h5>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : data ? (
        <div>
          <p>
            BTC Balance: <strong>{btcBalance} BTC</strong>
          </p>
          {currentPrice && (
            <p>
              Current BTC Price: <strong>${currentPrice.toLocaleString()}</strong>
            </p>
          )}
          {btcValue && (
            <p>
              Your BTC Value: <strong>${btcValue.toLocaleString()}</strong>
            </p>
          )}
          <p>
            Yesterday's Price: <strong>${data.yesterdayPrice?.toLocaleString()}</strong>
          </p>
          <p>
            Today's Price: <strong>${data.todayPrice?.toLocaleString()}</strong>
          </p>
          <p>
            <strong>
              Change: ${data.change?.toLocaleString()} ({data.percentChange}%)
            </strong>{" "}
            {data.percentChange >= 0 ? (
              <span className="text-success">📈 Profit</span>
            ) : (
              <span className="text-danger">📉 Loss</span>
            )}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MyBitcoinPriceChange;
