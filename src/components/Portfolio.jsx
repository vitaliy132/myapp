import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [prices, setPrices] = useState({ btc: null, eth: null, xrp: null });
  const [error, setError] = useState(null);
  const refreshInterval = 5000;

  const backendUrl = "https://bitcoin-backend-pps2.onrender.com/api/crypto-prices";

  const fetchCryptoPrices = async () => {
    setError(null);
    try {
      const response = await axios.get(backendUrl);
      if (response.data.success) {
        setPrices({
          btc: formatPrice(response.data.prices.btc),
          eth: formatPrice(response.data.prices.eth),
          xrp: formatPrice(response.data.prices.xrp),
        });
      } else {
        throw new Error("Failed to fetch cryptocurrency prices.");
      }
    } catch (error) {
      setError("Error fetching cryptocurrency prices. Please try again later.");
    }
  };

  const formatPrice = (price) => {
    if (!price) return null;
    const formattedPrice = Number(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedPrice.length > 7 ? formattedPrice.slice(0, 7) : formattedPrice;
  };

  useEffect(() => {
    fetchCryptoPrices();
    const intervalId = setInterval(fetchCryptoPrices, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h5>Cryptocurrency Prices</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : prices.btc === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>BTC: {prices.btc} USD</h3>
          <h3>ETH: {prices.eth} USD</h3>
          <h3>XRP: {prices.xrp} USD</h3>
        </>
      )}
    </div>
  );
};

export default Portfolio;
