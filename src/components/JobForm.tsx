import React, { useState, useEffect } from 'react';
import { useJobs, Job } from '../contexts/JobContext';
import { X, Plus, Edit } from 'lucide-react';

interface JobFormProps {
  onClose: () => void;
  editingJobId?: string | null;
}

const JobForm: React.FC<JobFormProps> = ({ onClose, editingJobId }) => {
  const { jobs, addJob, updateJob } = useJobs();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    stipend: '',
    applyBefore: '',
    contactPreference: 'WhatsApp' as 'WhatsApp' | 'Call' | 'Email'
  });

  const isEditing = !!editingJobId;
  const currentJob = isEditing ? jobs.find(job => job.id === editingJobId) : null;

  useEffect(() => {
    if (currentJob) {
      setFormData({
        title: currentJob.title,
        company: currentJob.company,
        location: currentJob.location,
        stipend: currentJob.stipend,
        applyBefore: currentJob.applyBefore,
        contactPreference: currentJob.contactPreference
      });
    }
  }, [currentJob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingJobId) {
      updateJob(editingJobId, formData);
    } else {
      addJob(formData);
    }
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      stipend: '',
      applyBefore: '',
      contactPreference: 'WhatsApp'
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              {isEditing ? <Edit size={20} /> : <Plus size={20} />}
            </div>
            <h2 className="text-xl font-bold text-white">
              {isEditing ? 'Edit Job Listing' : 'Add New Job Listing'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Frontend Developer Intern"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., TechCorp Solutions"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Sirsa, Hisar"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stipend/Salary *
            </label>
            <input
              type="text"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., ₹15,000/month"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Apply Before *
            </label>
            <input
              type="date"
              name="applyBefore"
              value={formData.applyBefore}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contact Preference *
            </label>
            <select
              name="contactPreference"
              value={formData.contactPreference}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Call">Call</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isEditing ? <Edit size={20} /> : <Plus size={20} />}
              {isEditing ? 'Update Job' : 'Add Job'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;