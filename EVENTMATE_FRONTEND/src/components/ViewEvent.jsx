import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ViewEventPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  if (!booking) {
    navigate("/mybookings");
    return null;
  }

  return (
    <div className="viewevent-container">
      <div className="viewevent-card">
        <img
          src={
            booking.type?.toLowerCase().includes("birthday")
              ? "/birthday.jpg"
              : booking.type?.toLowerCase().includes("wedding")
              ? "/wedding.jpg"
              : booking.type?.toLowerCase().includes("anniversary")
              ? "/anniversary.jpg"
              : booking.type?.toLowerCase().includes("gamenight")
              ? "/gamenight.jpg"
            : booking.type?.toLowerCase().includes("party")
              ? "/party.jpg"
            : booking.type?.toLowerCase().includes("camping")
              ? "/camping.jpg"
              : "/images/default.jpg"
          }
          alt={booking.type}
          className="event-image"
        />

        <div className="event-details">
          <h2>{booking.name || booking.type}</h2>
          <p><strong>Type:</strong> {booking.type}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time || "Not specified"}</p>
          <p><strong>City:</strong> {booking.city}</p>
          <p><strong>Guests:</strong> {booking.capacity}</p>
          <p><strong>Budget:</strong> ₹{booking.budget}</p>
          <p><strong>Decoration:</strong> {booking.decoration}</p>
          {/* Food Section */}
{booking.food && (
  <div className="detail-section">
    <h3>🍽️ Food Details</h3>
    <p><strong>Starters:</strong> {booking.food.starters || "Not specified"}</p>
    <p><strong>Main Course:</strong> {booking.food.mainCourse || "Not specified"}</p>
    <p><strong>Dessert:</strong> {booking.food.dessert || "Not specified"}</p>
  </div>
)}

{/* Music System Section */}
{booking.musicSystem && (
  <div className="detail-section">
    <h3>🎵 Music System</h3>
    <p><strong>Name:</strong> {booking.musicSystem.name}</p>
    <p><strong>City:</strong> {booking.musicSystem.city}</p>
    <p><strong>Rating:</strong> ⭐ {booking.musicSystem.rating}</p>
  </div>
)}
{/* Photographer Section */}
{booking.photographer && (
  <div className="detail-section">
    <h3>📸 Photographer</h3>
    <p><strong>Name:</strong> {booking.photographer.name}</p>
    <p><strong>City:</strong> {booking.photographer.city}</p>
    <p><strong>Rating:</strong> ⭐ {booking.photographer.rating}</p>
    {booking.photographer.price && (
      <p><strong>Price:</strong> ₹{booking.photographer.price}</p>
    )}
  </div>
)}

          {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}

          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEventPage;
