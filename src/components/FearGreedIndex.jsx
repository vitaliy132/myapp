import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Sector } from "recharts";

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

  const COLORS = ["#ff0000", "#ff7f00", "#ffff00", "#7fff00", "#008000"]; // Red, Orange, Yellow, Light Green, Green

  const getGaugeColor = (value) => {
    if (value < 20) return COLORS[0]; // Red (Extreme Fear)
    if (value < 40) return COLORS[1]; // Orange (Fear)
    if (value < 60) return COLORS[2]; // Yellow (Neutral)
    if (value < 80) return COLORS[3]; // Light Green (Greed)
    return COLORS[4]; // Green (Extreme Greed)
  };

  const gaugeValue = index !== null ? index : 50;
  const gaugeColor = getGaugeColor(gaugeValue);

  console.log("Index:", gaugeValue, "Color:", gaugeColor);

  const data = [
    { value: 20, color: COLORS[0] }, // Red (Extreme Fear)
    { value: 20, color: COLORS[1] }, // Orange (Fear)
    { value: 20, color: COLORS[2] }, // Yellow (Neutral)
    { value: 20, color: COLORS[3] }, // Light Green (Greed)
    { value: 20, color: COLORS[4] }, // Green (Extreme Greed)
  ];

  // Arrow calculations
  const angle = (gaugeValue / 100) * 180 - 90; // Convert index (0-100) to -90 to 90 degrees
  const arrowLength = 50; // Length of the arrow
  const arrowX = 100 + arrowLength * Math.cos((angle * Math.PI) / 180); // Rotate based on angle
  const arrowY = 100 + arrowLength * Math.sin((angle * Math.PI) / 180);

  return (
    <div style={{ textAlign: "center" }}>
      <h5>Crypto Fear & Greed Index</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : index !== null ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg width={200} height={120}>
            {/* Bar Chart */}
            <PieChart width={200} height={120}>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                isAnimationActive={false}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            {/* Arrow Indicator */}
            <line x1="100" y1="100" x2={arrowX} y2={arrowY} stroke="black" strokeWidth="3" />
            <polygon
              points={`${arrowX - 5},${arrowY - 5} ${arrowX + 5},${arrowY - 5} ${arrowX},${
                arrowY + 5
              }`}
              fill="black"
            />
          </svg>
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
