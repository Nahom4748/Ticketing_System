import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaList,
  FaLock,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaArchive,
  FaHourglassHalf,
} from "react-icons/fa";

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
          ? "bg-indigo-100 text-indigo-600"
          : "hover:bg-gray-100 text-gray-600"
      }
      ${isCollapsed ? "justify-center" : "justify-start"}
    `}
  >
    <Icon className={`text-lg ${isCollapsed ? "" : "mr-3"}`} />
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </NavLink>
);

const AdminSidebar = ({ darkMode, isCollapsed, onToggle }) => {
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
                Admin Panel
              </h2>
            )}
            <button
              onClick={onToggle}
              className={`p-2 rounded-lg hover:bg-opacity-20 ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            ></button>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <div
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } text-sm mb-2 ${isCollapsed ? "hidden" : "block"}`}
          >
            Ticket Management
          </div>

          <MenuItem
            to="/AdminDashbord"
            icon={FaList}
            label="Dashbord"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />

          <MenuItem
            to="/Open-Ticket"
            icon={FaHourglassHalf}
            label="New Order Tickets"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />

          <MenuItem
            to="/Resolve-TicketList"
            icon={FaCheckCircle}
            label="Resolved Tickets"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />

          <MenuItem
            to="/Closed-TicketList"
            icon={FaArchive}
            label="Closed Tickets"
            darkMode={darkMode}
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* Account Settings */}
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
              to="/admin/change-password"
              icon={FaLock}
              label="Change Password"
              darkMode={darkMode}
              isCollapsed={isCollapsed}
            />

            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              } ${isCollapsed ? "justify-center" : "justify-start"}`}
              onClick={() => {
                /* Add logout logic here */
              }}
            >
              <FaSignOutAlt
                className={`text-lg ${isCollapsed ? "" : "mr-3"}`}
              />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
