import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { venues, photographers, musicSystems } from "./data/venueData";

const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state;
  const editData = location.state?.editData || null;

React.useEffect(() => {
  if (editData) {
    setFormData(editData);
  }
}, [editData]);

  const [activeTab, setActiveTab] = useState("details");
  const [popupMessage, setPopupMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: service?.title || "",
    description: "",
    date: "",
    time: "",
    duration: "",
    city: "",
    budget: "",
    capacity: "",
    venue: null,
    food: { starters: "", mainCourse: "", dessert: "" },
    decoration: "Lighting",
    musicSystem: null,
    photographer: null,
    notes: "",
  });

  const [suggestedVenues, setSuggestedVenues] = useState([]);
  const [suggestedMusic, setSuggestedMusic] = useState([]);
  const [suggestedPhotographers, setSuggestedPhotographers] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoodChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      food: { ...prev.food, [type]: value },
    }));
  };

  const handleVenueSuggest = () => {
    const { city, budget, capacity } = formData;

    if (!city || !budget || !capacity) {
      setPopupMessage("Please fill city, budget, and guest count first.");
      return;
    }
    // ============================
    //  BACKEND TASK:
    // Replace this local filtering with an API call like:
    // GET /api/venues/available?date=<selectedDate>&city=<city>&budget=<budget>&capacity=<capacity>
    //
    // The backend should:
    // 1. Check which venues are already booked on the given date.
    // 2. Exclude those venues from the results.
    // 3. Return only available venues that match city, budget, and capacity.
    //
    // Expected Response Example:
    // {
    //   "availableVenues": [
    //      { "id": 1, "name": "Grand Palace", "budget": 50000, "rating": 4.5, "city": "Mumbai" },
    //      ...
    //   ]
    // }
    // ============================

    const filtered = venues.filter(
      (v) =>
        v.city.toLowerCase() === city.toLowerCase() &&
        v.budget <= Number(budget) &&
        Number(capacity) >= v.minGuests &&
        Number(capacity) <= v.maxGuests
    );

    if (filtered.length === 0) {
      const cityMatch = venues.some(
        (v) => v.city.toLowerCase() === city.toLowerCase()
      );
      const budgetMatch = venues.some((v) => v.budget <= Number(budget));
      const capacityMatch = venues.some(
        (v) =>
          Number(capacity) >= v.minGuests && Number(capacity) <= v.maxGuests
      );

      if (!cityMatch)
        setPopupMessage(`Sorry! No venues available in ${city}.`);
      else if (!budgetMatch)
        setPopupMessage(`Sorry! No venues available under ₹${budget}.`);
      else if (!capacityMatch)
        setPopupMessage(
          `Sorry! Venue not available for ${capacity} guests.`
        );
      else setPopupMessage("No matching venues found.");
      return;
    }

    setSuggestedVenues(filtered);
    setPopupMessage("");
    setActiveTab("venue");
  };

  const handleSelectVenue = (v) => {
    setSelectedVenue(v);
    setFormData((prev) => ({ ...prev, venue: v }));

    // ============================
    // BACKEND TASK:
    // Suggest related services dynamically based on the selected venue and city.
    // Example endpoints:
    // GET /api/music-systems?city=<city>
    // GET /api/photographers?city=<city>
    // ============================

    // Suggest related services
    setSuggestedMusic(
      musicSystems.filter(
        (m) => m.city.toLowerCase() === formData.city.toLowerCase()
      )
    );
    setSuggestedPhotographers(
      photographers.filter(
        (p) => p.city.toLowerCase() === formData.city.toLowerCase()
      )
    );

    // Replace all venues with the selected one
    setSuggestedVenues([v]);
  };

  const handleSelectMusic = (m) => {
    setSelectedMusic(m);
    setFormData((prev) => ({ ...prev, musicSystem: m }));
    setSuggestedMusic([m]);
  };

  const handleSelectPhotographer = (p) => {
    setSelectedPhotographer(p);
    setFormData((prev) => ({ ...prev, photographer: p }));
    setSuggestedPhotographers([p]);
  };

  const closePopup = () => setPopupMessage("");

  const handleSubmit = (e) => {
  e.preventDefault();

  // ============================
    //  BACKEND TASK:
    // When backend is ready, replace localStorage with API:
    //
    // POST /api/events
    // Body: formData (including selected venue, date, services, etc.)
    //
    // Backend should:
    // 1. Validate that the selected venue is still available for that date (final check).
    // 2. Save the booking data under the logged-in user's ID.
    // 3. Return a success message or booking ID.
    //
    // Response Example:
    // { "success": true, "message": "Event created successfully", "bookingId": 123 }

  let bookings = JSON.parse(localStorage.getItem("userBookings")) || [];

  if (editData) {
    // update existing booking
    const updated = bookings.map((b) =>
      b.date === editData.date && b.name === editData.name ? formData : b
    );
    localStorage.setItem("userBookings", JSON.stringify(updated));
    alert("Event updated successfully!");
  } else {
    // add new booking
    bookings.push({ ...formData, status: "upcoming" });
    localStorage.setItem("userBookings", JSON.stringify(bookings));
    localStorage.setItem("latestBooking", JSON.stringify(formData));
    alert("Event submitted successfully!");
  }

  navigate("/"); 
};


  return (
    <div className="add-event">
      <h2>Add Event – {service?.title || `Service ${id}`}</h2>

      {/* Sub navigation */}
      <div className="subnav">
        {["details", "datetime", "budget", "venue", "details2"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "details"
              ? "Event Details"
              : tab === "datetime"
              ? "Date & Time"
              : tab === "budget"
              ? "City & Budget"
              : tab === "venue"
              ? "Venue"
              : "Other Details"}
          </button>
        ))}
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        {/* -------- DETAILS -------- */}
        {activeTab === "details" && (
          <>
            <label>Event Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter event name"
            />

            <label>Event Type</label>
            <input name="type" value={formData.type} readOnly />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event details"
            />

            <button type="button" onClick={() => setActiveTab("datetime")}>
              Next
            </button>
          </>
        )}

        {/* -------- DATE/TIME -------- */}
        {activeTab === "datetime" && (
          <>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            <label>Duration</label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 3 hours"
            />
            <button type="button" onClick={() => setActiveTab("budget")}>
              Next
            </button>
          </>
        )}

        {/* -------- BUDGET -------- */}
        {activeTab === "budget" && (
          <>
            <label>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city (e.g. Mumbai)"
            />
            <label>Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter your budget"
            />
            <label>Number of Guests</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Enter guests count"
            />
            <button type="button" onClick={handleVenueSuggest}>
              Suggest Venues
            </button>
          </>
        )}

        {/* -------- VENUE -------- */}
        {activeTab === "venue" && (
          <div className="venue-section">
            <h3>Suggested Venues</h3>
            <div className="venue-list">
              {suggestedVenues.map((v) => (
                <div className="venue-card" key={v.id}>
                  <img
                    src={v.url}
                    alt={v.name}
                    onError={(e) =>
                      (e.target.src = "/images/placeholder.jpg")
                    }
                  />
                  <h4>{v.name}</h4>
                  <p>{v.budget}</p>
                  <p>⭐ {v.rating}</p>

                  <button
                    type="button"
                    disabled={selectedVenue?.id === v.id}
                    onClick={() => {
                      handleSelectVenue(v);
                      setActiveTab("details2");
                    }}
                    className={selectedVenue?.id === v.id ? "selected-btn" : ""}
                  >
                    {selectedVenue?.id === v.id ? "Selected" : "Select Venue"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------- OTHER DETAILS -------- */}
        {activeTab === "details2" && (
          <>
            <h3>Food Preferences</h3>
            <label>Starters</label>
            <select
              value={formData.food.starters}
              onChange={(e) => handleFoodChange("starters", e.target.value)}
            >
              <option>Select</option>
              <option>Spring Rolls</option>
              <option>Paneer Tikka</option>
              <option>Mini Samosa</option>
            </select>

            <label>Main Course</label>
            <select
              value={formData.food.mainCourse}
              onChange={(e) => handleFoodChange("mainCourse", e.target.value)}
            >
              <option>Select</option>
              <option>Butter Chicken</option>
              <option>Paneer Butter Masala</option>
              <option>Biryani</option>
            </select>

            <label>Dessert</label>
            <select
              value={formData.food.dessert}
              onChange={(e) => handleFoodChange("dessert", e.target.value)}
            >
              <option>Select</option>
              <option>Gulab Jamun</option>
              <option>Ice Cream</option>
              <option>Rasmalai</option>
            </select>

            <h3>Decoration</h3>
            <select
              name="decoration"
              value={formData.decoration}
              onChange={handleChange}
            >
              <option>Lighting</option>
              <option>Floral</option>
              <option>Theme-based</option>
            </select>

            <h3>Music Systems</h3>
            <div className="venue-list">
              {suggestedMusic.map((m) => (
                <div className="venue-card" key={m.id}>
                  <img src={m.image} alt={m.name} />
                  <h4>{m.name}</h4>
                  <p>⭐ {m.rating}</p>
                  <button
                    type="button"
                    disabled={selectedMusic?.id === m.id}
                    className={selectedMusic?.id === m.id ? "selected-btn" : ""}
                    onClick={() => handleSelectMusic(m)}
                  >
                    {selectedMusic?.id === m.id ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>

            <h3>Photographers</h3>
            <div className="venue-list">
              {suggestedPhotographers.map((p) => (
                <div className="venue-card" key={p.id}>
                  <img src={p.image} alt={p.name} />
                  <h4>{p.name}</h4>
                  <p>⭐ {p.rating}</p>
                  <button
                    type="button"
                    disabled={selectedPhotographer?.id === p.id}
                    className={
                      selectedPhotographer?.id === p.id ? "selected-btn" : ""
                    }
                    onClick={() => handleSelectPhotographer(p)}
                  >
                    {selectedPhotographer?.id === p.id ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>

            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requirements..."
            />
            <button type="submit">Submit Event</button>
          </>
        )}
      </form>

     {/* ---------- Popup ---------- */}
{popupMessage && (
  <div className="popup-overlay">
    <div className="popup">
      <p>{popupMessage}</p>
      <button onClick={closePopup}>OK</button>
    </div>
  </div>
)}

    </div>
  );
};

export default AddEvent;
