import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Briefcase, RefreshCw } from 'lucide-react';
import JobForm from './JobForm';
import AdminJobCard from './AdminJobCard';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { jobs } = useJobs();
  const navigate = useNavigate();
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleEditJob = (jobId: string) => {
    setEditingJob(jobId);
    setShowJobForm(true);
  };

  const handleFormClose = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Force a re-render to show latest data
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Briefcase size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-400">AssistHR Admin</h1>
                <p className="text-gray-300 text-sm">Job Listing Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
                title="Refresh Data"
              >
                <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Active Job Listings</h3>
            <p className="text-3xl font-bold text-white">
              {refreshing ? (
                <span className="animate-pulse">...</span>
              ) : (
                jobs.length
              )}
            </p>
            <p className="text-gray-400 text-sm mt-1">Total opportunities available</p>
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Quick Actions</h3>
              <p className="text-gray-400 text-sm">Manage your job listings</p>
            </div>
            <button
              onClick={() => setShowJobForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Job
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase size={24} />
            Manage Job Listings
          </h2>
          
          {jobs.length > 0 ? (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <AdminJobCard 
                  key={job.id} 
                  job={job} 
                  onEdit={() => handleEditJob(job.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-xl">
              <Plus size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400 mb-4">No job listings yet</p>
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Create Your First Job Listing
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Job Form Modal */}
      {showJobForm && (
        <JobForm 
          onClose={handleFormClose}
          editingJobId={editingJob}
        />
      )}
    </div>
  );
};

export default AdminDashboard;