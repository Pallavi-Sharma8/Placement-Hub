import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  applyBefore: string;
  contactPreference: 'WhatsApp' | 'Call' | 'Email';
  createdAt: string;
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('assisthr-jobs');
    if (savedJobs) {
      try {
        const parsedJobs = JSON.parse(savedJobs);
        setJobs(parsedJobs);
      } catch (error) {
        console.error('Error parsing saved jobs:', error);
        setJobs([]);
      }
    } else {
      // Add some sample jobs for demonstration
      const sampleJobs: Job[] = [
        {
          id: '1',
          title: 'Frontend Developer Intern',
          company: 'TechCorp Solutions',
          location: 'Sirsa',
          stipend: '₹15,000/month',
          applyBefore: '2025-02-15',
          contactPreference: 'WhatsApp',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Marketing Assistant',
          company: 'Digital Dynamics',
          location: 'Hisar',
          stipend: '₹12,000/month',
          applyBefore: '2025-02-10',
          contactPreference: 'Call',
          createdAt: new Date().toISOString()
        }
      ];
      setJobs(sampleJobs);
      try {
        localStorage.setItem('assisthr-jobs', JSON.stringify(sampleJobs));
      } catch (error) {
        console.error('Error saving sample jobs:', error);
      }
    }
  }, []);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    if (jobs.length > 0) {
      try {
        localStorage.setItem('assisthr-jobs', JSON.stringify(jobs));
        console.log('Jobs saved to localStorage:', jobs.length);
      } catch (error) {
        console.error('Error saving jobs to localStorage:', error);
      }
    }
  }, [jobs]);

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setJobs(prev => {
      const updatedJobs = [newJob, ...prev];
      console.log('Adding new job:', newJob.title);
      return updatedJobs;
    });
  };

  const updateJob = (id: string, updatedData: Partial<Job>) => {
    setJobs(prev => {
      const updatedJobs = prev.map(job => 
        job.id === id ? { ...job, ...updatedData } : job
      );
      console.log('Updating job:', id);
      return updatedJobs;
    });
  };

  const deleteJob = (id: string) => {
    setJobs(prev => {
      const updatedJobs = prev.filter(job => job.id !== id);
      console.log('Deleting job:', id);
      return updatedJobs;
    });
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};