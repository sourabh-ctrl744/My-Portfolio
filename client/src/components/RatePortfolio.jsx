import React, { useState, useEffect } from "react";

export default function RatePortfolio() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/ratings")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const submitRating = async (value) => {
    if (submitted) return;
    setRating(value);
    setSubmitted(true);

    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stars: value })
    });
    const data = await res.json();
    setStats(data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Rate My Portfolio</h3>
      <div style={{ fontSize: "2rem", cursor: "pointer" }}>
        {[...Array(5)].map((_, i) => {
          const value = i + 1;
          return (
            <span
              key={value}
              onClick={() => submitRating(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              style={{
                color:
                  value <= (hover || rating) ? "#FFD700" : "#ccc",
                marginRight: "5px"
              }}
            >
              ★
            </span>
          );
        })}
      </div>
      <p>Average Rating: ⭐ {stats.average} ({stats.count} votes)</p>
      {submitted && <p style={{ color: "green" }}>Thanks for rating!</p>}
    </div>
  );
}
