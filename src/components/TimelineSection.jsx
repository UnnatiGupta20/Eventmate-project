import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import '../css/TimelineSection.css';

const TimelineSection = () => {
  const [events, setEvents] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        // Check session
        const userRes = await fetch("http://localhost:8080/getSessionUser", {
          method: "GET",
          credentials: "include",
        });

        if (!userRes.ok) {
          setUserLoggedIn(false);
          return;
        }

        const userData = await userRes.json();
        setUserLoggedIn(true);

        // Fetch events for logged-in user
        const eventsRes = await fetch(`http://localhost:8080/userevents`, {
          method: "GET",
          credentials: "include",
        });

        if (eventsRes.ok) {
          const eventList = await eventsRes.json();
          setEvents(eventList);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setUserLoggedIn(false);
      }
    };

    fetchUserEvents();
  }, []);

  // Display card for no user
  if (!userLoggedIn) {
    return (
      <div className="timeline-container">
        <div className="timeline-line"></div>
        <div className="timeline-events">
          <div className="event-card" style={{ backgroundColor: "white", color: "#000", textAlign: "center", padding: "2rem" }}>
            Login to view your events
          </div>
        </div>
      </div>
    );
  }

  // Display card if user has no events
  if (events.length === 0) {
    return (
      <div className="timeline-container">
        <div className="timeline-line"></div>
        <div className="timeline-events">
          <div className="event-card" style={{ backgroundColor: "white", color: "#000", textAlign: "center", padding: "2rem" }}>
            No events scheduled yet
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      <div className="timeline-events">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
            date={event.eventDate}
            description={event.eventDescription || "No description"}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
