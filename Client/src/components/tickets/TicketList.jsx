import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import TicketService from "../../services/ticket.service";
import {
  FaSpinner,
  FaExclamationCircle,
  FaTicketAlt,
  FaUserCircle,
} from "react-icons/fa";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await TicketService.getMyTickets();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTickets();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { color: "bg-red-100 text-red-800", label: "Open" },
      "in progress": {
        color: "bg-yellow-100 text-yellow-800",
        label: "In Progress",
      },
      closed: { color: "bg-green-100 text-green-800", label: "Closed" },
    };

    const { color, label } = statusConfig[status.toLowerCase()] || {};
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        {label || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
        <FaExclamationCircle />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Support Tickets</h1>
        <p className="mt-2 text-gray-500">
          History of all your support requests
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FaTicketAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No tickets found
            </h3>
            <p className="mt-2 text-gray-500">
              Create your first support ticket
            </p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {ticket.title}
                  </h3>
                  {getStatusBadge(ticket.status)}
                </div>

                <p className="text-gray-600 line-clamp-3 mb-4">
                  {ticket.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaUserCircle className="text-gray-400" />
                    <span>{ticket.user?.name || "You"}</span>
                  </div>
                  <time className="text-gray-400">
                    {format(new Date(ticket.createdAt), "MMM dd, yyyy")}
                  </time>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;
