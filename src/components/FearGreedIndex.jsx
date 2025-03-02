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
      console.log("API Response:", response.data); // Debugging API response

      if (response.data.success) {
        console.log("Fetched Index:", response.data.index);
        setIndex(response.data.index);
        setClassification(response.data.classification);
      } else {
        throw new Error("Failed to fetch index.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Error fetching Fear & Greed Index. Try again later.");
    }
  };

  useEffect(() => {
    fetchIndex();
  }, []);

  useEffect(() => {
    console.log("State Index Updated:", index); // Debugging state updates
  }, [index]);

  const COLORS = ["#ff0000", "#ff7f00", "#ffff00", "#7fff00", "#008000"];

  const getGaugeColor = (value) => {
    if (value < 20) return COLORS[0]; // Red (Extreme Fear)
    if (value < 40) return COLORS[1]; // Orange (Fear)
    if (value < 60) return COLORS[2]; // Yellow (Neutral)
    if (value < 80) return COLORS[3]; // Light Green (Greed)
    return COLORS[4]; // Green (Extreme Greed)
  };

  // Use API data or fallback to 50 if data is not yet available
  const gaugeValue = index !== null ? index : 50;
  const gaugeColor = getGaugeColor(gaugeValue);

  console.log("Index:", gaugeValue, "Color:", gaugeColor); // Debugging chart color

  const data = [
    { value: 100 - gaugeValue }, // Background (gray)
    { value: gaugeValue }, // Colored portion
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h5>Crypto Fear & Greed Index</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : index !== null ? (
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FearGreedIndex;
