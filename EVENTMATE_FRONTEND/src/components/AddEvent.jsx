// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

// const AddEvent = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const service = location.state;
//   const editData = location.state?.editData || null;

//   const [activeTab, setActiveTab] = useState("details");
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [suggestedVenues, setSuggestedVenues] = useState([]);
//   const [musicList, setMusicList] = useState([]);
//   const [filteredMusic, setFilteredMusic] = useState([]);
//   const [photographersList, setPhotographersList] = useState([]);
//   const [suggestedPhotographers, setSuggestedPhotographers] = useState([]);

//   const [selectedVenue, setSelectedVenue] = useState(null);
//   const [selectedMusic, setSelectedMusic] = useState(null);
//   const [selectedPhotographer, setSelectedPhotographer] = useState(null);

//   const [formData, setFormData] = useState({
//     eventId: "",
//     eventName: "",
//     eventUser: "",
//     eventType: service?.title || "",
//     eventDescription: "",
//     eventDate: "",
//     eventTime: "",
//     eventDuration: "",
//     eventDecoration: "",
//     eventNotes: "",
//     eventVenue: "",
//     eventMusicSystem: "",
//     eventPhotographer: "",
//     city: "",
//     eventStarter: "",
//     eventMainCorse: "",
//     eventDessert: "",
//   });

//   // ✅ Prefill data when update
//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         eventId: editData.eventId || "",
//         eventName: editData.eventName || "",
//         eventType: editData.eventType || service?.title || "",
//         eventDescription: editData.eventDescription || "",
//         eventDate: editData.eventDate || "",
//         eventTime: editData.eventTime || "",
//         eventDuration: editData.eventDuration || "",
//         eventDecoration: editData.eventDecoration || "",
//         eventNotes: editData.eventNotes || "",
//         eventUser: editData.eventUser || "",
//         city:
//           editData.eventVenue?.venueCity ||
//           editData.eventUser?.userCity ||
//           "",
//         eventVenue: editData.eventVenue?.venueName || "",
//         eventMusicSystem: editData.eventMusicSystem?.musicSystemName || "",
//         eventPhotographer: editData.eventPhotographer?.photographerName || "",
//         eventStarter: editData.eventFood
//           ? editData.eventFood.split("Starters:")[1]?.split(",")[0]?.trim() || ""
//           : "",
//         eventMainCorse: editData.eventFood
//           ? editData.eventFood.split("Main:")[1]?.split(",")[0]?.trim() || ""
//           : "",
//         eventDessert: editData.eventFood
//           ? editData.eventFood.split("Dessert:")[1]?.trim() || ""
//           : "",
//       });

//       if (editData.eventVenue?.venueCity)
//         setSelectedCity(editData.eventVenue.venueCity);
//     }
//   }, [editData, service?.title]);

//   // ✅ Fetch user session
//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/user/getsession", {
//           withCredentials: true,
//         });

//         if (res.status === 200 && res.data && res.data.userId) {
//           setFormData((prev) => ({
//             ...prev,
//             eventUser: { userId: res.data.userId },
//           }));
//         } else {
//           navigate("/");
//         }
//       } catch (err) {
//         console.error("Error fetching session:", err);
//         navigate("/");
//       }
//     };

//     fetchSession();
//   }, [navigate]);

//   // ✅ Fetch static lists
//   useEffect(() => {
//     fetch("http://localhost:8080/venue/cities")
//       .then((res) => res.json())
//       .then((data) => setCities(data))
//       .catch((err) => console.error("Error fetching cities:", err));

//     fetch("http://localhost:8080/musicsystem/all")
//       .then((res) => res.json())
//       .then((data) => setMusicList(data))
//       .catch((err) => console.error("Error fetching music systems:", err));

//     fetch("http://localhost:8080/photographer/all")
//       .then((res) => res.json())
//       .then((data) => setPhotographersList(data))
//       .catch((err) => console.error("Error fetching photographers:", err));
//   }, []);

//   // ✅ Fetch and preselect venue/music/photographer
//   useEffect(() => {
//     if (selectedCity) {
//       fetch(`http://localhost:8080/venue/list/${selectedCity}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setSuggestedVenues(data);
//           if (editData?.eventVenue) {
//             const vMatch = data.find(
//               (v) => v.venueId === editData.eventVenue.venueId
//             );
//             if (vMatch) setSelectedVenue(vMatch);
//           }
//         })
//         .catch((err) => console.error("Error fetching venues:", err));

