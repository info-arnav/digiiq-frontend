import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import './ManagePlan.css';

export default function ManagePlan({ profile }) {
  const [credits, setCredits] = useState(null);
  const [hasClaimedFree, setHasClaimedFree] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCredits(data.credits || 0);
          setHasClaimedFree(data.hasClaimedFreeCredits || false);
        } else {
          // Create document if not exists
          await setDoc(docRef, { credits: 0, hasClaimedFreeCredits: false });
          setCredits(0);
          setHasClaimedFree(false);
        }
        setLoading(false);
      }
    };
    fetchCredits();
  }, []);

  const handleClaimFreeCredits = async () => {
    if (!auth.currentUser || hasClaimedFree) return;

    const userRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (!userData.hasClaimedFreeCredits) {
        const newCredits = (userData.credits || 0) + 250;
        await updateDoc(userRef, {
          credits: newCredits,
          hasClaimedFreeCredits: true,
        });
        setCredits(newCredits);
        setHasClaimedFree(true);
      }
    }
  };

  return (
    <div className="manage-container">
      <header className="manage-header">
        <img className="manage-avatar" src={profile.photoURL} alt="User avatar" />
        <span className="manage-username">{profile.firstName} {profile.lastName}</span>
      </header>

      <nav className="manage-tabs" aria-label="Profile navigation">
        <div className="manage-tab">Settings</div>
        <div className="manage-tab">Members</div>
        <div className="manage-tab active" aria-current="page">Plans & Billing</div>
      </nav>

      <section className="manage-section">
        <h2 className="manage-title">Workspace plan details</h2>

        <div className="manage-row">
          <div>
            <div className="manage-label">Subscription</div>
            <div className="manage-value">Free</div>
          </div>
          <button
            className="manage-btn primary"
            onClick={handleClaimFreeCredits}
            disabled={hasClaimedFree}
          >
            {hasClaimedFree ? "Claimed" : "Claim Free Plan"}
          </button>
        </div>

        <div className="manage-row">
          <div>
            <div className="manage-label">Credits</div>
            <div className="manage-value">
              <span className="manage-highlight">{loading ? 'Loading...' : `${credits} workspace credits`}</span>
              <div className="manage-desc">
                Credits are shared by Admins and Editors in this workspace.
              </div>
              <div className="manage-highlight" style={{ marginTop: '8px' }}>
                {hasClaimedFree ? `${credits} one-time Free plan credits` : 'Not yet claimed'}
              </div>
              <div className="manage-desc">
                <span className="manage-link">Upgrade plan</span> for monthly credit refresh.
              </div>
            </div>
          </div>
          <button className="manage-btn primary">Get credits</button>
        </div>

        <div className="manage-row">
          <div>
            <div className="manage-label">Workspace members</div>
            <div className="manage-value">
              <span className="manage-highlight">1 seat in use</span>
              <div className="manage-desc">Invite members from the Members tab.</div>
            </div>
          </div>
          <div className="manage-actions">
            <button className="manage-btn secondary">Contact Sales</button>
            <button className="manage-btn primary">Manage</button>
          </div>
        </div>

        <div className="manage-row">
          <div>
            <div className="manage-label">Invoices</div>
            {/* Add invoice details here */}
          </div>
        </div>
      </section>
    </div>
  );
}
