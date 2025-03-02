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

  const COLORS = ["#ff0000", "#ff7f00", "#008000"]; // Red (Fear), Orange (Neutral), Green (Greed)

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

  const data = [
    { value: 33.3, color: COLORS[0] }, // Red (0-33)
    { value: 33.3, color: COLORS[1] }, // Orange (34-66)
    { value: 33.4, color: COLORS[2] }, // Green (67-100)
  ];

  // Calculate arrow position
  const arrowRotation = (index / 100) * 180 - 90;

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      {/* Arrow Indicator */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "40px",
          transform: `translateX(-50%) rotate(${arrowRotation}deg)`,
          transformOrigin: "bottom center",
          fontSize: "20px",
        }}>
        ⬆️
      </div>
      <h3>{index}/100</h3>
      <h5>{classification}</h5>
    </div>
  );
};

export default FearGreedIndex;
