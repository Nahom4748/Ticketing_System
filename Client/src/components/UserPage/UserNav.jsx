import React, { useContext } from "react";
import { FiUser, FiPlus, FiLogOut, FiLock, FiMenu } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";

const UserNav = ({
  darkMode,

  onToggleSidebar,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const { isLogged, user, logout } = useContext(AuthContext);
  const HandleLogout = () => logout();
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              } mr-2 lg:hidden`}
            >
              <FiMenu className="w-6 h-6" />
              <span className="sr-only">Open sidebar</span>
            </button>
            <h1 className={`text-xl font-bold`}>Support Dashboard</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isLogged ? (
              <>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center space-x-2 p-2 rounded-lg `}
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center `}
                      >
                        <FiUser className="w-5 h-5" />
                      </div>
                    )}
                    <div className="hidden sm:block text-left">
                      <p className={`text-sm font-medium `}>
                        {user?.role || "Guest"}
                      </p>
                      <p className={`text-xs `}>
                        {user?.email || "Not logged in"}
                      </p>
                    </div>
                  </button>

                  {showDropdown && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 }`}
                    >
                      <button className={`flex items-center w-full px-4 py-2`}>
                        <FiLock className="mr-2" /> Change Password
                      </button>
                      <button
                        onClick={HandleLogout}
                        className={`flex items-center w-full px-4 py-2 `}
                      >
                        <FiLogOut className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
