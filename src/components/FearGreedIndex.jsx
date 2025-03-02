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

  const COLORS = ["#ff0000", "#ff7f00", "#008000"];

  const getGaugeColor = (value) => {
    if (value < 33) return COLORS[0]; // Red (Fear)
    if (value < 66) return COLORS[1]; // Orange (Neutral)
    return COLORS[2]; // Green (Greed)
  };

  const gaugeValue = index !== null ? index : 50;
  const gaugeColor = getGaugeColor(gaugeValue);

  const data = [
    { value: 33, color: COLORS[0] },
    { value: 33, color: COLORS[1] },
    { value: 34, color: COLORS[2] },
  ];

  const arrowAngle = (gaugeValue / 100) * 180 - 90;

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <h5>Crypto Fear & Greed Index</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : index !== null ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <PieChart width={200} height={120}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={70}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <svg width="200" height="120" style={{ position: "absolute", top: 0, left: 0 }}>
            <line
              x1="100"
              y1="100"
              x2={100 + 40 * Math.cos((arrowAngle * Math.PI) / 180)}
              y2={100 - 40 * Math.sin((arrowAngle * Math.PI) / 180)}
              stroke="black"
              strokeWidth="2"
            />
            <polygon
              points={`
                ${100 + 40 * Math.cos((arrowAngle * Math.PI) / 180)},
                ${100 - 40 * Math.sin((arrowAngle * Math.PI) / 180)}
                ${100 + 35 * Math.cos(((arrowAngle - 5) * Math.PI) / 180)},
                ${100 - 35 * Math.sin(((arrowAngle - 5) * Math.PI) / 180)}
                ${100 + 35 * Math.cos(((arrowAngle + 5) * Math.PI) / 180)},
                ${100 - 35 * Math.sin(((arrowAngle + 5) * Math.PI) / 180)}
              `}
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
