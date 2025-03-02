import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

const FearGreedIndex = () => {
  const [index, setIndex] = useState(null);
  const [classification, setClassification] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const response = await axios.get(
          "https://bitcoin-backend-pps2.onrender.com/api/fear-greed",
        );
        console.log("API Response:", response.data);

        if (response.data.success) {
          setIndex(Number(response.data.index)); // Ensure it's a number
          setClassification(response.data.classification);
        } else {
          throw new Error("Failed to fetch index.");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("Error fetching Fear & Greed Index. Try again later.");
      }
    };

    fetchIndex();
  }, []);

  const COLORS = ["#ff0000", "#ff7f00", "#ffff00", "#7fff00", "#008000"];

  const getGaugeColor = (value) => {
    if (value < 20) return COLORS[0]; // Extreme Fear (Red)
    if (value < 40) return COLORS[1]; // Fear (Orange)
    if (value < 60) return COLORS[2]; // Neutral (Yellow)
    if (value < 80) return COLORS[3]; // Greed (Light Green)
    return COLORS[4]; // Extreme Greed (Green)
  };

  if (error) {
    return (
      <p className="text-danger" style={{ textAlign: "center" }}>
        {error}
      </p>
    );
  }

  if (index === null) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  const gaugeColor = getGaugeColor(index);
  const data = [
    { value: 100 - index }, // Background (gray)
    { value: index }, // Colored portion
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h5>Crypto Fear & Greed Index</h5>
      <PieChart width={200} height={120}>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={50}
          outerRadius={70}
          dataKey="value">
          <Cell fill="#E0E0E0" /> {/* Background */}
          <Cell fill={gaugeColor} /> {/* Foreground color */}
        </Pie>
      </PieChart>
      <h3>{index}/100</h3>
      <h5>{classification}</h5>
    </div>
  );
};

export default FearGreedIndex;
