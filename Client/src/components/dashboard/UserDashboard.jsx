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
  FiPlus,
  FiLogOut,
  FiLock,
  FiMenu,
  FiUser,
  FiBell,
  FiClock,
  FiCheckCircle,
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

class UserDashboard extends React.Component {
  state = {
    tickets: [],
    stats: {
      Open: 5,
      "In Progress": 3,
      Closed: 12,
    },
    darkMode: false,
    showDropdown: false,
    showTicketModal: false,
    menuOpen: false,
    newTicket: {
      title: "",
      description: "",
      priority: "medium",
    },
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({ showDropdown: !prevState.showDropdown }));
  };

  toggleTicketModal = () => {
    this.setState((prevState) => ({
      showTicketModal: !prevState.showTicketModal,
      showDropdown: false,
    }));
  };

  prepareChartData = () => ({
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "My Tickets",
        data: [
          this.state.stats.Open,
          this.state.stats["In Progress"],
          this.state.stats.Closed,
        ],
        backgroundColor: [
          "rgba(99, 102, 241, 0.6)",
          "rgba(245, 158, 11, 0.6)",
          "rgba(16, 185, 129, 0.6)",
        ],
      },
    ],
  });

  handleInputChange = (e) => {
    this.setState({
      newTicket: {
        ...this.state.newTicket,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmitTicket = (e) => {
    e.preventDefault();
    // Add ticket submission logic here
    this.toggleTicketModal();
  };

  render() {
    const { darkMode, showDropdown, showTicketModal, menuOpen, newTicket } =
      this.state;
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
              <h1 className="text-xl font-bold">Support Dashboard</h1>
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
                  <span>User</span>
                </button>

                {showDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } rounded-md shadow-lg py-1`}
                  >
                    <button
                      onClick={this.toggleTicketModal}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiPlus className="mr-2" /> New Ticket
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
          } transition-transform duration-300 w-64 z-50`}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">Support Menu</h2>
            <nav className="space-y-2">
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiClock className="mr-2" /> My Tickets
              </a>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiPlus className="mr-2" /> New Request
              </a>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiClock className="mr-2" /> History
              </a>
              <a
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiCheckCircle className="mr-2" /> Resolved
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
                <p className="text-3xl font-bold text-indigo-500">5</p>
              </div>
              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold">In Progress</h3>
                <p className="text-3xl font-bold text-amber-500">3</p>
              </div>
              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold">Closed Tickets</h3>
                <p className="text-3xl font-bold text-emerald-500">12</p>
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
                  Ticket Status Distribution
                </h2>
                <Pie data={this.prepareChartData()} />
              </div>

              <div
                className={`p-6 rounded-lg shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Monthly Activity</h2>
                <Bar
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Tickets Created",
                        data: [3, 5, 2, 4, 6, 1],
                        backgroundColor: "rgba(99, 102, 241, 0.6)",
                      },
                    ],
                  }}
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

        {/* New Ticket Modal */}
        {showTicketModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } w-96`}
            >
              <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
              <form className="space-y-4" onSubmit={this.handleSubmitTicket}>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newTicket.title}
                    onChange={this.handleInputChange}
                    className={`w-full p-2 border rounded ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "border-gray-300"
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newTicket.description}
                    onChange={this.handleInputChange}
                    className={`w-full p-2 border rounded ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "border-gray-300"
                    }`}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={newTicket.priority}
                    onChange={this.handleInputChange}
                    className={`w-full p-2 border rounded ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={this.toggleTicketModal}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Create Ticket
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

export default UserDashboard;
