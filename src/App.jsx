import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/sidebar/side_components/Home";
import Login from "./pages/user/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ImagePage from "./pages/sidebar/tools/ImagePage";
import LipSync from "./pages/sidebar/tools/LipSync";
import Videogeneration from "./pages/sidebar/tools/videogeneration";
import UserProfile from "./pages/user/UserProfile";
import ManagePlan from "./pages/user/ManagePlan";
import ManagePlanPage from "./pages/user/ManagePlanPage";
import { UserProvider } from "./contexts/UserContext";
import Templates from './pages/sidebar/side_components/Templates';
import BrandKits from './pages/sidebar/side_components/BrandKits';
import Shared from './pages/sidebar/assests/Shared';
import Saved from './pages/sidebar/assests/Saved';
import Favourites from './pages/sidebar/assests/Favorites';

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
