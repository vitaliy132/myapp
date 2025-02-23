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

const API_KEY = "c7792603-9a9a-4a59-8bd6-e3335c2fd98f";

const BitcoinYearlyChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchYearlyData = async () => {
      try {
        const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0];

        const response = await axios.get(
          `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1DAY&time_start=${yearStart}T00:00:00&apikey=${API_KEY}`,
        );

        if (response.data?.length > 0) {
          const formattedData = response.data
            .filter((entry) => entry.rate_close)
            .map((entry) => ({
              date: new Date(entry.time_period_start).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              price: parseFloat(entry.rate_close.toFixed(2)),
            }));

          if (isMounted) setData(formattedData.reverse());
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
