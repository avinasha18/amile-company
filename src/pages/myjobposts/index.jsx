import React, { useEffect, useState } from 'react';
import { Actions } from '../../hooks/actions';
import JobCard from '../../components/JobCard';
import { useSelector } from 'react-redux';

const MyJobPosts = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const isDarkMode = useSelector((state)=>state.theme.isDarkMode)

  const getMyJobPosts = async () => {
    try {
      const posts = await Actions.getInternships();
      setJobPosts(posts.data.data);
    } catch (error) {
      console.error('Error fetching job posts:', error);
    }
  };

  useEffect(() => {
    getMyJobPosts();
  }, []);

  return (
    <div className={`w-screen mx-auto p-6 ${isDarkMode?"bg-black text-white":"bg-white text-black"}  shadow-md overflow-scroll no-scrollbar`}>
      <h2 className="text-2xl font-bold mb-6 text-center">My Job Posts</h2>
      <ul className="space-y-4 no-scrollbar mb-10 ">
        {jobPosts.length > 0 ? (
          jobPosts.map((post) => (
        
            <JobCard job={post} key={post._id}/>
          ))
        ) : (
          <li className="text-center text-gray-600">No job posts found.</li>
        )}
      </ul>
    </div>
  );
};

export default MyJobPosts;
