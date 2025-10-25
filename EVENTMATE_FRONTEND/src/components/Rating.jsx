import React, { useState, useEffect } from "react";
import axios from "axios";

const Rating = () => {
  const [cities, setCities] = useState([]);
  const [halls, setHalls] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHall, setSelectedHall] = useState("");
  const [rating, setRating] = useState(1);

  // Fetch city list on mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:8080/citylist");
        if (res.ok) {
          const data = await res.json();
          setCities(data);
        }
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    };
    fetchCities();
  }, []);

  // Fetch halls when selectedCity changes
  useEffect(() => {
    const fetchHalls = async () => {
      if (!selectedCity) {
        setHalls([]);
        setSelectedHall("");
        return;
      }
      try {
        const res = await fetch(`http://localhost:8080/hall_list?city=${selectedCity}`);
        if (res.ok) {
          const data = await res.json();
          setHalls(data);
          setSelectedHall(""); // reset hall selection
        }
      } catch (err) {
        console.error("Failed to fetch halls:", err);
        setHalls([]);
      }
    };
    fetchHalls();
  }, [selectedCity]);

  const handleSubmit = () => {
    if (!selectedCity || !selectedHall) {
      alert("Please select both city and hall.");
      return;
    }

    axios
      .post(`http://localhost:8080/rating/${selectedCity}/${selectedHall}?rating=${rating}`)
      .then((res) => alert(res.data))
      .catch((err) => console.error(err));
  };

  const styles = {
    container: {
      padding: "30px",
      maxWidth: "450px",
      margin: "50px auto",
      backgroundColor: "#fff7ea",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      fontFamily: '"Nunito Sans", sans-serif',
      textAlign: "center",
    },
    heading: {
      fontSize: "26px",
      marginBottom: "20px",
      color: "#a2783a",
    },
    label: {
      display: "block",
      marginTop: "15px",
      marginBottom: "8px",
      fontWeight: 600,
      textAlign: "left",
    },
    select: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    input: {
      width: "80px",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      textAlign: "center",
    },
    button: {
      marginTop: "25px",
      padding: "10px 20px",
      backgroundColor: "#a2783a",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: 600,
      transition: "background 0.3s",
    },
    buttonHover: {
      backgroundColor: "#8a642f",
    },
  };

  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Rate Venue</h2>

      <label style={styles.label}>Select City</label>
      <select
        style={styles.select}
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">-- Choose City --</option>
        {cities.map((city, idx) => (
          <option key={idx} value={city}>
            {city}
          </option>
        ))}
      </select>

      <label style={styles.label}>Select Hall</label>
      <select
        style={styles.select}
        value={selectedHall}
        onChange={(e) => setSelectedHall(e.target.value)}
        disabled={!selectedCity}
      >
        <option value="">-- Choose Hall --</option>
        {halls.map((hall, idx) => (
          <option key={idx} value={hall}>
            {hall}
          </option>
        ))}
      </select>

      <label style={styles.label}>Rating (1-10)</label>
      <input
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={styles.input}
      />

      <br />
      <button
        style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onClick={handleSubmit}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Submit Rating
      </button>
    </div>
  );
};

export default Rating;
