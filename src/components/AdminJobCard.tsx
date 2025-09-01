import React from 'react';
import { Job, useJobs } from '../contexts/JobContext';
import { Edit, Trash2, MapPin, DollarSign, Calendar, Building2 } from 'lucide-react';

interface AdminJobCardProps {
  job: Job;
  onEdit: () => void;
}

const AdminJobCard: React.FC<AdminJobCardProps> = ({ job, onEdit }) => {
  const { deleteJob } = useJobs();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      deleteJob(job.id);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Building2 size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400">{job.title}</h3>
              <p className="text-gray-300 font-medium">{job.company}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin size={16} className="text-green-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <DollarSign size={16} className="text-yellow-400" />
              <span>{job.stipend}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar size={16} className="text-red-400" />
              <span>{job.applyBefore}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
              {job.contactPreference}
            </span>
            <span className="text-gray-400">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            title="Edit Job"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
            title="Delete Job"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobCard;