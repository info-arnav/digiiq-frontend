import React, { useState, useEffect, useRef } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { FaPencilAlt, FaUser, FaPhone, FaSave, FaTimes } from "react-icons/fa";
import "./UserProfile.css";

const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const UserProfile = () => {
  const auth = getAuth();
  const storage = getStorage();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    photoURL: DEFAULT_IMAGE,
  });

  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(true);
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          const nameParts = user.displayName?.split(" ") || [];
          const newProfile = {
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            username: user.displayName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            photoURL: user.photoURL || DEFAULT_IMAGE,
          };
          await setDoc(userRef, newProfile);
          setProfile(newProfile);
        }
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated!");

      const userRef = doc(db, "users", user.uid);
      let updatedProfile = { ...profile };

      // Upload new image if one was selected
      if (tempPhoto && tempPhoto.file) {
        try {
          setIsImageUploading(true);
          const storageRef = ref(storage, `profilePhotos/${user.uid}`);
          await uploadBytes(storageRef, tempPhoto.file);
          const downloadURL = await getDownloadURL(storageRef);
          updatedProfile.photoURL = downloadURL;
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          throw new Error("Failed to upload profile image");
        } finally {
          setIsImageUploading(false);
        }
      }

      // Update profile data
      const profileUpdates = {
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        username: updatedProfile.username,
        phone: updatedProfile.phone,
        photoURL: updatedProfile.photoURL,
        displayName: `${updatedProfile.firstName} ${updatedProfile.lastName}`,
      };

      // Update Firestore
      await updateDoc(userRef, profileUpdates);

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: profileUpdates.displayName,
        photoURL: updatedProfile.photoURL,
      });

      // Update local state
      setProfile(updatedProfile);
      setTempPhoto(null);
      setEditMode(false);
      
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempPhoto(null);
    setEditMode(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      alert("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large (max 5MB)");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => {
      setTempPhoto({ url: ev.target.result, file });
    };
    reader.readAsDataURL(file);
  };

  const avatarSrc = tempPhoto?.url || profile.photoURL || DEFAULT_IMAGE;

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img
              src={avatarSrc}
              alt="Profile"
              className="profile-avatar"
            />
            {editMode && (
              <>
                <button
                  className="avatar-edit-button"
                  onClick={() => fileInputRef.current.click()}
                  title="Change photo"
                  disabled={isImageUploading}
                >
                  {isImageUploading ? (
                    <div className="avatar-upload-spinner"></div>
                  ) : (
                    <FaPencilAlt size={12} />
                  )}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <div>
            <h2 className="profile-name">
              {profile.firstName || <span className="empty-field">First Name</span>}{" "}
              {profile.lastName || <span className="empty-field">Last Name</span>}
            </h2>
            <p className="profile-email">{profile.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <div className="detail-icon">
              <FaUser />
            </div>
            <div className="detail-content">
              <label>First Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="detail-input"
                  placeholder="Enter first name"
                />
              ) : (
                <p>{profile.firstName || <span className="empty-field">Not set</span>}</p>
              )}
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <FaUser />
            </div>
            <div className="detail-content">
              <label>Last Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="detail-input"
                  placeholder="Enter last name"
                />
              ) : (
                <p>{profile.lastName || <span className="empty-field">Not set</span>}</p>
              )}
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <FaUser />
            </div>
            <div className="detail-content">
              <label>Username</label>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="detail-input"
                  placeholder="Enter username"
                />
              ) : (
                <p>{profile.username || <span className="empty-field">Not set</span>}</p>
              )}
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">
              <FaPhone />
            </div>
            <div className="detail-content">
              <label>Phone</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="detail-input"
                  placeholder="Enter phone number"
                />
              ) : (
                <p>{profile.phone || <span className="empty-field">Not provided</span>}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-actions">
          {!editMode ? (
            <button className="edit-button" onClick={handleEdit}>
              <FaPencilAlt /> Edit Profile
            </button>
          ) : (
            <div className="action-buttons">
              <button 
                className="save-button" 
                onClick={handleSave} 
                disabled={isSaving || isImageUploading}
              >
                <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button 
                className="cancel-button" 
                onClick={handleCancel} 
                disabled={isSaving || isImageUploading}
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;