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
import { UserProvider } from "./contexts/UserContext";
import Templates from './pages/Templates';

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
            <Route path="/manage-plan" element={<ManagePlan />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
