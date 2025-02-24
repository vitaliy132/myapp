import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const [error, setError] = useState(null);
  const refreshInterval = 5000;

  const backendUrl = "https://your-backend-name.onrender.com/api/exchange-rates";

  const fetchExchangeRates = async () => {
    setError(null);
    try {
      const response = await axios.get(backendUrl);
      if (response.data.success) {
        setPortfolio(response.data.rates);
      } else {
        throw new Error("Failed to fetch exchange rates.");
      }
    } catch (error) {
      setError("Error fetching exchange rates. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExchangeRates(); // Initial fetch
    const intervalId = setInterval(fetchExchangeRates, refreshInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h5>Cryptocurrency Prices</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : Object.keys(portfolio).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Object.entries(portfolio).map(([asset, exchangeRate]) => (
            <li key={asset}>
              <strong>{asset}</strong>: {exchangeRate.toFixed(2)} USD
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Portfolio;
