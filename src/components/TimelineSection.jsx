// TimelineSection.jsx
import React from "react";
import EventCard from "./EventCard";
import '../css/TimelineSection.css'; // New CSS

const events = [
  { title: "Event 1", date: "2025-09-18", description: "Description for event 1" },
  { title: "Event 2", date: "2025-09-19", description: "Description for event 2" },
  { title: "Event 3", date: "2025-09-20", description: "Description for event 3" },
];

const TimelineSection = () => {
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      <div className="timeline-events">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
