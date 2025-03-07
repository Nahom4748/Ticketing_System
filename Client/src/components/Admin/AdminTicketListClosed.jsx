import React, { Component } from "react";
import TicketService from "../../services/ticket.service.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faRedo,
  faSpinner,
  faTimesCircle,
  faCalendarTimes,
  faLock,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

class AdminTicketListClosed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      loading: true,
      error: null,
      restoringTicketId: null,
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const response = await TicketService.getAllTickets();
      const closedTickets = response
        .map((ticket) => ({
          id: ticket._id,
          title: ticket.title,
          user: ticket.user?.email || "Unknown",
          date: new Date(ticket.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          status: ticket.status,
          description: ticket.description,
          closedBy: ticket.closedBy?.email || "System",
        }))
        .filter((ticket) => ticket.status === "Closed");

      this.setState({ tickets: closedTickets, loading: false });
    } catch (error) {
      this.setState({
        error: "Failed to load closed tickets",
        loading: false,
      });
      console.error("Error fetching tickets:", error);
    }
  };

  handleRestore = async (ticketId) => {
    if (!window.confirm("Reopen this closed ticket?")) return;

    this.setState({ restoringTicketId: ticketId });

    try {
      await TicketService.updateTicketStatus(ticketId, { status: "Open" });

      this.setState((prevState) => ({
        tickets: prevState.tickets.filter((ticket) => ticket.id !== ticketId),
        restoringTicketId: null,
      }));

      toast.success("Ticket reopened successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Failed to reopen ticket", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      console.error("Error updating ticket status:", error);
      this.setState({ restoringTicketId: null });
    }
  };

  renderTableRow = (ticket) => (
    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors border-b">
      <td className="px-6 py-4 font-medium text-gray-900">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faArchive} className="text-purple-500 mr-3" />
          {ticket.title}
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faBoxOpen} className="text-gray-400 mr-2" />
          {ticket.user}
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCalendarTimes}
            className="text-gray-400 mr-2"
          />
          {ticket.date}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 inline-flex items-center rounded-full bg-purple-100 text-purple-800 text-sm">
          <FontAwesomeIcon icon={faLock} className="mr-2" />
          Closed by: {ticket.closedBy}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => this.handleRestore(ticket.id)}
          disabled={this.state.restoringTicketId === ticket.id}
          className="flex items-center bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
        >
          {this.state.restoringTicketId === ticket.id ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Reopening...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Reopen Ticket
            </>
          )}
        </button>
      </td>
    </tr>
  );

  renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="animate-spin text-purple-600">
        <FontAwesomeIcon icon={faSpinner} size="2x" />
      </div>
      <p className="mt-4 text-gray-600">Loading closed tickets...</p>
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
      <div className="text-purple-500 text-6xl mb-4">
        <FontAwesomeIcon icon={faArchive} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Archive Empty
      </h3>
      <p className="text-gray-600">No closed tickets in the archive.</p>
    </div>
  );

  render() {
    const { tickets, loading, error } = this.state;

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <FontAwesomeIcon
                  icon={faArchive}
                  className="mr-3 text-purple-600"
                />
                Closed Tickets Archive
                <span className="ml-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
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
                      "Date Closed",
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

export default AdminTicketListClosed;
