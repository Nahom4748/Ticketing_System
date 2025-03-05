import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FiSun,
  FiMoon,
  FiSettings,
  FiLogOut,
  FiLock,
  FiMenu,
  FiUser,
  FiBell,
  FiGrid,
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

class AdminDashboard extends React.Component {
  state = {
    tickets: [],
    stats: {
      Open: 10,
      "In Progress": 20,
      Closed: 15,
    },
    darkMode: false,
    showDropdown: false,
    showPasswordModal: false,
    menuOpen: false,
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({ showDropdown: !prevState.showDropdown }));
  };

  togglePasswordModal = () => {
    this.setState((prevState) => ({
      showPasswordModal: !prevState.showPasswordModal,
      showDropdown: false,
    }));
  };

  prepareChartData = () => ({
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Ticket Status",
        data: [
          this.state.stats.Open,
          this.state.stats["In Progress"],
          this.state.stats.Closed,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(34, 197, 94, 0.6)",
        ],
      },
    ],
  });

  render() {
    const { darkMode, showDropdown, showPasswordModal, menuOpen } = this.state;
    const themeClasses = darkMode
      ? "bg-gray-900 text-white"
      : "bg-gray-50 text-gray-900";

    return (
      <div
        className={`min-h-screen ${themeClasses} transition-colors duration-300`}
      >
        {/* Navigation Bar */}
        <nav
          className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => this.setState({ menuOpen: !menuOpen })}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4 relative">
              <button
                onClick={this.toggleDarkMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <FiBell />
              </button>

              <div className="relative">
                <button
                  onClick={this.toggleDropdown}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiUser />
                  <span>Admin</span>
                </button>

                {showDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } rounded-md shadow-lg py-1`}
                  >
                    <button
                      onClick={this.togglePasswordModal}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLock className="mr-2" /> Change Password
                    </button>
                    <button
                      onClick={this.props.logout}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <div
          className={`fixed left-0 top-0 h-full ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } 
        transition-transform duration-300 w-64 z-50`}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <nav className="space-y-2">
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiGrid className="mr-2" /> Dashboard
              </a>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiSettings className="mr-2" /> Tickets
              </a>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiUser className="mr-2" /> Users
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main
          className={`pt-8 px-4 ${
            menuOpen ? "ml-64" : "ml-0"
          } transition-margin duration-300`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold">Open Tickets</h3>
                <p className="text-3xl font-bold text-blue-500">10</p>
              </div>
              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold">In Progress</h3>
                <p className="text-3xl font-bold text-yellow-500">20</p>
              </div>
              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold">Closed Tickets</h3>
                <p className="text-3xl font-bold text-green-500">15</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Status Distribution
                </h2>
                <Pie data={this.prepareChartData()} />
              </div>

              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
                <Bar
                  data={this.prepareChartData()}
                  options={{
                    responsive: true,
                    scales: {
                      x: { type: "category" },
                      y: { beginAtZero: true },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } w-96`}
            >
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <form className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={this.togglePasswordModal}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AdminDashboard;
