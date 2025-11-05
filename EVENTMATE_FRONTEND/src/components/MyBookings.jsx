

import React, { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Ticket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [originalBookings, setOriginalBookings] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // ✅ Fetch user session and bookings
  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        const userRes = await axios.get("http://localhost:8080/user/getsession", {
          withCredentials: true,
        });

        if (userRes.data && userRes.data.userId) {
          const userId = userRes.data.userId;

          const bookingRes = await axios.get(
            `http://localhost:8080/event/get/${userId}`
          );

          const userBookings = bookingRes.data || [];

          // Store original backend Event objects for full access
          setOriginalBookings(userBookings);

          // Create display-friendly list for UI
          const formatted = userBookings.map((b) => ({
            id: b.eventId,
            type: b.eventType || "Event",
            city:
              b.eventVenue?.venueCity ||
              b.eventUser?.userCity ||
              "Unknown City",
            decoration: b.eventDecoration || "Standard",
            date: b.eventDate || "Date not selected",
            time: b.eventTime || "Time not selected",
            capacity: b.eventVenue?.venueCapacity || 0,
            budget: b.eventVenue?.venuePrice || 0,
            status: b.eventStatus || "active",
          }));

          setBookings(formatted);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        navigate("/");
      }
    };

    fetchUserAndBookings();
  }, [navigate]);

  // ✅ Cancel booking - update backend using eventId (safe fix)
  const handleCancel = async (eventId) => {
    try {
      // Find the event from original list using eventId
      const eventToCancel = originalBookings.find(
        (e) => e.eventId === eventId
      );

      if (!eventToCancel) {
        alert("Event not found!");
        return;
      }

      // Call backend cancel API with eventId
      await axios.put(`http://localhost:8080/event/cancel/${eventId}`, null, {
        withCredentials: true,
      });

      // Update UI locally
      const updated = bookings.map((b) =>
        b.id === eventId ? { ...b, status: "cancelled" } : b
      );
      setBookings(updated);

      alert("Event cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling event:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  // ✅ View booking - send full Event object
  const handleView = (eventId) => {
    const fullEventObject = originalBookings.find((e) => e.eventId === eventId);
    if (fullEventObject) {
      navigate("/viewevent", { state: { booking: fullEventObject } });
    } else {
      alert("Event details not found!");
    }
  };

  // ✅ Update booking - send full Event object for edit
  const handleUpdate = (eventId) => {
    const fullEventObject = originalBookings.find((e) => e.eventId === eventId);
    if (fullEventObject) {
      navigate(`/addevent/${fullEventObject.eventId}`, {
        state: { editData: fullEventObject },
      });
    } else {
      alert("Event details not found!");
    }
  };

  // ✅ Rate service
  const handleRateService = (booking) => {
    setSelectedBooking(booking);
    setShowRatingPopup(true);
  };

  const handleSubmitRating = () => {
    alert(`You rated ${rating} stars!`);
    setShowRatingPopup(false);
  };

  // ✅ Image selection logic
  const getImageByType = (type) => {
    if (!type)
      return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
    const lower = type.toLowerCase();
    if (lower.includes("birthday")) return "/birthday.jpg";
    if (lower.includes("wedding")) return "/wedding.jpg";
    if (lower.includes("camping")) return "/camping.jpg";
    if (lower.includes("anniversary")) return "/anniversary.jpg";
    if (lower.includes("party")) return "/party.jpg";
    if (lower.includes("game")) return "/gamenight.jpg";
    return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
  };

  // ✅ Filter bookings using eventStatus and eventDate
  const today = new Date();
  const filteredBookings = bookings.filter((b) => {
    const eventDate =
      b.date && b.date !== "Date not selected" ? new Date(b.date) : null;

    if (filter === "cancelled") return b.status?.toLowerCase() === "cancelled";

    if (
      filter === "upcoming" &&
      b.status?.toLowerCase() === "active" &&
      eventDate &&
      eventDate >= today
    ) {
      return true;
    }

    if (
      filter === "past" &&
      b.status?.toLowerCase() === "active" &&
      eventDate &&
      eventDate < today
    ) {
      return true;
    }

    return false;
  });

  return (
    <div className="mybookings-page">
      <main className="bookings-section">
        <h1>
          🎟️ <span>My Bookings</span>
        </h1>

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
            className={filter === "cancelled" ? "active" : ""}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>

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
                    <MapPin size={14} /> {event.city} 
                  </p>
                  <p className="event-details1">
                    <CalendarDays size={14} /> {event.date} •{" "}
                    <Clock size={14} /> {event.time}
                  </p>
                  <p className="tickets1">
                    <Ticket size={14} /> {event.maxCapacity} Guests • ₹
                    {event.budget}
                  </p>

                  <div className="card-buttons">
                    {filter === "past" ? (
                      <button
                        className="rate-btn"
                        onClick={() => handleRateService(event)}
                      >
                        ⭐ Rate Our Service
                      </button>
                    ) : filter === "cancelled" ? (
                      <button className="cancelled-btn" disabled>
                        Cancelled
                      </button>
                    ) : (
                      <>
                        <button
                          className="view-btn"
                          onClick={() => handleView(event.id)} // ✅ uses eventId
                        >
                          View Details
                        </button>
                        <button
                          className="update-btn"
                          onClick={() => handleUpdate(event.id)} // ✅ uses eventId
                        >
                          Update
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(event.id)} // ✅ uses eventId
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

