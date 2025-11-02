import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    interests: "",
    profilePic: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Load user profile from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Save updated profile to localStorage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setMessage("✅ Profile updated successfully!");
  };

  return (
    <div className="dashboard-section edit-profile">
      <h2>Edit Profile</h2>
      <p>Update your name, city, interests, and contact details here.</p>

      <div className="profile-form">
        <div className="avatar-row">
          <label className="avatar-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="avatar-circle">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">Add Photo</div>
              )}
            </div>
          </label>
        </div>

        <label>
          Full Name
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Email
          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </label>

        <label>
          State
          <input
            name="state"
            value={profile.state}
            onChange={handleChange}
            placeholder="Enter your state"
          />
        </label>

        <label>
          City
          <input
            name="city"
            value={profile.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
        </label>

        <label>
          Interests
          <input
            name="interests"
            value={profile.interests}
            onChange={handleChange}
            placeholder="e.g. Music, Tech, Sports"
          />
        </label>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

        {message && <p className="success-msg">{message}</p>}
      </div>
    </div>
  );
};

export default EditProfile;

/* 
────────────────────────────────────────────
BACKEND NOTES:
────────────────────────────────────────────
- User profile data is stored locally under "userProfile".
- On backend integration, this form should send a PATCH/PUT request:
  PATCH /api/user/profile
  Body: { name, email, phone, city, state, interests, profilePic (base64 or file URL) }
- After successful update, return the updated profile object.
────────────────────────────────────────────
*/

