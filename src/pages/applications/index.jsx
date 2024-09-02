import React, { useEffect, useState } from "react";
import { Actions } from "../../hooks/actions";
import { useSelector } from "react-redux";
import ContactApplicant from "../../components/startChat";
const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const {_id:companyId} = useSelector((state) => state.auth.userDetails);

  const fetchJobApplications = async () => {
    try {
      const response = await Actions.getJobApplications();
      setApplications(response.data.data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  const handleAccept = async (applicationId) => {
    try {
      await Actions.acceptApplication(applicationId);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: "selected" } : app
        )
      );
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };
  const handleNextRound = async (applicationId) => {
    try {
      await Actions.nextRound(applicationId);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: "next round" } : app
        )
      );
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await Actions.rejectApplication(applicationId);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: "rejected" } : app
        )
      );
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  return (
    <div
      className={`w-screen mx-auto p-6 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }  card shadow-md`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Job Applications</h2>
      <ul className="space-y-4">
        {applications.length > 0 ? (
          applications?.map((application) => (
            <li
              key={application._id}
              className={`p-4 ${
                isDarkMode ? "bg-[#111827]" : "white"
              }  rounded-md shadow-sm`}
            >
              <h3 className="text-xl font-semibold">
                {application.internshipId.role} at{" "}
                {application.internshipId.companyName}
              </h3>
              <p className="text-sm ">
                Applicant: {application.studentId.name}
              </p>
              <p className="text-sm ">Email: {application.studentId.email}</p>
              <p className="text-sm ">
                Skills: {application.studentId.skills.join(", ")}
              </p>
              <p className="text-sm ">Status: {application.status}</p>
              <p className="text-sm ">
                Applied on:{" "}
                {new Date(application.appliedAt).toLocaleDateString()}
              </p>
              <p className="text-sm ">
                Application Deadline:{" "}
                {new Date(
                  application.internshipId.applicationDeadline
                ).toLocaleDateString()}
              </p>
              <p className="text-sm ">
                Portfolio:{" "}
                <a
                  href={application.studentId.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {application.studentId.portfolio}
                </a>
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleAccept(application._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  disabled={application.status === "selected"}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleNextRound(application._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Next Round
                </button>
                <button
                  onClick={() => handleReject(application._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  disabled={application.status === "rejected"}
                >
                  Reject
                </button>
                <ContactApplicant
                  applicantId={application.studentId?._id}
                  companyId={companyId}
                  key={application._id}
                />
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-600">
            No job applications found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default JobApplications;
