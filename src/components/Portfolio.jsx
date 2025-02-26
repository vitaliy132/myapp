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
          btc: response.data.prices.btc.toFixed(2),
          eth: response.data.prices.eth.toFixed(2),
          xrp: response.data.prices.xrp.toFixed(4),
        });
      } else {
        throw new Error("Failed to fetch cryptocurrency prices.");
      }
    } catch (error) {
      setError("Error fetching cryptocurrency prices. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    const intervalId = setInterval(fetchCryptoPrices, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="soft-card">
        <h2>Live Cryptocurrency Prices</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : prices.btc === null ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="crypto-grid">
            <div className="soft-card crypto-card">
              <img src="/images/btc.png" alt="BTC" className="crypto-logo" />
              <h3>Bitcoin (BTC)</h3>
              <p className="crypto-price">${prices.btc} USD</p>
            </div>
            <div className="soft-card crypto-card">
              <img src="/images/eth.png" alt="ETH" className="crypto-logo" />
              <h3>Ethereum (ETH)</h3>
              <p className="crypto-price">${prices.eth} USD</p>
            </div>
            <div className="soft-card crypto-card">
              <img src="/images/xrp.png" alt="XRP" className="crypto-logo" />
              <h3>XRP</h3>
              <p className="crypto-price">${prices.xrp} USD</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
