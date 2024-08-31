import React, { useEffect, useState } from "react";
import { Actions } from "../../hooks/actions";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../services/redux/AuthSlice";
import { Avatar, Badge, Box, Skeleton } from "@mui/material";

const ProfilePage = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [activeTab, setActiveTab] = useState("About");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.auth.userData));

  const tabs = ["Address", "Social", "contact Person", "About"];

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await Actions.fetchUser();
      if (response.data.success) {
        dispatch(setUserData(response.data.data));
        setUser(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateUser = async (data) => {
    try {
      const response = await Actions.UpdateStudent(data);

      if (response.data.success) {
        dispatch(setUserData(response.data.updatedUser));
        setUser(response.data.updatedUser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const themeStyles = {
    background: isDarkMode ? "bg-black" : "bg-gray-100",
    text: isDarkMode ? "text-gray-300" : "text-gray-800",
    heading: isDarkMode ? "text-white" : "text-gray-900",
    card: isDarkMode ? "bg-gray-900" : "bg-white",
    cardBorder: isDarkMode ? "border-gray-800" : "border-gray-200",
    input: isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800",
    button: isDarkMode
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-blue-500 hover:bg-blue-600",
    tabActive: isDarkMode ? "bg-blue-600" : "bg-blue-500",
    tabInactive: isDarkMode ? "bg-gray-800" : "bg-gray-200",
    skillTag: isDarkMode
      ? "bg-gray-800 text-gray-300"
      : "bg-gray-200 text-gray-700",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Address":
        return (
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{user.address?.street}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{`${user?.address?.city}, ${user?.address?.state}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{`${user?.address?.zip}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user?.address?.country}</p>
          </div>
        );
        case "Social":
          return (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">LinkedIn:</span>
                  <a href={"https://linkedin.com/in/"+user?.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400">
                 {user?.linkedin}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Instagram:</span>
                  <a href={"https://instagram.com/username"+user?.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-400">
                  {"https://instagram.com/username"+user?.instagram}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Email:</span>
                  <a href={"mailto:"+user?.email} className="text-blue-600 dark:text-blue-400">
                    {user?.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Website:</span>
                  <a href={user?.website} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400">
                    {user?.website}
                  </a>
                </div>
              </div>
            </div>
          );
        
          case "contact Person":
            return (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Contact Person</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Name:</span>
                    <span className="text-gray-900 dark:text-gray-100">{user?.contactPerson?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Phone:</span>
                    <a href={"tel:"+user?.contactPerson?.phone} className="text-blue-600 dark:text-blue-400">
                      {user?.contactPerson?.phone}
                    </a>
                  </div>
                </div>
              </div>
            );
          
            case "About":
              return (
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
            
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Company Name:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user?.companyName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Company Size:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user?.companySize}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Company Tagline:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user?.companyTagline}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Company Type:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user?.companyType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">CRN Number:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user?.crnNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Date of Registration:</span>
                      <span className="text-gray-900 dark:text-gray-100">{user?.dateOfRegistration}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Incorporation Date:</span>
                      <span className="text-gray-900 dark:text-gray-100">
                      {user?.incorporationDate}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Email:</span>
                      <a href={"mailto:"+user?.email} className="text-blue-600 dark:text-blue-400">
                        {user?.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Status:</span>
                      <span className="text-green-600 dark:text-green-400">{user?.status}</span>
                    </div>
                  </div>
            
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Company Description</h4>
                    <p className="text-gray-900 dark:text-gray-100">
                    {user?.companyDescription}
                    </p>
                  </div>
            
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Company Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {user?.companyCategories?.map((category) => (
                        <span key={category} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            
     
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <div
      className={`min-h-screen ${themeStyles.background} ${themeStyles.text} p-8 overflow-auto w-full no-scrollbar`}
    >
      <div className="max-w-6xl mx-auto flex lg:gap-5 flex-col lg:flex-row">
        {/* Profile Section */}
        <div
          className={`${themeStyles.card} rounded-lg p-6 mb-8 lg:w-3/4 md:w-100 border-2 ${themeStyles.cardBorder}`}
        >
          {user?.email ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Badge
                    color={user.status === "active" ? "success" : "warning"}
                    overlap="circular"
                    badgeContent=""
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      alt={user?.companyName?.toUpperCase()}
                      src={user?.companyLogo}
                      className="w-24 h-24 rounded-full"
                      sx={{
                        width: 84,
                        height: 84,
                        bgcolor: isDarkMode ? "#fff" : "#000",
                        color: isDarkMode ? "#000" : "#fff",
                        fontSize: "60px",
                      }}
                    ></Avatar>
                  </Badge>

                  <div className="ml-6">
                    <h1 className={`text-2xl font-bold ${themeStyles.heading}`}>
                      {user.companyName}
                    </h1>

                    <p>{user.companyTagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`${themeStyles.button} text-white px-4 py-2 rounded`}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <div className="flex gap-4">
                <p>{user.companyDescription}</p>
              </div>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton variant="rectangular" width={310} height={60} />
                <Skeleton variant="button" width={110} height={60} />
              </Box>

              <Skeleton variant="text" width={310} height={60} />
            </>
          )}

          {/* Tabs */}
          <div className={`${themeStyles.card} rounded-lg lg:p-6 mb-8 mt-6`}>
            <ul className="flex mb-4 gap-4 overflow-scroll no-scrollbar">
              {tabs.map((tab, index) => (
                <li key={index} className="flex items-center justify-center">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeTab === tab
                        ? themeStyles.tabActive
                        : themeStyles.tabInactive
                    } text-[15px] ${themeStyles.text}`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
            <div>{renderTabContent()}</div>
          </div>
        </div>

        {/* Right Side Section */}
        <div
          className={`${themeStyles.card} rounded-lg p-6 mb-8  lg:w-1/4 border-2 ${themeStyles.cardBorder}`}
        >
          <div className="mb-6 ">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-4`}>
              Branches
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {user?.branches?.map((branch) => (
                <div
                  key={branch._id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <h4 className="text-md text-white font-medium mb-2">
                    {branch.branchName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {branch.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <ProfileEditModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        user={user}
        onSave={updateUser}
      /> */}
    </div>
  );
};

export default ProfilePage;
