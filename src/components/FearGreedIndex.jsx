import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Sector } from "recharts";

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

  const gaugeValue = index !== null ? index : 50;

  const COLORS = ["#ff0000", "#ff7f00", "#ffff00", "#7fff00", "#008000"];

  const getGaugeColor = (value) => {
    if (value < 20) return COLORS[0];
    if (value < 40) return COLORS[1];
    if (value < 60) return COLORS[2];
    if (value < 80) return COLORS[3];
    return COLORS[4];
  };

  const gaugeColor = getGaugeColor(gaugeValue);

  const data = [
    { value: 33, color: "#ff0000" }, // Red
    { value: 34, color: "#ff7f00" }, // Orange
    { value: 33, color: "#008000" }, // Green
  ];

  const angle = (gaugeValue / 100) * 180 - 90;

  return (
    <div style={{ textAlign: "center" }}>
      <h5>Crypto Fear & Greed Index</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div style={{ position: "relative", display: "inline-block" }}>
          <PieChart width={220} height={130}>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={70}
              dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <svg width="220" height="130" style={{ position: "absolute", top: 0, left: 0 }}>
            <line
              x1="110"
              y1="100"
              x2={110 + 40 * Math.cos((angle * Math.PI) / 180)}
              y2={100 + 40 * Math.sin((angle * Math.PI) / 180)}
              stroke="black"
              strokeWidth="4"
            />
            <circle cx="110" cy="100" r="5" fill="black" />
          </svg>
          <h3>{gaugeValue}/100</h3>
          <h5>{classification}</h5>
        </div>
      )}
    </div>
  );
};

export default FearGreedIndex;
