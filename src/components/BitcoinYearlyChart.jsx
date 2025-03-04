import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Mocked historical Bitcoin data for demonstration
const mockedData = [
  { date: "2015", price: 320 },
  { date: "2016", price: 450 },
  { date: "2017", price: 1000 },
  { date: "2018", price: 7300 },
  { date: "2019", price: 12000 },
  { date: "2020", price: 20000 },
  { date: "2021", price: 45000 },
  { date: "2022", price: 35000 },
  { date: "2023", price: 28000 },
  { date: "2024", price: 42000 },
];

const BitcoinYearlyChart = () => {
  const [data, setData] = useState(mockedData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The API fetching section is commented out since we're using mocked data.
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h5>Bitcoin Yearly Chart</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
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
