import React from 'react';
import { FaArrowLeft, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaClock, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const JobDetailPage = () => {
  const  isDarkMode = useSelector((state)=>state.theme.isDarkMode); 
  const navigate = useNavigate();
  const location = useLocation();
  const { job } = location.state || {}; // Destructure the job data from the location state

  // Fallback in case job is not provided
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">No job details available.</p>
      </div>
    );
  }



  return (
    <div className={`min-h-screen w-full  overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors mb-6`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </button>

        {/* Job header */}
        <div className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {job.logo && (
                <img src={job.logo} alt={`${job.companyName} logo`} className="w-16 h-16 rounded-full mr-4" />
              )}
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{job.role}</h1>
                <p className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{job.companyName}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm ${job.type === 'Full-time' ? (isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') : (isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800')}`}>
              {job.type}
            </span>
          </div>
        </div>

        {/* Job details and application */}
        <div className="flex flex-col lg:flex-row gap-8 h-auto">
          {/* Left column - Job details */}
          <div className="lg:w-2/3">
            <section className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Job Description</h2>
              <p className="mb-4">{job.description}</p>

              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Qualifications:</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{job.qualifications}</p>

              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Responsibilities:</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{job.responsibilities}</p>

              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Benefits:</h3>
              <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {job?.benefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </section>

            <section className={`rounded-lg p-6 mb-8 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About {job.companyName}</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{job.companyDescription}</p>
            </section>
          </div>

          {/* Right column - Application and quick info */}
          <div className="lg:w-1/3">
            <div className={`rounded-lg p-6 mb-8 shadow-lg sticky top-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Info</h2>
              <div className="space-y-3">
                <InfoItem icon={<FaMapMarkerAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={job.location} />
                <InfoItem icon={<FaMoneyBillWave className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Stipend: ₹${job.stipend}`} />
                <InfoItem icon={<FaCalendarAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Start Date: ${new Date(job.startDate).toLocaleDateString()}`} />
                <InfoItem icon={<FaCalendarAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`End Date: ${job.endDate ? new Date(job.endDate).toLocaleDateString() : 'N/A'}`} />
                <InfoItem icon={<FaClock className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Hours per week: ${job.hours}`} />
                <InfoItem icon={<FaUsers className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Application Deadline: ${new Date(job.applicationDeadline).toLocaleDateString()}`} />
                <InfoItem icon={<FaGraduationCap className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />} text={`Mode of Work: ${job.modeOfWork}`} />
              </div>
         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center">
    {icon}
    <span>{text}</span>
  </div>
);

export default JobDetailPage;
