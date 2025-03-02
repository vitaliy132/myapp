import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

const FearGreedIndex = () => {
  const [index, setIndex] = useState(null);
  const [classification, setClassification] = useState("");
  const [error, setError] = useState(null);

  const fetchIndex = async () => {
    try {
      const response = await axios.get("https://bitcoin-backend-pps2.onrender.com/api/fear-greed");
      if (response.data.success) {
        setIndex(response.data.index);
        setClassification(response.data.classification);
      } else {
        throw new Error("Failed to fetch index.");
      }
    } catch (error) {
      setError("Error fetching Fear & Greed Index. Try again later.");
    }
  };

  useEffect(() => {
    fetchIndex();
  }, []);

  const COLORS = ["#ff0000", "#ff7f00", "#ffff00", "#7fff00", "#008000"];

  const getGaugeColor = (value) => {
    if (value < 20) return COLORS[0]; // Red
    if (value < 40) return COLORS[1]; // Orange
    if (value < 60) return COLORS[2]; // Yellow
    if (value < 80) return COLORS[3]; // Light Green
    return COLORS[4]; // Green
  };

  // Force index to 70 for debugging
  const gaugeValue = 70;
  const gaugeColor = getGaugeColor(gaugeValue);

  console.log("Index:", gaugeValue, "Color:", gaugeColor); // Debugging

  // Swap the slice order
  const data = [
    { value: 100 - gaugeValue }, // Background (gray)
    { value: gaugeValue }, // Colored portion
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h5>Crypto Fear & Greed Index</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
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
              <Cell fill="#E0E0E0" /> {/* Background first */}
              <Cell fill={gaugeColor} /> {/* Foreground color */}
            </Pie>
          </PieChart>
          <h3>{gaugeValue}/100</h3>
          <h5>{classification}</h5>
        </div>
      )}
    </div>
  );
};

export default FearGreedIndex;
