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
    if (value < 20) return COLORS[0];
    if (value < 40) return COLORS[1];
    if (value < 60) return COLORS[2];
    if (value < 80) return COLORS[3];
    return COLORS[4];
  };

  const gaugeValue = index !== null ? index : 50;
  const gaugeColor = getGaugeColor(gaugeValue);

  const data = [{ value: gaugeValue }, { value: 100 - gaugeValue }];

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
              <Cell fill={gaugeColor} />
              <Cell fill="#E0E0E0" />
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
