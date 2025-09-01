import React from "react";
import { Job } from "../contexts/JobContext";
import ContactButtons from './ContactButtons';
interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold text-white mb-2">{job.title}</h3>
      <p className="text-gray-300">{job.company}</p>
      <p className="text-gray-400 text-sm">{job.location}</p>
      <p className="text-purple-400 font-medium mt-2">{job.stipend}</p>
      <p className="text-sm text-gray-500 mt-1">
        Apply before: {job.applyBefore}
      </p>
      <p className="text-sm text-gray-500">
        Contact via: {job.contactPreference}
      </p>
        {/* <div className="flex   text-sm text-gray-400 mt-4 flex-wrap flex-col ">
            <ContactButtons />
          </div> */}
    </div>
  );
};

export default JobCard;
