// ManagePlanPage.js
import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import ManagePlan from "./ManagePlan";

// Simulate fetching user profile (replace with your actual logic)
const profile = {
  firstName: "AB",
  lastName: "CD",
  photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
};

export default function ManagePlanPage() {
  return (
    <DashboardLayout>
      <ManagePlan profile={profile} />
    </DashboardLayout>
  );
}
