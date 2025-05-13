// ManagePlan.js
import React from "react";
import "./ManagePlan.css";

export default function ManagePlan({ profile }) {
  return (
    <div className="manage-container">
      <header className="manage-header">
        <img
          className="manage-avatar"
          src={profile.photoURL}
          alt="User avatar"
        />
        <span className="manage-username">
          {profile.firstName} {profile.lastName}
        </span>
      </header>
      <nav className="manage-tabs" aria-label="Profile navigation">
        <div className="manage-tab">Settings</div>
        <div className="manage-tab">Members</div>
        <div className="manage-tab active" aria-current="page">
          Plans &amp; Billing
        </div>
      </nav>
      <section className="manage-section">
        <h2 className="manage-title">Workspace plan details</h2>
        <div className="manage-row">
          <div>
            <div className="manage-label">Subscription</div>
            <div className="manage-value">Free</div>
          </div>
          <button className="manage-btn primary" aria-label="Upgrade plan">
            Upgrade
          </button>
        </div>
        <div className="manage-row">
          <div>
            <div className="manage-label">Credits</div>
            <div className="manage-value">
              <span className="manage-highlight">125 workspace credits</span>
              <div className="manage-desc">
                Credits are shared by Admins and Editors in this workspace.
              </div>
              <div className="manage-highlight" style={{ marginTop: "8px" }}>
                125 one-time Free plan credits
              </div>
              <div className="manage-desc">
                <span className="manage-link">Upgrade plan</span> monthly credit refresh.
              </div>
            </div>
          </div>
          <button className="manage-btn primary" aria-label="Get more credits">
            Get credits
          </button>
        </div>
        <div className="manage-row">
          <div>
            <div className="manage-label">Workspace members</div>
            <div className="manage-value">
              <span className="manage-highlight">1 seat in use</span>
              <div className="manage-desc">
                Invite members from the Members tab. If you have reached your seat limit, contact sales to unlock more seats.
              </div>
            </div>
          </div>
          <div className="manage-actions">
            <button className="manage-btn secondary" aria-label="Contact sales">
              Contact Sales
            </button>
            <button className="manage-btn primary" aria-label="Manage members">
              Manage
            </button>
          </div>
        </div>
        <div className="manage-row">
          <div>
            <div className="manage-label">Invoices</div>
            {/* Add invoice details here if needed */}
          </div>
        </div>
      </section>
    </div>
  );
}
