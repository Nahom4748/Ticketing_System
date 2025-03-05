// components/tickets/TicketTable.js
class TicketTable extends React.Component {
  handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axios.put(`/api/tickets/${ticketId}`, { status: newStatus });
      this.props.onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {this.props.tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ticket.createdBy.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      this.handleStatusChange(ticket._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
