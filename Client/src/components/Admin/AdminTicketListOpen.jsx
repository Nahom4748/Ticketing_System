import React, { Component } from "react";
import TicketService from "../../services/ticket.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faInfoCircle,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

class AdminTicketListOpen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      loading: true,
      error: null,
      expandedTicketId: null,
      statusDropdown: null,
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const response = await TicketService.getAllTickets();
      const formattedTickets = response
        .map((ticket) => ({
          id: ticket._id,
          title: ticket.title,
          user: ticket.user?.email || "Unknown",
          date: new Date(ticket.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          status: ticket.status,
          description: ticket.description,
          priority: ticket.priority || "Medium",
        }))
        .filter((ticket) => ticket.status === "Open");

      this.setState({ tickets: formattedTickets, loading: false });
    } catch (error) {
      this.setState({
        error: "Failed to load tickets. Please try again later.",
        loading: false,
      });
      console.error("Error fetching tickets:", error);
    }
  };

  handleStatusChange = async (ticketId, newStatus) => {
    if (!window.confirm("Are you sure you want to update the status?")) return;

    try {
      await TicketService.updateTicketStatus(ticketId, { status: newStatus });
      this.setState((prevState) => ({
        tickets: prevState.tickets.filter((ticket) => ticket.id !== ticketId),
        statusDropdown: null,
      }));
      toast.success("Ticket status updated successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Failed to update ticket status", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      console.error("Error updating ticket status:", error);
    }
  };

  getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  renderStatusDropdown = (ticket) => (
    <div className="absolute z-20 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
      <div className="py-1">
        <button
          onClick={() => this.handleStatusChange(ticket.id, "In Progress")}
          className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center"
        >
          <FontAwesomeIcon icon={faSpinner} className="mr-2" />
          In Progress
        </button>
        <button
          onClick={() => this.handleStatusChange(ticket.id, "Resolved")}
          className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center"
        >
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          Resolved
        </button>
        <button
          onClick={() => this.handleStatusChange(ticket.id, "Closed")}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center"
        >
          <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
          Closed
        </button>
      </div>
    </div>
  );

  renderTableRow = (ticket) => (
    <React.Fragment key={ticket.id}>
      <tr className="border-b hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center">
            <span
              className={`${this.getPriorityColor(
                ticket.priority
              )} px-2 py-1 rounded-full text-xs font-medium`}
            >
              {ticket.priority}
            </span>
            <span className="ml-3 font-medium text-gray-900">
              {ticket.title}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-600">{ticket.user}</td>
        <td className="px-6 py-4 text-gray-600">{ticket.date}</td>
        <td className="px-6 py-4">
          <div className="relative">
            <button
              onClick={() =>
                this.setState((prev) => ({
                  statusDropdown:
                    prev.statusDropdown === ticket.id ? null : ticket.id,
                }))
              }
              className="flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
            >
              {ticket.status}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
            </button>
            {this.state.statusDropdown === ticket.id &&
              this.renderStatusDropdown(ticket)}
          </div>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() =>
              this.setState((prev) => ({
                expandedTicketId:
                  prev.expandedTicketId === ticket.id ? null : ticket.id,
              }))
            }
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            {this.state.expandedTicketId === ticket.id ? "Hide" : "Details"}
          </button>
        </td>
      </tr>
      {this.state.expandedTicketId === ticket.id && (
        <tr className="bg-gray-50">
          <td colSpan="5" className="px-6 py-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Ticket Details</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );

  renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="animate-spin text-blue-600">
        <FontAwesomeIcon icon={faSpinner} size="2x" />
      </div>
      <p className="mt-4 text-gray-600">Loading tickets...</p>
    </div>
  );

  renderError = () => (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
      <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3" />
      {this.state.error}
    </div>
  );

  render() {
    const { tickets, loading, error } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
                Open Tickets
                <span className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {tickets.length}
                </span>
              </h1>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Title", "User", "Date", "Status", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading
                    ? null
                    : tickets.length === 0
                    ? this.renderEmptyState()
                    : tickets.map(this.renderTableRow)}
                </tbody>
              </table>
              {loading && this.renderLoading()}
              {error && this.renderError()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderEmptyState = () => (
    <tr>
      <td colSpan="5" className="px-6 py-24 text-center">
        <div className="text-gray-500 flex flex-col items-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-4xl mb-4"
          />
          <p className="text-xl font-medium">All clear!</p>
          <p className="mt-2">No open tickets at the moment.</p>
        </div>
      </td>
    </tr>
  );
}

export default AdminTicketListOpen;
