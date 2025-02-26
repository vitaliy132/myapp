import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <h5>Crypto Fear & Greed Index</h5>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : index ? (
        <div>
          <h3>{index}/100</h3>
          <p>{classification}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FearGreedIndex;
