import React, { Component } from "react";
import { FaPaperPlane } from "react-icons/fa";
import TicketService from "../../services/ticket.service.jxs";

class NewTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { title: "", description: "" },
      submitting: false,
      error: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
      error: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitting: true, error: "" });

    try {
      await TicketService.createTicket(this.state.formData);
      this.setState({
        formData: { title: "", description: "" },
        submitting: false,
      });
      alert("Ticket created successfully!");
    } catch (error) {
      this.setState({
        error: error.message || "Failed to create ticket",
        submitting: false,
      });
    }
  };

  render() {
    const { formData, submitting, error } = this.state;

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            New Support Request
          </h2>
          <p className="text-gray-500">We'll respond within 24 hours</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={this.handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={this.handleInputChange}
              className="w-full border-b-2 border-gray-200 px-4 py-3 focus:border-indigo-500 focus:outline-none placeholder-gray-400"
              placeholder="Brief summary of your issue"
              required
              disabled={submitting}
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Details
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={this.handleInputChange}
              rows="5"
              className="w-full border-b-2 border-gray-200 px-4 py-3 focus:border-indigo-500 focus:outline-none placeholder-gray-400 resize-none"
              placeholder="Please describe your issue in detail..."
              required
              disabled={submitting}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? (
                "Submitting..."
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTicket;
