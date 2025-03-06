import React, { Component } from "react";
import TicketCard from "./TicketCard";
import { FaExclamationTriangle } from "react-icons/fa";

class TicketList extends Component {
  render() {
    const { tickets } = this.props;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            <FaExclamationTriangle className="text-3xl mb-2 mx-auto" />
            No tickets found
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    );
  }
}

export default TicketList;
