import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

const FearGreedIndex = () => {
  const [index, setIndex] = useState(null);
  const [classification, setClassification] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const response = await axios.get(
          "https://bitcoin-backend-pps2.onrender.com/api/fear-greed",
        );
        if (response.data.success) {
          setIndex(response.data.index);
          setClassification(response.data.classification);
        } else {
          throw new Error("Failed to fetch index.");
        }
      } catch (error) {
        setError("Error fetching Fear & Greed Index. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchIndex();
  }, []);

  if (loading) {
    return <h5 style={{ textAlign: "center" }}>Loading...</h5>;
  }

  if (error) {
    return <h5 style={{ textAlign: "center", color: "red" }}>{error}</h5>;
  }

  const COLORS = ["#ff0000", "#ff7f00", "#008000"];

  const data = [
    { value: 33, color: COLORS[0] }, // Red (Fear)
    { value: 34, color: COLORS[1] }, // Orange (Neutral)
    { value: 33, color: COLORS[2] }, // Green (Greed)
  ];

  // ✅ Fixed Arrow Angle Calculation
  const angle = 225 - (index / 100) * 180; // Corrected to match Fear/Greed scale

  return (
    <div style={{ textAlign: "center" }}>
      <h6>Crypto Fear & Greed Index</h6>
      <div style={{ position: "relative", display: "inline-block" }}>
        <PieChart width={200} height={120}>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={45}
            outerRadius={65}
            dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        {/* Arrow */}
        <svg width="200" height="120" style={{ position: "absolute", top: 0, left: 0 }}>
          <line
            x1="100"
            y1="90"
            x2={100 + 35 * Math.cos((angle * Math.PI) / 180)}
            y2={90 - 35 * Math.sin((angle * Math.PI) / 180)}
            stroke="black"
            strokeWidth="3"
          />
          <circle cx="100" cy="90" r="4" fill="black" />
        </svg>
        <h4 style={{ margin: "5px 0" }}>{index}/100</h4>
        <h6>{classification}</h6>
      </div>
    </div>
  );
};

export default FearGreedIndex;
