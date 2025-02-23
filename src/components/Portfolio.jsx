import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const [error, setError] = useState(null);
  const apiKey = "c7792603-9a9a-4a59-8bd6-e3335c2fd98f";
  const refreshInterval = 5000;

  const fetchExchangeRates = useCallback(async () => {
    setError(null);
    try {
      const assetList = ["BTC", "ETH", "XRP"];

      const promises = assetList.map((asset) =>
        axios.get(`https://rest.coinapi.io/v1/exchangerate/${asset}/USD?apikey=${apiKey}`),
      );

      const responses = await Promise.allSettled(promises);

      const exchangeRates = responses.reduce((acc, response, index) => {
        if (response.status === "fulfilled") {
          acc[assetList[index]] = response.value.data.rate;
        }
        return acc;
      }, {});

      if (
        Object.keys(exchangeRates).length > 0 &&
        JSON.stringify(exchangeRates) !== JSON.stringify(portfolio)
      ) {
        setPortfolio(exchangeRates);
      }
    } catch (error) {
      setError("Error fetching exchange rates. Please try again later.");
    }
  }, [apiKey, portfolio]);

  useEffect(() => {
    fetchExchangeRates(); // Initial fetch
    const intervalId = setInterval(fetchExchangeRates, refreshInterval);

    return () => clearInterval(intervalId);
  }, [fetchExchangeRates]);

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
