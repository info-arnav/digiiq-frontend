import React, { useEffect, useState, useRef } from "react";
import { auth } from '../firebase';
import "./UserProfile.css";

const DEFAULT_IMAGE = "https://via.placeholder.com/120x120.png?text=Profile";
const LOCAL_STORAGE_KEY = "myapp_user_profile";

export default function UserProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    photoURL: DEFAULT_IMAGE,
  });
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);

  // Load profile from localStorage or Firebase Auth
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          let firstName = "";
          let lastName = "";
          if (user.displayName) {
            const parts = user.displayName.split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ");
          }
          setProfile({
            firstName,
            lastName,
            username: user.displayName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            photoURL: user.photoURL || DEFAULT_IMAGE,
          });
        }
      });
      return unsubscribe;
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  // Store image as Base64 for persistence
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        setProfile((prev) => ({
          ...prev,
          photoURL: evt.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    // (Optional) Also update Firebase Auth profile here if you want
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally reload from localStorage to revert unsaved changes
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  };

  return (
    <div className="profile-outer">
      <div className="profile-card-modern">
        <div className="avatar-section">
          <div className="profile-avatar-modern">
            <img src={profile.photoURL} alt="Profile" />
            {editMode && (
              <>
                <button
                  className="edit-avatar-btn-modern"
                  onClick={handleEditClick}
                  title="Change profile picture"
                >
                  <span role="img" aria-label="edit">🖊️</span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
          <div className="avatar-username">
            <h2>
              {profile.firstName || profile.username
                ? `${profile.firstName} ${profile.lastName}`.trim()
                : "User"}
            </h2>
            <span className="profile-tag">
              @{profile.username ? profile.username.replace(/\s/g, "") : "username"}
            </span>
          </div>
        </div>
        <div className="profile-details-modern">
          <div className="profile-detail-row">
            <span className="detail-icon">📧</span>
            {editMode ? (
              <input
                type="email"
                className="edit-input-modern"
                name="email"
                value={profile.email}
                disabled
                placeholder="Email"
              />
            ) : (
              <span className="detail-value">{profile.email}</span>
            )}
          </div>
          <div className="profile-detail-row">
            <span className="detail-icon">📱</span>
            {editMode ? (
              <input
                type="tel"
                className="edit-input-modern"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            ) : (
              <span className="detail-value">{profile.phone || <span className="placeholder">No phone</span>}</span>
            )}
          </div>
          <div className="profile-detail-row">
            <span className="detail-icon">🧑</span>
            {editMode ? (
              <div className="edit-names-group">
                <input
                  type="text"
                  className="edit-input-modern"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="edit-input-modern"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            ) : (
              <span className="detail-value">
                {profile.firstName || profile.lastName
                  ? `${profile.firstName} ${profile.lastName}`.trim()
                  : <span className="placeholder">No name</span>}
              </span>
            )}
          </div>
        </div>
        <div className="profile-actions-modern">
          {editMode ? (
            <>
              <button className="profile-button-modern save-button" onClick={handleSave}>
                Save
              </button>
              <button className="profile-button-modern cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button
              className="profile-button-modern edit-button"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
