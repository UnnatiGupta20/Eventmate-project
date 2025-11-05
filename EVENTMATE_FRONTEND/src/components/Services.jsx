// /*  
// ============================  
// 📌 BACKEND INTEGRATION NOTES  
// ============================  

// 1️⃣ **Event Booking System (Don’t Miss the Fun Section)**  
// - Currently, “Book” button only changes UI state to “Booked”.  
// - Backend should implement:
//   POST /api/bookings
//   {
//     "userId": "<loggedInUserId>",
//     "eventId": "<selectedEventId>"
//   }
//   → Respond with success or “Event already booked”.

// - On success:
//   - Save booking in `bookings` table/collection: { userId, eventId, status: "booked", createdAt }
//   - Return updated booking status.

// ---

// 2️⃣ **Fetch Events by City**
// - Replace `sampleEvents` with API data:
//   GET /api/events?city=<cityName>
//   → Return list of events for user’s city.

// ---

// 3️⃣ **User Authentication**
// - Frontend currently checks localStorage.
// - Backend should validate token/session and return 401 if unauthorized.

// ---

// 4️⃣ **Bookings Retrieval**
// - Backend endpoint:
//   GET /api/bookings?userId=<id>
//   → Returns all booked events.
//   → Used later to mark “Book” buttons as “Booked ✅”.

// ---

// 5️⃣ **Venue Availability (Future Feature)**
// - Prevent multiple bookings of same venue/date:
//   GET /api/venues/available?date=YYYY-MM-DD
//   → Return only available venues for that date.

