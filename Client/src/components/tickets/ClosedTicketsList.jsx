import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import TicketService from "../../services/ticket.service";
import {
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaRegSmile,
} from "react-icons/fa";

const ClosedTicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadClosedTickets = async () => {
      try {
        const allTickets = await TicketService.getMyTickets();
        const closedTickets = allTickets.filter(
          (ticket) => ticket.status.toLowerCase() === "closed"
        );
        setTickets(closedTickets);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadClosedTickets();
  }, []);

  const getStatusBadge = () => (
    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
      Closed
    </span>
  );

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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Resolved Tickets</h1>
        <p className="mt-2 text-gray-500">
          History of completed support requests
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FaRegSmile className="mx-auto h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No resolved tickets
            </h3>
            <p className="mt-2 text-gray-500">
              All your open tickets will appear here once resolved
            </p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {ticket.title}
                  </h3>
                  {getStatusBadge()}
                </div>

                <p className="text-gray-600 line-clamp-3 mb-4">
                  {ticket.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Resolved</span>
                  </div>
                  <time>
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

export default ClosedTicketsList;
