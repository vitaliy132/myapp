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

  const gaugeValue = index !== null ? index : 50;

  const COLORS = ["#ff0000", "#ff7f00", "#008000"];
  const data = [
    { value: 33.3, color: COLORS[0] }, // Red (Fear)
    { value: 33.3, color: COLORS[1] }, // Orange (Neutral)
    { value: 33.3, color: COLORS[2] }, // Green (Greed)
  ];

  // Calculate arrow position
  const angle = 180 * (gaugeValue / 100); // Mapping index (0-100) to gauge's 180-degree range
  const arrowX = 100 + 50 * Math.cos((angle * Math.PI) / 180);
  const arrowY = 100 - 50 * Math.sin((angle * Math.PI) / 180);

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <h5>Crypto Fear & Greed Index</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg width={200} height={120}>
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
            {/* Arrow */}
            <line
              x1="100"
              y1="100"
              x2={arrowX}
              y2={arrowY}
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth">
                <path d="M0,0 L6,3 L0,6 Z" fill="black" />
              </marker>
            </defs>
          </svg>
          <h3>{gaugeValue}/100</h3>
          <h5>{classification}</h5>
        </div>
      )}
    </div>
  );
};

export default FearGreedIndex;
