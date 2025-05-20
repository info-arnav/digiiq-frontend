// AccountPage.jsx
import React, { useState, useEffect } from "react";
import UserProfile from "../UserProfile";
import ManagePlan from "./ManagePlan";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function AccountPage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    photoURL: DEFAULT_IMAGE,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <UserProfile profile={profile} />
      <ManagePlan profile={profile} />
    </div>
  );
}
