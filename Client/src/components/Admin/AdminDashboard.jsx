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
  FiBox,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiTrendingUp,
  FiSliders,
} from "react-icons/fi";
import {
  getTicketStats,
  getRecentTickets,
} from "../../services/ticket.service";

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
    stats: {
      total: 0,
      open: 0,
      inProgress: 0,
      closed: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0,
      criticalPriority: 0,
      resolved: 0,
    },
    recentTickets: [],
    darkMode: false,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchDashboardData();
  }

  fetchDashboardData = async () => {
    try {
      const [statsResponse, recentResponse] = await Promise.all([
        getTicketStats(),
        getRecentTickets(),
      ]);

      this.setState({
        stats: {
          ...this.state.stats,
          ...statsResponse,
        },
        recentTickets: recentResponse,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  getChartData = () => ({
    pie: {
      labels: ["Open", "In Progress", "Resolved", "Closed"],
      datasets: [
        {
          data: [
            this.state.stats.open,
            this.state.stats.inProgress,
            this.state.stats.resolved,
            this.state.stats.closed,
          ],
          backgroundColor: ["#F87171", "#FBBF24", "#4ADE80", "#60A5FA"],
          borderWidth: 0,
        },
      ],
    },
    bar: {
      labels: ["Critical", "High", "Medium", "Low"],
      datasets: [
        {
          label: "Tickets by Priority",
          data: [
            this.state.stats.criticalPriority,
            this.state.stats.highPriority,
            this.state.stats.mediumPriority,
            this.state.stats.lowPriority,
          ],
          backgroundColor: ["#EF4444", "#F59E0B", "#3B82F6", "#10B981"],
          borderRadius: 8,
        },
      ],
    },
  });

  StatCard = ({ icon: Icon, title, value, color }) => (
    <div
      className={`p-6 rounded-2xl flex items-center space-x-4 transition-all 
      ${
        this.state.darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm hover:shadow-md`}
    >
      <div className={`p-3 rounded-lg ${color} text-white`}>
        <Icon className="text-2xl" />
      </div>
      <div>
        <p
          className={`text-sm ${
            this.state.darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-2xl font-bold ${
            this.state.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  renderContent() {
    const { darkMode, stats, recentTickets, error } = this.state;
    const chartData = this.getChartData();

    if (error) {
      return (
        <div className="p-4 bg-red-50 rounded-lg text-red-700 flex items-center gap-3">
          <FiAlertCircle /> {error}
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <this.StatCard
            icon={FiBox}
            title="Total Tickets"
            value={stats.total}
            color="bg-indigo-500"
          />
          <this.StatCard
            icon={FiAlertCircle}
            title="Open Tickets"
            value={stats.open}
            color="bg-red-500"
          />
          <this.StatCard
            icon={FiClock}
            title="In Progress"
            value={stats.inProgress}
            color="bg-yellow-500"
          />
          <this.StatCard
            icon={FiCheckCircle}
            title="Resolved"
            value={stats.resolved}
            color="bg-green-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div
            className={`p-6 rounded-2xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center mb-6 space-x-2">
              <FiSliders
                className={`text-xl ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              />
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Ticket Status Distribution
              </h3>
            </div>
            <div className="h-72">
              <Pie
                data={chartData.pie}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: darkMode ? "#fff" : "#000" },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center mb-6 space-x-2">
              <FiTrendingUp
                className={`text-xl ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              />
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Ticket Priority Overview
              </h3>
            </div>
            <div className="h-72">
              <Bar
                data={chartData.bar}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: darkMode ? "#374151" : "#e5e7eb" },
                      ticks: { color: darkMode ? "#fff" : "#000" },
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: darkMode ? "#fff" : "#000" },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl shadow-sm ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-6 border-b">
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Recent Ticket Activity
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentTickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td className="px-6 py-4 text-sm">#{ticket.ticketId}</td>
                    <td className="px-6 py-4 text-sm">{ticket.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "Open"
                            ? "bg-red-100 text-red-800"
                            : ticket.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === "Urgent"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "High"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  render() {
    const { darkMode, loading } = this.state;

    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              Ticket Analytics Dashboard
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Overview of support ticket metrics and trends
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            this.renderContent()
          )}
        </main>
      </div>
    );
  }
}

export default AdminDashboard;
