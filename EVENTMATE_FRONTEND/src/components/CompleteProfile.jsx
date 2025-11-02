import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

// Group events by type for display
const groupByType = (events) => {
  const map = {};
  events.forEach((ev) => {
    if (!map[ev.type]) map[ev.type] = [];
    map[ev.type].push(ev);
  });
  return map;
};

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    interests: "",
    profilePic: "",
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null); // modal event

  // ✅ Load user profile from localStorage (always consistent)
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      const obj = JSON.parse(stored);
      setProfile((prev) => ({ ...prev, ...obj }));
    }
  }, []);

  // ✅ Fetch fake city-based events (AI-like recommendations)
  useEffect(() => {
    const city = profile.city && profile.city.trim();
    if (!city) {
      setEvents([]);
      setMessage("");
      return;
    }

    const fetchFakeEvents = async () => {
      setLoading(true);
      setMessage("");
      await new Promise((r) => setTimeout(r, 900));

      const filtered = sampleEvents.filter(
        (e) => e.city.toLowerCase() === city.toLowerCase()
      );

      let candidateEvents = [...filtered];
      if (candidateEvents.length === 0) {
        const fallback = sampleEvents.filter((e) =>
          e.city.toLowerCase().includes(city.toLowerCase()[0])
        );
        candidateEvents = fallback.slice(0, 3);
      }

      const interests = (profile.interests || "")
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const scored = candidateEvents.map((ev) => {
        const matches = interests.some(
          (i) =>
            ev.type.toLowerCase().includes(i) ||
            ev.title.toLowerCase().includes(i)
        );
        const aiScore = matches ? 100 + Math.random() * 10 : Math.random() * 50;
        return { ...ev, aiScore };
      });

      scored.sort((a, b) => b.aiScore - a.aiScore);

      setEvents(scored);
      if (scored.length === 0)
        setMessage("No local hosted events found for this city yet.");
      setLoading(false);
    };

    const t = setTimeout(fetchFakeEvents, 350);
    return () => clearTimeout(t);
  }, [profile.city, profile.interests]);

  // ✅ Handle image upload
  const handleFileChange = (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("Please choose an image file.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    // Only update when fully loaded
    setProfile((prev) => ({ ...prev, profilePic: reader.result }));
  };
  reader.readAsDataURL(file);
};

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save profile to localStorage
const handleSave = () => {
  if (!profile.phone || !profile.city) {
    alert("Please enter at least phone and city.");
    return;
  }

  try {
    // Double-check profilePic before saving
    if (profile.profilePic && profile.profilePic.length > 5_000_000) {
      alert("Profile picture is too large. Please upload a smaller image.");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.setItem("user", JSON.stringify(profile));
    setMessage("✅ Profile saved locally! Recommendations updated below.");
  } catch (err) {
    console.error("Error saving profile:", err);
    alert("Error saving profile. Try with smaller image size.");
  }
};

  const grouped = groupByType(events);

  // ✅ Modal logic
  const handleViewClick = (ev) => setSelectedEvent(ev);

  const handleBookEvent = () => {
    const user = localStorage.getItem("userProfile");
    if (!user) {
      if (window.confirm("Please login to book this event. Go to login?")) {
        navigate("/auth");
      }
      return;
    }
    alert(`🎉 Successfully booked ${selectedEvent.title}!`);
    setSelectedEvent(null);
  };

  return (
    <div className="complete-profile-page container">
      <div className="profile-card">
        <h2>Complete your profile</h2>

        <div className="avatar-row">
          <label className="avatar-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="avatar-circle" title="Upload profile picture">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="avatar" />
              ) : (
                <div className="avatar-placeholder">Add Photo</div>
              )}
            </div>
            <div className="avatar-hint">Click the circle to upload</div>
          </label>
        </div>

        <div className="fields">
          <label>
            Full name
            <input name="name" value={profile.name || ""} onChange={handleChange} />
          </label>

          <label>
            Email
            <input name="email" value={profile.email || ""} onChange={handleChange} />
          </label>

          <label>
            Phone
            <input name="phone" value={profile.phone || ""} onChange={handleChange} />
          </label>

          <label className="two-cols">
            <span>
              State
              <input name="state" value={profile.state || ""} onChange={handleChange} />
            </span>
            <span>
              City
              <input name="city" value={profile.city || ""} onChange={handleChange} />
            </span>
          </label>

          <label>
            Interests
            <input
              name="interests"
              value={profile.interests || ""}
              onChange={handleChange}
              placeholder="e.g. Music, Sports, Tech"
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

      <div className="events-card">
        <h3>Top events in {profile.city || "your city hosted by us!"}</h3>

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
          <p>Sorry no events currently for this city</p>
        )}
      </div>

      {/* ✅ Modal */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedEvent.title}</h3>
            <p><strong>Type:</strong> {selectedEvent.type}</p>
            <p><strong>City:</strong> {selectedEvent.city}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p className="desc">
              This {selectedEvent.type.toLowerCase()} event is hosted by EventMate.
              Join us for an amazing experience with live entertainment!
            </p>

            <div className="modal-actions">
              <button className="book" onClick={handleBookEvent}>Book Now</button>
              <button className="close" onClick={() => setSelectedEvent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteProfile;
