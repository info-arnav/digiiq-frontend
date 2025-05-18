import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ImagePage from "./pages/ImagePage";
import LipSync from "./pages/LipSync";
import Videogeneration from "./pages/videogeneration";
import UserProfile from "./pages/UserProfile";
import ManagePlan from "./pages/ManagePlan";
import ManagePlanPage from "./pages/ManagePlanPage";
import { UserProvider } from "./contexts/UserContext";
import Templates from './pages/Templates';
import BrandKits from './pages/BrandKits';
import Shared from './pages/Shared';
import Saved from './pages/Saved';


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
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