//       const musicFiltered = musicList.filter(
//         (m) => m.musicSystemCity.toLowerCase() === selectedCity.toLowerCase()
//       );
//       setFilteredMusic(musicFiltered);

//       const photographersFiltered = photographersList.filter(
//         (p) =>
//           p.photographerCity.toLowerCase() === selectedCity.toLowerCase()
//       );
//       setSuggestedPhotographers(photographersFiltered);

//       if (editData?.eventMusicSystem) {
//         const mMatch = musicFiltered.find(
//           (m) => m.musicSystemId === editData.eventMusicSystem.musicSystemId
//         );
//         if (mMatch) setSelectedMusic(mMatch);
//       }

//       if (editData?.eventPhotographer) {
//         const pMatch = photographersFiltered.find(
//           (p) =>
//             p.photographerId === editData.eventPhotographer.photographerId
//         );
//         if (pMatch) setSelectedPhotographer(pMatch);
//       }
//     }
//   }, [selectedCity, musicList, photographersList, editData]);

//   // ✅ Handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectVenue = (v) => {
//     setSelectedVenue(v);
//     setFormData((prev) => ({ ...prev, eventVenue: v.venueName }));
//   };

//   const handleSelectMusic = (m) => {
//     setSelectedMusic(m);
//     setFormData((prev) => ({ ...prev, eventMusicSystem: m.musicSystemName }));
//   };

//   const handleSelectPhotographer = (p) => {
//     setSelectedPhotographer(p);
//     setFormData((prev) => ({
//       ...prev,
//       eventPhotographer: p.photographerName,
//     }));
//   };

//   // ✅ Submit (JPA auto update if ID exists)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       eventId: formData.eventId || null, // key for update
//       eventUser: formData.eventUser,
//       eventName: formData.eventName,
//       eventType: formData.eventType,
//       eventDescription: formData.eventDescription,
//       eventDate: formData.eventDate,
//       eventTime: formData.eventTime,
//       eventDuration: parseInt(formData.eventDuration) || 0,
//       eventDecoration: formData.eventDecoration,
//       eventFood: `Starters: ${formData.eventStarter}, Main: ${formData.eventMainCorse}, Dessert: ${formData.eventDessert}`,
//       eventNotes: formData.eventNotes,
//       eventVenue: selectedVenue ? { venueId: selectedVenue.venueId } : null,
//       eventMusicSystem: selectedMusic
//         ? { musicSystemId: selectedMusic.musicSystemId }
//         : null,
//       eventPhotographer: selectedPhotographer
//         ? { photographerId: selectedPhotographer.photographerId }
//         : null,
//     };

//     try {
//       const res = await fetch("http://localhost:8080/event/add", {
//         method: "POST", // JPA auto-updates if ID exists
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert(editData ? "Event updated successfully!" : "Event added successfully!");
//         navigate("/");
//       } else {
//         alert("Error saving event. Check backend logs.");
//       }
//     } catch (err) {
//       console.error("Error saving event:", err);
//     }
//   };

//   return (
//     <div className="add-event">
//       <h2>{editData ? "Update Event" : "Add Event"} – {service?.title || `Service ${id}`}</h2>

//       <div className="subnav">
//         {["details", "datetime", "venue", "details2"].map((tab) => (
//           <button
//             key={tab}
//             className={activeTab === tab ? "active" : ""}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab === "details"
//               ? "Event Details"
//               : tab === "datetime"
//               ? "Date & Time"
//               : tab === "venue"
//               ? "Venue"
//               : "Other Details"}
//           </button>
//         ))}
//       </div>

//       {/* Form remains unchanged */}
//       <form className="event-form" onSubmit={handleSubmit}>
//         {activeTab === "details" && (
//           <>
//             <label>Event Name</label>
//             <input
//               name="eventName"
//               value={formData.eventName}
//               onChange={handleChange}
//               placeholder="Enter event name"
//               required
//             />
//             <label>Event Type</label>
//             <input name="eventType" value={formData.eventType} readOnly />
//             <label>Description</label>
//             <textarea
//               name="eventDescription"
//               value={formData.eventDescription}
//               onChange={handleChange}
//               placeholder="Enter event details"
//             />
//             <button type="button" onClick={() => setActiveTab("datetime")}>
//               Next
//             </button>
//           </>
//         )}

