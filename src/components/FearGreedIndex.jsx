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
        setIndex(parseInt(response.data.index));
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
  const gaugeValue = index !== null ? index : 50;

  const getGaugeColor = (value) => {
    if (value < 20) return COLORS[0]; // Red
    if (value < 40) return COLORS[1]; // Orange
    if (value < 60) return COLORS[2]; // Yellow
    if (value < 80) return COLORS[3]; // Light Green
    return COLORS[4]; // Green
  };

  const gaugeColor = getGaugeColor(gaugeValue);

  // Define gradient colors
  const gradientId = "gaugeGradient";

  // Calculate needle rotation (-90° for 0, 90° for 100)
  const needleAngle = (gaugeValue / 100) * 180 - 90;

  return (
    <div style={{ textAlign: "center", position: "relative", width: "250px", margin: "auto" }}>
      <h4>Fear & Greed Index</h4>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
          <svg width={250} height={150} viewBox="0 0 250 150">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="50%" stopColor="#ffff00" />
                <stop offset="100%" stopColor="#008000" />
              </linearGradient>
            </defs>
            <path
              d="M 25 125 A 100 100 0 0 1 225 125"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="20"
            />
            <line
              x1="125"
              y1="125"
              x2={125 + 50 * Math.cos((needleAngle * Math.PI) / 180)}
              y2={125 + 50 * Math.sin((needleAngle * Math.PI) / 180)}
              stroke="black"
              strokeWidth="4"
            />
            <circle cx="125" cy="125" r="5" fill="black" />
          </svg>
          <h3>{gaugeValue}/100</h3>
          <h5>{classification}</h5>
        </div>
      )}
    </div>
  );
};

export default FearGreedIndex;
