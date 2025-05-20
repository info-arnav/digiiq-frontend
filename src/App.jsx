import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/sides/Home";
import Login from "./pages/sides/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ImagePage from "./pages/sidebar/generation/ImagePage";
import LipSync from "./pages/sidebar/generation/LipSync";
import Videogeneration from "./pages/sidebar/generation/videogeneration";
import UserProfile from "./pages/sides/UserProfile";
import ManagePlan from "./pages/sides/ManagePlan";
import ManagePlanPage from "./pages/sides/ManagePlanPage";
import { UserProvider } from "./contexts/UserContext";
import Templates from './pages/sidebar/sidebar_components/Templates';
import BrandKits from './pages/sidebar/sidebar_components/BrandKits';
import Shared from './pages/sidebar/assests_sidebar/Shared';
import Saved from './pages/sidebar/assests_sidebar/Saved';
import Favourites from './pages/sidebar/assests_sidebar/Favorites';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/imagepage" element={<ImagePage />} />
            <Route path="/lipsync" element={<LipSync />} />
            <Route path="/videogeneration" element={<Videogeneration />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/manage-plan" element={<ManagePlan />} /> */}
            <Route path="/manage-plan" element={<ManagePlanPage />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/brandkits" element={<BrandKits />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
