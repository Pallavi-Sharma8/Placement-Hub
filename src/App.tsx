import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { JobProvider } from './contexts/JobContext';
import { AuthProvider } from './contexts/AuthContext';
import { Users, Shield } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Routes>
              <Route path="/" element={<StudentDashboard />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            
            {/* Navigation Footer */}
            <div className="fixed bottom-4 right-4 flex gap-2">
              <Link 
                to="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                title="Student Dashboard"
              >
                <Users size={20} />
              </Link>
              <Link 
                to="/admin" 
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                title="Admin Panel"
              >
                <Shield size={20} />
              </Link>
            </div>
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;