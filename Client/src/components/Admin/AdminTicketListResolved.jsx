import React, { Component } from "react";
import TicketService from "../../services/ticket.service.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArchive,
  faSpinner,
  faTimesCircle,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

class AdminTicketListResolved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      loading: true,
      error: null,
      closingTicketId: null,
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const response = await TicketService.getAllTickets();
      const resolvedTickets = response
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
        }))
        .filter((ticket) => ticket.status === "Resolved");

      this.setState({ tickets: resolvedTickets, loading: false });
    } catch (error) {
      this.setState({
        error: "Failed to load resolved tickets",
        loading: false,
      });
      console.error("Error fetching tickets:", error);
    }
  };

  handleStatusChange = async (ticketId) => {
    if (!window.confirm("Archive this ticket to Closed status?")) return;

    this.setState({ closingTicketId: ticketId });

    try {
      await TicketService.updateTicketStatus(ticketId, { status: "Closed" });

      this.setState((prevState) => ({
        tickets: prevState.tickets.filter((ticket) => ticket.id !== ticketId),
        closingTicketId: null,
      }));

      toast.success("Ticket archived successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Failed to archive ticket", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      console.error("Error updating ticket status:", error);
      this.setState({ closingTicketId: null });
    }
  };

  renderTableRow = (ticket) => (
    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors border-b">
      <td className="px-6 py-4 font-medium text-gray-900">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 mr-3"
          />
          {ticket.title}
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
          {ticket.user}
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="text-gray-400 mr-2"
          />
          {ticket.date}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 inline-flex items-center rounded-full bg-green-100 text-green-800 text-sm">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          {ticket.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => this.handleStatusChange(ticket.id)}
          disabled={this.state.closingTicketId === ticket.id}
          className="flex items-center bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-md transition-colors"
        >
          {this.state.closingTicketId === ticket.id ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Archiving...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faArchive} className="mr-2" />
              Archive Ticket
            </>
          )}
        </button>
      </td>
    </tr>
  );

  renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="animate-spin text-green-600">
        <FontAwesomeIcon icon={faSpinner} size="2x" />
      </div>
      <p className="mt-4 text-gray-600">Loading resolved tickets...</p>
    </div>
  );

  renderError = () => (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center mx-8 my-4">
      <FontAwesomeIcon icon={faTimesCircle} className="mr-3" />
      {this.state.error}
    </div>
  );

  renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="text-green-500 text-6xl mb-4">
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        All Caught Up!
      </h3>
      <p className="text-gray-600">No resolved tickets requiring action.</p>
    </div>
  );

  render() {
    const { tickets, loading, error } = this.state;

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="mr-3 text-green-600"
                />
                Resolved Tickets
                <span className="ml-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {tickets.length}
                </span>
              </h1>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Ticket Title",
                      "User",
                      "Date Resolved",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    tickets.length > 0 &&
                    tickets.map(this.renderTableRow)}
                </tbody>
              </table>

              {loading && this.renderLoading()}
              {error && this.renderError()}
              {!loading && tickets.length === 0 && this.renderEmptyState()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminTicketListResolved;
