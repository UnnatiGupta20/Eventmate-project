import React, { useState } from "react";


const Settings = () => {
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({ old: "", new: "" });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
  });

  const handlePasswordChange = () => {
    alert("Password updated successfully (dummy functionality).");
  };

  const handleEmailChange = () => {
    alert(`Email updated to ${email} (dummy functionality).`);
  };

  const handlePreferenceChange = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings-page">
      <h2>⚙️ Account Settings</h2>

      {/* Change Password Section */}
      <div className="settings-section">
        <h3>Change Password</h3>
        <label>
          Old Password
          <input
            type="password"
            value={passwords.old}
            onChange={(e) =>
              setPasswords((prev) => ({ ...prev, old: e.target.value }))
            }
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords((prev) => ({ ...prev, new: e.target.value }))
            }
          />
        </label>
        <button className="save-btn" onClick={handlePasswordChange}>
          Update Password
        </button>
      </div>

      {/* Change Email Section */}
      <div className="settings-section">
        <h3>Change Email</h3>
        <label>
          New Email
          <input
            type="email"
            placeholder="Enter new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button className="save-btn" onClick={handleEmailChange}>
          Update Email
        </button>
      </div>

      {/* Preferences */}
      <div className="settings-section">
        <h3>Preferences</h3>
        
        <div className="toggle-row">
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={() => handlePreferenceChange("notifications")}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;

      {/* 
         BACKEND INTEGRATION NOTES:

        1️⃣ Change Password
        ---------------------------------
        - API: PUT /api/users/change-password
        - Body: { userId, oldPassword, newPassword }
        - Validate old password and update to new one.
        - Show success/error message accordingly.

        2️⃣ Update Email
        ---------------------------------
        - API: PUT /api/users/update-email
        - Body: { userId, newEmail }
        - Ensure new email isn’t already registered.
        - Optionally send verification email before saving.

        3️⃣ Manage Preferences
        ---------------------------------
        - API: PUT /api/users/preferences
        - Body: { userId, preferences: { notifications } }
        - These can be toggles or checkboxes on the UI.

        4️⃣ Fetch Current Settings
        ---------------------------------
        - API: GET /api/users/:userId/settings
        - Used to pre-fill form fields (email, preferences, etc.)
        - Called when Settings page loads.

        ✅ All endpoints should be protected — require JWT or session authentication.
        ✅ Frontend currently static, backend will replace with real data.
      */}
