import React from "react";
import SupportMenu from "../dashboard/SupportMenu.jsx";
import UserDashboard from "../dashboard/UserDashboard.jxs";

function UserPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen gap-0.5">
        <div className="w-full md:w-3/12">
          <SupportMenu />
        </div>
        {/* User Dashboard - 70% of the screen width */}
        <div className="w-full md:w-9/12">
          <UserDashboard />
        </div>
      </div>
    </>
  );
}

export default UserPage;
