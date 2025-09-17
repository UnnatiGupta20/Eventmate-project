import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { id: 1, url: "/birthday.jpg", title: "Birthday Planning" },
    { id: 2, url: "/anniversary.jpg", title: "Anniversary Planning" },
    { id: 3, url: "/camping.jpg", title: "Camping Trip Planning" },
    { id: 4, url: "/gamenight.jpg", title: "Game Night Planning" },
    { id: 5, url: "/party.jpg", title: "Party Planning" },
    { id: 6, url: "/wedding.jpg", title: "Wedding Planning" },
  ];

  const handleClick = (service) => {
    // pass the whole object so AddEvent can know its title
    navigate(`/addevent/${service.id}`, { state: service });
  };

  return (
    <div className="services container">
      <h2>OUR SERVICES</h2>
      <div className="banner">
        {services.map((element) => (
          <div
            className="item"
            key={element.id}
            onClick={() => handleClick(element)}
            style={{ cursor: "pointer" }}
          >
            <h3>{element.title}</h3>
            <img src={element.url} alt={element.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;