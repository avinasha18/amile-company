import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Navbar from "../navbar";
// import Messages from "../Messages";
import CompanyChatStart from "../../pages/chatmessages";
import Sidebar from "../sidebar";
import ProfilePage from "../../pages/profile";
import PageNotFound from "../pageNotFound";
import PostNewJob from "../../pages/postjob";
import MyJobPosts from "../../pages/myjobposts";
import JobDetailPage from "../JobDetailPage"
import JobApplications from "../../pages/applications";

export const RouteManagement = ({ islogin }) => {
  const location = useLocation(window.location);

  const ProtectedRoute = ({ isLogin, children, nextPath }) => {
    if (!isLogin) {
      return <Navigate to={`/login?nextpath=${nextPath}`} replace />;
    }

    return children;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Navbar isLogin={islogin} />
      <div className={`h-screen flex flex-1 overflow-hidden no-scrollbar`}>
        <Sidebar isLogin={islogin} />
        <Routes>
          {/* <Route path="/" element={<JobsPage />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/messages"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <CompanyChatStart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postjob"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <PostNewJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewjobs"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <MyJobPosts />
              </ProtectedRoute>
            }
          />
            <Route
            path="/jobdetail"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <JobDetailPage />
              </ProtectedRoute>
            }
          />
              <Route
            path="/applied"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <JobApplications />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};
