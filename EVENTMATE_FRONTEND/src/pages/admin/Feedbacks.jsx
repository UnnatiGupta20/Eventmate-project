import React, { useEffect, useState } from "react";

const Feedbacks = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate feedback loading with dummy data
    const timer = setTimeout(() => {
      setItems([
        { id: 1, name: "Ravi Sharma", email: "ravi@example.com", message: "Great app! Very easy to use." },
        { id: 2, name: "Aditi Verma", email: "aditi@example.com", message: "Nice design and user experience!" },
        { id: 3, name: "Karan Mehta", email: "karan@example.com", message: "Would love to see more events soon!" },
      ]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="content-wrapper">
      <h2 style={{ color: "#7b5c2f", marginBottom: "20px" }}>User Feedbacks</h2>

      {items.length === 0 ? (
        <p style={{ color: "#9c8b6a" }}>Loading feedbacks...</p>
      ) : (
        <div style={styles.container}>
          {items.map((it) => (
            <div key={it.id} style={styles.card}>
              <h4 style={styles.name}>{it.name}</h4>
              <p style={styles.email}>{it.email}</p>
              <p style={styles.message}>"{it.message}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "18px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #a2783a",
  },
  name: {
    margin: 0,
    fontSize: "16px",
    color: "#7b5c2f",
    fontWeight: "600",
  },
  email: {
    margin: "4px 0",
    color: "#b49e7b",
    fontSize: "13px",
  },
  message: {
    fontStyle: "italic",
    color: "#4a3b24",
    fontSize: "14px",
    marginTop: "8px",
  },
};

export default Feedbacks;
