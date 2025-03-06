// UserNewTickets.jsx
import React, { useState } from "react";
import SupportMenu from "../dashboard/SupportMenu";
import TicketList from "../tickets/TicketList";

function Tickets() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Main Content */}
      <div className="flex pt-16">
        <div
          className={`fixed left-0 z-40 transition-all duration-300 ${
            isMenuCollapsed ? "w-20" : "w-64"
          }`}
        >
          <SupportMenu
            darkMode={darkMode}
            isCollapsed={isMenuCollapsed}
            onToggle={() => setIsMenuCollapsed(!isMenuCollapsed)}
          />
        </div>
        {/* Main Content Area */}
        <main
          className={`flex-1 transition-margin duration-300 ${
            isMenuCollapsed ? "ml-20" : "ml-64"
          } p-8`}
        >
          <div className="max-w-4xl mx-auto">
            <TicketList darkMode={darkMode} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Tickets;
