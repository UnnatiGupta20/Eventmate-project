


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // 🔹 Sample static events
// const sampleEvents = [
//   { id: 1, city: "Mumbai", type: "Tech", title: "CodeVerse", date: "2025-12-15" },
//   { id: 2, city: "Mumbai", type: "Music", title: "BeatBazaar", date: "2025-11-10" },
//   { id: 3, city: "Delhi", type: "Music", title: "SoundScape", date: "2025-10-20" },
//   { id: 4, city: "Mumbai", type: "Food", title: "Spice Symphony", date: "2025-09-05" },
//   { id: 5, city: "Bengaluru", type: "Tech", title: "ByteFest", date: "2025-08-25" },
//   { id: 6, city: "Mumbai", type: "Music", title: "Open Air Music Night", date: "2025-09-12" },
//   { id: 7, city: "Delhi", type: "Food", title: "Street Food Carnival", date: "2025-11-02" },
//   { id: 8, city: "Bengaluru", type: "Food", title: "Feastopia", date: "2025-10-01" },
// ];

// const groupByType = (events) => {
//   const grouped = {};
//   events.forEach((ev) => {
//     if (!grouped[ev.type]) grouped[ev.type] = [];
//     grouped[ev.type].push(ev);
//   });
//   return grouped;
// };

// // 🔹 State–City map
// const stateCityMap = {
//   AndhraPradesh: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
//   ArunachalPradesh: ["Itanagar", "Tawang", "Ziro", "Pasighat"],
//   Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
//   Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
//   Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
//   Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
//   Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
//   Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
//   Haryana: ["Gurugram", "Faridabad", "Panipat", "Karnal"],
//   HimachalPradesh: ["Shimla", "Manali", "Dharamshala", "Solan"],
//   Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
//   Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi"],
//   Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
//   MadhyaPradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
//   Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
//   Manipur: ["Imphal", "Thoubal", "Bishnupur"],
//   Meghalaya: ["Shillong", "Tura", "Jowai"],
//   Mizoram: ["Aizawl", "Lunglei", "Champhai"],
//   Nagaland: ["Kohima", "Dimapur", "Wokha"],
//   Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
//   Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
//   Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
//   Sikkim: ["Gangtok", "Namchi", "Pelling"],
//   TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
//   Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
//   Tripura: ["Agartala", "Udaipur", "Dharmanagar"],
//   UttarPradesh: ["Lucknow", "Kanpur", "Varanasi", "Noida", "Agra"],
//   Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
//   WestBengal: ["Kolkata", "Howrah", "Siliguri", "Durgapur"],
//   Chandigarh: ["Chandigarh"],
//   JammuKashmir: ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
//   Ladakh: ["Leh", "Kargil"],
//   Puducherry: ["Pondicherry", "Karaikal", "Mahe"],
//   AndamanNicobar: ["Port Blair", "Diglipur", "Rangat"],
//   Lakshadweep: ["Kavaratti", "Agatti", "Minicoy"],
// };


// const CompleteProfile = () => {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     userFullName: "",
//     userEmail: "",
//     userMobile: "",
//     userState: "",
//     userCity: "",
//     userInterests: "",
//     userImageURL: "",
//   });

//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   // ✅ Fetch session user and prefill details
//   useEffect(() => {
//     const fetchSessionUser = async () => {
//       try {
//         const res = await fetch("http://localhost:8080/user/getsession", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (res.status === 401 || res.status === 403) {
//           navigate("/auth");
//           return;
//         }

//         const data = await res.json();

//         if (data && Object.keys(data).length > 0) {
//           setProfile({
//             userFullName: data.userFullName || "",
//             userEmail: data.userEmail || "",
//             userMobile: data.userMobile ? String(data.userMobile) : "",
//             userState: data.userState || "",
//             userCity: data.userCity || "",
//             userInterests: data.userInterests || "",
//             userImageURL: data.userImageURL || "",
//           });
//         } else {
//           navigate("/auth");
//         }
//       } catch (error) {
//         console.error("Session fetch failed:", error);
//         navigate("/auth");
//       }
//     };

//     fetchSessionUser();
//   }, [navigate]);

//   // ✅ Fetch AI–based suggested events
//   useEffect(() => {
//     const city = profile.userCity?.trim();
//     if (!city) {
//       setEvents([]);
//       setMessage("");
//       return;
//     }

