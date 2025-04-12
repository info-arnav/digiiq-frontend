import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // adjust path if needed
import ImagePage from './pages/ImagePage'; 
import LipSync from './pages/LipSync';
import Videogeneration from './pages/videogeneration'




function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;