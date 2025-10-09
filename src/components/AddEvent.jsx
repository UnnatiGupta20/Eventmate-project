import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const service = location.state;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [cities, setCities] = useState([]); // ✅ store city list
  const [halls,setHalls]=useState([]);

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: service?.title || "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventDuration: "",
    eventCity: "",
    eventHall: "",
    eventCapacity: "",
    eventGuests: "",
    eventNotes: "",
  });

  // ✅ Fetch city list on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("http://localhost:8080/citylist");
        if (res.ok) {
          const data = await res.json();
          setCities(data); // set city list
        }
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    };

    fetchCities();

    
    
    

    // Optional: verify session before showing form
    const checkSession = async () => {
      const res = await fetch("http://localhost:8080/getSessionUser", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate]);

  // ✅ Fetch halls whenever city changes
  useEffect(() => {
    const fetchHalls = async () => {
      if (!formData.eventCity) return; // no city selected
      try {
        const res = await fetch(`http://localhost:8080/hall_list?city=${formData.eventCity}`);
        if (res.ok) {
          const data = await res.json();
          setHalls(data);
        } else {
          setHalls([]);
        }
      } catch (err) {
        console.error("Failed to fetch halls:", err);
        setHalls([]);
      }
    };
    fetchHalls();
  }, [formData.eventCity]);
  useEffect(() => {
  const fetchCapacity = async () => {
    if (!formData.eventHall) return;
    try {
      const res = await fetch(`http://localhost:8080/hallCapacity?hall=${formData.eventHall}&city=${formData.eventCity}`);
      if (res.ok) {
        const capacity = await res.json();
        setFormData(prev => ({ ...prev, eventCapacity: capacity }));
      } else {
        setFormData(prev => ({ ...prev, eventCapacity: "" }));
      }
    } catch (err) {
      console.error("Failed to fetch hall capacity:", err);
      setFormData(prev => ({ ...prev, eventCapacity: "" }));
    }
  };

  fetchCapacity();
}, [formData.eventHall]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "eventCity") {
      // reset hall selection when city changes
      setFormData({ ...formData, eventCity: e.target.value, eventHall: "" });
    }
  };
  
  

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8080/addevent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...formData, serviceId: id }),
    });

    // ✅ If event added successfully
    if (response.ok) {
      const data = await response.json();
      console.log("Event saved:", data);
      alert("Event saved successfully!");
      navigate("/services");
      return;
    }

    // ✅ If session expired
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    // ✅ If overlapping event detected (status 409 from backend)
    if (response.status === 409) {
      const msg = await response.text();
      alert(msg); // Shows: "Already an event is scheduled at Grand Galaxy Banquet in Mumbai at 17:00."
      return;
    }

    // ✅ For any other backend errors
    const errorText = await response.text();
    alert(errorText || "Failed to save event. Please try again.");
  } catch (error) {
    console.error("Error saving event:", error);
    alert("Error connecting to backend.");
  }
};


  return (
    <div className="add-event" style={{ padding: "2rem" }}>
      <h2>Add Event – {service?.title || `Service ${id}`}</h2>

      {/* Sub navigation */}
      <div className="subnav" style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <button className={activeTab === "details" ? "active" : ""} onClick={() => setActiveTab("details")}>Event Details</button>
        <button className={activeTab === "datetime" ? "active" : ""} onClick={() => setActiveTab("datetime")}>Date & Time</button>
        <button className={activeTab === "venue" ? "active" : ""} onClick={() => setActiveTab("venue")}>Venue</button>
        <button className={activeTab === "guests" ? "active" : ""} onClick={() => setActiveTab("guests")}>Guests</button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "details" && (
          <form className="event-form">
            <div>
              <label>Event Name</label>
              <input required  type="text" name="eventName"  value={formData.eventName} onChange={handleChange} placeholder="Enter event name" />
            </div>
            <div>
              <label>Event Type</label>
              <input required   type="text" name="eventType" value={formData.eventType} readOnly />
            </div>
            <div>
              <label>Event Description</label>
              <textarea rows="4" name="eventDescription" value={formData.eventDescription} onChange={handleChange} placeholder="Write details..." />
            </div>
            <button type="button" onClick={() => setActiveTab("datetime")}>Next</button>
          </form>
        )}

        {activeTab === "datetime" && (
          <form className="event-form">
            <div>
              <label>Date</label>
              <input required   type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
            </div>
            <div>
              <label>Time</label>
              <input required    type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
            </div>
            <div>
              <label>Duration (No.of Hours)</label>
              <input required    type="number" name="eventDuration" value={formData.eventDuration} onChange={handleChange} placeholder="e.g. 3 hours" />
            </div>
            <button type="button" onClick={() => setActiveTab("venue")}>Next</button>
          </form>
        )}

        {activeTab === "venue" && (
          <form className="event-form">
            <div>
              <label>City</label>
              <select name="eventCity" value={formData.eventCity} onChange={handleChange} required   >
                <option value="">Select City</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Banquet Hall</label>
              <select name="eventHall" value={formData.eventHall} onChange={handleChange} required    disabled={!formData.eventCity}>
                <option value="">Select Hall</option>
                {halls.map((hall, idx) => (
                  <option key={idx} value={hall}>{hall}</option>
                ))}
              </select>
            </div>
            <div>
  <label>Capacity</label>
  <input 
    type="number"
    name="eventCapacity" 
    value={formData.eventCapacity} 
    placeholder="Automatically set based on hall"
    readOnly // ✅ prevents user from editing
  />
</div>


            <button type="button" onClick={() => setActiveTab("guests")}>Next</button>
          </form>
        )}

        {activeTab === "guests" && (
          <form className="event-form" onSubmit={handleSubmit}>
            <div>
              <label>Number of Guests</label>
              <input required   type="number" name="eventGuests" value={formData.eventGuests} onChange={handleChange} placeholder="Enter number of guests" />
            </div>
            <div>
              <label>Special Notes</label>
              <textarea rows="3" name="eventNotes" value={formData.eventNotes} onChange={handleChange} placeholder="Any requirements for guests..." />
            </div>
            <button type="submit" style={{ marginTop: "1rem" }}>Submit Event</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
