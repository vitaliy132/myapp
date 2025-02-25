import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = "https://bitcoin-backend-pps2.onrender.com";
const REFRESH_INTERVAL = 5000;

const CryptoExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/api/exchange-rates`);

        if (response.data.success && isMounted.current) {
          setExchangeRates(response.data.rates);
        }
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
