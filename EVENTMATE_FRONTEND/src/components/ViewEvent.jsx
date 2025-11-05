// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";


// const ViewEventPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const booking = state?.booking;

//   if (!booking) {
//     navigate("/mybookings");
//     return null;
//   }

//   return (
//     <div className="viewevent-container">
//       <div className="viewevent-card">
//         <img
//           src={
//             booking.type?.toLowerCase().includes("birthday")
//               ? "/birthday.jpg"
//               : booking.type?.toLowerCase().includes("wedding")
//               ? "/wedding.jpg"
//               : booking.type?.toLowerCase().includes("anniversary")
//               ? "/anniversary.jpg"
//               : booking.type?.toLowerCase().includes("gamenight")
//               ? "/gamenight.jpg"
//             : booking.type?.toLowerCase().includes("party")
//               ? "/party.jpg"
//             : booking.type?.toLowerCase().includes("camping")
//               ? "/camping.jpg"
//               : "/images/default.jpg"
//           }
//           alt={booking.type}
//           className="event-image"
//         />

//         <div className="event-details">
//           <h2>{booking.name || booking.type}</h2>
//           <p><strong>Type:</strong> {booking.type}</p>
//           <p><strong>Date:</strong> {booking.date}</p>
//           <p><strong>Time:</strong> {booking.time || "Not specified"}</p>
//           <p><strong>City:</strong> {booking.city}</p>
//           <p><strong>Guests:</strong> {booking.capacity}</p>
//           <p><strong>Budget:</strong> ₹{booking.budget}</p>
//           <p><strong>Decoration:</strong> {booking.decoration}</p>
//           {/* Food Section */}
// {booking.food && (
//   <div className="detail-section">
//     <h3>🍽️ Food Details</h3>
//     <p><strong>Starters:</strong> {booking.food.starters || "Not specified"}</p>
//     <p><strong>Main Course:</strong> {booking.food.mainCourse || "Not specified"}</p>
//     <p><strong>Dessert:</strong> {booking.food.dessert || "Not specified"}</p>
//   </div>
// )}

// {/* Music System Section */}
// {booking.musicSystem && (
//   <div className="detail-section">
//     <h3>🎵 Music System</h3>
//     <p><strong>Name:</strong> {booking.musicSystem.name}</p>
//     <p><strong>City:</strong> {booking.musicSystem.city}</p>
//     <p><strong>Rating:</strong> ⭐ {booking.musicSystem.rating}</p>
//   </div>
// )}
// {/* Photographer Section */}
// {booking.photographer && (
//   <div className="detail-section">
//     <h3>📸 Photographer</h3>
//     <p><strong>Name:</strong> {booking.photographer.name}</p>
//     <p><strong>City:</strong> {booking.photographer.city}</p>
//     <p><strong>Rating:</strong> ⭐ {booking.photographer.rating}</p>
//     {booking.photographer.price && (
//       <p><strong>Price:</strong> ₹{booking.photographer.price}</p>
//     )}
//   </div>
// )}

//           {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}

//           <button className="back-btn" onClick={() => navigate("/dashboard")}>
//             ← Back to Bookings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewEventPage;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewEventPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.booking; // full Event object from backend

  if (!event) {
    navigate("/mybookings");
    return null;
  }

  // ✅ Extract nested entities safely
  const venue = event.eventVenue || {};
  const musicSystem = event.eventMusicSystem || {};
  const photographer = event.eventPhotographer || {};
  const user = event.eventUser || {};

  // ✅ Image selection logic (unchanged UI)
  const getImageByType = (type) => {
    if (!type) return "/images/default.jpg";
    const lower = type.toLowerCase();
    if (lower.includes("birthday")) return "/birthday.jpg";
    if (lower.includes("wedding")) return "/wedding.jpg";
    if (lower.includes("anniversary")) return "/anniversary.jpg";
    if (lower.includes("gamenight")) return "/gamenight.jpg";
    if (lower.includes("party")) return "/party.jpg";
    if (lower.includes("camping")) return "/camping.jpg";
    return "/images/default.jpg";
  };

  return (
    <div className="viewevent-container">
      <div className="viewevent-card">
        <img
          src={getImageByType(event.eventType)}
          alt={event.eventType}
          className="event-image"
        />

        <div className="event-details">
          {/* Main Event Details */}
          <h2>{event.eventName || event.eventType}</h2>
          <p>
            <strong>Type:</strong> {event.eventType}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {event.eventDate ? event.eventDate : "Not specified"}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {event.eventTime ? event.eventTime : "Not specified"}
          </p>
          <p>
            <strong>City:</strong>{" "}
            {venue.venueCity || user.userCity || "Unknown City"}
          </p>
          <p>
            <strong>Guests:</strong>{" "}
            {venue.venueCapacity ? venue.venueCapacity : "Not specified"}
          </p>
          <p>
            <strong>Budget:</strong> ₹
            {venue.venuePrice ? venue.venuePrice : "Not specified"}
          </p>
          <p>
            <strong>Decoration:</strong>{" "}
            {event.eventDecoration || "Not specified"}
          </p>

          {/* ✅ Food Section */}
          {event.eventFood && (
            <div className="detail-section">
              <h3>🍽️ Food Details</h3>
              <p>
                <strong>Food Type:</strong> {event.eventFood}
              </p>
            </div>
          )}

          {/* ✅ Music System Section */}
          {event.eventMusicSystem && (
            <div className="detail-section">
              <h3>🎵 Music System</h3>
              <p>
                <strong>Name:</strong>{" "}
                {musicSystem.musicSystemName || "Not specified"}
              </p>
              <p>
                <strong>City:</strong>{" "}
                {musicSystem.musicSystemCity || "Not specified"}
              </p>
              {musicSystem.musicSystemRating && (
                <p>
                  <strong>Rating:</strong> ⭐ {musicSystem.musicSystemRating}
                </p>
              )}
              {musicSystem.musicSystemPrice && (
                <p>
                  <strong>Price:</strong> ₹{musicSystem.musicSystemPrice}
                </p>
              )}
            </div>
          )}

          {/* ✅ Photographer Section */}
          {event.eventPhotographer && (
            <div className="detail-section">
              <h3>📸 Photographer</h3>
              <p>
                <strong>Name:</strong>{" "}
                {photographer.photographerName || "Not specified"}
              </p>
              <p>
                <strong>City:</strong>{" "}
                {photographer.photographerCity || "Not specified"}
              </p>
              {photographer.photographerRating && (
                <p>
                  <strong>Rating:</strong> ⭐ {photographer.photographerRating}
                </p>
              )}
              {photographer.photographerPrice && (
                <p>
                  <strong>Price:</strong> ₹{photographer.photographerPrice}
                </p>
              )}
            </div>
          )}

          {/* ✅ Notes Section */}
          {event.eventNotes && (
            <p>
              <strong>Notes:</strong> {event.eventNotes}
            </p>
          )}

          {/* ✅ Back Button */}
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEventPage;
