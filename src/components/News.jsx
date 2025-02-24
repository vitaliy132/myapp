import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://bitcoin-backend-pps2.onrender.com"; // Update with your backend URL

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchNews = async () => {
      try {
        setError(null);
        const response = await axios.get(`${API_URL}/api/bitcoin-news`, {
          signal: abortController.signal,
        });

        if (response.data.success) {
          setNews(response.data.news);
        } else {
          throw new Error(response.data.error);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to load news. Please try again later.");
          console.error("Error fetching news:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => abortController.abort();
  }, []);

  return (
    <div className="news-section p-3">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : news.length > 0 ? (
        <ul className="list-unstyled">
          {news.slice(0, 3).map((item, index) => (
            <li key={index} className="mb-3 border-bottom pb-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none">
                <h6 className="mb-1">{item.title}</h6>
              </a>
              <p className="text-muted small">
                <strong>{item.source}</strong> - {new Date(item.publishedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent news available.</p>
      )}
    </div>
  );
};

export default News;
