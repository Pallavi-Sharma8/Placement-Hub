import React from 'react';
import { useJobs } from '../contexts/JobContext';
import JobCard from "./JobCard.tsx"
import ContactButtons from './ContactButtons.tsx';
import { Briefcase, Users } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { jobs } = useJobs();
  
  // Show only the latest 6 jobs for better grid layout
  const latestJobs = jobs.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className='  w-full bg-gray-950 p-4 flex flex-row   ' >
          <div className="flex items-center gap-3 mb-4 lg:ml-44" >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Briefcase size={32} className="text-white" />
            </div>
            <div >
              <h1 className="text-2xl font-bold text-blue-400">Placement Hub</h1>
              <p className="text-gray-300 text-sm">Sirsa's Trusted Internship & Placement Partner</p>
            </div>
        
          </div>
            <div className='mt-5 gap-20 lg:ml-96 lg:block   hidden'><ContactButtons/></div>
               </div>
        <div className="max-w-6xl mx-auto px-4 py-8 ">

          <div className='flex gap-10 mt-10 md:ml-8'>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl shadow-2xl lg:block md:block hidden">
            <p className="text-2xl font-bold mb-3">
              Welcome to Placement Hub <br/>– Sirsa's Trusted Internship & Placement Partner! 🚀
            </p>
            
            <p className="text-blue-100 text-lg lg:mt-20 mt-10">Here are the latest job openings for you:</p>
            <div className="mt-4 flex items-center gap-4 text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm">{latestJobs.length} Active Openings</span>
              </div>
              
            </div>
            <div className=' hidden mt-5    gap-20 lg:block  '><ContactButtons/></div>
          </div>
          <div  >
            <img src='public\homeSection.png' className='w-[75vh]'/>
          </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Job Listings */}
        <div>
          {latestJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {latestJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700">
              <Users size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400 mb-2">Currently no openings. Stay tuned, we update daily!</p>
              <p className="text-gray-500">Check back tomorrow for new opportunities</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        {latestJobs.length > 0 && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl p-8 shadow-2xl mt-16">
      <h3 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        Ready to Apply? Let's Connect!
      </h3>      
     
        <div className='justify-center'>
       <ContactButtons   />
     
      </div>
      <p className="text-gray-400 text-center mt-6 text-sm">
        📞 Call: +918059408454 | Our placement experts are ready to guide your career journey
      </p>
    </div>
        )}

        {/* Footer Branding */}
        <footer className="text-center mt-20 py-8 border-t border-gray-700">
          <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            ✨ Placement Hub – Building Careers of Sirsa Students 🚀
          </p>
          <p className="text-gray-500 text-sm mt-2">Your success is our mission</p>
        </footer>
      </main>
    </div>
  );
};

export default StudentDashboard;