//         {activeTab === "datetime" && (
//           <>
//             <label>Date</label>
//             <input
//               type="date"
//               name="eventDate"
//               value={formData.eventDate}
//               onChange={handleChange}
//               required
//             />
//             <label>Time</label>
//             <input
//               type="time"
//               name="eventTime"
//               value={formData.eventTime}
//               onChange={handleChange}
//               required
//             />
//             <label>Duration</label>
//             <input
//               type="number"
//               name="eventDuration"
//               value={formData.eventDuration}
//               onChange={handleChange}
//               placeholder="e.g. 3"
//             />
//             <button type="button" onClick={() => setActiveTab("venue")}>
//               Next
//             </button>
//           </>
//         )}

//         {activeTab === "venue" && (
//           <div className="venue-section">
//             <label>Select City</label>
//             <select
//               value={selectedCity}
//               onChange={(e) => {
//                 const cityValue = e.target.value;
//                 setSelectedCity(cityValue);
//                 setFormData((prev) => ({ ...prev, city: cityValue }));
//               }}
//             >
//               <option value="">Select City</option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>

//             {selectedCity && (
//               <>
//                 <h3>Suggested Venues in {selectedCity}</h3>
//                 <div className="venue-list">
//                   {suggestedVenues.length > 0 ? (
//                     suggestedVenues.map((v) => (
//                       <div className="venue-card" key={v.venueId}>
//                         <img
//                           src={v.venueImageLink}
//                           alt={v.venueName}
//                           onError={(e) =>
//                             (e.target.src = "/images/placeholder.jpg")
//                           }
//                         />
//                         <h4>{v.venueName}</h4>
//                         <p>Budget: ₹{v.venueBudget}</p>
//                         <p>⭐ {v.venueRating}</p>
//                         <p>
//                           Guests: {v.venueMinGuests} - {v.venueMaxGuests}
//                         </p>

