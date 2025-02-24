import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://bitcoin-backend-pps2.onrender.com";

const MyBitcoinPriceChange = ({ btcBalance = 1 }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceChange = async () => {
      try {
        setError(null);
        const response = await axios.get(`${API_URL}/api/bitcoin-price-change`);

        if (response.data.success) {
          setData(response.data);
        } else {
          throw new Error(response.data.error);
        }
      } catch (err) {
        setError("Failed to fetch Bitcoin price data. Please try again.");
        console.error("Error fetching BTC prices:", err);
      }
    };

    fetchPriceChange();
  }, []);

  return (
    <div>
      <h5>Daily BTC Change</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : data ? (
        <div>
          <p>
            BTC Balance: <strong>{btcBalance} BTC</strong>
          </p>
          <p>
            Yesterday's Price: <strong>${data.yesterdayPrice}</strong>
          </p>
          <p>
            Today's Price: <strong>${data.todayPrice}</strong>
          </p>
          <p>
            <strong>
              Change: ${data.change} ({data.percentChange}%)
            </strong>{" "}
            {data.percentChange >= 0 ? (
              <span className="text-success">📈 Profit</span>
            ) : (
              <span className="text-danger">📉 Loss</span>
            )}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyBitcoinPriceChange;
