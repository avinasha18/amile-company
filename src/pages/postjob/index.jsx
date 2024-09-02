import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Actions } from "../../hooks/actions";

const PostNewJob = () => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [formData, setFormData] = useState({
    role: "",
    companyName: userDetails.companyName || "",
    stipend: "",
    hours: "",
    type: "",
    modeOfWork: "",
    location: "",
    startDate: "",
    endDate: "",
    skillsRequired: "",
    responsibilities: "",
    qualifications: "",
    applicationDeadline: "",
    contactEmail: userDetails.email || "",
    website: userDetails.website || "",
    benefits: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Actions.postInternship(formData);
      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={` w-screen mx-auto p-6 ${
        isDarkMode ? "bg-[#111827] text-white" : "bg-white text-black"
      }   shadow-md overflow-scroll no-scrollbar`}
    >
      <h2 className="text-2xl font-bold mb-6">Post a New Internship</h2>

      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium ">
          Role *
        </label>
        <input
          type="text"
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="companyName" className="block text-sm font-medium ">
          Company Name *
        </label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>
      <div className="lg:flex sm:flex-row gap-2">
        <div className="mb-4 lg:w-1/2">
          <label htmlFor="stipend" className="block text-sm font-medium  ">
            Stipend
          </label>
          <input
            type="number"
            name="stipend"
            id="stipend"
            value={formData.stipend}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="mb-4 lg:w-1/2">
          <label htmlFor="hours" className="block text-sm font-medium  ">
            Hours *
          </label>
          <input
            type="number"
            name="hours"
            id="hours"
            value={formData.hours}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium  ">
          Type *
        </label>
        <input
          type="text"
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="modeOfWork" className="block text-sm font-medium  ">
          Mode of Work *
        </label>
        <input
          type="text"
          name="modeOfWork"
          id="modeOfWork"
          value={formData.modeOfWork}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium  ">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>
      <div className=" justify-center flex gap-2">
        <div className="mb-4 lg:w-1/2">
          <label htmlFor="startDate" className="block text-sm font-medium  ">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="mb-4 lg:w-1/2">
          <label htmlFor="endDate" className="block text-sm font-medium  ">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="skillsRequired" className="block text-sm font-medium  ">
          Skills Required *
        </label>
        <input
          type="text"
          name="skillsRequired"
          id="skillsRequired"
          value={formData.skillsRequired}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="responsibilities"
          className="block text-sm font-medium  "
        >
          Responsibilities *
        </label>
        <textarea
          name="responsibilities"
          id="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="qualifications" className="block text-sm font-medium  ">
          Qualifications *
        </label>
        <textarea
          name="qualifications"
          id="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="applicationDeadline"
          className="block text-sm font-medium  "
        >
          Application Deadline
        </label>
        <input
          type="date"
          name="applicationDeadline"
          id="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>
      <div className="md:flex gap-2">
        <div className="mb-4 md:w-1/2">
          <label htmlFor="contactEmail" className="block text-sm font-medium  ">
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            id="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="mb-4 md:w-1/2">
          <label htmlFor="website" className="block text-sm font-medium  ">
            Website
          </label>
          <input
            type="url"
            name="website"
            id="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="benefits" className="block text-sm font-medium  ">
          Benefits
        </label>
        <textarea
          name="benefits"
          id="benefits"
          value={formData.benefits}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Post Internship
        </button>
      </div>
    </form>
  );
};

export default PostNewJob;
