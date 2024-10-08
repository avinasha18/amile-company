import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InboxIcon from "@mui/icons-material/Inbox";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../services/redux/sideBarToggleSlice";
import { IconButton } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
const Sidebar = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isCollapsed = useSelector((state) => state.sidebar.isSidebar);
  const dispatch = useDispatch();

  const switchSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav
      className={`overflow-hidden ${
        isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-800"
      } ${
        isCollapsed ? "w-20" : "w-64"
      } flex-shrink-0 hidden md:block border-r ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } transition-all duration-300`}
    >
      <div className={isCollapsed ? "p-2" : "p-4"}>
        <div
          className={`flex ${
            !isCollapsed ? "justify-between" : "justify-center"
          }`}
        >
          {!isCollapsed && <h1 className="font-bold"> Company</h1>}
          <button
            onClick={switchSidebar}
            className={`focus:outline-none mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <IconButton style={{ color: isDarkMode ? "#fff" : "#000" }}>
              {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </button>
        </div>
        <SidebarSection isCollapsed={isCollapsed}>
          <SidebarItem
            icon={AccountBoxIcon}
            label="Profile"
            isDarkMode={isDarkMode}
            to="/profile"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={InboxIcon}
            label="Messages"
            isDarkMode={isDarkMode}
            to="/messages"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={PendingActionsIcon}
            label="Applications"
            isDarkMode={isDarkMode}
            to="/applied"
            isCollapsed={isCollapsed}
          />
        </SidebarSection>
        <SidebarSection title="Job offers" isCollapsed={isCollapsed}>
          <SidebarItem
            icon={PostAddIcon}
            isDarkMode={isDarkMode}
            label="view jobs"
            to="/viewjobs"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={GoVerified}
            isDarkMode={isDarkMode}
            label="Post New Job"
            to="/postjob"
            isCollapsed={isCollapsed}
          />
        </SidebarSection>

        <SidebarSection title="Settings" isCollapsed={isCollapsed}>
          <SidebarItem
            icon={SettingsSuggestIcon}
            label="Settings"
            to="/settings"
            isCollapsed={isCollapsed}
          />
        </SidebarSection>
      </div>
    </nav>
  );
};

const SidebarSection = ({ title, children, isCollapsed }) => (
  <div className="mb-6">
    {!isCollapsed && (
      <h6 className="text-gray-250 text-sm font-semibold mb-2">{title}</h6>
    )}
    <ul>{children}</ul>
  </div>
);

const SidebarItem = ({
  icon: Icon,
  label,
  isDarkMode,
  to,
  isCollapsed,
  gradient,
}) => (
  <li>
    {to ? (
      <Link
        to={to}
        className={`flex items-center py-2 px-4 gap-3 ${
          isDarkMode
            ? "hover:bg-[#fff] hover:text-[#121010]"
            : "hover:bg-[#121010] hover:text-[#fff]"
        } rounded transition-colors ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className={`w-5 h-5`} />
        {!isCollapsed && (
          <span
            className={`${
              gradient
                ? "font-bold animate-gradient bg-gradient-to-r from-yellow-500 via-pink-500 to-violet-500 bg-clip-text text-transparent"
                : ""
            }`}
          >
            {label}
          </span>
        )}
      </Link>
    ) : (
      <a
        href={to}
        className={`flex items-center py-2 px-4 gap-3 ${
          isDarkMode
            ? "hover:bg-[#fff] hover:text-[#121010]"
            : "hover:bg-[#121010] hover:text-[#fff]"
        } rounded transition-colors ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className={`w-5 h-5`} />
        {!isCollapsed && <span className="text-gray-400 me-2">{label}</span>}
      </a>
    )}
  </li>
);

export default Sidebar;
