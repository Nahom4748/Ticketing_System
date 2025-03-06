// SupportMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPlus,
  FiClock,
  FiSettings,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const MenuItem = ({ icon: Icon, label, to, darkMode, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center p-3 rounded-lg transition-colors
      ${
        darkMode
          ? isActive
            ? "bg-gray-700 text-white"
            : "hover:bg-gray-700 text-gray-300"
          : isActive
          ? "bg-indigo-50 text-indigo-600"
          : "hover:bg-gray-100 text-gray-600"
      }
      ${isCollapsed ? "justify-center" : "justify-start"}
    `}
  >
    <Icon className={`text-lg ${isCollapsed ? "" : "mr-3"}`} />
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </NavLink>
);

const SupportMenu = ({ darkMode, isCollapsed, onToggle }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 shadow-lg transition-all duration-300
        ${darkMode ? "bg-gray-800" : "bg-white"}
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={`p-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Support Portal
              </h2>
            )}
            <button
              onClick={onToggle}
              className={`p-2 rounded-lg hover:bg-opacity-20 ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <div
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } text-sm mb-2 ${isCollapsed ? "hidden" : "block"}`}
          >
            Main Menu
          </div>
          <MenuItem
            to="/dashboard"
            icon={FiHome}
            label="Dashboard"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/tickets"
            icon={FiHome}
            label="My Tickets"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/new-ticket"
            icon={FiPlus}
            label="New Ticket"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />
          <MenuItem
            to="/history"
            icon={FiClock}
            label="History"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* Footer Menu */}
        <div
          className={`p-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } text-sm mb-2 ${isCollapsed ? "hidden" : "block"}`}
          >
            Account
          </div>
          <nav className="space-y-1">
            <MenuItem
              to="/settings"
              icon={FiSettings}
              label="Settings"
              darkMode={darkMode}
              isCollapsed={isCollapsed}
            />
            <MenuItem
              to="/profile"
              icon={FiUser}
              label="Profile"
              darkMode={darkMode}
              isCollapsed={isCollapsed}
            />
            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              } ${isCollapsed ? "justify-center" : "justify-start"}`}
            >
              <FiLogOut className={`text-lg ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SupportMenu;