//     const fetchEvents = async () => {
//       setLoading(true);
//       await new Promise((r) => setTimeout(r, 700));

//       const filtered = sampleEvents.filter(
//         (e) => e.city.toLowerCase() === city.toLowerCase()
//       );

//       const candidateEvents =
//         filtered.length > 0 ? filtered : sampleEvents.slice(0, 3);

//       const interests = (profile.userInterests || "")
//         .toLowerCase()
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//       const scored = candidateEvents.map((ev) => {
//         const match = interests.some(
//           (i) =>
//             ev.type.toLowerCase().includes(i) ||
//             ev.title.toLowerCase().includes(i)
//         );
//         const score = match ? 100 + Math.random() * 10 : Math.random() * 50;
//         return { ...ev, aiScore: score };
//       });

//       scored.sort((a, b) => b.aiScore - a.aiScore);
//       setEvents(scored);
//       setLoading(false);

//       if (scored.length === 0) {
//         setMessage("No local events found for your city.");
//       }
//     };

//     const t = setTimeout(fetchEvents, 300);
//     return () => clearTimeout(t);
//   }, [profile.userCity, profile.userInterests]);

//   // ✅ Handle Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value || "" }));
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setProfile((prev) => ({
//       ...prev,
//       userState: selectedState,
//       userCity: "",
//     }));
//   };

//   // ✅ Save Updated Profile to Backend
//   const handleSave = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/user/save", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...profile,
//           userMobile: profile.userMobile
//             ? Number(profile.userMobile)
//             : null,
//         }),
//       });

//       if (res.ok) {
//         setMessage("✅ Profile saved successfully!");
//       } else {
//         setMessage("❌ Error saving profile.");
//       }
//     } catch (err) {
//       setMessage("❌ Failed to connect to server.");
//     }
//   };

//   // ✅ Event Popup Logic
//   const handleViewClick = (ev) => setSelectedEvent(ev);
//   const handleBookEvent = () => {
//     alert(`🎉 Successfully booked ${selectedEvent.title}!`);
//     setSelectedEvent(null);
//   };

//   const grouped = groupByType(events);

//   return (
//     <div className="complete-profile-page container">
//       <div className="profile-card">
//         <h2>Complete your profile</h2>

//         <div className="fields">
//           {/* ✅ Image Preview */}
//           {profile.userImageURL && (
//             <div style={{ textAlign: "center", marginTop: "10px" }}>
//               <img
//                 src={profile.userImageURL}
//                 alt="Preview"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   borderRadius: "8px",
//                   objectFit: "cover",
//                   border: "1px solid #ccc",
//                 }}
//                 onError={(e) => (e.target.style.display = "none")}
//               />
//             </div>
//           )}

//           <label>
//             Paste Profile Image URL
//             <input
//               name="userImageURL"
//               value={profile.userImageURL || ""}
//               onChange={handleChange}
//               placeholder="https://example.com/image.jpg"
//             />
//           </label>

//           <label>
//             Full Name
//             <input
//               name="userFullName"
//               value={profile.userFullName || ""}
//               onChange={handleChange}
//             />
//           </label>

//           <label>
//             Email
//             <input
//               name="userEmail"
//               value={profile.userEmail || ""}
//               onChange={handleChange}
//               readOnly
//             />
//           </label>

//           <label>
//             Phone
//             <input
//               name="userMobile"
//               value={profile.userMobile || ""}
//               onChange={handleChange}
//               placeholder="Enter 10-digit number"
//             />
//           </label>

//           <label className="two-cols">
//             <span>
//               State
//               <select
//                 name="userState"
//                 value={profile.userState || ""}
//                 onChange={handleStateChange}
//               >
//                 <option value="">-- Select State --</option>
//                 {Object.keys(stateCityMap).map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </select>
//             </span>
//             <span>
//               City
//               <select
//                 name="userCity"
//                 value={profile.userCity || ""}
//                 onChange={handleChange}
//               >
//                 <option value="">-- Select City --</option>
//                 {stateCityMap[profile.userState]?.map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </span>
//           </label>

//           <label>
//             Interests
//             <input
//               name="userInterests"
//               value={profile.userInterests || ""}
//               onChange={handleChange}
//               placeholder="e.g. Music, Tech, Food"
//             />
//           </label>

//           <div className="actions">
//             <button className="save" onClick={handleSave}>
//               Save Profile
//             </button>
//             <button className="later" onClick={() => navigate("/")}>
//               Skip for now
//             </button>
//           </div>

//           {message && <p className="message">{message}</p>}
//         </div>
//       </div>

//       {/* 🔹 Event Recommendations */}
//       <div className="events-card">
//         <h3>Top events in {profile.userCity || "your city"}</h3>

//         {loading ? (
//           <p>Loading events...</p>
//         ) : events.length ? (
//           Object.keys(grouped).map((type) => (
//             <div key={type} className="event-type-block">
//               <h4>{type}</h4>
//               <div className="event-list">
//                 {grouped[type].map((ev, idx) => (
//                   <div key={ev.id} className="event-item">
//                     <div className="event-left">
//                       <div className="event-title">{ev.title}</div>
//                       <div className="event-meta">
//                         {ev.date} • {ev.city}
//                       </div>
//                     </div>

//                     <div className="event-right">
//                       {idx < 2 && <span className="badge">Recommended</span>}
//                       <button onClick={() => handleViewClick(ev)}>View</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events available</p>
//         )}
//       </div>

//       {/* 🔹 Event Modal */}
//       {selectedEvent && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>{selectedEvent.title}</h3>
//             <p>
//               <strong>Type:</strong> {selectedEvent.type}
//             </p>
//             <p>
//               <strong>City:</strong> {selectedEvent.city}
//             </p>
//             <p>
//               <strong>Date:</strong> {selectedEvent.date}
//             </p>
//             <p>
//               This {selectedEvent.type.toLowerCase()} event is hosted by
//               EventMate. Join us for an amazing experience!
//             </p>

//             <div className="modal-actions">
//               <button className="book" onClick={handleBookEvent}>
//                 Book Now
//               </button>
//               <button
//                 className="close"
//                 onClick={() => setSelectedEvent(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompleteProfile;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 🔹 Sample static events
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

const groupByType = (events) => {
  const grouped = {};
  events.forEach((ev) => {
    if (!grouped[ev.type]) grouped[ev.type] = [];
    grouped[ev.type].push(ev);
  });
  return grouped;
};

// 🔹 State–City map (truncated for brevity)
const stateCityMap = {
  AndhraPradesh: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
};

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    userId: null,
    userFullName: "",
    userEmail: "",
    userPassword: "", // ✅ Added to preserve during save
    userMobile: "",
    userState: "",
    userCity: "",
    userInterests: "",
    userImageURL: "",
  });

  const [imageError, setImageError] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ✅ Fetch session user and prefill details
  useEffect(() => {
    const fetchSessionUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/user/getsession", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          navigate("/auth");
          return;
        }

        const data = await res.json();

        if (data && Object.keys(data).length > 0) {
          setProfile({
            userId: data.userId || null,
            userFullName: data.userFullName || "",
            userEmail: data.userEmail || "",
            userPassword: data.userPassword || "", // ✅ store password
            userMobile: data.userMobile ? String(data.userMobile) : "",
            userState: data.userState || "",
            userCity: data.userCity || "",
            userInterests: data.userInterests || "",
            userImageURL: data.userImageURL || "",
          });
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Session fetch failed:", error);
        navigate("/auth");
      }
    };

    fetchSessionUser();
  }, [navigate]);

  // ✅ Fetch AI–based Suggested Events
  useEffect(() => {
    const city = profile.userCity?.trim();
    if (!city) {
      setEvents([]);
      setMessage("");
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));

      const filtered = sampleEvents.filter(
        (e) => e.city.toLowerCase() === city.toLowerCase()
      );

      const candidateEvents =
        filtered.length > 0 ? filtered : sampleEvents.slice(0, 3);

      const interests = (profile.userInterests || "")
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const scored = candidateEvents.map((ev) => {
        const match = interests.some(
          (i) =>
            ev.type.toLowerCase().includes(i) ||
            ev.title.toLowerCase().includes(i)
        );
        const score = match ? 100 + Math.random() * 10 : Math.random() * 50;
        return { ...ev, aiScore: score };
      });

      scored.sort((a, b) => b.aiScore - a.aiScore);
      setEvents(scored);
      setLoading(false);

      if (scored.length === 0) {
        setMessage("No local events found for your city.");
      }
    };

    const t = setTimeout(fetchEvents, 300);
    return () => clearTimeout(t);
  }, [profile.userCity, profile.userInterests]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value || "" }));

    if (name === "userImageURL") {
      setImageError(false);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setProfile((prev) => ({
      ...prev,
      userState: selectedState,
      userCity: "",
    }));
  };

  // ✅ Save Profile (with password preservation)
  const handleSave = async () => {
    try {
      // 🔹 Re-fetch session to get latest password
      const sessionRes = await fetch("http://localhost:8080/user/getsession", {
        method: "GET",
        credentials: "include",
      });
      const sessionData = await sessionRes.json();

      const payload = {
        userId: profile.userId,
        userFullName: profile.userFullName,
        userEmail: profile.userEmail,
        userPassword: sessionData.userPassword || profile.userPassword || "", // ✅ preserve password
        userMobile: profile.userMobile ? Number(profile.userMobile) : null,
        userState: profile.userState,
        userCity: profile.userCity,
        userInterests: profile.userInterests,
        userImageURL: profile.userImageURL || "",
      };

      const res = await fetch("http://localhost:8080/user/save", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("✅ Profile updated successfully!");
      } else {
        setMessage("❌ Error updating profile.");
      }
    } catch (err) {
      setMessage("❌ Failed to connect to server.");
    }
  };

  // ✅ Event Modal Logic
  const handleViewClick = (ev) => setSelectedEvent(ev);
  const handleBookEvent = () => {
    alert(`🎉 Successfully booked ${selectedEvent.title}!`);
    setSelectedEvent(null);
  };

  const grouped = groupByType(events);

  return (
    <div className="complete-profile-page container">
      <div className="profile-card">
        <h2>Complete your profile</h2>

        <div className="fields">
          {/* ✅ Image Preview */}
          {profile.userImageURL && !imageError && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <img
                src={profile.userImageURL}
                alt="Profile Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
                onError={() => setImageError(true)}
              />
            </div>
          )}

          <label>
            Paste Profile Image URL
            <input
              name="userImageURL"
              value={profile.userImageURL || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <label>
            Full Name
            <input
              name="userFullName"
              value={profile.userFullName || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              name="userEmail"
              value={profile.userEmail || ""}
              onChange={handleChange}
              readOnly
            />
          </label>

          <label>
            Phone
            <input
              name="userMobile"
              value={profile.userMobile || ""}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
            />
          </label>

          <label className="two-cols">
            <span>
              State
              <select
                name="userState"
                value={profile.userState || ""}
                onChange={handleStateChange}
              >
                <option value="">-- Select State --</option>
                {Object.keys(stateCityMap).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </span>
            <span>
              City
              <select
                name="userCity"
                value={profile.userCity || ""}
                onChange={handleChange}
              >
                <option value="">-- Select City --</option>
                {stateCityMap[profile.userState]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label>
            Interests
            <input
              name="userInterests"
              value={profile.userInterests || ""}
              onChange={handleChange}
              placeholder="e.g. Music, Tech, Food"
            />
          </label>

          <div className="actions">
            <button className="save" onClick={handleSave}>
              Save Profile
            </button>
            <button className="later" onClick={() => navigate("/")}>
              Skip for now
            </button>
          </div>

          {message && <p className="message">{message}</p>}
        </div>
      </div>

      {/* 🔹 Event Recommendations */}
      <div className="events-card">
        <h3>Top events in {profile.userCity || "your city"}</h3>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length ? (
          Object.keys(grouped).map((type) => (
            <div key={type} className="event-type-block">
              <h4>{type}</h4>
              <div className="event-list">
                {grouped[type].map((ev, idx) => (
                  <div key={ev.id} className="event-item">
                    <div className="event-left">
                      <div className="event-title">{ev.title}</div>
                      <div className="event-meta">
                        {ev.date} • {ev.city}
                      </div>
                    </div>
                    <div className="event-right">
                      {idx < 2 && <span className="badge">Recommended</span>}
                      <button onClick={() => handleViewClick(ev)}>View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>

      {/* 🔹 Event Modal */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedEvent.title}</h3>
            <p>
              <strong>Type:</strong> {selectedEvent.type}
            </p>
            <p>
              <strong>City:</strong> {selectedEvent.city}
            </p>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p>
              This {selectedEvent.type.toLowerCase()} event is hosted by EventMate.
            </p>

            <div className="modal-actions">
              <button className="book" onClick={handleBookEvent}>
                Book Now
              </button>
              <button className="close" onClick={() => setSelectedEvent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteProfile;
