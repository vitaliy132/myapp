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

  const COLORS = ["#ff0000", "#ffa500", "#ffff00", "#7fff00", "#008000"];

  const getGaugeColor = (index) => {
    if (index < 20) return COLORS[0];
    if (index < 40) return COLORS[1];
    if (index < 60) return COLORS[2];
    if (index < 80) return COLORS[3];
    return COLORS[4];
  };

  const data = [{ value: index || 50 }, { value: 100 - (index || 50) }];

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
              <Cell key="index" fill={getGaugeColor(index)} />
              <Cell key="remaining" fill="#ddd" />
            </Pie>
          </PieChart>
          <h3>{index}/100</h3>
          <h5>{classification}</h5>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FearGreedIndex;
