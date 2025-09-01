import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Lock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));

    if (login(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Student Dashboard
        </Link>

        {/* Login Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-purple-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <p className="text-gray-400 mt-2">Manage job listings and applications</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Shield size={20} />
                  Login to Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Test Credentials */}
          {/* <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Test Credentials:</h4>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Username: <span className="text-blue-400 font-mono">admin</span></p>
              <p>Password: <span className="text-blue-400 font-mono">admin123</span></p>
            </div>
            <p className="text-xs text-gray-500 mt-2">These credentials can be changed later in production</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;