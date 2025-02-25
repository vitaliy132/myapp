import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [error, setError] = useState(null);
  const refreshInterval = 5000;

  const backendUrl = "https://bitcoin-backend-pps2.onrender.com/api/bitcoin-price";

  const fetchBitcoinPrice = async () => {
    setError(null);
    try {
      const response = await axios.get(backendUrl);
      if (response.data.success) {
        const formattedPrice = Number(response.data.price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        setBtcPrice(formattedPrice.length > 7 ? formattedPrice.slice(0, 7) : formattedPrice);
      } else {
        throw new Error("Failed to fetch Bitcoin price.");
      }
    } catch (error) {
      setError("Error fetching Bitcoin price. Please try again later.");
    }
  };

  useEffect(() => {
    fetchBitcoinPrice();
    const intervalId = setInterval(fetchBitcoinPrice, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h5>Cryptocurrency Prices</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : btcPrice === null ? (
        <p>Loading...</p>
      ) : (
        <p>
          <strong>BTC:</strong> {btcPrice} USD
        </p>
      )}
    </div>
  );
};

export default Portfolio;
