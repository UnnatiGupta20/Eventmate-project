import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const service = location.state;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("details");
  const [cities, setCities] = useState([]);
  const [halls, setHalls] = useState([]);

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: service?.title || "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventDuration: "",
    eventCity: "",
    venueName: "",
    eventCapacity: "",
    eventGuests: "",
    eventNotes: "",
  });

  // ✅ Fetch all cities + check session
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:8080/citylist");
        if (res.ok) {
          const data = await res.json();
          setCities(data);
        } else {
          console.error("Failed to fetch cities");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8080/getSessionUser", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };

    fetchCities();
    checkSession();
  }, [navigate]);

  // ✅ Fetch halls when city changes
  useEffect(() => {
    const fetchHalls = async () => {
      if (!formData.eventCity) {
        setHalls([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/hall_list?city=${encodeURIComponent(
            formData.eventCity
          )}`
        );
        if (res.ok) {
          const data = await res.json();
          setHalls(data);
        } else {
          setHalls([]);
        }
      } catch (error) {
        console.error("Error fetching halls:", error);
        setHalls([]);
      }
    };

    fetchHalls();
  }, [formData.eventCity]);

  // ✅ Fetch capacity when hall is selected
  useEffect(() => {
    const fetchCapacity = async () => {
      if (!formData.eventCity || !formData.venueName) return;

      try {
        const res = await fetch(
          `http://localhost:8080/hallCapacity?hall=${encodeURIComponent(
            formData.venueName
          )}&city=${encodeURIComponent(formData.eventCity)}`
        );
        if (res.ok) {
          const capacity = await res.json();
          setFormData((prev) => ({ ...prev, eventCapacity: capacity }));
        } else {
          setFormData((prev) => ({ ...prev, eventCapacity: "" }));
        }
      } catch (error) {
        console.error("Error fetching capacity:", error);
        setFormData((prev) => ({ ...prev, eventCapacity: "" }));
      }
    };

    fetchCapacity();
  }, [formData.venueName, formData.eventCity]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset halls and capacity when city changes
    if (name === "eventCity") {
      setFormData({
        ...formData,
        eventCity: value,
        venueName: "",
        eventCapacity: "",
      });
      setHalls([]);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.eventName || !formData.eventCity || !formData.venueName) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      eventName: formData.eventName,
      eventType: formData.eventType,
      eventDescription: formData.eventDescription,
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      eventDuration: parseInt(formData.eventDuration),
      eventGuests: parseInt(formData.eventGuests),
      eventNotes: formData.eventNotes,
      serviceId: id,
      venue: {
        venueHall: formData.venueName,
        venueCity: formData.eventCity,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/addevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Event saved successfully!");
        navigate("/services");
      } else if (response.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else if (response.status === 409) {
        const msg = await response.text();
        alert(msg);
      } else {
        const err = await response.text();
        alert(err || "Failed to save event.");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error connecting to backend.");
    }
  };

  // ✅ Render UI
  return (
    <div className="add-event" style={{ padding: "2rem" }}>
      <h2>Add Event – {service?.title || `Service ${id}`}</h2>

      {/* Tabs */}
      <div
        className="subnav"
        style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}
      >
        {["details", "datetime", "venue", "guests"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "details"
              ? "Event Details"
              : tab === "datetime"
              ? "Date & Time"
              : tab === "venue"
              ? "Venue"
              : "Guests"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* 🟩 DETAILS TAB */}
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
                required
              />
            </div>
            <div>
              <label>Event Type</label>
              <input
                type="text"
                name="eventType"
                value={formData.eventType}
                readOnly
              />
            </div>
            <div>
              <label>Event Description</label>
              <textarea
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                rows="4"
                placeholder="Write details..."
              />
            </div>
            <button type="button" onClick={() => setActiveTab("datetime")}>
              Next
            </button>
          </form>
        )}

        {/* 🟩 DATE & TIME TAB */}
        {activeTab === "datetime" && (
          <form className="event-form">
            <div>
              <label>Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Time</label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Duration (Hours)</label>
              <input
                type="number"
                name="eventDuration"
                value={formData.eventDuration}
                onChange={handleChange}
                placeholder="e.g. 3 hours"
                required
              />
            </div>
            <button type="button" onClick={() => setActiveTab("venue")}>
              Next
            </button>
          </form>
        )}

        {/* 🟩 VENUE TAB */}
        {activeTab === "venue" && (
          <form className="event-form">
            <div>
              <label>City</label>
              <select
                name="eventCity"
                value={formData.eventCity}
                onChange={handleChange}
                required
              >
                <option value="">Select City</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Banquet Hall</label>
              <select
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                disabled={!formData.eventCity}
                required
              >
                <option value="">Select Hall</option>
                {halls.map((hall, idx) => (
                  <option key={idx} value={hall}>
                    {hall}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Capacity</label>
              <input
                type="number"
                value={formData.eventCapacity}
                readOnly
                placeholder="Automatically set based on hall"
              />
            </div>
            <button type="button" onClick={() => setActiveTab("guests")}>
              Next
            </button>
          </form>
        )}

        {/* 🟩 GUESTS TAB */}
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
                required
              />
            </div>
            <div>
              <label>Special Notes</label>
              <textarea
                name="eventNotes"
                value={formData.eventNotes}
                onChange={handleChange}
                rows="3"
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
