import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const API_URL = "https://your-backend.onrender.com"; // Change this after deploying

const BitcoinYearlyChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchYearlyData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/bitcoin-yearly`);

        if (response.data.success && isMounted) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching Bitcoin yearly data:", error);
        if (isMounted) setError("Failed to fetch Bitcoin data.");
      }
    };

    fetchYearlyData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h5>Bitcoin Yearly Chart</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BitcoinYearlyChart;
