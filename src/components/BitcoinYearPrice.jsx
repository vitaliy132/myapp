import { useState, useEffect } from "react";

const API_URL = "https://training-2hyn.onrender.com/predict";

function BitcoinPricePrediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPrediction = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch prediction");

        const data = await response.json();
        if (isMounted) {
          setPrediction(data.predicted_price ?? "N/A");
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrediction();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h5>Bitcoin Price Prediction</h5>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : isNaN(prediction) || prediction === "N/A" ? (
        <p className="text-warning">Prediction not available</p>
      ) : (
        <h3>${parseFloat(prediction).toFixed(2)}</h3>
      )}
    </div>
  );
}

export default BitcoinPricePrediction;
