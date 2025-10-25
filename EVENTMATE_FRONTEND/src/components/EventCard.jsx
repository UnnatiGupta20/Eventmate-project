// EventCard.jsx
import React from "react";
import "../css/EventCard.css"

const EventCard = ({ title, date, description }) => {
  return (
    <div className="event-card">
      <h3 className="event-title">{title}</h3>
      <p className="event-date">{date}</p>
      <p className="event-description">{description}</p>
    </div>
  );
};

export default EventCard;
