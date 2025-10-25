import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  // ✅ List of available services
  const services = [
    { id: 1, url: "/birthday.jpg", title: "Birthday Planning" },
    { id: 2, url: "/anniversary.jpg", title: "Anniversary Planning" },
    { id: 3, url: "/camping.jpg", title: "Camping Trip Planning" },
    { id: 4, url: "/gamenight.jpg", title: "Game Night Planning" },
    { id: 5, url: "/party.jpg", title: "Party Planning" },
    { id: 6, url: "/wedding.jpg", title: "Wedding Planning" },
  ];

  // ✅ Handle service click
  const handleClick = (service) => {
    navigate(`/addevent/${service.id}`, { state: service });
  };

  return (
    <div className="services container" style={styles.container}>
      <h2 style={styles.heading}>OUR SERVICES</h2>

      <div className="banner" style={styles.banner}>
        {services.map((service) => (
          <div
            key={service.id}
            className="item"
            style={styles.item}
            onClick={() => handleClick(service)}
          >
            <img
              src={service.url}
              alt={service.title}
              style={styles.image}
            />
            <h3 style={styles.title}>{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Inline styling for quick layout (you can move this to a CSS file)
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  banner: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  image: {
    width: "100%",
    height: "180px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  title: {
    marginTop: "10px",
    fontSize: "1.1rem",
    color: "#333",
  },
};

export default Services;

