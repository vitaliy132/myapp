import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://bitcoin-backend-pps2.onrender.com";
const BTC_BALANCE = 0.01508673;

const MyBitcoinValue = () => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/api/bitcoin-price`);

        if (response.data.success && response.data.price) {
          setCurrentPrice(response.data.price);
        } else {
          throw new Error("Failed to fetch Bitcoin price.");
        }
      } catch (err) {
        setError("Error fetching Bitcoin price. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 300000);
    return () => clearInterval(interval);
  }, []);

  const btcValue = currentPrice ? (BTC_BALANCE * currentPrice).toFixed(2) : null;

  return (
    <div>
      <h5>My Bitcoin Value</h5>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <h3>${btcValue}</h3>
      )}
    </div>
  );
};

export default MyBitcoinValue;