// ✅ Summary:
// Frontend is simulated for now — ready for backend connection.
// ============================  
// */

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Services = () => {
//   const navigate = useNavigate();
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [showCityEvents, setShowCityEvents] = useState(false);
//   const [showProfilePopup, setShowProfilePopup] = useState(false);
//   const [cityEvents, setCityEvents] = useState([]);
//   const [userCity, setUserCity] = useState("");
//   const [bookedEvents, setBookedEvents] = useState([]); // ✅ Track booked events

//   // 🔹 Fake Events Data
//   const sampleEvents = [
//     { id: 1, city: "Mumbai", type: "Tech", title: "CodeVerse", date: "2025-12-15" },
//     { id: 2, city: "Mumbai", type: "Music", title: "BeatBazaar", date: "2025-11-10" },
//     { id: 3, city: "Delhi", type: "Music", title: "SoundScape", date: "2025-10-20" },
//     { id: 4, city: "Mumbai", type: "Food", title: "Spice Symphony", date: "2025-09-05" },
//     { id: 5, city: "Bengaluru", type: "Tech", title: "ByteFest", date: "2025-08-25" },
//     { id: 6, city: "Mumbai", type: "Music", title: "Open Air Music Night", date: "2025-09-12" },
//     { id: 7, city: "Delhi", type: "Food", title: "Street Food Carnival", date: "2025-11-02" },
//     { id: 8, city: "Bengaluru", type: "Food", title: "Feastopia", date: "2025-10-01" },
//   ];

//   const services = [
//     { id: 1, url: "/birthday.jpg", title: "Birthday Planning" },
//     { id: 2, url: "/anniversary.jpg", title: "Anniversary Planning" },
//     { id: 3, url: "/camping.jpg", title: "Camping Trip Planning" },
//     { id: 4, url: "/gamenight.jpg", title: "Game Night Planning" },
//     { id: 5, url: "/party.jpg", title: "Party Planning" },
//     { id: 6, url: "/wedding.jpg", title: "Wedding Planning" },
//   ];

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.city) {
//       setUserCity(user.city);
//     }
//   }, []);

//   const handleClick = (service) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       navigate(`/addevent/${service.id}`, { state: service });
//     } else {
//      // setShowLoginPopup(true);
//       navigate(`/addevent/${service.id}`, { state: service });
//     }
//   };

//   const handleLoginRedirect = () => {
//     setShowLoginPopup(false);
//     navigate("/auth");
//   };

//   // 🔹 “Don’t Miss the Fun” Button Logic
//   const handleDontMissClick = () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       setShowLoginPopup(true);
//       return;
//     }

//     const isProfileComplete =
//       user.city?.trim() && user.state?.trim() && user.phone?.trim();

//     if (isProfileComplete) {
//       const userCityEvents = sampleEvents.filter(
//         (e) => e.city.toLowerCase() === user.city.toLowerCase()
//       );
//       setCityEvents(userCityEvents);
//       setShowCityEvents(true);
//       setShowProfilePopup(false);
//     } else {
//       setShowProfilePopup(true);
//     }
//   };

//   // 🎟 Handle "Book" button click
//   const handleBookClick = (event) => {
//     if (bookedEvents.includes(event.id)) return; // prevent duplicate booking
//     setBookedEvents((prev) => [...prev, event.id]);
//     alert(`🎉 You booked "${event.title}" successfully!`);
//   };

//   // 🔹 Get emoji by type
//   const getEventIcon = (type) => {
//     switch (type) {
//       case "Tech":
//         return "💻";
//       case "Food":
//         return "🍴";
//       case "Music":
//         return "🎧";
//       default:
//         return "🎉";
//     }
//   };

//   return (
//     <div className="services container">
//       <h2>OUR SERVICES</h2>

//       {/* 🎉 Don’t Miss the Fun Section */}
//       <div className="dont-miss">
//         <p>Don’t have anything to book? Don’t miss the fun!</p>
//         <button className="fun-btn" onClick={handleDontMissClick}>
//           🎊 Book Events Near Your City
//         </button>
//       </div>

//       {/* 🔹 Services Grid */}
//       <div className="banner">
//         {services.map((element) => (
//           <div
//             className="item"
//             key={element.id}
//             onClick={() => handleClick(element)}
//             style={{ cursor: "pointer" }}
//           >
//             <h3>{element.title}</h3>
//             <img src={element.url} alt={element.title} />
//           </div>
//         ))}
//       </div>

//       {/* 🔸 Login Required Popup */}
//       {showLoginPopup && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <h3>Login Required</h3>
//             <p>Please login to continue.</p>
//             <div className="popup-buttons">
//               <button className="popup-btn login" onClick={handleLoginRedirect}>
//                 Go to Login
//               </button>
//               <button
//                 className="popup-btn cancel"
//                 onClick={() => setShowLoginPopup(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔸 Profile Not Completed Popup */}
//       {showProfilePopup && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <h3>Complete Your Profile</h3>
//             <p>Please complete your profile to see events near you.</p>
//             <div className="popup-buttons">
//               <button
//                 className="popup-btn login"
//                 onClick={() => navigate("/complete-profile")}
//               >
//                 Complete Now
//               </button>
//               <button
//                 className="popup-btn cancel"
//                 onClick={() => setShowProfilePopup(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔸 City Events Popup with Cards */}
//       {showCityEvents && (
//         <div className="popup-overlay">
//           <div className="popup events-popup">
//             <h3>🎊 Events in {userCity}</h3>

//             {cityEvents.length > 0 ? (
//               <div className="event-cards">
//                 {cityEvents.map((event) => (
//                   <div className="event-card" key={event.id}>
//                     <div className="event-icon">{getEventIcon(event.type)}</div>
//                     <div className="event-info">
//                       <h4>{event.title}</h4>
//                       <p>
//                         <strong>Type:</strong> {event.type} <br />
//                         <strong>Date:</strong> {event.date}
//                       </p>
//                     </div>
//                     <button
//                       className={`book-btn ${
//                         bookedEvents.includes(event.id) ? "booked" : ""
//                       }`}
//                       onClick={() => handleBookClick(event)}
//                       disabled={bookedEvents.includes(event.id)}
//                     >
//                       {bookedEvents.includes(event.id) ? "Booked ✅" : "Book"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No events available in your city yet.</p>
//             )}

//             <button
//               className="popup-btn cancel close-btn"
//               onClick={() => setShowCityEvents(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Services;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCityEvents, setShowCityEvents] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [cityEvents, setCityEvents] = useState([]);
  const [userCity, setUserCity] = useState("");
  const [bookedEvents, setBookedEvents] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  // 🔹 Fetch Active User from Session
  useEffect(() => {
    fetch("http://localhost:8080/user/getsession", {
      method: "GET",
      credentials: "include", // important to include session cookie
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setActiveUser(data);
          setUserCity(data.userCity || "");
        } else {
          setActiveUser(null);
        }
      })
      .catch(() => setActiveUser(null));
  }, []);

  const sampleEvents = [
    { id: 1, city: "Mumbai", type: "Tech", title: "CodeVerse", date: "2025-12-15" },
    { id: 2, city: "Mumbai", type: "Music", title: "BeatBazaar", date: "2025-11-10" },
    { id: 3, city: "Delhi", type: "Music", title: "SoundScape", date: "2025-10-20" },
    { id: 4, city: "Mumbai", type: "Food", title: "Spice Symphony", date: "2025-09-05" },
    { id: 5, city: "Bengaluru", type: "Tech", title: "ByteFest", date: "2025-08-25" },
    { id: 6, city: "Mumbai", type: "Music", title: "Open Air Music Night", date: "2025-09-12" },
    { id: 7, city: "Delhi", type: "Food", title: "Street Food Carnival", date: "2025-11-02" },
    { id: 8, city: "Bengaluru", type: "Food", title: "Feastopia", date: "2025-10-01" },
  ];

  const services = [
    { id: 1, url: "/birthday.jpg", title: "Birthday Planning" },
    { id: 2, url: "/anniversary.jpg", title: "Anniversary Planning" },
    { id: 3, url: "/camping.jpg", title: "Camping Trip Planning" },
    { id: 4, url: "/gamenight.jpg", title: "Game Night Planning" },
    { id: 5, url: "/party.jpg", title: "Party Planning" },
    { id: 6, url: "/wedding.jpg", title: "Wedding Planning" },
  ];

  // 🔸 Handle Service Click
  const handleClick = (service) => {
    if (activeUser) {
      navigate(`/addevent/${service.id}`, { state: service });
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginPopup(false);
    navigate("/auth");
  };

  // 🔸 Handle “Don’t Miss the Fun”
  const handleDontMissClick = () => {
    if (!activeUser) {
      setShowLoginPopup(true);
      return;
    }

    const isProfileComplete =
      activeUser.userCity?.trim() &&
      activeUser.userState?.trim() &&
      activeUser.userMobile;

    if (isProfileComplete) {
      const userCityEvents = sampleEvents.filter(
        (e) => e.city.toLowerCase() === activeUser.userCity.toLowerCase()
      );
      setCityEvents(userCityEvents);
      setShowCityEvents(true);
      setShowProfilePopup(false);
    } else {
      setShowProfilePopup(true);
    }
  };

  // 🎟 Handle "Book" button click
  const handleBookClick = (event) => {
    if (bookedEvents.includes(event.id)) return;
    setBookedEvents((prev) => [...prev, event.id]);
    alert(`🎉 You booked "${event.title}" successfully!`);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "Tech":
        return "💻";
      case "Food":
        return "🍴";
      case "Music":
        return "🎧";
      default:
        return "🎉";
    }
  };

  return (
    <div className="services container">
      <h2>OUR SERVICES</h2>

      {/* 🎊 Don’t Miss the Fun */}
      <div className="dont-miss">
        <p>Don’t have anything to book? Don’t miss the fun!</p>
        <button className="fun-btn" onClick={handleDontMissClick}>
          🎊 Book Events Near Your City
        </button>
      </div>

      {/* 🔹 Services Grid */}
      <div className="banner">
        {services.map((element) => (
          <div
            className="item"
            key={element.id}
            onClick={() => handleClick(element)}
            style={{ cursor: "pointer" }}
          >
            <h3>{element.title}</h3>
            <img src={element.url} alt={element.title} />
          </div>
        ))}
      </div>

      {/* 🔸 Login Required Popup */}
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Login Required</h3>
            <p>Please login to continue.</p>
            <div className="popup-buttons">
              <button className="popup-btn login" onClick={handleLoginRedirect}>
                Go to Login
              </button>
              <button
                className="popup-btn cancel"
                onClick={() => setShowLoginPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔸 Profile Incomplete Popup */}
      {showProfilePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Complete Your Profile</h3>
            <p>Please complete your profile to see events near you.</p>
            <div className="popup-buttons">
              <button
                className="popup-btn login"
                onClick={() => navigate("/complete-profile")}
              >
                Complete Now
              </button>
              <button
                className="popup-btn cancel"
                onClick={() => setShowProfilePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔸 City Events Popup */}
      {showCityEvents && (
        <div className="popup-overlay">
          <div className="popup events-popup">
            <h3>🎊 Events in {userCity}</h3>

            {cityEvents.length > 0 ? (
              <div className="event-cards">
                {cityEvents.map((event) => (
                  <div className="event-card" key={event.id}>
                    <div className="event-icon">{getEventIcon(event.type)}</div>
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p>
                        <strong>Type:</strong> {event.type} <br />
                        <strong>Date:</strong> {event.date}
                      </p>
                    </div>
                    <button
                      className={`book-btn ${
                        bookedEvents.includes(event.id) ? "booked" : ""
                      }`}
                      onClick={() => handleBookClick(event)}
                      disabled={bookedEvents.includes(event.id)}
                    >
                      {bookedEvents.includes(event.id) ? "Booked ✅" : "Book"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No events available in your city yet.</p>
            )}

            <button
              className="popup-btn cancel close-btn"
              onClick={() => setShowCityEvents(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