//                         <button
//                           type="button"
//                           disabled={selectedVenue?.venueId === v.venueId}
//                           onClick={() => {
//                             handleSelectVenue(v);
//                             setActiveTab("details2");
//                           }}
//                           className={
//                             selectedVenue?.venueId === v.venueId
//                               ? "selected-btn"
//                               : ""
//                           }
//                         >
//                           {selectedVenue?.venueId === v.venueId
//                             ? "Selected"
//                             : "Select Venue"}
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <p>Fetching venues...</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {activeTab === "details2" && (
//           <>
//             <h3>Food Preferences</h3>
//             <label>Starters</label>
//             <input
//               name="eventStarter"
//               value={formData.eventStarter}
//               onChange={handleChange}
//               placeholder="add desired starter food"
//             />
//             <label>Main Course</label>
//             <input
//               name="eventMainCorse"
//               value={formData.eventMainCorse}
//               onChange={handleChange}
//               placeholder="add desired Main course food"
//             />
//             <label>Dessert</label>
//             <input
//               name="eventDessert"
//               value={formData.eventDessert}
//               onChange={handleChange}
//               placeholder="add desired Dessert food"
//             />
//             <h3>Decoration</h3>
//             <input
//               name="eventDecoration"
//               value={formData.eventDecoration}
//               onChange={handleChange}
//               placeholder="add theme Decoration"
//             />
//             <h3>Music Systems</h3>
//             <label>Select Music System</label>
//             <select
//               value={selectedMusic?.musicSystemId || ""}
//               onChange={(e) => {
//                 const selected = filteredMusic.find(
//                   (m) => m.musicSystemId === parseInt(e.target.value)
//                 );
//                 if (selected) handleSelectMusic(selected);
//               }}
//             >
//               <option value="">Select Music System</option>
//               {filteredMusic.map((m) => (
//                 <option key={m.musicSystemId} value={m.musicSystemId}>
//                   {m.musicSystemName} ⭐{m.musicSystemRating}
//                 </option>
//               ))}
//             </select>
//             <h3>Photographers</h3>
//             <div className="venue-list">
//               {suggestedPhotographers.map((p) => (
//                 <div className="venue-card" key={p.photographerId}>
//                   <img
//                     src={p.photographerImageURL}
//                     alt={p.photographerName}
//                     onError={(e) =>
//                       (e.target.src = "/images/placeholder.jpg")
//                     }
//                   />
//                   <h4>{p.photographerName}</h4>
//                   <p>⭐ {p.photographerRating}</p>
//                   <button
//                     type="button"
//                     disabled={
//                       selectedPhotographer?.photographerId ===
//                       p.photographerId
//                     }
//                     className={
//                       selectedPhotographer?.photographerId ===
//                       p.photographerId
//                         ? "selected-btn"
//                         : ""
//                     }
//                     onClick={() => handleSelectPhotographer(p)}
//                   >
//                     {selectedPhotographer?.photographerId ===
//                     p.photographerId
//                       ? "Selected"
//                       : "Select"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <label>Notes</label>
//             <textarea
//               name="eventNotes"
//               value={formData.eventNotes}
//               onChange={handleChange}
//               placeholder="Any special requirements..."
//             />
//             <button type="submit">
//               {editData ? "Update Event" : "Submit Event"}
//             </button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AddEvent;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const AddEvent = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state;
  const editData = location.state?.editData || null;

  const [activeTab, setActiveTab] = useState("details");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [suggestedVenues, setSuggestedVenues] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [photographersList, setPhotographersList] = useState([]);
  const [suggestedPhotographers, setSuggestedPhotographers] = useState([]);

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);

  const [formData, setFormData] = useState({
    eventId: "",
    eventName: "",
    eventUser: "",
    eventType: service?.title || "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventDuration: "",
    eventDecoration: "",
    eventNotes: "",
    eventVenue: "",
    eventMusicSystem: "",
    eventPhotographer: "",
    city: "",
    eventStarter: "",
    eventMainCorse: "",
    eventDessert: "",
  });

  // ✅ Prefill data when update
  useEffect(() => {
    if (editData) {
      setFormData({
        eventId: editData.eventId || "",
        eventName: editData.eventName || "",
        eventType: editData.eventType || service?.title || "",
        eventDescription: editData.eventDescription || "",
        eventDate: editData.eventDate || "",
        eventTime: editData.eventTime || "",
        eventDuration: editData.eventDuration || "",
        eventDecoration: editData.eventDecoration || "",
        eventNotes: editData.eventNotes || "",
        eventUser: editData.eventUser || "",
        city:
          editData.eventVenue?.venueCity ||
          editData.eventUser?.userCity ||
          "",
        eventVenue: editData.eventVenue?.venueName || "",
        eventMusicSystem: editData.eventMusicSystem?.musicSystemName || "",
        eventPhotographer: editData.eventPhotographer?.photographerName || "",
        eventStarter: editData.eventFood
          ? editData.eventFood.split("Starters:")[1]?.split(",")[0]?.trim() || ""
          : "",
        eventMainCorse: editData.eventFood
          ? editData.eventFood.split("Main:")[1]?.split(",")[0]?.trim() || ""
          : "",
        eventDessert: editData.eventFood
          ? editData.eventFood.split("Dessert:")[1]?.trim() || ""
          : "",
      });

      if (editData.eventVenue?.venueCity)
        setSelectedCity(editData.eventVenue.venueCity);
    }
  }, [editData, service?.title]);

  // ✅ Fetch user session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/getsession", {
          withCredentials: true,
        });

        if (res.status === 200 && res.data && res.data.userId) {
          setFormData((prev) => ({
            ...prev,
            eventUser: { userId: res.data.userId },
          }));
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        navigate("/");
      }
    };

    fetchSession();
  }, [navigate]);

  // ✅ Fetch static lists
  useEffect(() => {
    fetch("http://localhost:8080/venue/cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));

    fetch("http://localhost:8080/musicsystem/all")
      .then((res) => res.json())
      .then((data) => setMusicList(data))
      .catch((err) => console.error("Error fetching music systems:", err));

    fetch("http://localhost:8080/photographer/all")
      .then((res) => res.json())
      .then((data) => setPhotographersList(data))
      .catch((err) => console.error("Error fetching photographers:", err));
  }, []);

  // ✅ Fetch and preselect venue/music/photographer
  useEffect(() => {
    if (selectedCity) {
      fetch(`http://localhost:8080/venue/list/${selectedCity}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestedVenues(data);
          if (editData?.eventVenue) {
            const vMatch = data.find(
              (v) => v.venueId === editData.eventVenue.venueId
            );
            if (vMatch) setSelectedVenue(vMatch);
          }
        })
        .catch((err) => console.error("Error fetching venues:", err));

      const musicFiltered = musicList.filter(
        (m) => m.musicSystemCity.toLowerCase() === selectedCity.toLowerCase()
      );
      setFilteredMusic(musicFiltered);

      const photographersFiltered = photographersList.filter(
        (p) => p.photographerCity.toLowerCase() === selectedCity.toLowerCase()
      );
      setSuggestedPhotographers(photographersFiltered);

      if (editData?.eventMusicSystem) {
        const mMatch = musicFiltered.find(
          (m) => m.musicSystemId === editData.eventMusicSystem.musicSystemId
        );
        if (mMatch) setSelectedMusic(mMatch);
      }

      if (editData?.eventPhotographer) {
        const pMatch = photographersFiltered.find(
          (p) => p.photographerId === editData.eventPhotographer.photographerId
        );
        if (pMatch) setSelectedPhotographer(pMatch);
      }
    }
  }, [selectedCity, musicList, photographersList, editData]);

  // ✅ Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectVenue = (v) => {
    setSelectedVenue(v);
    setFormData((prev) => ({ ...prev, eventVenue: v.venueName }));
  };

  const handleSelectMusic = (m) => {
    setSelectedMusic(m);
    setFormData((prev) => ({ ...prev, eventMusicSystem: m.musicSystemName }));
  };

  const handleSelectPhotographer = (p) => {
    setSelectedPhotographer(p);
    setFormData((prev) => ({
      ...prev,
      eventPhotographer: p.photographerName,
    }));
  };

  // ✅ Submit (checks venue collision)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      eventId: formData.eventId || null,
      eventUser: formData.eventUser,
      eventName: formData.eventName,
      eventType: formData.eventType,
      eventDescription: formData.eventDescription,
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      eventDuration: parseInt(formData.eventDuration) || 0,
      eventDecoration: formData.eventDecoration,
      eventFood: `Starters: ${formData.eventStarter}, Main: ${formData.eventMainCorse}, Dessert: ${formData.eventDessert}`,
      eventNotes: formData.eventNotes,
      eventVenue: selectedVenue ? { venueId: selectedVenue.venueId } : null,
      eventMusicSystem: selectedMusic
        ? { musicSystemId: selectedMusic.musicSystemId }
        : null,
      eventPhotographer: selectedPhotographer
        ? { photographerId: selectedPhotographer.photographerId }
        : null,
    };

    try {
      const res = await fetch("http://localhost:8080/event/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 409) {
        const message = await res.text();
        alert(message); // 👈 shows message from backend: "Venue already booked"
        return;
      }

      if (res.ok) {
        alert(editData ? "Event updated successfully!" : "Event added successfully!");
        navigate("/");
      } else {
        alert("Error saving event. Check backend logs.");
      }
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  return (
    <div className="add-event">
      <h2>{editData ? "Update Event" : "Add Event"} – {service?.title || `Service ${id}`}</h2>

      <div className="subnav">
        {["details", "datetime", "venue", "details2"].map((tab) => (
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
              : "Other Details"}
          </button>
        ))}
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        {activeTab === "details" && (
          <>
            <label>Event Name</label>
            <input
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
            <label>Event Type</label>
            <input name="eventType" value={formData.eventType} readOnly />
            <label>Description</label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              placeholder="Enter event details"
            />
            <button type="button" onClick={() => setActiveTab("datetime")}>
              Next
            </button>
          </>
        )}

        {activeTab === "datetime" && (
          <>
            <label>Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
            <label>Time</label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              required
            />
            <label>Duration</label>
            <input
              type="number"
              name="eventDuration"
              value={formData.eventDuration}
              onChange={handleChange}
              placeholder="e.g. 3"
            />
            <button type="button" onClick={() => setActiveTab("venue")}>
              Next
            </button>
          </>
        )}

        {activeTab === "venue" && (
          <div className="venue-section">
            <label>Select City</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                const cityValue = e.target.value;
                setSelectedCity(cityValue);
                setFormData((prev) => ({ ...prev, city: cityValue }));
              }}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {selectedCity && (
              <>
                <h3>Suggested Venues in {selectedCity}</h3>
                <div className="venue-list">
                  {suggestedVenues.length > 0 ? (
                    suggestedVenues.map((v) => (
                      <div className="venue-card" key={v.venueId}>
                        <img
                          src={v.venueImageLink}
                          alt={v.venueName}
                          onError={(e) =>
                            (e.target.src = "/images/placeholder.jpg")
                          }
                        />
                        <h4>{v.venueName}</h4>
                        <p>Budget: ₹{v.venueBudget}</p>
                        <p>⭐ {v.venueRating}</p>
                        <p>
                          Guests: {v.venueMinGuests} - {v.venueMaxGuests}
                        </p>

                        <button
                          type="button"
                          disabled={selectedVenue?.venueId === v.venueId}
                          onClick={() => {
                            handleSelectVenue(v);
                            setActiveTab("details2");
                          }}
                          className={
                            selectedVenue?.venueId === v.venueId
                              ? "selected-btn"
                              : ""
                          }
                        >
                          {selectedVenue?.venueId === v.venueId
                            ? "Selected"
                            : "Select Venue"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>Fetching venues...</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "details2" && (
          <>
            <h3>Food Preferences</h3>
            <label>Starters</label>
            <input
              name="eventStarter"
              value={formData.eventStarter}
              onChange={handleChange}
              placeholder="add desired starter food"
            />
            <label>Main Course</label>
            <input
              name="eventMainCorse"
              value={formData.eventMainCorse}
              onChange={handleChange}
              placeholder="add desired Main course food"
            />
            <label>Dessert</label>
            <input
              name="eventDessert"
              value={formData.eventDessert}
              onChange={handleChange}
              placeholder="add desired Dessert food"
            />
            <h3>Decoration</h3>
            <input
              name="eventDecoration"
              value={formData.eventDecoration}
              onChange={handleChange}
              placeholder="add theme Decoration"
            />
            <h3>Music Systems</h3>
            <label>Select Music System</label>
            <select
              value={selectedMusic?.musicSystemId || ""}
              onChange={(e) => {
                const selected = filteredMusic.find(
                  (m) => m.musicSystemId === parseInt(e.target.value)
                );
                if (selected) handleSelectMusic(selected);
              }}
            >
              <option value="">Select Music System</option>
              {filteredMusic.map((m) => (
                <option key={m.musicSystemId} value={m.musicSystemId}>
                  {m.musicSystemName} ⭐{m.musicSystemRating}
                </option>
              ))}
            </select>
            <h3>Photographers</h3>
            <div className="venue-list">
              {suggestedPhotographers.map((p) => (
                <div className="venue-card" key={p.photographerId}>
                  <img
                    src={p.photographerImageURL}
                    alt={p.photographerName}
                    onError={(e) =>
                      (e.target.src = "/images/placeholder.jpg")
                    }
                  />
                  <h4>{p.photographerName}</h4>
                  <p>⭐ {p.photographerRating}</p>
                  <button
                    type="button"
                    disabled={
                      selectedPhotographer?.photographerId ===
                      p.photographerId
                    }
                    className={
                      selectedPhotographer?.photographerId ===
                      p.photographerId
                        ? "selected-btn"
                        : ""
                    }
                    onClick={() => handleSelectPhotographer(p)}
                  >
                    {selectedPhotographer?.photographerId ===
                    p.photographerId
                      ? "Selected"
                      : "Select"}
                  </button>
                </div>
              ))}
            </div>
            <label>Notes</label>
            <textarea
              name="eventNotes"
              value={formData.eventNotes}
              onChange={handleChange}
              placeholder="Any special requirements..."
            />
            <button type="submit">
              {editData ? "Update Event" : "Submit Event"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AddEvent;
