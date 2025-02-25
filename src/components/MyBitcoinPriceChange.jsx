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

        // Fetch Bitcoin price change (fixed endpoint)
        const priceResponse = await axios.get(`${API_URL}/api/bitcoin-price`);
        console.log("Bitcoin Price API Response:", priceResponse.data);

        if (priceResponse.data.success) {
          setCurrentPrice(priceResponse.data.price);
        } else {
          throw new Error(priceResponse.data.error || "Price API error.");
        }
      } catch (err) {
        const errorMsg = err.response?.data?.error || err.message || "Unknown error";
        setError(`Failed to fetch Bitcoin data: ${errorMsg}`);
        console.error("Error fetching BTC data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [btcBalance]); // Runs when btcBalance changes

  const btcValue = currentPrice ? btcBalance * currentPrice : null;

  return (
    <div>
      <h5>Bitcoin Price</h5>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
          <p>
            BTC Balance: <strong>{btcBalance} BTC</strong>
          </p>
          {currentPrice !== null && (
            <p>
              Current BTC Price: <strong>${currentPrice.toLocaleString()}</strong>
            </p>
          )}
          {btcValue !== null && (
            <p>
              Your BTC Value: <strong>${btcValue.toLocaleString()}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBitcoinPriceChange;
