import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // ✅ include useNavigate

const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const service = location.state;

  const navigate = useNavigate(); // ✅ initialize navigate here

  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: service?.title || "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventDuration: "",
    eventVenue: "",
    eventCapacity: "",
    eventGuests: "",
    eventNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/addevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, serviceId: id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Event saved:", data);
        alert("Event saved successfully!");
        navigate("/services"); // ✅ redirect after success
      } else {
        alert("Failed to save event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="add-event" style={{ padding: "2rem" }}>
      <h2>Add Event – {service?.title || `Service ${id}`}</h2>

      {/* Sub navigation */}
      <div
        className="subnav"
        style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}
      >
        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => setActiveTab("details")}
        >
          Event Details
        </button>
        <button
          className={activeTab === "datetime" ? "active" : ""}
          onClick={() => setActiveTab("datetime")}
        >
          Date & Time
        </button>
        <button
          className={activeTab === "venue" ? "active" : ""}
          onClick={() => setActiveTab("venue")}
        >
          Venue
        </button>
        <button
          className={activeTab === "guests" ? "active" : ""}
          onClick={() => setActiveTab("guests")}
        >
          Guests
        </button>
      </div>

      {/* ----------- Tab content ----------- */}
      <div className="tab-content">
        {activeTab === "details" && (
          <form className="event-form">
            <div>
              <label>Event Name</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="Enter event name"
              />
            </div>

            <div>
              <label>Event Type</label>
              <input type="text" name="eventType" value={formData.eventType} readOnly />
            </div>

            <div>
              <label>Event Description</label>
              <textarea
                rows="4"
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                placeholder="Write details..."
              />
            </div>

            <button type="button" onClick={() => setActiveTab("datetime")}>
              Next
            </button>
          </form>
        )}

        {activeTab === "datetime" && (
          <form className="event-form">
            <div>
              <label>Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Time</label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Duration (optional)</label>
              <input
                type="text"
                name="eventDuration"
                value={formData.eventDuration}
                onChange={handleChange}
                placeholder="e.g. 3 hours"
              />
            </div>
            <button type="button" onClick={() => setActiveTab("venue")}>
              Next
            </button>
          </form>
        )}

        {activeTab === "venue" && (
          <form className="event-form">
            <div>
              <label>Venue</label>
              <input
                type="text"
                name="eventVenue"
                value={formData.eventVenue}
                onChange={handleChange}
                placeholder="Enter venue"
              />
            </div>
            <div>
              <label>Capacity</label>
              <input
                type="number"
                name="eventCapacity"
                value={formData.eventCapacity}
                onChange={handleChange}
                placeholder="How many people?"
              />
            </div>
            <button type="button" onClick={() => setActiveTab("guests")}>
              Next
            </button>
          </form>
        )}

        {activeTab === "guests" && (
          <form className="event-form" onSubmit={handleSubmit}>
            <div>
              <label>Number of Guests</label>
              <input
                type="number"
                name="eventGuests"
                value={formData.eventGuests}
                onChange={handleChange}
                placeholder="Enter number of guests"
              />
            </div>
            <div>
              <label>Special Notes</label>
              <textarea
                rows="3"
                name="eventNotes"
                value={formData.eventNotes}
                onChange={handleChange}
                placeholder="Any requirements for guests..."
              />
            </div>

            <button type="submit" style={{ marginTop: "1rem" }}>
              Submit Event
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
