import React, { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Ticket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // ✅ Load bookings from localStorage
  useEffect(() => {
    let userBookings = JSON.parse(localStorage.getItem("userBookings")) || [];
    const latest = JSON.parse(localStorage.getItem("latestBooking"));

    // 🔹 Backend note:
    // When backend is integrated, replace this localStorage logic
    // with API call to GET /bookings for logged-in user.
    // Ensure backend filters by user ID securely.

    if (
      latest &&
      !userBookings.some(
        (b) => b.date === latest.date && b.type === latest.type
      )
    ) {
      userBookings.push(latest);
    }

    localStorage.setItem("userBookings", JSON.stringify(userBookings));
    setBookings(userBookings);
  }, []);

  // ✅ Cancel Booking (Frontend only)
   const handleCancel = (index) => {
  const updatedBookings = bookings.map((b, i) =>
    i === index ? { ...b, status: "canceled" } : b
  );

  setBookings(updatedBookings);
  localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

  // also update latestBooking if needed
  const latest = JSON.parse(localStorage.getItem("latestBooking"));
  if (
    latest &&
    latest.date === bookings[index].date &&
    latest.type === bookings[index].type
  ) {
    localStorage.setItem(
      "latestBooking",
      JSON.stringify({ ...latest, status: "canceled" })
    );
  }
};

/*
────────────────────────────────────────────────
BACKEND INTEGRATION NOTES
────────────────────────────────────────────────

When user cancels an event:
→ Instead of deleting, we mark it as status: "canceled".
→ Backend should handle this by updating booking status in DB.

Bookings are filtered into:
"upcoming": status !== "canceled"
"past": based on current date (to be refined later)
"canceled": status === "canceled"

In final version, backend should provide:
• GET /bookings?userId={id}
• PATCH /bookings/{bookingId}/cancel (to mark canceled)
• PATCH /bookings/{bookingId}/rate (for feedback)
────────────────────────────────────────────────
*/

  // ✅ Edit / Update Booking
  const handleUpdate = (booking) => {
    // 🔹 Backend note:
    // In real app, redirect with booking ID param and fetch booking data for editing.
    navigate("/addevent/:id", { state: { editData: booking } });
  };

  // ✅ Open detailed view popup
  const handleView = (booking) => {
    navigate("/viewevent", { state: { booking } });
  };

  // ✅ Open rate service popup (dummy)
  const handleRateService = (booking) => {
    setSelectedBooking(booking);
    setShowRatingPopup(true);
  };

  // ✅ Submit rating (dummy for now)
  const handleSubmitRating = () => {
    alert(`You rated ${rating} stars!`);
    setShowRatingPopup(false);

    // 🔹 Backend note:
    // Add POST /feedback or PATCH /bookings/:id/review
    // body: { rating: number, feedback: string }
  };

  // ✅ Get event image
  const getImageByType = (type) => {
    if (!type)
      return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
    const lower = type.toLowerCase();
    if (lower.includes("birthday")) return "/birthday.jpg";
    if (lower.includes("wedding")) return "/wedding.jpg";
    if (lower.includes("camping")) return "/camping.jpg";
    if (lower.includes("anniversary")) return "/anniversary.jpg";
    if (lower.includes("party")) return "/party.jpg";
    if (lower.includes("gamenight")) return "/gamenight.jpg";
    return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
  };

  // ✅ Filter logic
 const today = new Date();

const filteredBookings = bookings.filter((b) => {
  const eventDate = new Date(b.date);

  if (filter === "upcoming") {
    return eventDate >= today && b.status !== "canceled";
  }
  if (filter === "past") {
    return eventDate < today && b.status !== "canceled";
  }
  if (filter === "canceled") {
    return b.status === "canceled";
  }
  return false;
});
/*
────────────────────────────────────────────
BACKEND NOTES:
────────────────────────────────────────────
- The app categorizes bookings into:
  • Upcoming → eventDate ≥ today && status !== "canceled"
  • Past → eventDate < today && status !== "canceled"
  • Canceled → status === "canceled"

- On backend, same logic should apply when returning categorized bookings.
- In production, `status` should also include "completed" for past confirmed events.
────────────────────────────────────────────
*/


  return (
    <div className="mybookings-page">
      <main className="bookings-section">
        <h1>
          🎟️ <span>My Bookings</span>
        </h1>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={filter === "upcoming" ? "active" : ""}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={filter === "past" ? "active" : ""}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
          <button
            className={filter === "canceled" ? "active" : ""}
            onClick={() => setFilter("canceled")}
          >
            Canceled
          </button>
        </div>

        {/* Booking Cards */}
        <div className="cards-container">
          {filteredBookings.length === 0 ? (
            <p className="no-bookings">No bookings found.</p>
          ) : (
            filteredBookings.map((event, index) => (
              <div className="booking-card" key={index}>
                <img src={getImageByType(event.type)} alt={event.type} />
                <div className="card-info1">
                  <h3>{event.type}</h3>
                  <p className="event-sub1">
                    <MapPin size={14} /> {event.city} •{" "}
                    {event.decoration || "Standard"}
                  </p>
                  <p className="event-details1">
                    <CalendarDays size={14} /> {event.date} • <Clock size={14} />{" "}
                    {event.time || "6:00 PM"}
                  </p>
                  <p className="tickets1">
                    <Ticket size={14} /> {event.capacity || 1} Guests • ₹
                    {event.budget || 0}
                  </p>

                  <div className="card-buttons">
                    {filter === "past" ? (
                      <>

                        <button
                          className="rate-btn"
                          onClick={() => handleRateService(event)}
                        >
                          ⭐ Rate Our Service
                        </button>
                      </>
                    ) : filter === "canceled" ? (
                      <button className="canceled-btn" disabled>
                        Cancelled
                      </button>
                    ) : (
                      <>
                        <button
                          className="view-btn"
                          onClick={() => handleView(event)}
                        >
                          View Details
                        </button>
                        <button
                          className="update-btn"
                          onClick={() => handleUpdate(event)}
                        >
                          Update
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(index)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ⭐ Rate Service Popup (Dummy) */}
        {showRatingPopup && (
          <div className="popup-overlay">
            <div className="popup rating-popup">
              <h3>Rate Our Service</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    color={star <= rating ? "gold" : "#ccc"}
                    onClick={() => setRating(star)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <div className="popup-actions">
                <button onClick={handleSubmitRating}>Submit</button>
                <button onClick={() => setShowRatingPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;
