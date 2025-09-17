import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";


const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const service = location.state; 

  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    name: "",
    type: service?.title || "", 
    description: "",
    date: "",
    time: "",
    duration: "",
    venue: "",
    capacity: "",
    guests: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send it to backend / database later
    console.log("Event submitted:", formData);

    
    alert("Event submitted! (check console)");

    
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter event name"
              />
            </div>

            
            <div>
              <label>Event Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                readOnly
              />
            </div>

            <div>
              <label>Event Description</label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
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
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Duration (optional)</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
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
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter venue"
              />
            </div>
            <div>
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
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
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Enter number of guests"
              />
            </div>
            <div>
              <label>Special Notes</label>
              <textarea
                rows="3"
                name="notes"
                value={formData.notes}
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