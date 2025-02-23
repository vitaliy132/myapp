import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_KEY = "c7792603-9a9a-4a59-8bd6-e3335c2fd98f";
const assets = ["BTC", "ETH", "XRP"];
const REFRESH_INTERVAL = 5000;

const CryptoExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setError(null);
      try {
        const responses = await Promise.all(
          assets.map((asset) =>
            axios.get(`https://rest.coinapi.io/v1/exchangerate/${asset}/USD?apikey=${API_KEY}`),
          ),
        );

        const rates = responses.reduce((acc, response, index) => {
          acc[assets[index]] = response.data?.rate ?? "N/A";
          return acc;
        }, {});

        if (isMounted.current) setExchangeRates(rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        if (isMounted.current) setError("Error fetching exchange rates. Please try again later.");
      }
    };

    fetchExchangeRates();
    const intervalId = setInterval(fetchExchangeRates, REFRESH_INTERVAL);

    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h5>Crypto Exchange Rates</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : Object.keys(exchangeRates).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Object.entries(exchangeRates).map(([asset, rate]) => (
            <li key={asset}>
              <strong>{asset}</strong>: {rate !== "N/A" ? `${rate.toFixed(2)} USD` : "N/A"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CryptoExchangeRates;
