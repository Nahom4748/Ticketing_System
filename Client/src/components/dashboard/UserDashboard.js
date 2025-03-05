// components/dashboard/UserDashboard.js
class UserDashboard extends React.Component {
  state = {
    tickets: [],
    newTicket: { title: "", description: "" },
  };

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const res = await axios.get("/api/tickets");
      this.setState({ tickets: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tickets", this.state.newTicket);
      this.fetchTickets();
      this.setState({ newTicket: { title: "", description: "" } });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Create New Ticket
                </h2>
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="Title"
                    value={this.state.newTicket.title}
                    onChange={(e) =>
                      this.setState({
                        newTicket: {
                          ...this.state.newTicket,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                  <textarea
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="Description"
                    rows="4"
                    value={this.state.newTicket.description}
                    onChange={(e) =>
                      this.setState({
                        newTicket: {
                          ...this.state.newTicket,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
                <div className="space-y-4">
                  {this.state.tickets.map((ticket) => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
